import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Auto-generated files — do not lint
    "src/generated/**",
  ]),
  // Rule overrides — downgrade strict TypeScript rules to warnings
  // so that Vercel builds succeed while still flagging them in dev
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "warn",
      // react-compiler is not installed as a separate plugin; suppress until added
      "react-compiler/react-compiler": "off",
    },
  },
]);

export default eslintConfig;
