import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      "neutral-850": "#1f1f1f",
    },
    fontFamily: {
      sans: "Switzer",
    },
    maxWidth: {
      container: "43rem",
    },
  },
  shortcuts: {
    "text-imp": "text-neutral-850 dark:text-neutral-100",
  },
})
