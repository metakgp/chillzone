import React, { Component } from "react";
import PropTypes from "prop-types";
import EmptyRooms from "./EmptyRoomsOnSlot.js";
import {
  HourSlotMap,
  Slots,
  DayNames,
  Complexes,
  Floors,
} from "../constants/constants.js";
import { getNextSlot } from "../util/utilities.js";

class TwoSlotDisplay extends Component {
  constructor(props) {
    super(props);
    let slot = 0,
      today = props.date,
      complex = "Any",
      floor = "Any";

    let day = today.getDay() - 1;
    let isWeekend = day < 0 || day >= 5;
    day = isWeekend ? 0 : day;
    slot = isWeekend ? 0 : HourSlotMap[today.getHours()];

    if (slot === undefined) {
      let hour = today.getHours();
      slot = 0;
      if (hour >= 18) {
        day = (day + 1) % 9;
      }
    }

    this.state = this.Build(day, slot, complex, floor, isWeekend);
  }

  Build(day, slot, complex, floor, isWeekend) {
    return { day, slot, complex, floor, isWeekend };
  }

  static propTypes = {
    schedule: PropTypes.array.isRequired,
    date: PropTypes.object.isRequired,
  };

  render() {
    let next = getNextSlot(this.state.day, this.state.slot);
    return (
      <div className="container">
        <h3>Choose the slot, area and floor that you want to chill at:</h3>
        {this.state.isWeekend && (
          <h5>PS: You shouldn't be attending classes on weekends! :P</h5>
        )}
        <div className="row">
          <div className="col-md-12">
            <select
              value={this.state.day}
              onChange={(event) => {
                let newDay = parseInt(event.target.value, 10);
                this.setState(
                  this.Build(
                    newDay,
                    this.state.slot,
                    this.state.complex,
                    this.state.floor,
                    this.state.isWeekend
                  )
                );
              }}
            >
              {DayNames.map((val, ind) => (
                <option value={ind}>{val}</option>
              ))}
            </select>
            <select
              value={this.state.slot}
              onChange={(event) => {
                let newSlot = parseInt(event.target.value, 10);
                this.setState(
                  this.Build(
                    this.state.day,
                    newSlot,
                    this.state.complex,
                    this.state.floor,
                    this.state.isWeekend
                  )
                );
              }}
            >
              {Slots.map((val, ind) => (
                <option value={ind}>{val}</option>
              ))}
            </select>
            <select
              value={this.state.complex}
              onChange={(event) => {
                let newComplex = event.target.value;
                this.setState(
                  this.Build(
                    this.state.day,
                    this.state.slot,
                    newComplex,
                    this.state.floor,
                    this.state.isWeekend
                  )
                );
              }}
            >
              {Object.keys(Complexes).map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
            <select
              value={this.state.floor}
              onChange={(event) => {
                let newFloor = event.target.value;
                this.setState(
                  this.Build(
                    this.state.day,
                    this.state.slot,
                    this.state.complex,
                    newFloor,
                    this.state.isWeekend
                  )
                );
              }}
            >
              {Object.keys(Floors).map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <i>Rooms in BOLD are free for the next slot as well</i>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <EmptyRooms
              schedule={this.props.schedule}
              day={this.state.day}
              slot={this.state.slot}
              complex={this.state.complex}
              floor={this.state.floor}
              show_common_next={true}
            />
          </div>
          <div className="col-md-6">
            <EmptyRooms
              schedule={this.props.schedule}
              day={next.day}
              slot={next.slot}
              complex={this.state.complex}
              floor={this.state.floor}
              show_common_next={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TwoSlotDisplay;
