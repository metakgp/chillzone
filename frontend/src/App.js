import React, { Component, useEffect, useState } from "react";
import "./App.css";
import CustomTable from "./CustomTable.js";
import PropTypes from "prop-types";
import EmptyRoomsTable from "./EmptyRoomsTable.js";
import TwoSlotDisplay from "./TwoSlotDisplay.js";
import Logo from "./navbar-icon.svg";
import { isInsideCampusNetwork } from "./Utilities.js";

function App({ schedule, empty_schedule }) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    isInsideCampusNetwork()
      .then((value) => {
        setShow(value);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="message-banner">
        <iframe src="https://lottie.host/?file=ca9a3787-e6db-4878-a0d3-d10dde95b225/MjnHw4B5gw.json"></iframe>
        <div className="message">Chillzone is loading</div>
      </div>
    );
  else if (!show)
    return (
      <div className="message-banner">
        <iframe src="https://lottie.host/?file=46b58d32-043e-4268-94cd-4d7817565000/xNnhIYFoYA.json"></iframe>
        <div className="message">
          Please connect to IIT Kharagpur campus network to access this site!
        </div>
      </div>
    );
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} alt="logo" />
        <h1>Chillzone - IIT Kharagpur</h1>
        <h3>Find a place to chill, NOW!</h3>
      </header>

      <TwoSlotDisplay date={new Date()} schedule={empty_schedule} />

      <EmptyRoomsTable schedule={empty_schedule} />
      {Object.keys(schedule).map((key) => {
        return <CustomTable room={key} schedule={schedule[key]} />;
      })}
    </div>
  );
}

App.propTypes = {
  schedule: PropTypes.object.isRequired,
  empty_schedule: PropTypes.array.isRequired,
};

export default App;
