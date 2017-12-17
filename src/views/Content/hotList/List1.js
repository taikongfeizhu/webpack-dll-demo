/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default class List1 extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { name } = this.props
    return (
      <p>
        List1 with {name}
      </p>
    )
  }
}

List1.propTypes = {
  name: PropTypes.string.isRequired
}
