import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      "neutral-850": "#1f1f1f",
    },
    fontFamily: {
      sans: "Switzer",
      mono: "Hack",
    },
    maxWidth: {
      container: "43rem",
    },
  },
});
