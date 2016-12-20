import { combineReducers } from 'redux'; // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux'; // 将routerReducer一起合并管理
import opportunity from './opportunity';
import events from './events';

export default combineReducers({
  events,
  opportunity,
  routing: routerReducer
});
