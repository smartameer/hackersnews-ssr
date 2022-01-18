const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, '../app/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  devtool: 'inline-source-map'
}

module.exports = merge(baseConfig, config)
