import React from 'react'
import AsyncComponent from './AsyncComponent'
import { Route } from 'react-router-dom'

const LazyRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const { lazyComp, injector = null } = component
    return <AsyncComponent {...props} component={lazyComp} injector={injector} {...rest}/>
  }}/>
)

LazyRoute.AsyncComponet = AsyncComponent

export default LazyRoute
