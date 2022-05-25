const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");

const config = require('./config');
const minify = !!config.minify.js;
const entryPath = `${config.filePath.js.src}**/*.js`;
const entryReactPath = `${config.filePath.js.src}**/*.jsx`;
const ignorePath = `${config.filePath.js.src}**/_*.js`;
const ignoreReactPath = `${config.filePath.js.src}**/_*.jsx`;
const distPath = `${__dirname}/${config.filePath.js.dest}`;
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
    minimize: minify,
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
if (config.use.jQuery) option = Object.assign(baseOption, { plugins : [ usejQuery ]});

module.exports = option;