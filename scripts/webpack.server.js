const path = require('path')
const merge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.js')

const config = {
  target: 'node',
  mode: 'production',
  entry: path.resolve(__dirname, '../app/index.js'),
  externals: [webpackNodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build')
  }
}

module.exports = merge(baseConfig, config)
