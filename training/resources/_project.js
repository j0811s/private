const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


/**
 * 作業フォルダ
 */
const workspace = 'template';
const projectDir = 'project';
// const projectDir = 'wp-pj';
const wpThemePath = `${workspace}/${projectDir}/wp-content/themes/sample`;


/**
 * ブラウザシンク設定
 */
const browserSync = {
  // proxy: `localhost:${process.env.NGINX_HOST}`, //Docker用（serverと共存不可）
  server: {
    baseDir: `../htdocs/${workspace}/${projectDir}/`,
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
 * minify設定
 */
const minify = {
  html: false,
  css: false,
  js: false
}


/**
 * 各種ファイルパスの指定
 */
const filePath = {
  html: {
    src: `../htdocs/${workspace}/${projectDir}/org/`,
    dest: `../htdocs/${workspace}/${projectDir}/`,
  },
  ejs: {
    src: `../htdocs/${workspace}/${projectDir}/templates/`,
    dest: `../htdocs/${workspace}/${projectDir}/`,
  },
  css: {
    src: `../htdocs/${workspace}/${projectDir}/assets/org/sass/`,
    dest: `../htdocs/${workspace}/${projectDir}/assets/css/`,
    // src: `../htdocs/${wpThemePath}/assets/org/sass/`,
    // dest: `../htdocs/${wpThemePath}/assets/css/`
  },
  js: {
    src: `../htdocs/${workspace}/${projectDir}/assets/org/js/`,
    dest: `../htdocs/${workspace}/${projectDir}/assets/js/`,
    // src: `../htdocs/${wpThemePath}/assets/org/js/`,
    // dest: `../htdocs/${wpThemePath}/assets/js/`
  },
  img: {
    src: `../htdocs/${workspace}/${projectDir}/assets/images/`,
    dest: `../htdocs/${workspace}/${projectDir}/assets/images/`,
    // src: `../htdocs/${wpThemePath}/assets/images/`,
    // dest: `../htdocs/${wpThemePath}/assets/images/`
  },
  other: {
    src: [],
    dest: `../htdocs/`
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
  minify,
  filePath
}