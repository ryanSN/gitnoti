const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
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
