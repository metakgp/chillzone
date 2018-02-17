import React, { Component } from 'react';
import './App.css';
import CustomTable from './CustomTable.js';
import PropTypes from 'prop-types';

class App extends Component {
  static PropTypes = {
    schedule: PropTypes.object.isRequired
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Chillzone</h1>
          <h3>Find a place to chill, NOW!</h3>
        </header>
          {Object.keys(this.props.schedule).map(key => {
            return <CustomTable room={key} schedule={this.props.schedule[key]} />
          })}
      </div>
    );
  }
}

export default App;
