import React from "react";
import EmptyRoomsTableRow from "./EmptyRoomsTableRow.js";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Slots } from "../../constants/constants.js";

function EmptyRoomsTable(props) {
  return (
    <div>
      <h1>Empty Rooms</h1>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th></th>
            {Slots.map((k, ind) => {
              return <th>{k}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.schedule.map((k, ind) => {
            return <EmptyRoomsTableRow schedule={k} day={ind} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

EmptyRoomsTable.propTypes = {
  schedule: PropTypes.object,
};

export default EmptyRoomsTable;
