import { defineConfig, presets } from "sponsorkit";

export default defineConfig({
  outputDir: "./.sponsorkit",
  github: {
    login: "nexxeln",
    type: "user",
  },
  width: 800,
  formats: ["json", "png"],
  tiers: [
    {
      title: "Sponsors",
      preset: presets.medium,
    },
  ],
});
