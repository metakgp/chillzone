import React from "react";
import CustomTableRow from "./CustomTableRow.js";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Slots } from "../../constants/constants.js";

function CustomTable(props) {
  return (
    <div>
      <h1>{props.room}</h1>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th></th>
            {Slots.map((k) => {
              return <th>{k}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.schedule.map((k, ind) => {
            return <CustomTableRow schedule={k} day={ind} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

CustomTable.propTypes = {
  room: PropTypes.string,
  schedule: PropTypes.object,
};

export default CustomTable;
