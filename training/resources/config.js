/**
 * function
 */
const extend = require('./utility/extend');
const get = require('./utility/get');


/**
 * option
 */
const PJ = require('./project');
const htmlmin = require('./config/html');


/**
 * 既定値
 */
const src = {
  html: `../src/${PJ.rootDir}/${PJ.projectDir}/`,
  ejs: `../src/${PJ.rootDir}/${PJ.projectDir}/templates/`,
  style: `../src/${PJ.rootDir}/${PJ.projectDir}/assets/org/sass/`,
  script: `../src/${PJ.rootDir}/${PJ.projectDir}/assets/org/js/`,
  img: `../src/${PJ.rootDir}/${PJ.projectDir}/assets/images/`,
  video: `../src/${PJ.rootDir}/${PJ.projectDir}/assets/video/`,
  // other: PJ.filePath?.other?.src
}

const dist = {
  html: `../dist/${PJ.rootDir}/${PJ.projectDir}/`,
  ejs: `../dist/${PJ.rootDir}/${PJ.projectDir}/`,
  style: `../dist/${PJ.rootDir}/${PJ.projectDir}/assets/css/`,
  script: `../dist/${PJ.rootDir}/${PJ.projectDir}/assets/js/`,
  img: `../dist/${PJ.rootDir}/${PJ.projectDir}/assets/images/`,
  video: `../dist/${PJ.rootDir}/${PJ.projectDir}/assets/video/`,
  // other: `../dist/${PJ.rootDir}/${PJ.projectDir}/`
}

const browserSync = {
  port: '8080',
  baseDir: `../dist/${PJ.rootDir}/${PJ.projectDir}/`
}

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
    style: {
      src: get(PJ, 'filePath.style.src', src.style),
      dist: get(PJ, 'filePath.style.dist', dist.style)
    },
    script: {
      src: get(PJ, 'filePath.script.src', src.script),
      dist: get(PJ, 'filePath.script.dist', dist.script)
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
      src: PJ.filePath?.other?.src,
      dist: '../dist/'
    }
  },
  browserSyncOption: {
    port: get(PJ, 'browserSync.port', browserSync.port),
    baseDir: get(PJ, 'browserSync.baseDir', browserSync.baseDir),
  },
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