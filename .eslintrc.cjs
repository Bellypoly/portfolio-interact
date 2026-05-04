/**
 * ESLint flat-style rules via legacy config (ESLint 8 + existing plugins).
 * Run: npm run lint
 */
module.exports = {
  root: true,
  ignorePatterns: [
    "dist",
    "node_modules",
    "coverage",
    "*.min.js",
    ".cursor/**",
  ],
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  plugins: ["react-refresh"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    // Many modules colocate helpers with components (case-study renderers, hooks, etc.).
    "react-refresh/only-export-components": "off",
  },
  overrides: [
    {
      files: [
        "vite.config.js",
        "postcss.config.js",
        "tailwind.config.js",
        "**/*.config.js",
        "**/*.config.cjs",
      ],
      env: { node: true, browser: false },
    },
  ],
};
