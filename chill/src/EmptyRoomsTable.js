import React, { Component } from 'react';
import GenerateEmptyRoomsTR from './GenerateEmptyRoomsTR.js';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

class CustomTable extends Component {
  static propTypes = {
    schedule: PropTypes.object
  }

  render() {
    return (
      <div>
      <h1>
        Empty Rooms
      </h1>
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>
          </th>
          <th>
          8 am - 9 am
          </th>
          <th>
          9 am - 10 am
          </th>
          <th>
          10 am - 11 am
          </th>
          <th>
          11 am - 12 pm
          </th>
          <th>
          12 pm - 1 pm
          </th>
          <th>
          2 pm - 3 pm
          </th>
          <th>
          3 pm - 4 pm
          </th>
          <th>
          4 pm - 5 pm
          </th>
            <th>
            5 pm - 6 pm
            </th>
          </tr>
        </thead>
        <tbody>
        {this.props.schedule.map((k, ind) => {
          return <GenerateEmptyRoomsTR schedule={k} day={ind} />
          })}
        </tbody>
        </Table>
        </div>
   )
  }
}

export default CustomTable;
