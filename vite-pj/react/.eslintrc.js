module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: [
    "react"
  ],
  parserOptions: {
    "sourceType": "module",
  },
  root: true,
  rules: {
    "quotes": [2, "single"],
    "no-var": 2,
    "indent": [2, 2],

    // React
    "react/prop-types": "off",
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