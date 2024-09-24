import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/css/home.css",
                "resources/css/admin_panel.css",
                
                "resources/js/app.js",
                "resources/js/home.js",
                "resources/js/admin_panel.js",
            ],
            refresh: true,
        }),
    ],
});
