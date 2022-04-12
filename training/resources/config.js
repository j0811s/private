const util = require('./_util');
const pj = require('./project');
const html = require('./config/html');

// 各種設定
module.exports = {
  filePath: {
    html: {
      src: `../src/${pj.rootDir}/${pj.projectDir}/`,
      dist: `../dist/${pj.rootDir}/${pj.projectDir}/`
    },
    ejs: {
      src: `../src/${pj.rootDir}/${pj.projectDir}/templates/`,
      dist: `../dist/${pj.rootDir}/${pj.projectDir}/`
    },
    style: {
      src: `../src/${pj.rootDir}/${pj.projectDir}/assets/org/sass/`,
      dist: `../dist/${pj.rootDir}/${pj.projectDir}/assets/css/`
    },
    script: {
      src: `../src/${pj.rootDir}/${pj.projectDir}/assets/org/js/`,
      dist: `../dist/${pj.rootDir}/${pj.projectDir}/assets/js/`
    },
    img: {
      src: `../src/${pj.rootDir}/${pj.projectDir}/assets/images/`,
      dist: `../dist/${pj.rootDir}/${pj.projectDir}/assets/images/`
    },
    video: {
      src: `../src/${pj.rootDir}/${pj.projectDir}/assets/video/`,
      dist: `../dist/${pj.rootDir}/${pj.projectDir}/assets/video/`
    }
  },
  browserSyncOption: {
    port: pj.browserSync.port,
    baseDir: pj.browserSync && pj.browserSync.baseDir ? `../dist/${pj.browserSync.baseDir}/` : `../dist/${pj.rootDir}/${pj.projectDir}/`
  },
  use: {
    ejs: pj.use.ejs,
    jQuery: pj.use.jQuery,
    imagemin: {
      jpg: pj.use.imagemin.jpg,
      png: pj.use.imagemin.png
    }
  },
  html: {
    option: pj.html && pj.html.option ? util.extend(html.htmlmin, pj.html.option) : html.htmlmin
  }
}