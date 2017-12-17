import React from 'react'
import HomeContainer from './container'
import { injectStore } from 'store'

export default (store, key = 'detail') => (props) => {
  const modules = require('./modules')
  injectStore(store, key, modules)
  return (
    <HomeContainer {...props}/>
  )
}
