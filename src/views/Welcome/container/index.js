import {connect} from 'react-redux'
import Welcome from '../component/Welcome'
// import { actions } from '../modules/'

const mapDispatchToProps = {
  // ...actions
}

const mapStateToProps = (state) => ({
  welcome: state.welcome
})

export default connect(mapStateToProps)(Welcome)
