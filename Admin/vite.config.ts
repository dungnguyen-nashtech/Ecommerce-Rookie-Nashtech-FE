import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(process.env.VITE_PORT) || 3000,
    },
});
