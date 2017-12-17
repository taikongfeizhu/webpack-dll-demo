import React from 'react'
import { injectReducer } from './reducers'
import { injectSagas } from './sagas'

export const injectStore = function (store, key, modules) {
  const reducer = modules.default
  const sagas = modules.sagas
  injectReducer(store, { key, reducer })
  injectSagas(store, { key, sagas })
}

export default injectStore
