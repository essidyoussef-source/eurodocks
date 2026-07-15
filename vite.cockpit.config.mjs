import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  root: path.resolve(import.meta.dirname, "cockpit-src"),
  base: "/cockpit/",
  build: {
    outDir: path.resolve(import.meta.dirname, "public_html/cockpit"),
    emptyOutDir: true,
  },
});
