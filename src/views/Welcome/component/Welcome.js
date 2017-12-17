import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Welcome extends Component {
  render() {
    console.log(this.props, '>>> in welcome')
    return (
      <div>
        Welcome Page jian
      </div>
    )
  }
}
Welcome.propTypes = {
  location: PropTypes.object
}
