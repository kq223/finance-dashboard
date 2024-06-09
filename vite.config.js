import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/finance-dashboard/", // Set the base path to your repository name
  plugins: [react()],
});
