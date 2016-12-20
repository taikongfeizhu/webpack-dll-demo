var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var path = require('path');
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // eval-source-map is for development
  // cheap-module-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: config.dev.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/chunk.[id].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      '__ENV__': config.dev.env.NODE_ENV
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // webpack dllplugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(config.dev.dll.manifest),
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: 'dependency',
      inject: true
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, config.dev.dll.fileName),
        outputPath: path.join(config.dev.dll.outputPath),
        publicPath: path.join(config.dev.dll.publicPath),
        includeSourcemap: true
      }
    ])
  ]
})