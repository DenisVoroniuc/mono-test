const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const importPlugin = require("eslint-plugin-import");
const unusedImports = require("eslint-plugin-unused-imports");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: [
      "dist/**",
      "node_modules/**",
      ".turbo/**",
      ".husky/**",
      ".changeset/**",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs"
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      "unused-imports": unusedImports
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "unused-imports/no-unused-imports": "error",
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ]
    }
  },
  prettier
];
