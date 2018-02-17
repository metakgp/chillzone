import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GenerateCustomTR extends Component {
  constructor() {
    super()
    this.DayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ];
  }

  static PropTypes = {
    schedule: PropTypes.object.isRequired,
    day: PropTypes.number.isRequired
  }


  getTextToDisplay(k) {
    return k === 0 ? (<b>EMPTY</b>) : "TAKEN";
  }

  getAlertLevel(k) {
    return k === 0 ? "success" : "danger";
  }

  render() {
    return (
      <tr>
        <td>
          <b>
            {this.DayNames[this.props.day]}
          </b>
        </td>
        {this.props.schedule.map(k => {
          return (
            <td class={this.getAlertLevel(k)}>
              {this.getTextToDisplay(k)}
            </td>
          )
        })}
      </tr>
    )
  }
}

export default GenerateCustomTR;
