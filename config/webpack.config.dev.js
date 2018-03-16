const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'electron',
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, '..', './client/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', './static')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/fonts/[name].[ext]&publicPath=static'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    })
  ]
}
