import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // 1. Core Next.js and TypeScript configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Global Ignores (The "No-Go" zones for linting)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
    ],
  },

  // 3. Custom Rule Overrides (Optional but recommended for SaaS)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Encourages better typing than 'any'
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Keeps code clean
      "react/no-unescaped-entities": "off", // Helpful for career summaries with apostrophes
    },
  },
];

export default eslintConfig;