var path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './'
  },
}