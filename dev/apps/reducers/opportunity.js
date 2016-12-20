import Immutable, { List } from 'immutable';
import { OPPORTUNITY } from '../constants/ActionTypes';
import { handleActions } from 'redux-actions';
import OpportunityList from '../model/OpportunityList';

const initialState = Immutable.fromJS({
  opportunityListData: List(),
  statusMsg: '',
  fetching: false,
  opportunityRequestTotal: 0,
  opportunityListTotal: 0,
  untrackedCount: 0,
  max: 0,
  num: 0,
  once: 0,
  trackingCount: 0,
  dealedCount: 0,
  allCount: 0,
  opportunityRemarkTotal: 0,
  opportunityHistoryListData: List(),
  historyMsg: '',
  callStatus: '',
  opportunitySource: List(),
  opportunityUnholdReason: List(),
  trackingHistoryType: List()
});

export default handleActions({

  [OPPORTUNITY.RECEIVE_FETCHING](state, action) {
    return state.merge({ fetching: action.payload.fetching });
  },

  [OPPORTUNITY.RECEIVE_OPPORTUNITY_LIST](state, action) {
    return state.merge({
      opportunityListData: OpportunityList.fromJS(action.payload.json.data),
      opportunityListTotal: action.payload.json.total,
      untrackedCount: action.payload.json.untracked_count,
      trackingCount: action.payload.json.tracking_count,
      dealedCount: action.payload.json.dealed_count,
      allCount: action.payload.json.all_count,
      fetching: action.payload.fetching
    });
  },
  [OPPORTUNITY.RECEIVE_REQUST_OPPORTUNITY](state, action) {
    return state.merge({ opportunityRequestTotal: action.payload.json.total });
  },
  [OPPORTUNITY.RECEIVE_GET_OPPORTUNITY_NUM](state, action) {
    return state.merge({
      max: action.payload.json.max,
      num: action.payload.json.num,
      once: action.payload.json.once
    });
  },
  [OPPORTUNITY.RECEIVE_OPPORTUNITY_STATUS_SUBMIT](state, action) {
    return state.merge({ statusMsg: action.payload.json.msg });
  },
  [OPPORTUNITY.RECEIVE_OPPORTUNITY_HISTORY_LIST](state, action) {
    return state.merge({ opportunityHistoryListData: action.payload.json });
  },
  [OPPORTUNITY.RECEIVE_OPPORTUNITY_HISTORY_SUBMIT](state, action) {
    return state.merge({ historyMsg: action.payload.json.msg });
  },
  [OPPORTUNITY.RECEIVE_OPPORTUNITY_SUBMIT](state, action) {
    return state.merge({ approvalSubmitTips: action.payload.json.success });
  },
  [OPPORTUNITY.RECEIVE_MAKE_CALL](state, action) {
    return state.merge({ callStatus: action.payload.json });
  },
  [OPPORTUNITY.RECEIVE_OPPORTUNITY_SOURCE](state, action) {
    return state.merge({ opportunitySource: action.payload.json });
  },
  [OPPORTUNITY.RECEIVE_OPPORTUNITY_UNHOLD_REASON](state, action) {
    return state.merge({ opportunityUnholdReason: action.payload.json });
  },
  [OPPORTUNITY.RECEIVE_TRACKING_HISTORY_TYPE](state, action) {
    return state.merge({ trackingHistoryType: action.payload.json });
  }
}, initialState);
