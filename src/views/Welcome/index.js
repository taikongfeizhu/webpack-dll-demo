import { injectStore } from 'store';

const routeModule = {

  key: 'welcome',

  lazyComp: () => import(/* webpackChunkName: "welcome" */ './container'),

  injector: (store, key) => {
    const modules = require('./modules');
    injectStore(store, key, modules);
  }
};

export default routeModule;
