const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const HappyThreadPool = HappyPack.ThreadPool({ size: 6 });
const webpackServerConfig = require('./server/server.config')
const lib = require('./config/lib.dependencies')

// 判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const __DEV__ = nodeEnv !== 'production'
console.log("当前运行环境：", __DEV__ ? 'development' : 'production')

// 是否使用preact
const __PREACT__ = false

// 区别path和 publicPath的作用
// path 用来存放打包后文件的输出目录
// publicPath 用来定义静态资源的引用地址

const externals = {
  axios: 'axios',
  react: 'React',
  redux: 'Redux',
  'react-dom': 'ReactDOM',
  'react-redux': 'ReactRedux',
  'react-router-dom': 'ReactRouterDOM',
  'prop-types': 'PropTypes'
}

module.exports = {
  cache: true,
  context: path.resolve(__dirname, './src'),
  devtool: '#source-map',
  entry: {
    index: [
      'react-hot-loader/patch',
      // 开启 React 代码的模块热替换(HMR)

      `webpack-dev-server/client?http://${webpackServerConfig.host}:${webpackServerConfig.port}`,
      // 为 webpack-dev-server 的环境打包代码
      // 然后连接到指定服务器域名与端口

      'webpack/hot/only-dev-server',
      // 为热替换(HMR)打包好代码
      // only- 意味着只有成功更新运行代码才会执行热替换(HMR)

      './index.js',
      // app 的入口文件
    ],
    vendor: lib,
  },
  output: {
    filename: 'js/[name].[hash:12].js',
    // 输出的打包文件
    path: path.join(__dirname, 'dist'),
    // 项目输出路径
    publicPath: 'http://127.0.0.1:3000/',
    // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
    chunkFilename: 'js/[name].[chunkhash].js',
    // 从外部拉取资源
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // use: ['babel-loader?cacheDirectory'],
        use: 'happypack/loader?id=jsx',
        exclude: /^node_modules$/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /^node_modules$/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
        include: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        // 匹配.html文件
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href'],
            },
          },
        ],
        exclude: /^node_modules$/,
      },
      {
        test: /favicon\.png$/,
        use: [
          {
            // 使用file-loader
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        ],
        exclude: /^node_modules$/,
      },
      {
        // 处理静态资源
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
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
          loader: 'babel-loader',
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.jsx', '.js', '.less', '.json'],
    alias: {
      "actions": path.resolve(__dirname, "src/actions"),
      "views": path.resolve(__dirname, "src/views"),
      "constant": path.resolve(__dirname, "src/constant"),
      "static": path.resolve(__dirname, "src/static"),
      "routes": path.resolve(__dirname, "src/routes"),
      "components": path.resolve(__dirname, "src/components"),
      "containers": path.resolve(__dirname, "src/containers"),
      "reducers": path.resolve(__dirname, "src/reducers"),
      "api": path.resolve(__dirname, "src/api"),
      "utils": path.resolve(__dirname, "src/utils"),
      "store": path.resolve(__dirname, "src/store"),
      'react': __PREACT__ ? 'preact-compat/dist/preact-compat': 'react',
      'react-dom': __PREACT__ ? 'preact-compat/dist/preact-compat' : 'react-dom',
      'create-react-class': __PREACT__? 'preact-compat/lib/create-react-class' : 'create-react-class'
    }
  },

  externals: {
    // axios: 'axios'
  },

  plugins: [
    // 将第三方库单独打包
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity
    }),
  
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: 'vendor'
    }),
    
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    // scope-hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HappyPack({
      id: 'jsx',
      threadPool: HappyThreadPool,
      loaders: [ 'babel-loader' ]
    }),
  
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /(en-gb|zh-cn).js/
    ),

    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      chunks:['manifest', 'vendor', 'index'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
  ]
}