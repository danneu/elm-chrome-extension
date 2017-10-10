const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const common = require('../common/webpack.common')

module.exports = merge(common, {
  //entry: ['./content/src/index.js'],
  entry: [path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'content.js',
  },
  plugins: [new ExtractTextPlugin('content.css')],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
    ],
  },
})
