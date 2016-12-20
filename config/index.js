var path = require('path')
var distPath = path.resolve(__dirname, '..', 'dist');

module.exports = {
  build: {
    dll:{
      basePath: '../common/js',
      fileName: '../common/js/lib.js',
      manifest: '../common/js/manifest.json',
      outputPath: '/static/common/js',  // 生成目录
      publicPath: '/static/common/js'   // 注入地址
    },
    env: require('./prod.env'),
    index: path.resolve(distPath, 'templates/index.html'),
    assetsRoot: path.resolve(distPath),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    dll:{
      basePath: '../common/debug',
      fileName: '../common/debug/lib.js',
      manifest: '../common/debug/manifest.json',
      outputPath: '/static/common/debug',  // 生成目录
      publicPath: '/static/common/debug'   // 注入地址
    },
    env: require('./dev.env'),
    port: 3001,
    assetsRoot: path.resolve(distPath),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    staticPath: '../common',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
