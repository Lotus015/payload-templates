import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "payload-types.ts",
      "importMap.js",
      "*.config.js",
      "*.config.mjs",
      "scripts/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Disable static-components rule - false positives with Next.js Server Components
      "react-hooks/static-components": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
    }
  }
);
