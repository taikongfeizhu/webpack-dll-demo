import React from 'react'
import { injectStore } from 'store'

// inject saga & reducer in store
export const injector = (store, key = 'welcome') => {
  const modules = require('./modules')
  injectStore(store, key, modules)
}

// lazy load component
export default () => import(/* webpackChunkName: "welcome" */ './container')
