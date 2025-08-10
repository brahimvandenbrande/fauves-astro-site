// @ts-check
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      // Customize the sitemap generation
      customPages: [
        // Add any static pages not in the pages directory
        new URL("about", SITE_URL).href,
        new URL("projects", SITE_URL).href
        // Add other important pages
      ],
      // Customize the lastmod, changefreq, and priority
      lastmod: new Date(),
      changefreq: "weekly",
      priority: 0.8,
      // Include all pages by default
      filter: (page) => {
        // Exclude any pages you don't want in the sitemap
        return (
          !page.includes("404") &&
          !page.includes("api") &&
          !page.includes("admin")
        );
      }
    }),
    react()
  ],
  server: {
    port: 4321
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true
    }
  },
  build: {
    cssCodeSplit: true,
    inlineStylesheets: "auto",
    minify: true,
    format: "directory"
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['sharp']
    },
    build: {
      cssMinify: true,
      target: 'esnext',
      assetsInlineLimit: 0 // Force all assets to be inlined (adjust as needed)
    }
  },
  devToolbar: {
    enabled: true
  }
});
