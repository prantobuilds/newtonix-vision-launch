import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), cloudflare()],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  preview: {
    host: "::",
    port: 8080,
  },
});