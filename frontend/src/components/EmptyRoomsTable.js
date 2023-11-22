import React, { Component } from "react";
import GenerateEmptyRoomsTR from "./GenerateEmptyRoomsTR.js";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Slots } from "../constants/constants.js";

class CustomTable extends Component {
  static propTypes = {
    schedule: PropTypes.object,
  };

  render() {
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
            {this.props.schedule.map((k, ind) => {
              return <GenerateEmptyRoomsTR schedule={k} day={ind} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CustomTable;
