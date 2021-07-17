const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const util = require('./config');
const entryPath = `${util.filePath.script.src}index.js`;
const distPath = `${__dirname}/${util.filePath.script.dist}`;

/**
 * 基本的な設定値
 */
const baseOption = {
  mode: 'production',
  entry: {
    index: entryPath
  },
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
      npms: process.cwd() + '/node_modules'
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
  plugins: [],
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