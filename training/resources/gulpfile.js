/**
 * 定義ファイル
 */
const util = require('./config');

const fs = require('fs');

/**
 * gulpプラグイン
 */
const { src, dest, watch, parallel, series } = require('gulp');
const $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'gulp.*',
    'autoprefixer',
    'browser-sync',
    'imagemin-*'
  ]
});

// PHP
const connect = require('gulp-connect-php');

//node-sassだとNode最新バージョンでエラーが出るためDarSassにすること
const dartSass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-glob-use-forward');

/**
 * webpack関係
 */
const webpack = require("webpack");
const webpackStream = require("webpack-stream"); 
const webpackConfig = require("./webpack.config");


/**
 * CSS出力
 */
const css = done => {
  src(`${util.filePath.style.src}!(_)*.scss`)
  .pipe($.plumber())
  .pipe(sassGlob())
  .pipe(dartSass.sync().on('error', dartSass.logError))
  .pipe(dartSass.sync({ outputStyle: 'expanded' }))
  .pipe($.replace(/@charset "UTF-8";/g, ''))
  .pipe($.header('@charset "UTF-8";\n\n'))
  .pipe($.postcss([ $.autoprefixer({cascade: false, grid: true}) ]))
  .pipe($.cleanCss())
  .pipe(dest(util.filePath.style.dist));

  done();
}


/**
 * JS出力
 */
const js = () => {
  return webpackStream(webpackConfig, webpack)
  .pipe(dest(util.filePath.script.dist));
}


/**
 * EJS出力
 */
const ejs = done => {
  src(`${util.filePath.ejs.src}**/!(_)*.ejs`)
  .pipe($.ejs({}, {}, {ext: '.html'}))
  .pipe($.rename({extname:'.html'}))
  .pipe($.htmlmin(util.html.option))
  .pipe(dest(util.filePath.ejs.dist));

  done();
}


/**
 * HTML出力(ejs無しパターン)
 */
const html = done => {
  src(`${util.filePath.html.src}**/*.html`)
  .pipe($.htmlmin(util.html.option))
  .pipe(dest(util.filePath.html.dist));

  done();
}


/**
 * 画像出力
 */
const img = done => {
  if ((util.use.imagemin.jpg || util.use.imagemin.png) !== false) {
    const isUseBool = [util.use.imagemin.jpg, util.use.imagemin.png];
    const minOption = [
      $.imageminMozjpeg({
        quality: util.use.imagemin.jpg
      }),
      $.imageminPngquant({
        quality: util.use.imagemin.png,
        speed: 1
      })
    ];
    isUseBool.some((option, i) => option === false ? minOption.splice(i, 1) : minOption);
  
    src(`${util.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`)
    .pipe($.changed(`${util.filePath.img.dist}`))
    .pipe($.imagemin(minOption))
    .pipe(dest(`${util.filePath.img.dist}`));
  } else {
    src(`${util.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`)
    .pipe($.changed(`${util.filePath.img.dist}`))
    .pipe(dest(`${util.filePath.img.dist}`));
  }

  done();
}


/**
 * 動画出力
 */
const video = done => {
  src(`${util.filePath.video.src}**/*.mp4`)
  .pipe($.changed(`${util.filePath.video.dist}`))
  .pipe(dest(`${util.filePath.video.dist}`));
  done();
}


/**
 * その他の出力ファイル
 */
const otherFiles = done => {
  if (util.filePath.other.src.length > 0) {
    src(util.filePath.other.src, {
      base: '../src'
    })
    .pipe($.changed(`${util.filePath.other.dist}`))
    .pipe(dest(`${util.filePath.other.dist}`));
  }
  done();
}


 /**
  * ブラウザシンク
  */
const browser = done => {
  if (util.browserSyncOption.proxy) {
    connect.server({
      port: util.browserSyncOption.port,
      base: util.browserSyncOption.baseDir,
    }, function (){
      $.browserSync.init({
        open: 'external',
        proxy: {
          target: util.browserSyncOption.proxy, 
        },
        reloadOnRestart: true,
      });
    })
  } else {
    $.browserSync.init({
      port: util.browserSyncOption.port,
      open: 'external',
      server: {
        baseDir: util.browserSyncOption.baseDir,
        index: util.browserSyncOption.index,
        https: util.browserSyncOption.https
      },
      reloadOnRestart: true,
    });
  }

  done();
}
const browserReload = done =>  {
  $.browserSync.reload();
  done();
}


/**
 * ファイル監視
 */
const watchFiles = done => {
  //html
  if (util.use.ejs) {
    watch(`${util.filePath.ejs.src}**/*.ejs`, series(ejs, browserReload));
  } else {
    watch(`${util.filePath.html.src}**/*.html`, series(html, browserReload));
  }
  
  //css
  watch(`${util.filePath.style.src}**/*.scss`, series(css, browserReload));

  //js
  watch(`${util.filePath.script.src}**/*.js`, series(js, browserReload));

  //img
  watch(`${util.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`, series(img, browserReload));

  //video
  watch(`${util.filePath.video.src}**/*.mp4`, series(video, browserReload));

  //otherFiles
  if (util.filePath.other.src.length > 0) {
    watch(util.filePath.other.src, series(otherFiles, browserReload));
  }

  done();
};


/**
 * 実行
 */
exports.default = parallel(browser, watchFiles);
exports.build = parallel(util.use.ejs ? ejs : html, css, js, img, video, otherFiles);
exports.server = browser;