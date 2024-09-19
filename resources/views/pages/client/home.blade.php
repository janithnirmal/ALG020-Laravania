@extends('layout.client-layout')
@section('title', 'Home Page')


@section('custom_css_js')
    @vite('resources/css/home.css')
    @vite('resources/js/home.js')
@endsection



<p>Client Side</p>
@section('content')
    <h1 class="p-4 bg-primary">Home Page</h1>
@endsection
