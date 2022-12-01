import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
  presets: [presetUno(), presetScrollbar()],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      hack: "Hack",
    },
    colors: {
      vitesseGreen: "#4d9375",
      themeBlack: "#121212",
    },
  },
});
