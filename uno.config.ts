import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"
import { presetScrollbar } from "unocss-preset-scrollbar"

export default defineConfig({
  presets: [presetUno(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    fontFamily: {
      hack: "Hack",
    },
    colors: {
      vitesseGreen: "#4d9375",
      themeBlack: "#121212",
    },
  },
})
