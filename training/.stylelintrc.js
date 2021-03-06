module.exports = {
  overrides: [
    {
      files: ["htdocs/**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  ignoreFiles: ["**/node_modules/**"],
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-scss",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  rules: {
    // @から始まる記述への警告
    "at-rule-no-unknown": null,
    // @から始まる記述への警告（SCSS）
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["use", "forward"],
      },
    ],
    // id禁止
    "selector-id-pattern": "'",
    // 透明度を数値かパーセンテージで指定（'number'|'percentage'）
    "alpha-value-notation": "number",
    // @ルールの前に1行空けるか（'always'|'never'）
    "at-rule-empty-line-before": "never",
    // url を引用符で囲むか（'always'|'never'）
    "function-url-quotes": "never",
    // 詳細度の高いセレクタの後に詳細度の低いセレクタを禁止
    "no-descending-specificity": null,
    // セレクタの重複を禁止
    "no-duplicate-selectors": null,
    // セレクタの前に1行空けるか（'always'|'never'|'always-multi-line'|'never-multi-line'）
    "rule-empty-line-before": "always",
    // セレクタのパターンを指定
    "selector-class-pattern": null,
  },
};
