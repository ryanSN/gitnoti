const webpack = require('webpack')
const path = require('path')

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
      }
    ]
  },
  plugins: [ignore]
}
