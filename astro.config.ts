import { defineConfig } from "astro/config"
import unocss from "unocss/astro"
import vue from "@astrojs/vue"
import { FontaineTransform } from "fontaine"
import mdx from "@astrojs/mdx"

export default defineConfig({
  integrations: [
    unocss({ injectReset: true }),
    vue(),
    mdx(),
  ],
  vite: {
    plugins: [FontaineTransform.vite({
      fallbacks: ["BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans"],
      resolvePath: id => new URL(`./public${id}`, import.meta.url),
    })],
  },
})
