import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntryItem from '../components/EntryItem';
import { getOpportunityList } from '../actions/opportunity';

const mapStateToProps = state => {
  return {
    opportunityListData: state.opportunity.get('opportunityListData'),
    opportunityListTotal: state.opportunity.get('opportunityListTotal'),
    routing: state.routing.locationBeforeTransitions,
    fetching: state.opportunity.get('fetching')
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getOpportunityList,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryItem);
