const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundlePlugin = require('webpack-bundle-analyzer');
const autoprefixer = require('autoprefixer'); // 自动加前缀的插件
const lib = require('./config/lib.dependencies');

const BundleAnalyzerPlugin = BundlePlugin.BundleAnalyzerPlugin;

// 判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const __DEV__ = nodeEnv !== 'production';
console.log('当前运行环境：', __DEV__ ? 'development' : 'production');

// 是否使用preact
const __PREACT__ = false;

const externals = {
  axios: 'axios',
  react: 'React',
  redux: 'Redux',
  'react-dom': 'ReactDOM',
  'react-redux': 'ReactRedux',
  'react-router-dom': 'ReactRouterDOM',
  'prop-types': 'PropTypes'
};

module.exports = {
  cache: true,
  context: path.resolve(__dirname, './src'),
  devtool: false, // 生产环境不需要调试sourcemap
  entry: {
    index: [
      './index.js' // 生产环境只需要app的入口文件

    ],
    vendor: lib
  },
  output: {
    filename: 'js/[name].[hash:12].js',
    // 输出的打包文件
    path: path.join(__dirname, 'dist'),
    // 项目输出路径
    publicPath: '/dist/', // 生产环境需要制定上线的目录路径
    chunkFilename: 'js/[name].[chunkhash].js',
    // 从外部拉取资源
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader?cacheDirectory'
        ],
        exclude: /^node_modules$/
      },
      {
        test: /\.css$/,
        // 生产环境下将css打包成独立文件
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    autoprefixer
                  ];
                }
              }
            }
          ]
        }),
        exclude: /^node_modules$/
      },
      {
        test: /\.less$/,
        // 生产环境下将node_modules less打包成独立文件
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    autoprefixer
                  ];
                }
              }
            },
            'less-loader'
          ]
        }),
        include: /node_modules/
      },
      {
        // 生产环境下将工程中的less打包成独立文件
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    autoprefixer
                  ];
                }
              }
            },
            'less-loader'
          ]
        }),
        exclude: /node_modules/
      },

      {
        test: /favicon\.png$/,
        use: [
          {
            // 使用file-loader
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ],
        exclude: /^node_modules$/
      },
      {
        // 匹配.html文件
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href']
            }
          }
        ],
        exclude: /^node_modules$/
      },
      {
        // 处理静态资源
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.bundle\.js$/,
        include: /(src)/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'bundle-loader',
          options: {
            name: 'app-[name]',
            lazy: true
          }
        }, {
          loader: 'babel-loader'
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.jsx', '.js', '.less', '.json'],
    alias: {
      actions: path.resolve(__dirname, 'src/actions'),
      views: path.resolve(__dirname, 'src/views'),
      constant: path.resolve(__dirname, 'src/constant'),
      static: path.resolve(__dirname, 'src/static'),
      routes: path.resolve(__dirname, 'src/routes'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      api: path.resolve(__dirname, 'src/api'),
      utils: path.resolve(__dirname, 'src/utils'),
      store: path.resolve(__dirname, 'src/store'),
      react: __PREACT__ ? 'preact-compat/dist/preact-compat' : 'react',
      'react-dom': __PREACT__ ? 'preact-compat/dist/preact-compat' : 'react-dom',
      'create-react-class': __PREACT__ ? 'preact-compat/lib/create-react-class' : 'create-react-class'
    }
  },

  externals: {},

  plugins: [
    // 添加系统全局变量
    new webpack.DefinePlugin({ // 编译成生产版本
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 压缩时去掉js所有注释，包括copyright信息。
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: 'vendor'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      chunks: ['manifest', 'vendor', 'index'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),

    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /(en-gb|zh-cn).js/
    ),

    // 配置打包后的样式文件名称
    new ExtractTextPlugin({ filename: 'css/[name].[contenthash].css', allChunks: true, disable: false }),

    // 可视化分析工具
    new BundleAnalyzerPlugin()

  ]
};
