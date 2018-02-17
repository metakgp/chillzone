import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

class GenerateCustomTR extends Component {
  static PropTypes = {
    schedule: PropTypes.object
  }

  getTextToDisplay(k) {
    return k === 0 ? "EMPTY" : "TAKEN";
  }

  getAlertLevel(k) {
    return k === 0 ? "success" : "danger";
  }

  render() {
    return (
      <tr>
        {this.props.schedule.map(k => {
          return (
            <td>
            <Alert bsStyle={this.getAlertLevel(k)}>
              {this.getTextToDisplay(k)}
            </Alert>
          </td>
          )
        })}
      </tr>
    )
  }
}

export default GenerateCustomTR;
