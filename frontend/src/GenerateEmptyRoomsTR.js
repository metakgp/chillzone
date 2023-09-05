import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DayNames } from './Constants.js'

class GenerateCustomTR extends Component {
  constructor() {
    super()
    this.DayNames = DayNames;
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
