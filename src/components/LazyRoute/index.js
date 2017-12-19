import React from 'react';
import { Route } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';

const LazyRoute = ({ component, ...rest }) => (
  <Route {...rest}
    render={(props) => <AsyncComponent {...props} component={component} {...rest} />}
  />
);

export default LazyRoute;
