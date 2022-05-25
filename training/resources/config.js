/**
 * function
 */
const extend = require('./utility/extend');
const get = require('./utility/get');
const connectSSI = require('connect-ssi');


/**
 * option
 */
const PJ = require('./project');
const htmlmin = require('./config/html');


/**
 * 既定値
 */
const src = {
  html: `../htdocs/${PJ.workspace}/${PJ.projectDir}/`,
  ejs: `../htdocs/${PJ.workspace}/${PJ.projectDir}/templates/`,
  wordpress: [],
  css: `../htdocs/${PJ.workspace}/${PJ.projectDir}/assets/org/sass/`,
  js: `../htdocs/${PJ.workspace}/${PJ.projectDir}/assets/org/js/`,
  img: `../htdocs/${PJ.workspace}/${PJ.projectDir}/assets/images/`,
  other: []
}

const dest = {
  html: `../htdocs/${PJ.workspace}/${PJ.projectDir}/`,
  ejs: `../htdocs/${PJ.workspace}/${PJ.projectDir}/`,
  wordpress: `../htdocs/`,
  css: `../htdocs/${PJ.workspace}/${PJ.projectDir}/assets/css/`,
  js: `../htdocs/${PJ.workspace}/${PJ.projectDir}/assets/js/`,
  img: `../htdocs/${PJ.workspace}/${PJ.projectDir}/assets/images/`,
  other: `../htdocs/`
}


const browserSyncBaseDir = `../htdocs/${PJ.workspace}/${PJ.projectDir}/`;
const browserSyncBaseOption = {
  proxy: undefined,
  port: '3000',
  open: 'external',
  https: false,
  server: {
    baseDir: browserSyncBaseDir,
    index: 'index.html',
    middleware: [
      connectSSI({
        ext: '.html',
        baseDir: get(PJ, 'browserSync.server.baseDir', `../htdocs/${PJ.workspace}/${PJ.projectDir}`)
      })
    ]
  },
  reloadOnRestart: true,
  files: [
    `${browserSyncBaseDir}**/*.html`,
    `${browserSyncBaseDir}**/*.php`,
    `${browserSyncBaseDir}**/*.css`,
    `${browserSyncBaseDir}**/*.js`,
  ]
}
extend(browserSyncBaseOption, PJ.browserSync);

const browserSyncProxyOption = {
  https: true,
  open: 'external',
  proxy: PJ.browserSync.proxy,
  reloadOnRestart: true,
  files: [
    `${browserSyncBaseDir}**/*.html`,
    `${browserSyncBaseDir}**/*.php`,
    `${browserSyncBaseDir}**/*.css`,
    `${browserSyncBaseDir}**/*.js`,
  ]
}

const browserSyncOption = PJ.browserSync.proxy ? browserSyncProxyOption : browserSyncBaseOption;


const use = {
  ejs: true,
  jQuery: false,
  imagemin: {
    jpg: false, //ex. 80
    png: false //ex. [.70, .80]
  }
}


const minify = {
  html: true,
  css: true,
  js: true,
}


/**
 * 設定値
 */
module.exports = {
  filePath: {
    html: {
      src: get(PJ, 'filePath.html.src', src.html),
      dest: get(PJ, 'filePath.html.dest', dest.html)
    },
    ejs: {
      src: get(PJ, 'filePath.ejs.src', src.ejs),
      dest: get(PJ, 'filePath.ejs.dest', dest.ejs)
    },
    wordpress: {
      src: get(PJ, 'filePath.wordpress.src', src.wordpress),
      dest: get(PJ, 'filePath.wordpress.dest', dest.wordpress) 
    },
    css: {
      src: get(PJ, 'filePath.css.src', src.css),
      dest: get(PJ, 'filePath.css.dest', dest.css)
    },
    js: {
      src: get(PJ, 'filePath.js.src', src.js),
      dest: get(PJ, 'filePath.js.dest', dest.js)
    },
    img: {
      src: get(PJ, 'filePath.img.src', src.img),
      dest: get(PJ, 'filePath.img.dest', dest.img)
    },
    other: {
      src: get(PJ, 'filePath.other.src', src.other),
      dest: get(PJ, 'filePath.other.dest', dest.other)
    }
  },
  browserSyncOption,
  use: {
    ejs: get(PJ, 'use.ejs', use.ejs),
    jQuery: get(PJ, 'use.jQuery', use.jQuery),
    imagemin: {
      jpg: get(PJ, 'use.imagemin.jpg', use.imagemin.jpg),
      png: get(PJ, 'use.imagemin.png', use.imagemin.png),
    }
  },
  minify: {
    html: get(PJ, 'minify.html', minify.html) == true ? htmlmin : false,
    css: get(PJ, 'minify.css', minify.css),
    js: get(PJ, 'minify.js', minify.js)
  }
}