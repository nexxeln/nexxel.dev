import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
// @ts-ignore
import vesper from "./src/lib/vesper.json";

export default defineConfig({
  site: "https://www.bencode.dev",
  adapter: vercel(),
  output: "hybrid",
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    unocss({ injectReset: true }),
    vue(),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  server: {
    port: 3000,
  },
  // @ts-expect-error
  markdown: { shikiConfig: { theme: vesper, wrap: true } },
});
