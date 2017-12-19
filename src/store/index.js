import { injectReducer } from './reducers';
import { injectSagas } from './sagas';

export const injectStore = (store, key, modules) => {
  const reducer = modules.default;
  const sagas = modules.sagas;
  injectReducer(store, { key, reducer });
  injectSagas(store, { key, sagas });
};

export default injectStore;
