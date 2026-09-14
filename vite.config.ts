import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [
    federation({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./VardAvHusdjur": "./src/components/VardAvHusdjur.vue",
      },
      shared: {
        vue: { singleton: true, requiredVersion: "^3.5.22" },
        "@fkui/vue": { singleton: true, requiredVersion: "^6.24.1" },
        pinia: { singleton: true, requiredVersion: "^3.0.4" },
      },
      manifest: true,
      publicPath: "auto",
      dts: false,
    }),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  preview: {
    port: 3031,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9002",
        changeOrigin: true,
      },
    },
    port: 3031,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
  },
});
