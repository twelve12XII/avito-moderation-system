import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0", // для hot reload в Docker
    port: 5173,
    watch: {
      usePolling: true, // для hot reload в Docker
    },
  },
});
