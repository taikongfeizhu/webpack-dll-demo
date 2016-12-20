import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import fetch from '../middleware/redux-fetch';
import route from '../middleware/redux-router';
import rootReducer from '../reducers'; // redux-thunk 支持 dispatch function，并且可以异步调用它

// 创建一个中间件集合
const middleware = [fetch, route, thunk];

const finalCreateStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    // 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}


export default finalCreateStore;
