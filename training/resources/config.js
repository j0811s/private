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
  html: `../src/${PJ.workspace}/${PJ.projectDir}/`,
  ejs: `../src/${PJ.workspace}/${PJ.projectDir}/templates/`,
  wordpress: [],
  css: `../src/${PJ.workspace}/${PJ.projectDir}/assets/org/sass/`,
  js: `../src/${PJ.workspace}/${PJ.projectDir}/assets/org/js/`,
  img: `../src/${PJ.workspace}/${PJ.projectDir}/assets/images/`,
  video: `../src/${PJ.workspace}/${PJ.projectDir}/assets/video/`,
  other: []
}

const dist = {
  html: `../dist/${PJ.workspace}/${PJ.projectDir}/`,
  ejs: `../dist/${PJ.workspace}/${PJ.projectDir}/`,
  wordpress: `../dist/`,
  css: `../dist/${PJ.workspace}/${PJ.projectDir}/assets/css/`,
  js: `../dist/${PJ.workspace}/${PJ.projectDir}/assets/js/`,
  img: `../dist/${PJ.workspace}/${PJ.projectDir}/assets/images/`,
  video: `../dist/${PJ.workspace}/${PJ.projectDir}/assets/video/`,
  other: `../dist/`
}


const browserSyncBaseDir = `../dist/${PJ.workspace}/${PJ.projectDir}/`;
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
        baseDir: get(PJ, 'browserSync.server.baseDir', `../dist/${PJ.workspace}/${PJ.projectDir}`)
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

const html = {
  minify: extend(htmlmin, PJ.html?.minify)
}


/**
 * 設定値
 */
module.exports = {
  filePath: {
    html: {
      src: get(PJ, 'filePath.html.src', src.html),
      dist: get(PJ, 'filePath.html.dist', dist.html)
    },
    ejs: {
      src: get(PJ, 'filePath.ejs.src', src.ejs),
      dist: get(PJ, 'filePath.ejs.dist', dist.ejs)
    },
    wordpress: {
      src: get(PJ, 'filePath.wordpress.src', src.wordpress),
      dist: get(PJ, 'filePath.wordpress.dist', dist.wordpress) 
    },
    css: {
      src: get(PJ, 'filePath.css.src', src.css),
      dist: get(PJ, 'filePath.css.dist', dist.css)
    },
    js: {
      src: get(PJ, 'filePath.js.src', src.js),
      dist: get(PJ, 'filePath.js.dist', dist.js)
    },
    img: {
      src: get(PJ, 'filePath.img.src', src.img),
      dist: get(PJ, 'filePath.img.dist', dist.img)
    },
    video: {
      src: get(PJ, 'filePath.video.src', src.video),
      dist: get(PJ, 'filePath.video.dist', dist.video)
    },
    other: {
      src: get(PJ, 'filePath.other.src', src.other),
      dist: get(PJ, 'filePath.other.dist', dist.other)
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
  html: {
    option: get(PJ, 'html.minify', html.minify)
  }
}