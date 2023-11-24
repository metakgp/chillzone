import React from "react";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import subjectDetails from "../../data/subjectDetails.json";
import { DayNames } from "../../constants/constants.js";

function CustomTableRow(props) {
  const getTextToDisplay = (k) => {
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
  };

  const getAlertLevel = (k) => {
    return k === "" ? "success" : "danger";
  };

  return (
    <tr>
      <td>
        <b>{DayNames[props.day]}</b>
      </td>
      {props.schedule.map((k) => {
        return <td class={getAlertLevel(k)}>{getTextToDisplay(k)}</td>;
      })}
    </tr>
  );
}

CustomTableRow.propsTypes = {
  schedule: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
};

export default CustomTableRow;
