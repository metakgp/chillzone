import React, { Component } from "react";
import GenerateCustomTR from "./GenerateCustomTR.js";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Slots } from "../constants/constants.js";

class CustomTable extends Component {
  static propTypes = {
    room: PropTypes.string,
    schedule: PropTypes.object,
  };

  render() {
    return (
      <div>
        <h1>{this.props.room}</h1>
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
              return <GenerateCustomTR schedule={k} day={ind} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CustomTable;
