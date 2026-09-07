<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AdministratorDashboardController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('index_administrator_dashboard');

        return Inertia::render('administrator/dashboard');
    }
}
