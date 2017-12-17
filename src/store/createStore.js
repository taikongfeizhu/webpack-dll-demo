import {createStore, applyMiddleware, compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const __DEV__ = nodeEnv === 'development'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const history = createHistory()
  const historyMiddleware = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, thunk, historyMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncSagas = {}
  store.asyncReducers = {}
  store.runSaga = (saga) => {
    sagaMiddleware.run(saga)
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
