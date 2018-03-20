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
    return k.join(", ")
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
            <td class="success">
              {this.getTextToDisplay(k)}
            </td>
          )
        })}
      </tr>
    )
  }
}

export default GenerateCustomTR;
