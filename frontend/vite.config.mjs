import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"
// import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [react()
    ],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.(js|jsx)$/, // Include both .js and .jsx files
    },
    server: {
        port: 3000,
        open: true
    }
});