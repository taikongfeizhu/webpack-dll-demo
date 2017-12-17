import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Home extends Component {
  render() {
    const { match: { path } } = this.props
    return (
      <div>
        Home: {path}
      </div>
    )
  }
}
Home.propTypes = {
  location: PropTypes.object.isRequired
}

export default Home