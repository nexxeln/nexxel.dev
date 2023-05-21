import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [presetUno(), presetWebFonts({
    provider: "fontshare",
    fonts: {
      sans: "Switzer",
    },
  })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    maxWidth: {
      container: "43rem",
    },
  },
  shortcuts: {
    "text-imp": "text-neutral-900 dark:text-neutral-100",
  },
})
