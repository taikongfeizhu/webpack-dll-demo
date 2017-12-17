import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HomeAsync extends Component {
  render() {
    const { match: { path } } = this.props
    return (
      <div>
        Async in {path}
      </div>
    )
  }
}
HomeAsync.propTypes = {
  location: PropTypes.object.isRequired
}

export default HomeAsync