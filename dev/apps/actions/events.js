import { createAction } from 'redux-actions';
import { EVENT_TYPES } from '../constants/ActionTypes';
import { push, replace } from 'react-router-redux';

export const showNewOpportunityModal = createAction(EVENT_TYPES.SHOW_NEW_OPPORTUNITY_MODAL);
export const hideNewOpportunityModal = createAction(EVENT_TYPES.HIDE_NEW_OPPORTUNITY_MODAL);
export const showNewOpportunityHistory = createAction(EVENT_TYPES.SHOW_NEW_OPPORTUNITY_HISTORY);
export const hideNewOpportunityHistory = createAction(EVENT_TYPES.HIDE_NEW_OPPORTUNITY_HISTORY);

export const pushState = (url) => dispatch => {
  dispatch(push(url));
};

export const replaceState = (url) => dispatch => {
  dispatch(replace(url));
};
