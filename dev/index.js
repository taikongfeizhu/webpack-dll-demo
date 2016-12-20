/**
 *  利用Provider可以使我们的 store 能为下面的组件所用
 *  Browser history 是由 React Router 创建浏览器应用推荐的 history
 *  利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
 *  引入store配置
 *  引入路由配置
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import withBasename from './apps/helper/withBasename';
import finalCreateStore from './apps/store/configureStore';
import routes from './apps/routes/routes';

// 页面基础样式
import 'less/index.less';

// 区分开发环境和生产环境
if (__ENV__ === 'development') {
  console.info('development env');
}

// 实例化configStore
const store = finalCreateStore();

// 给增强后的store传入reducer
if (module.hot) {
  module.hot.accept('./apps/reducers', () => {
    const nextRootReducer = require('./apps/reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
  module.hot.accept();
}

// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(browserHistory, store);

const baseName = '';

render(
  <Provider store={store}>
    <Router
      onUpdate={() => window.scrollTo(0, 0)}
      key={Math.random()}
      history={withBasename(history, baseName)} routes={routes}/>
  </Provider>,
  document.getElementById('mainBox')
);
