import { defineConfig } from "astro/config"
import vue from "@astrojs/vue"
import mdx from "@astrojs/mdx"
import unocss from "unocss/astro"
import { FontaineTransform } from "fontaine"
import vesper from "./src/lib/vesper.json"

export default defineConfig({
  integrations: [
    mdx(),
    unocss({ injectReset: true }),
    vue(),
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  markdown: { shikiConfig: { theme: vesper, wrap: true } },
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ["BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans"],
        // make sure resolve only Switzer
        resolvePath: (id) => {
          if (id !== "/fonts/Switzer.woff2")
            return new URL("")
          return new URL(`./public${id}`, import.meta.url)
        },
      }),
      FontaineTransform.vite({
        // monospace fallbacks
        fallbacks: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        resolvePath: (id) => {
          if (id !== "/fonts/Hack.woff2")
            return new URL("")
          return new URL(`./public${id}`, import.meta.url)
        },
      }),
    ],
  },
})
