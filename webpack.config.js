const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build')
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      }
    ]
  }
}
