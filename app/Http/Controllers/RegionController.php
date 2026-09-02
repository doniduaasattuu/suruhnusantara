<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Http\JsonResponse;

class RegionController extends Controller
{
    public function regencies(Province $province): JsonResponse
    {
        return response()->json([
            'data' => $province->regencies()
                ->select('code', 'province_code', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function districts(Regency $regency): JsonResponse
    {
        return response()->json([
            'data' => $regency->districts()
                ->select('code', 'regency_code', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function villages(District $district): JsonResponse
    {
        return response()->json([
            'data' => $district->villages()
                ->select('code', 'district_code', 'name', 'postal_code')
                ->orderBy('name')
                ->get(),
        ]);
    }
}
