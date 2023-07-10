import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ["express"],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
