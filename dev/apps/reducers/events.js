import { handleActions } from 'redux-actions';
import { EVENT_TYPES } from '../constants/ActionTypes';

const initialState = {
  newOpportunityModalVisible: false,
  newOpportunityHistoryVisible: false
};

export default handleActions({
  [EVENT_TYPES.SHOW_NEW_OPPORTUNITY_MODAL](state) {
    return Object.assign({}, state, { newOpportunityModalVisible: true });
  },
  [EVENT_TYPES.HIDE_NEW_OPPORTUNITY_MODAL](state) {
    return Object.assign({}, state, { newOpportunityModalVisible: false });
  }
}, initialState);
