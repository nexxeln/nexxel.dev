/* eslint-disable quote-props */
process.env.ESLINT_TSCONFIG = "tsconfig.json"

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@antfu", "@unocss"],
  overrides: [
    {
      files: ["*"],
      rules: {
        quotes: ["error", "double"],
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      },
    },
  ],
}

module.exports = config
