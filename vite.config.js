import path from "node:path";
import react from "@vitejs/plugin-react";
import { createLogger, defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "credentialless",
    },
    allowedHosts: true,
    host: "0.0.0.0",

    port: 5173,
  },
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        "@babel/parser",
        "@babel/traverse",
        "@babel/generator",
        "@babel/types",
      ],
    },
  },
});
