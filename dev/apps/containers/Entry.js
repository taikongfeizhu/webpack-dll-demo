import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Entry from '../components/Entry';
import { getOpportunityList } from '../actions/opportunity';

const mapStateToProps = state => {
  return {
    routing: state.routing.locationBeforeTransitions
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getOpportunityList,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
