/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default class List2 extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { name } = this.props
    return (
      <p>
        List2 with {name}
      </p>
    )
  }
}

List2.propTypes = {
  name: PropTypes.string.isRequired
}
