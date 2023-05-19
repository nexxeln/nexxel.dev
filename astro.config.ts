import { defineConfig } from "astro/config"
import unocss from "unocss/astro"

export default defineConfig({
  integrations: [unocss({ injectReset: true })],
})
