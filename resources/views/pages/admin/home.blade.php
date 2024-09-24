@extends('layout.admin-layout')
@section('title', 'Admin Home Page')

@section('custom_css_js')
    @vite('resources/css/admin_panel.css')
    @vite('resources/js/admin_panel.js')
@endsection


<p>Admin Side</p>
@section('content')
    <h1 class="p-5 bg-primary">Admin Home Page</h1>
    <main>
        <nav class="d-flex justify-content-between align-items-center">
            <button class="btn btn-primary" data-admin-panel-switch="dashboard">Dashboard</button>
            <button class="btn btn-primary" data-admin-panel-switch="test">Test</button>
        </nav>
        <div id="adminPanelMainContainer">
            admin content should be loaded here BTW 🫠
        </div>
    </main>
@endsection
