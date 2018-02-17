import React, { Component } from 'react';
import logo from './logo.svg';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React (testing)</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          {Object.keys(this.props.schedule).map(key => {
            return <CustomTable room={key} schedule={this.props.schedule[key]} />
          })}

      </div>
    );
  }
}

export default App;
