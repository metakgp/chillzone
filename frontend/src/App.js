import React, { Component } from "react";
import "./App.css";
import CustomTable from "./CustomTable.js";
import PropTypes from "prop-types";
import EmptyRoomsTable from "./EmptyRoomsTable.js";
import TwoSlotDisplay from "./TwoSlotDisplay.js";
import Logo from "./navbar-icon.svg";

class App extends Component {
  static propTypes = {
    schedule: PropTypes.object.isRequired,
    empty_schedule: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={Logo} alt="logo"></img>
          <h1>Chillzone - IIT Kharagpur</h1>
          <h3>Find a place to chill, NOW!</h3>
        </header>

        <TwoSlotDisplay
          date={new Date()}
          schedule={this.props.empty_schedule}
        />

        <EmptyRoomsTable schedule={this.props.empty_schedule} />
        {Object.keys(this.props.schedule).map(key => {
          return <CustomTable room={key} schedule={this.props.schedule[key]} />;
        })}
      </div>
    );
  }
}

export default App;
