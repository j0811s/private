module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    // "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    // "@typescript-eslint",
    "react"
  ],
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    "sourceType": "module",
    // "project": "./tsconfig.json"
  },
  root: true,
  rules: {
    "quotes": [2, "single"],
    "no-var": 2,
    "indent": [2, 2],

    // React
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  }
}