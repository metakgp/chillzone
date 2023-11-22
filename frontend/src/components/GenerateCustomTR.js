import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import subjectDetails from "../data/subjectDetails.json";
import { DayNames } from "../constants/constants.js";

class GenerateCustomTR extends Component {
  constructor() {
    super();
    this.DayNames = DayNames;
  }

  static PropTypes = {
    schedule: PropTypes.object.isRequired,
    day: PropTypes.number.isRequired,
  };

  getTextToDisplay(k) {
    return k === "" ? (
      <b>EMPTY</b>
    ) : (
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-id">{subjectDetails[k]}</Tooltip>}
        placement="top"
      >
        <span>{k}</span>
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
          <b>{this.DayNames[this.props.day]}</b>
        </td>
        {this.props.schedule.map((k) => {
          return (
            <td class={this.getAlertLevel(k)}>{this.getTextToDisplay(k)}</td>
          );
        })}
      </tr>
    );
  }
}

export default GenerateCustomTR;
