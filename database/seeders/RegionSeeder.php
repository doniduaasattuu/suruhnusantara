<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    public function run(): void
    {
        $regions = [
            [
                'code' => '35',
                'name' => 'Jawa Timur',
                'regencies' => [
                    [
                        'code' => '35.78',
                        'name' => 'Kota Surabaya',
                        'districts' => [
                            [
                                'code' => '35.78.01',
                                'name' => 'Gubeng',
                                'villages' => [
                                    ['code' => '35.78.01.1001', 'name' => 'Airlangga', 'postal_code' => '60286'],
                                    ['code' => '35.78.01.1002', 'name' => 'Gubeng', 'postal_code' => '60281'],
                                ],
                            ],
                            [
                                'code' => '35.78.02',
                                'name' => 'Wonokromo',
                                'villages' => [
                                    ['code' => '35.78.02.1001', 'name' => 'Darmo', 'postal_code' => '60241'],
                                    ['code' => '35.78.02.1002', 'name' => 'Wonokromo', 'postal_code' => '60243'],
                                ],
                            ],
                        ],
                    ],
                    [
                        'code' => '35.15',
                        'name' => 'Kabupaten Sidoarjo',
                        'districts' => [
                            [
                                'code' => '35.15.01',
                                'name' => 'Sidoarjo',
                                'villages' => [
                                    ['code' => '35.15.01.2001', 'name' => 'Lemahputro', 'postal_code' => '61213'],
                                    ['code' => '35.15.01.2002', 'name' => 'Sidokare', 'postal_code' => '61214'],
                                ],
                            ],
                            [
                                'code' => '35.15.02',
                                'name' => 'Taman',
                                'villages' => [
                                    ['code' => '35.15.02.2001', 'name' => 'Taman', 'postal_code' => '61257'],
                                    ['code' => '35.15.02.2002', 'name' => 'Wonocolo', 'postal_code' => '61258'],
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            [
                'code' => '32',
                'name' => 'Jawa Barat',
                'regencies' => [
                    [
                        'code' => '32.73',
                        'name' => 'Kota Bandung',
                        'districts' => [
                            [
                                'code' => '32.73.01',
                                'name' => 'Coblong',
                                'villages' => [
                                    ['code' => '32.73.01.1001', 'name' => 'Dago', 'postal_code' => '40135'],
                                    ['code' => '32.73.01.1002', 'name' => 'Lebak Gede', 'postal_code' => '40132'],
                                ],
                            ],
                            [
                                'code' => '32.73.02',
                                'name' => 'Sukajadi',
                                'villages' => [
                                    ['code' => '32.73.02.1001', 'name' => 'Pasteur', 'postal_code' => '40161'],
                                    ['code' => '32.73.02.1002', 'name' => 'Cipedes', 'postal_code' => '40162'],
                                ],
                            ],
                        ],
                    ],
                    [
                        'code' => '32.16',
                        'name' => 'Kabupaten Bekasi',
                        'districts' => [
                            [
                                'code' => '32.16.01',
                                'name' => 'Cikarang Selatan',
                                'villages' => [
                                    ['code' => '32.16.01.2001', 'name' => 'Sukadami', 'postal_code' => '17530'],
                                    ['code' => '32.16.01.2002', 'name' => 'Serang', 'postal_code' => '17530'],
                                ],
                            ],
                            [
                                'code' => '32.16.02',
                                'name' => 'Cibitung',
                                'villages' => [
                                    ['code' => '32.16.02.2001', 'name' => 'Wanasari', 'postal_code' => '17520'],
                                    ['code' => '32.16.02.2002', 'name' => 'Cibuntu', 'postal_code' => '17520'],
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            [
                'code' => '33',
                'name' => 'Jawa Tengah',
                'regencies' => [
                    [
                        'code' => '33.74',
                        'name' => 'Kota Semarang',
                        'districts' => [
                            [
                                'code' => '33.74.01',
                                'name' => 'Banyumanik',
                                'villages' => [
                                    ['code' => '33.74.01.1001', 'name' => 'Srondol Kulon', 'postal_code' => '50263'],
                                    ['code' => '33.74.01.1002', 'name' => 'Srondol Wetan', 'postal_code' => '50269'],
                                ],
                            ],
                            [
                                'code' => '33.74.02',
                                'name' => 'Tembalang',
                                'villages' => [
                                    ['code' => '33.74.02.1001', 'name' => 'Bulusan', 'postal_code' => '50277'],
                                    ['code' => '33.74.02.1002', 'name' => 'Tembalang', 'postal_code' => '50275'],
                                ],
                            ],
                        ],
                    ],
                    [
                        'code' => '33.09',
                        'name' => 'Kabupaten Boyolali',
                        'districts' => [
                            [
                                'code' => '33.09.01',
                                'name' => 'Boyolali',
                                'villages' => [
                                    ['code' => '33.09.01.2001', 'name' => 'Banaran', 'postal_code' => '57313'],
                                    ['code' => '33.09.01.2002', 'name' => 'Pulisen', 'postal_code' => '57312'],
                                ],
                            ],
                            [
                                'code' => '33.09.02',
                                'name' => 'Mojosongo',
                                'villages' => [
                                    ['code' => '33.09.02.2001', 'name' => 'Manggis', 'postal_code' => '57322'],
                                    ['code' => '33.09.02.2002', 'name' => 'Mojosongo', 'postal_code' => '57321'],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($regions as $provinceData) {
            $province = Province::updateOrCreate(
                ['code' => $provinceData['code']],
                ['name' => $provinceData['name']]
            );

            foreach ($provinceData['regencies'] as $regencyData) {
                $regency = Regency::updateOrCreate(
                    ['code' => $regencyData['code']],
                    [
                        'province_code' => $province->code,
                        'name' => $regencyData['name'],
                    ]
                );

                foreach ($regencyData['districts'] as $districtData) {
                    $district = District::updateOrCreate(
                        ['code' => $districtData['code']],
                        [
                            'regency_code' => $regency->code,
                            'name' => $districtData['name'],
                        ]
                    );

                    foreach ($districtData['villages'] as $villageData) {
                        Village::updateOrCreate(
                            ['code' => $villageData['code']],
                            [
                                'district_code' => $district->code,
                                'name' => $villageData['name'],
                                'postal_code' => $villageData['postal_code'],
                            ]
                        );
                    }
                }
            }
        }
    }
}
