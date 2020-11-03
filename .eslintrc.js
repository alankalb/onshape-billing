module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "comma-dangle": "off",
    quotes: "off",
    "space-before-function-paren": "off",
    semi: "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
  },
};
