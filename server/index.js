/**
 * Created by huangjian on 2017/8/22.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const errorOverlayMiddleware = require('react-error-overlay/middleware');
const config = require('../webpack.config');
const path = require('path');
const proxy = require('http-proxy-middleware');

const client = path.resolve(__dirname, '../src');

const server = new WebpackDevServer(webpack(config), {
  hot: true,
  host: '0.0.0.0',
  compress: true,
  historyApiFallback: {
    index: '/',
    disableDotRule: true,
  },
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  disableHostCheck: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    modules: false,
    colors: true,
    chunks: false
  },
  before(app) {
    app.use(errorOverlayMiddleware());
    if (process.env.NODE_ENV !== 'production') {
      app.use('/book/*', proxy({
        target: 'https://www.easy-mock.com/mock/593611b991470c0ac101d474',
        secure: false
      }));
    }
  }
});

// 将其他路由，全部返回index.html
server.app.get('*', (req, res) => {
  res.sendFile(`${client}/index.html`);
});

module.exports = server;
