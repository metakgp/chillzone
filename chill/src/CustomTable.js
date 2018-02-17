import React, { Component } from 'react';
import GenerateCustomTR from './GenerateCustomTR.js';
import PropTypes from 'prop-types';

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
      <table>
        <tbody>
        {this.props.schedule.map(k => {
          return <GenerateCustomTR schedule={k} />
          })}
        </tbody>
        </table>
        </div>
   )
  }
}

export default CustomTable;
