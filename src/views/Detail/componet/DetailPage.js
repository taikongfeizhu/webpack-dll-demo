import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DetailPage extends Component {
  render() {
    return (
      <div>
        Detail Page
      </div>
    )
  }
}
DetailPage.propTypes = {
  location: PropTypes.object
}
