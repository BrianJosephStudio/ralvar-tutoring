import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../server/dist",
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ["express"],
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: "192.168.1.41",
  },
});
