import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GenerateCustomTR extends Component {
  static PropTypes = {
    schedule: PropTypes.object
  }

  render() {
    return (
      <tr>
        {this.props.schedule.map(k => {
          return <td>{k === 0 ? "EMPTY" : "TAKEN"}</td>
        })}
      </tr>
    )
  }
}

export default GenerateCustomTR;
