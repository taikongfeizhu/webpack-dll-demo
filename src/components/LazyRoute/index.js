import React from 'react'
import AsyncComponent from './AsyncComponent'
import { Route } from 'react-router-dom'

const LazyRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return <AsyncComponent {...props} component={component} {...rest}/>
  }}/>
)

LazyRoute.AsyncComponet = AsyncComponent

export default LazyRoute
