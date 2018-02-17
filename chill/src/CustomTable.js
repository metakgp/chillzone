import React, { Component } from 'react';
import GenerateCustomTR from './GenerateCustomTR.js';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

class CustomTable extends Component {
  static propTypes = {
    room: PropTypes.string,
    schedule: PropTypes.object
  }

  render() {
    return (
      <div>
      <h1>
        {this.props.room}
      </h1>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
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
        {this.props.schedule.map(k => {
          return <GenerateCustomTR schedule={k} />
          })}
        </tbody>
        </Table>
        </div>
   )
  }
}

export default CustomTable;
