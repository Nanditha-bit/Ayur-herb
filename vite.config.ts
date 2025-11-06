import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,  // ✅ allows access from your phone via Wi-Fi
    port: 8081,  // ✅ use consistent port
  },
  plugins: [react()],  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

