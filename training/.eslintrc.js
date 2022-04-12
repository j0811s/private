// https://eslint.org/docs/rules/
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jquery" : true
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "no-undef": 1,
    "no-unused-vars": 1
  },
  "ignorePatterns": [
    "/resources/",
    "/node_modules/",
    "/dist/"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "globals": {
    // "window": true
  }
}