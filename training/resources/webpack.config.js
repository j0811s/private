const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");

const util = require('./config');
const entryPath = `${util.filePath.script.src}**/*.js`;
const entryReactPath = `${util.filePath.script.src}**/*.jsx`;
const ignorePath = `${util.filePath.script.src}**/_*.js`;
const ignoreReactPath = `${util.filePath.script.src}**/_*.jsx`;
const distPath = `${__dirname}/${util.filePath.script.dist}`;
const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, entryPath), path.resolve(__dirname, entryReactPath)],
  { ignore: [path.resolve(__dirname, ignorePath), path.resolve(__dirname, ignoreReactPath)] })();

/**
 * 基本的な設定値
 */
const baseOption = {
  mode: 'production',
  entry: entries,
  output: {
    filename: '[name].js',
    path: distPath
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      npms: process.cwd() + '/node_modules',
      module: process.cwd() + '/modules'
    }
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
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
      }
    ]
  },
  plugins: [
    new WebpackWatchedGlobEntries(),
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules'
    }),
  ],
  target: ['web', 'es5']
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