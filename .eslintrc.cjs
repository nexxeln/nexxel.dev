/* eslint-disable quote-props */
process.env.ESLINT_TSCONFIG = "tsconfig.json";

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@antfu", "@unocss", "plugin:astro/recommended"],
  overrides: [
    {
      files: ["*"],
      rules: {
        quotes: ["error", "double"],
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      },
    },
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  ],
};

module.exports = config;
