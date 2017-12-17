import React, { PureComponent } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from 'routes'
import PropTypes from 'prop-types'

import 'static/styles/global.less'

export default class EntryContainer extends PureComponent {

  componentDidMount () {
    document.querySelector('#root').style.display = 'block'
  }

  render() {
    const { store } = this.props
    return (
      <Router>
        <App store={store}/>
      </Router>
    )
  }
}

EntryContainer.propTypes = {
  store : PropTypes.object.isRequired
}
