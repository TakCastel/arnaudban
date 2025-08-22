import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Règles d'accessibilité
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",
      
      // Règles de qualité générale
      "prefer-const": "error",
      "no-var": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "eqeqeq": "error",
      "curly": "error",
      "brace-style": "error",
      "comma-dangle": ["error", "always-multiline"],
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "indent": ["error", 2],
      
      // Règles spécifiques à React
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-unused-state": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-sort-props": "warn",
      "react/jsx-wrap-multilines": "error",
    },
  },
];

export default eslintConfig;
