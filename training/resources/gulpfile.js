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
 * minifyフラグ
 */
const minify = {
  html: config.use.minify.html,
  css: !!config.use.minify.css
}


/**
 * HTML出力
 */
const html = done => {
  if (minify.html) {
    src(`${config.filePath.html.src}**/*.html`)
    .pipe($.htmlmin(minify.html))
    .pipe(dest(config.filePath.html.dest));
  } else {
    src(`${config.filePath.html.src}**/*.html`)
    .pipe(dest(config.filePath.html.dest));
  }

  done();
}


/**
 * EJS出力
 */
const ejs = done => {
  const _src = () => {
    return src(`${config.filePath.ejs.src}**/!(_)*.ejs`)
    .pipe($.ejs({}, {}, {ext: '.html'}))
    .pipe($.rename({extname:'.html'}))
  }

  if (minify.html) {
    _src()
    .pipe($.htmlmin(minify.html))
    .pipe(dest(config.filePath.ejs.dest));
  } else {
    _src()
    .pipe(dest(config.filePath.ejs.dest));
  }

  done();
}


/**
 * CSS出力
 */
 const css = done => {
   const _src = () => {
     return src(`${config.filePath.css.src}!(_)*.{scss,css}`)
     .pipe($.plumber())
     .pipe(sassGlob())
     .pipe(dartSass.sync().on('error', dartSass.logError))
     .pipe(dartSass.sync({ outputStyle: 'expanded' }))
     .pipe($.replace(/@charset "UTF-8";/g, ''))
     .pipe($.header('@charset "UTF-8";\n\n'))
     .pipe($.postcss([ $.autoprefixer({cascade: false, grid: true}) ]))
   }

   if (minify.css) {
    _src()
    .pipe($.cleanCss())
    .pipe(dest(config.filePath.css.dest));
   } else {
    _src()
    .pipe(dest(config.filePath.css.dest));
   }

  done();
}


/**
 * JS出力
 */
const js = () => {
  return webpackStream(webpackConfig, webpack)
  .pipe(dest(config.filePath.js.dest));
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
    .pipe($.changed(`${config.filePath.img.dest}`))
    .pipe($.imagemin(minOption))
    .pipe(dest(`${config.filePath.img.dest}`));
  } else {
    src(`${config.filePath.img.src}**/*.{png,jpg,svg,gif,jpeg,ico}`)
    .pipe($.changed(`${config.filePath.img.dest}`))
    .pipe(dest(`${config.filePath.img.dest}`));
  }

  done();
}


/**
 * その他の出力ファイル
 */
const otherFiles = done => {
  if (config.filePath.other.src.length > 0) {
    src(config.filePath.other.src, {
      base: '../htdocs'
    })
    .pipe($.changed(`${config.filePath.other.dest}`))
    .pipe(dest(`${config.filePath.other.dest}`));
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
exports.build = parallel(config.use.ejs ? ejs : html, css, js, img, otherFiles);