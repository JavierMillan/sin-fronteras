import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// NOTA DE DEPLOY:
// Para GitHub Pages en sub-ruta el `base` debe ser "/<nombre-del-repo>/".
// Repo asumido por defecto: "sin-fronteras". Si nombras el repo distinto,
// cambia SOLO esta línea. Si usas dominio propio, pon base: "/".
export default defineConfig({
  base: "/sin-fronteras/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
