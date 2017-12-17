import {connect} from 'react-redux'
import DetailPage from '../componet/DetailPage'
// import { actions } from '../modules/'

const mapDispatchToProps = {
  // ...actions
}

const mapStateToProps = (state) => ({
  detail: state.detail
})

export default connect(mapStateToProps)(DetailPage)
