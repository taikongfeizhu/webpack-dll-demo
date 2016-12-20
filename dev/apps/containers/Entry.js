import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOpportunityList, submitOpportunity, requestOpportunity, submitOpportunityStatus,
  getOpportunityHistoryList, submitOpportunityHistory, getOpportunityNum, getMakeCall, getOpportunitySource,
  getOpportunityUnholdReason, getTrackingHistoryType } from '../actions/opportunity';
import Entry from '../components/Entry';
import { showNewOpportunityModal, hideNewOpportunityModal } from '../actions/events';

const mapStateToProps = state => {
  return {
    fetching: state.opportunity.get('fetching'),
    opportunityListData: state.opportunity.get('opportunityListData'),
    statusMsg: state.opportunity.get('statusMsg'),
    opportunityRequestTotal: state.opportunity.get('opportunityRequestTotal'),
    opportunityListTotal: state.opportunity.get('opportunityListTotal'),
    untrackedCount: state.opportunity.get('untrackedCount'),
    max: state.opportunity.get('max'),
    num: state.opportunity.get('num'),
    once: state.opportunity.get('once'),
    trackingCount: state.opportunity.get('trackingCount'),
    dealedCount: state.opportunity.get('dealedCount'),
    allCount: state.opportunity.get('allCount'),
    opporrunityRemarkTotal: state.opportunity.get('opporrunityRemarkTotal'),
    opportunityHistoryListData: state.opportunity.get('opportunityHistoryListData'),
    historyMsg: state.opportunity.get('historyMsg'),
    routing: state.routing.locationBeforeTransitions,
    newOpportunityModalVisible: state.events.newOpportunityModalVisible,
    callStatus: state.opportunity.get('callStatus'),
    opportunitySource: state.opportunity.get('opportunitySource'),
    opportunityUnholdReason: state.opportunity.get('opportunityUnholdReason'),
    trackingHistoryType: state.opportunity.get('trackingHistoryType')
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getOpportunityList,
    submitOpportunity,
    showNewOpportunityModal,
    hideNewOpportunityModal,
    requestOpportunity,
    submitOpportunityStatus,
    getOpportunityHistoryList,
    submitOpportunityHistory,
    getOpportunityNum,
    getMakeCall,
    getOpportunitySource,
    getOpportunityUnholdReason,
    getTrackingHistoryType
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
