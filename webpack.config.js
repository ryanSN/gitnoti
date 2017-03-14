const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('./dist/css/main.css')

const ignore = new webpack.IgnorePlugin(new RegExp('^(fs|ipc)$'))

module.exports = {
  entry: ['whatwg-fetch', './src/app'],
  target: 'electron-main',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },
  plugins: [
    extractCSS
  ]
}
