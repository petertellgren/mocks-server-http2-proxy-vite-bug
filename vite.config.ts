import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert";
import proxy from "./vite-http2-proxy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    proxy({
      "^/api/": "http://127.0.0.1:3100",
    }),
    react()
  ],
})
