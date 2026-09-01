<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Client\Pool;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Throwable;

class SyncWilayah extends Command
{
    protected $signature = 'wilayah:sync';

    protected $description = 'Sinkronisasi data wilayah Indonesia';

    private const BASE_URL = 'https://wilayah.web.id/api';

    private const CONCURRENCY = 20;

    private const LIMIT = 1000;

    private const UPSERT_CHUNK = 1000;

    public function handle(): int
    {
        $start = microtime(true);

        $this->info('Memulai sinkronisasi wilayah Indonesia...');
        $this->newLine();

        try {
            $provinces = $this->syncProvinces();

            $this->newLine();

            $regencies = $this->syncRegencies($provinces);

            $this->newLine();

            $districts = $this->syncDistricts($regencies);

            $this->newLine();

            $villageCount = $this->syncVillages($districts);

            $duration = round(microtime(true) - $start, 2);

            $this->newLine();
            $this->info('Sinkronisasi selesai.');
            $this->newLine();

            $this->table(
                ['Data', 'Jumlah'],
                [
                    ['Provinsi', count($provinces)],
                    ['Kabupaten/Kota', count($regencies)],
                    ['Kecamatan', count($districts)],
                    ['Desa/Kelurahan', $villageCount],
                    ['Durasi', "{$duration} detik"],
                ],
            );

            return self::SUCCESS;
        } catch (Throwable $e) {
            $this->newLine();
            $this->error('Sinkronisasi gagal.');
            $this->error($e->getMessage());

            return self::FAILURE;
        }
    }

    /**
     * @return array<int, array{code: string, name: string}>
     */
    private function syncProvinces(): array
    {
        $this->info('1/4 Mengambil provinsi...');

        $provinces = $this->fetchAll('/provinces');

        $rows = [];

        foreach ($provinces as $province) {
            $rows[] = [
                'code' => $province['code'],
                'name' => $province['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        $this->upsert(
            'provinces',
            $rows,
            ['code'],
            ['name', 'updated_at'],
        );

        $this->line(
            '  ✓ ' . number_format(count($provinces), 0, ',', '.') . ' provinsi'
        );

        return $provinces;
    }

    /**
     * @param array<int, array{code: string, name: string}> $provinces
     * @return array<int, array{code: string, province_code: string, name: string}>
     */
    private function syncRegencies(array $provinces): array
    {
        $this->info('2/4 Mengambil kabupaten/kota...');

        $allRegencies = [];

        /*
         * Pool hanya digunakan untuk request.
         *
         * Parent code tetap disimpan secara eksplisit
         * melalui array request.
         */
        foreach (array_chunk($provinces, self::CONCURRENCY) as $chunk) {
            $requests = [];

            foreach ($chunk as $province) {
                $requests[] = [
                    'province_code' => $province['code'],
                    'url' => self::BASE_URL .
                        "/regencies/{$province['code']}",
                ];
            }

            $responses = Http::pool(
                function (Pool $pool) use ($requests) {
                    return array_map(
                        fn(array $request) => $pool
                            ->timeout(30)
                            ->retry(3, 1000)
                            ->get($request['url']),
                        $requests,
                    );
                },
                concurrency: self::CONCURRENCY,
            );

            foreach ($responses as $index => $response) {
                $response = $this->handleResponse($response);

                $provinceCode = $requests[$index]['province_code'];

                foreach ($response as $regency) {
                    $allRegencies[] = [
                        'code' => $regency['code'],
                        'province_code' => $provinceCode,
                        'name' => $regency['name'],
                    ];
                }
            }
        }

        $rows = [];

        foreach ($allRegencies as $regency) {
            $rows[] = [
                'code' => $regency['code'],
                'province_code' => $regency['province_code'],
                'name' => $regency['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        $this->upsert(
            'regencies',
            $rows,
            ['code'],
            ['province_code', 'name', 'updated_at'],
        );

        $this->line(
            '  ✓ ' .
                number_format(count($allRegencies), 0, ',', '.') .
                ' kabupaten/kota'
        );

        return $allRegencies;
    }

    /**
     * @param array<int, array{code: string, province_code: string, name: string}> $regencies
     * @return array<int, array{code: string, regency_code: string, name: string}>
     */
    private function syncDistricts(array $regencies): array
    {
        $this->info('3/4 Mengambil kecamatan...');

        $allDistricts = [];

        foreach (array_chunk($regencies, self::CONCURRENCY) as $chunk) {
            $requests = [];

            foreach ($chunk as $regency) {
                $requests[] = [
                    'regency_code' => $regency['code'],
                    'url' => self::BASE_URL .
                        "/districts/{$regency['code']}",
                ];
            }

            $responses = Http::pool(
                function (Pool $pool) use ($requests) {
                    return array_map(
                        fn(array $request) => $pool
                            ->timeout(30)
                            ->retry(3, 1000)
                            ->get($request['url']),
                        $requests,
                    );
                },
                concurrency: self::CONCURRENCY,
            );

            foreach ($responses as $index => $response) {
                $response = $this->handleResponse($response);

                $regencyCode = $requests[$index]['regency_code'];

                foreach ($response as $district) {
                    $allDistricts[] = [
                        'code' => $district['code'],
                        'regency_code' => $regencyCode,
                        'name' => $district['name'],
                    ];
                }
            }
        }

        $rows = [];

        foreach ($allDistricts as $district) {
            $rows[] = [
                'code' => $district['code'],
                'regency_code' => $district['regency_code'],
                'name' => $district['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        $this->upsert(
            'districts',
            $rows,
            ['code'],
            ['regency_code', 'name', 'updated_at'],
        );

        $this->line(
            '  ✓ ' .
                number_format(count($allDistricts), 0, ',', '.') .
                ' kecamatan'
        );

        return $allDistricts;
    }

    /**
     * @param array<int, array{code: string, regency_code: string, name: string}> $districts
     */
    private function syncVillages(array $districts): int
    {
        $this->info('4/4 Mengambil desa/kelurahan...');

        $totalVillages = 0;
        $totalDistricts = count($districts);
        $processed = 0;

        foreach (array_chunk($districts, self::CONCURRENCY) as $chunk) {
            $requests = [];

            foreach ($chunk as $district) {
                $requests[] = [
                    'district_code' => $district['code'],
                    'url' => self::BASE_URL .
                        "/villages/{$district['code']}",
                ];
            }

            $responses = Http::pool(
                function (Pool $pool) use ($requests) {
                    return array_map(
                        fn(array $request) => $pool
                            ->timeout(30)
                            ->retry(3, 1000)
                            ->get($request['url']),
                        $requests,
                    );
                },
                concurrency: self::CONCURRENCY,
            );

            $rows = [];

            foreach ($responses as $index => $response) {
                $response = $this->handleResponse($response);

                /*
                 * Parent code DIAMBIL DARI REQUEST,
                 * bukan dari response API.
                 */
                $districtCode = $requests[$index]['district_code'];

                foreach ($response as $village) {
                    $rows[] = [
                        'code' => $village['code'],
                        'district_code' => $districtCode,
                        'name' => $village['name'],
                        'postal_code' => $village['postal_code'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];

                    $totalVillages++;
                }

                $processed++;
            }

            /*
             * Satu batch SQL untuk banyak village.
             */
            $this->upsert(
                'villages',
                $rows,
                ['code'],
                [
                    'district_code',
                    'name',
                    'postal_code',
                    'updated_at',
                ],
            );

            $percentage = round(
                ($processed / $totalDistricts) * 100,
                1
            );

            $this->line(
                "  {$processed}/{$totalDistricts} kecamatan ({$percentage}%)"
            );
        }

        $this->line(
            '  ✓ ' .
                number_format($totalVillages, 0, ',', '.') .
                ' desa/kelurahan'
        );

        return $totalVillages;
    }

    /**
     * Fetch seluruh halaman endpoint.
     *
     * @return array<int, array<string, mixed>>
     */
    private function fetchAll(string $endpoint): array
    {
        $results = [];
        $page = 1;

        do {
            $response = Http::timeout(30)
                ->retry(3, 1000)
                ->get(self::BASE_URL . $endpoint, [
                    'page' => $page,
                    'limit' => self::LIMIT,
                ]);

            $response->throw();

            $data = $response->json('data', []);
            $meta = $response->json('meta', []);

            $results = [
                ...$results,
                ...$data,
            ];

            $totalPages = (int) ($meta['totalPages'] ?? $page);

            $page++;
        } while ($page <= $totalPages);

        return $results;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function handleResponse(Response $response): array
    {
        $response->throw();

        return $response->json('data', []);
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     * @param array<int, string> $uniqueBy
     * @param array<int, string> $updateColumns
     */
    private function upsert(
        string $table,
        array $rows,
        array $uniqueBy,
        array $updateColumns,
    ): void {
        if ($rows === []) {
            return;
        }

        foreach (array_chunk($rows, self::UPSERT_CHUNK) as $chunk) {
            DB::table($table)->upsert(
                $chunk,
                $uniqueBy,
                $updateColumns,
            );
        }
    }
}
