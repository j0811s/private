const util = require('./project');

// 各種設定
module.exports = {
  filePath: {
    html: {
      src: `../src/${util.rootDir}/${util.projectDir}/`,
      dist: `../dist/${util.rootDir}/${util.projectDir}/`
    },
    ejs: {
      src: `../src/${util.rootDir}/${util.projectDir}/templates/`,
      dist: `../dist/${util.rootDir}/${util.projectDir}/`
    },
    style: {
      src: `../src/${util.rootDir}/${util.projectDir}/assets/org/sass/`,
      dist: `../dist/${util.rootDir}/${util.projectDir}/assets/css/`
    },
    script: {
      src: `../src/${util.rootDir}/${util.projectDir}/assets/org/js/`,
      dist: `../dist/${util.rootDir}/${util.projectDir}/assets/js/`
    },
    img: {
      src: `../src/${util.rootDir}/${util.projectDir}/assets/images/`,
      dist: `../dist/${util.rootDir}/${util.projectDir}/assets/images/`
    },
    video: {
      src: `../src/${util.rootDir}/${util.projectDir}/assets/video/`,
      dist: `../dist/${util.rootDir}/${util.projectDir}/assets/video/`
    }
  },
  browserSyncOption: {
    port: util.browserSync.port,
    baseDir: util.browserSync && util.browserSync.baseDir ? `../dist/${util.browserSync.baseDir}/` : `../dist/${util.rootDir}/${util.projectDir}/`
  },
  use: {
    ejs: util.use.ejs,
    jQuery: util.use.jQuery,
    imagemin: {
      jpg: util.use.imagemin.jpg,
      png: util.use.imagemin.png
    }
  }
}