const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


/**
 * 作業フォルダ
 */
// 通常向け
const workspace = 'template'; // 作業場所
const projectDir = 'kadai'; // ページまでのpath

// WordPress向け
// const workspace = 'training'; // 作業場所
// const projectDir = 'wp-sample/wp'; // ページまでのpath
// const wpThemeName = 'wp-practice'; // WordPressテーマ名

/**
 * ブラウザシンク設定
 */
const browserSync = {
  // proxy: `localhost:${process.env.NGINX_HOST}`, //Docker WordPress用（serverと共存不可）
  server: {
    baseDir: `../dist/${workspace}/${projectDir}/`,
    index: 'index.html'
  }
}

/**
 * 使用する機能
 */
const use = {
  ejs: true,
  jQuery: false
}

/**
 * 各種ファイルパスの指定
 */
const wpThemePath = `wp-content/themes/${wpThemeName}`;
const filePath = {
  html: {
    src: `../src/${workspace}/${projectDir}/`,
    dist: `../dist/${workspace}/${projectDir}/`,
  },
  ejs: {
    src: `../src/${workspace}/${projectDir}/templates/`,
    dist: `../dist/${workspace}/${projectDir}/`,
  },
  wordpress: {
    src: [
      // `../src/${workspace}/${projectDir}/${wpThemePath}/`,
      // `../src/${workspace}/${projectDir}/*`,
      // `../src/${workspace}/${projectDir}/**/*`,
      // `!../src/${workspace}/${projectDir}/${wpThemePath}/assets/**`,
      // `../src/${workspace}/${projectDir}/${wpThemePath}/*.{php,css}`,
      // // PHPテスト用
      // `../src/index.php`,
    ],
    dist: `../dist/`
  },
  css: {
    src: `../src/${workspace}/${projectDir}/assets/org/sass/`,
    dist: `../dist/${workspace}/${projectDir}/assets/css/`,
    // src: `../src/${workspace}/${projectDir}/${wpThemePath}/assets/org/sass/`, //例.WordPress
    // dist: `../dist/${workspace}/${projectDir}/${wpThemePath}/assets/css/` //例.WordPress
  },
  js: {
    src: `../src/${workspace}/${projectDir}/assets/org/js/`,
    dist: `../dist/${workspace}/${projectDir}/assets/js/`,
    // src: `../src/${workspace}/${projectDir}/${wpThemePath}/assets/org/js/`, //例.WordPress
    // dist: `../dist/${workspace}/${projectDir}/${wpThemePath}/assets/js/` //例.WordPress
  },
  img: {
    src: `../src/${workspace}/${projectDir}/assets/images/`,
    dist: `../dist/${workspace}/${projectDir}/assets/images/`,
    // src: `../src/${workspace}/${projectDir}/${wpThemePath}/assets/images/`, //例.WordPress
    // dist: `../dist/${workspace}/${projectDir}/${wpThemePath}/assets/images/` //例.WordPress
  },
  video: {
    src: `../src/${workspace}/${projectDir}/assets/video/`,
    dist: `../dist/${workspace}/${projectDir}/assets/video/`,
    // src: `../src/${workspace}/${projectDir}/${wpThemePath}/assets/video/`, //例.WordPress
    // dist: `../dist/${workspace}/${projectDir}/${wpThemePath}/assets/video/` //例.WordPress
  },
  other: {
    src: [
      // meiji
      // `../src/${workspace}/${projectDir}/meiji/sweets/icecream/essel/common/**`,
      // `../src/${workspace}/${projectDir}/meiji/include/**`,
    ],
    dist: `../dist/`
  }
}


/**
 * html設定
 */
const html = {
  minify: {
    // collapseWhitespace: true,
    // preserveLineBreaks: true,
    // removeComments : true,
    // removeScriptTypeAttributes: true,
    // removeStyleLinkTypeAttributes: true,
    // sortAttributes: true,
    // removeEmptyAttributes: true,
    // removeEmptyElements: false,
    // quoteCharacter: "\""
  }
}


/**
 * エクスポート
 */
module.exports = {
  workspace,
  projectDir,
  browserSync,
  use,
  filePath,
  html
}