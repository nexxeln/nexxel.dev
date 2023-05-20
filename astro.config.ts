import { defineConfig } from "astro/config"
import unocss from "unocss/astro"
import vue from "@astrojs/vue"

export default defineConfig({
  integrations: [
    unocss({ injectReset: true }),
    vue(),
  ],
})
