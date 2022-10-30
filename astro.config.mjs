import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://www.nexxel.dev",
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
    },
  },
  integrations: [mdx(), sitemap(), tailwind(), react()],
});
