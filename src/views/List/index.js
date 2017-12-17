import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

class ListPage extends Component {
  render() {
    const { location } = this.props
    return (
      <div>
        <h2>List</h2>
        <Link to="/list/welcome">welcome</Link>
        { this.props.children }
      </div>
    )
  }
}
ListPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default ListPage
