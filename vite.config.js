import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), react()],
  // server: {
  //   host: "0.0.0.0",
  //   proxy: {
  //     "/api": {
  //       target: "http://192.168.1.27:3000", // Backend server address
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
