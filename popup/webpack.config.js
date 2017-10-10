const path = require('path')
const merge = require('webpack-merge')

const common = require('../common/webpack.common')

module.exports = merge(common, {
  //entry: ['./popup/src/index.js'],
  entry: [path.join(__dirname, './src/index.js')],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'popup.js',
  },
})
