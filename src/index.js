import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import createStore from './store/createStore'
import App from './containers/EntryContainer'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const MOUNT_NODE = document.getElementById('root')

const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component store={store}/>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  )

render(App)

if(module.hot) {
  module.hot.accept('./containers/EntryContainer', () => {
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      const NextRootContainer = require('./containers/EntryContainer').default
      render(NextRootContainer)
    })
  })
}
