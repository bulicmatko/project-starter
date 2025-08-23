import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginFormatjs from "eslint-plugin-formatjs";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * ESLint Configuration - Default
 * https://eslint.org/docs/latest/use/configure/
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      ecmaVersion: 2022,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      formatjs: eslintPluginFormatjs,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onlyWarn: eslintPluginOnlyWarn,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
    },
  },
  {
    settings: {
      react: { version: "detect" },
    },
  },
  {
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs["jsx-runtime"].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,

      "eol-last": ["error"],
      "no-console": ["error"],
      "consistent-return": ["error"],
      "object-shorthand": ["error", "always", { avoidQuotes: true }],
      "sort-imports": ["off"],

      "no-unused-vars": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_[^_].*$|^_$",
          varsIgnorePattern: "^_[^_].*$|^_$",
          caughtErrorsIgnorePattern: "^_[^_].*$|^_$",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports", prefer: "type-imports" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "@typescript-eslint/no-confusing-void-expression": ["off"],
      // "@typescript-eslint/no-floating-promises": ["error"],
      // "@typescript-eslint/no-misused-promises": [
      //   "error",
      //   { checksVoidReturn: false },
      // ],
      "@typescript-eslint/array-type": [
        "error",
        { default: "array-simple", readonly: "array-simple" },
      ],
      "@typescript-eslint/only-throw-error": ["off"],

      "formatjs/enforce-id": [
        "error",
        { idInterpolationPattern: "[sha512:contenthash:base64:6]" },
      ],
      "formatjs/enforce-default-message": ["error", "literal"],
      "formatjs/enforce-description": ["error", "literal"],
      "formatjs/enforce-plural-rules": [
        "error",
        {
          one: true,
          other: true,
          zero: false,
        },
      ],
      "formatjs/enforce-placeholders": ["error"],
      "formatjs/no-emoji": ["error"],
      "formatjs/no-offset": ["error"],
      "formatjs/no-invalid-icu": ["error"],
      "formatjs/no-multiple-plurals": ["error"],
      "formatjs/no-complex-selectors": ["error"],
      "formatjs/no-multiple-whitespaces": ["error"],
      // "formatjs/no-literal-string-in-jsx": ["off"],

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/jsx-boolean-value": ["error", "always"],

      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
    },
  },
  {
    ignores: [
      ".react-router",
      "build",
      "coverage",
      "node_modules",
      "eslint.config.js",
    ],
  },
];
