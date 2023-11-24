import React from "react";
import PropTypes from "prop-types";
import { DayNames } from "../../constants/constants.js";

function EmptyRoomsTableRow(props) {
  return (
    <tr>
      <td>
        <b>{DayNames[props.day]}</b>
      </td>
      {props.schedule.map((k) => {
        return <td class="success">{k.join(", ")}</td>;
      })}
    </tr>
  );
}

EmptyRoomsTableRow.propTypes = {
  schedule: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
};

export default EmptyRoomsTableRow;
