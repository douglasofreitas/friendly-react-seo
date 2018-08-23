var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
      __bundle__: "'bundle.js'",
      __enviroment__: "'dev'"
    }),
    new CopyWebpackPlugin([
      { from:'index.html', to:'index.html' }
    ], {})
  ],
  node: {
    fs: "empty"
  }
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false",
      __bundle__: "'bundle.js'",
      __enviroment__: "'dev'"
    })
  ],
  node: {
    fs: "empty"
  }
}

module.exports = [browserConfig, serverConfig]