const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.env')});
const ENV = process.env;


/**
 * 作業フォルダ
 */
const WORKSPACE = 'template';
const PJ = 'project';


/**
 * ブラウザシンク
 */
const browserSync = {
  // proxy: `localhost:${ENV.NGINX_HOST}`, //Docker WordPressのProxy
  // port: '8008',
  // server: {
  //   baseDir: `../dist/${WORKSPACE}/${PJ}/`,
  // }
}


/**
 * 機能有無
 */
const use = {
  ejs: true, //EJSの有無（true, false）
  jQuery: false, //jQueryの有無（true, false）
  imagemin: {
    jpg: false, //JPEG画質（Number, false）
    png: false //PNG画質（Array, false）
  }
}


/**
 * ファイルパス
 */
const filePath = {
  html: {
    src: `../src/${WORKSPACE}/${PJ}/`,
    dist: `../dist/${WORKSPACE}/${PJ}/`
  },
  ejs: {
    src: `../src/${WORKSPACE}/${PJ}/templates/`,
    dist: `../dist/${WORKSPACE}/${PJ}/`
  },
  style: {
    src: `../src/${WORKSPACE}/${PJ}/assets/org/sass/`,
    dist: `../dist/${WORKSPACE}/${PJ}/assets/css/`
  },
  script: {
    src: `../src/${WORKSPACE}/${PJ}/assets/org/js/`,
    dist: `../dist/${WORKSPACE}/${PJ}/assets/js/`
  },
  img: {
    src: `../src/${WORKSPACE}/${PJ}/assets/images/`,
    dist: `../dist/${WORKSPACE}/${PJ}/assets/images/`
  },
  video: {
    src: `../src/${WORKSPACE}/${PJ}/assets/video/`,
    dist: `../dist/${WORKSPACE}/${PJ}/assets/video/`
  },
  other: {
    src: [
      `../src/${WORKSPACE}/${PJ}/!(assets|templates)**/*`,
      `../src/${WORKSPACE}/index.php`
    ],
    // dist: `../dist/`
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
  rootDir: WORKSPACE,
  projectDir: PJ,
  browserSync,
  use,
  filePath,
  html
}