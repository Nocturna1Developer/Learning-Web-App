import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://nocturna1developer.github.io/Learning-Web-App/, so assets
// need the repo name as their base. Dev and preview stay at "/".
const base = process.env.GITHUB_ACTIONS ? "/Learning-Web-App/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
