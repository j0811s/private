/**
 * 定義ファイル
 */
const config = require('./config');

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
    'imagemin-*'
  ]
});

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
  src(`${config.filePath.css.src}!(_)*.{scss,css}`)
  .pipe($.plumber())
  .pipe(sassGlob())
  .pipe(dartSass.sync().on('error', dartSass.logError))
  .pipe(dartSass.sync({ outputStyle: 'expanded' }))
  .pipe($.replace(/@charset "UTF-8";/g, ''))
  .pipe($.header('@charset "UTF-8";\n\n'))
  .pipe($.postcss([ $.autoprefixer({cascade: false, grid: true}) ]))
  .pipe($.cleanCss())
  .pipe(dest(config.filePath.css.dist));

  done();
}


/**
 * JS出力
 */
const js = () => {
  return webpackStream(webpackConfig, webpack)
  .pipe(dest(config.filePath.js.dist));
}


/**
 * EJS出力
 */
const ejs = done => {
  src(`${config.filePath.ejs.src}**/!(_)*.ejs`)
  .pipe($.ejs({}, {}, {ext: '.html'}))
  .pipe($.rename({extname:'.html'}))
  .pipe($.htmlmin(config.html.option))
  .pipe(dest(config.filePath.ejs.dist));

  done();
}


/**
 * HTML出力(ejs無しパターン)
 */
const html = done => {
  src(`${config.filePath.html.src}**/*.html`)
  .pipe($.htmlmin(config.html.option))
  .pipe(dest(config.filePath.html.dist));

  done();
}


/**
* WordPress関連出力
*/
const wp = done => {
  if (config.filePath.wordpress.src.length > 0) {
    src(config.filePath.wordpress.src, { 
      base: '../src' 
    })
    .pipe($.changed(`${config.filePath.wordpress.dist}`))
    .pipe(dest(config.filePath.wordpress.dist));
  }
  done();
}


/**
 * 画像出力
 */
const img = done => {
  if ((config.use.imagemin.jpg || config.use.imagemin.png) !== false) {
    const isUseBool = [config.use.imagemin.jpg, config.use.imagemin.png];
    const minOption = [
      $.imageminMozjpeg({
        quality: config.use.imagemin.jpg
      }),
      $.imageminPngquant({
        quality: config.use.imagemin.png,
        speed: 1
      })
    ];
    isUseBool.some((option, i) => option === false ? minOption.splice(i, 1) : minOption);
  
    src(`${config.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`)
    .pipe($.changed(`${config.filePath.img.dist}`))
    .pipe($.imagemin(minOption))
    .pipe(dest(`${config.filePath.img.dist}`));
  } else {
    src(`${config.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`)
    .pipe($.changed(`${config.filePath.img.dist}`))
    .pipe(dest(`${config.filePath.img.dist}`));
  }

  done();
}


/**
 * 動画出力
 */
const video = done => {
  src(`${config.filePath.video.src}**/*.mp4`)
  .pipe($.changed(`${config.filePath.video.dist}`))
  .pipe(dest(`${config.filePath.video.dist}`));
  done();
}


/**
 * その他の出力ファイル
 */
const otherFiles = done => {
  if (config.filePath.other.src.length > 0) {
    src(config.filePath.other.src, {
      base: '../src'
    })
    .pipe($.changed(`${config.filePath.other.dist}`))
    .pipe(dest(`${config.filePath.other.dist}`));
  }
  done();
}


/**
 * ファイル監視
 */
const watchFiles = done => {
  //html
  if (config.use.ejs) {
    watch(`${config.filePath.ejs.src}**/*.ejs`, ejs);
  } else {
    watch(`${config.filePath.html.src}**/*.html`, html);
  }
  
  //css
  watch(`${config.filePath.css.src}**/*.scss`, css);

  //js
  watch(`${config.filePath.js.src}**/*.js`, js);

  //img
  watch(`${config.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`, img);

  //video
  watch(`${config.filePath.video.src}**/*.mp4`, video);

  //wordpress
  if (config.filePath.wordpress.src.length > 0) {
    watch(config.filePath.wordpress.src, wp);
  }

  //otherFiles
  if (config.filePath.other.src.length > 0) {
    watch(config.filePath.other.src, otherFiles);
  }

  done();
}


/**
 * 実行
 */
exports.default = watchFiles;
exports.build = parallel(config.use.ejs ? ejs : html, css, js, img, video, wp, otherFiles);