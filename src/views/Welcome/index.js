import React from 'react'
import { injectStore } from 'store'

export default {
  lazyComp: () => import(/* webpackChunkName: "welcome" */ './container'),

  injector: (store, key = 'welcome') => {
    const modules = require('./modules')
    injectStore(store, key, modules)
  },
}
