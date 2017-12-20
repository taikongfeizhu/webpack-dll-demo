import React from 'react';
import { injectStore } from 'store';
import HomeContainer from './container';

export default (store, key = 'detail') => (props) => {
  const modules = require('./modules');
  injectStore(store, key, modules);
  return (
    <HomeContainer {...props} />
  );
};
