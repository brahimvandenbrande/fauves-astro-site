// @ts-check
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts.ts";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Combine all integrations into a single array
  integrations: [sitemap(), react()],
  server: {
    port: 4321
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
