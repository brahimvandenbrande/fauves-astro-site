// @ts-check
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import path from 'path';
import { remarkReadingTime } from './remark-reading-time.mjs';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      customPages: [
        new URL("about", SITE_URL).href,
        new URL("projects", SITE_URL).href
      ],
      lastmod: new Date(),
      changefreq: "weekly",
      priority: 0.8,
      filter: (page) => {
        return (
          !page.includes("404") &&
          !page.includes("api") &&
          !page.includes("admin")
        );
      }
    }),
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime]
    })
  ],
  server: {
    port: 4321
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "github-dark",
      wrap: true
    }
  },
  build: {
    inlineStylesheets: "auto",
    format: "directory"
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@layouts': path.resolve('./src/layouts'),
        '@components': path.resolve('./src/components'),
        '@content': path.resolve('./src/content'),
        '@assets': path.resolve('./src/assets'),
        '@styles': path.resolve('./src/styles')
      }
    },
    optimizeDeps: {
      include: ["sharp"]
    }
  },
  devToolbar: {
    enabled: true
  }
});
