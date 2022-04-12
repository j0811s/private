const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const util = require('./config');
const entryPath = `${util.filePath.script.src}**/*.js`;
const ignorePath = `${util.filePath.script.src}**/_*.js`;
const distPath = `${__dirname}/${util.filePath.script.dist}`;
const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, entryPath)], {
  ignore: path.resolve(__dirname, ignorePath),
})();

/**
 * 基本的な設定値
 */
const baseOption = {
  mode: 'production',
  entry: entries,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: { comments: false },
        },
        extractComments: false, //license.txt 出力無
      }),
    ],
  },
  resolve: {
    alias: {
      npms: process.cwd() + '/node_modules',
      module: process.cwd() + '/modules'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        test: /node_modules\/(.+)\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
    ]
  },
  plugins: [
    new WebpackWatchedGlobEntries()
  ],
  output: {
    filename: '[name].js',
    path: distPath
  }
}

/**
 * jQuery
 */
const usejQuery = new webpack.ProvidePlugin({
  $: 'npms/jquery',
  jQuery: 'jquery'
});



/**
 * オプションをエクスポート
 */
let option = baseOption;

//jQueryを利用する場合
if (util.use.jQuery) option = Object.assign(baseOption, { plugins : [ usejQuery ]});

module.exports = option;