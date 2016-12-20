var path = require('path');
var os = require('os');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var UglifyJsParallelPlugin= require('webpack-uglify-parallel');
var Visualizer = require('webpack-visualizer-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var path = require('path');

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?v=[chunkhash:8]'),
    chunkFilename: utils.assetsPath('js/chunk.[id].js?v=[chunkhash:8]')
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      '__ENV__': env,
      'process.env': env.NODE_ENV
    }),
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: true,
        drop_console: false,
        drop_debugger:true
      },
      sourceMap: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[contenthash:8]')),
    // webpack dllplugin
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(config.build.dll.manifest),
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'app'],
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, config.build.dll.fileName),
        outputPath: path.join(config.build.dll.outputPath),
        publicPath: path.join(config.build.dll.publicPath),
        includeSourcemap: true
      }
    ]),
    new Visualizer({
      filename: path.join('..', 'dist', 'statistics.html')
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
