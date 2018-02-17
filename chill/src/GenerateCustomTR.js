import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import subjectDetails from './subjectDetails.json';

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
    return k === "" ? (<b>EMPTY</b>) : (
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-id">{subjectDetails[k]}</Tooltip>}
              placement="top">
              <span>
              {k}
              </span>
            </OverlayTrigger>
          );
  }

  getAlertLevel(k) {
    return k === "" ? "success" : "danger";
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
