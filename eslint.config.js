import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { fixupPluginRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

export default tseslint.config(
  { ignores: ["dist", "build", "public", "src/__tests__"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["__tests__/*"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-expressions": 0,
      "chai-friendly/no-unused-expressions": "off",
      "max-statements": ["warn", 100],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "warn",
      "no-extra-boolean-cast": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "no-empty": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-unsafe-optional-chaining": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "no-constant-binary-expression": "off",
      "no-async-promise-executor": "off",
    },
  }
);
