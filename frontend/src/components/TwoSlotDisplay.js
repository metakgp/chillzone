import React, { useReducer } from "react";
import PropTypes from "prop-types";
import EmptyRooms from "./EmptyRooms.js";
import { Slots, DayNames, Complexes, Floors } from "../constants/constants.js";
import { getNextSlot, getInitialChillPlaceDetails } from "../util/utilities.js";
import { CHILLPLACE_DISPATCH_TYPES } from "../constants/constants.js";

const chillPlaceDetailsReducer = (state, action) => {
  switch (action.type) {
    case CHILLPLACE_DISPATCH_TYPES.CHANGE_DAY:
      const newDay = action.payload.day;
      return {
        ...state,
        day: newDay,
      };
    case CHILLPLACE_DISPATCH_TYPES.CHANGE_SLOT: {
      const newSlot = action.payload.slot;
      return { ...state, slot: newSlot };
    }
    case CHILLPLACE_DISPATCH_TYPES.CHANGE_COMPLEX: {
      const newComplex = action.payload.complex;
      return { ...state, complex: newComplex };
    }
    case CHILLPLACE_DISPATCH_TYPES.CHANGE_FLOOR: {
      const newFloor = action.payload.floor;
      return { ...state, floor: newFloor };
    }
    default:
      return state;
  }
};

function TwoSlotDisplay(props) {
  const [chillPlaceDetails, dispatchChillPlaceDetails] = useReducer(
    chillPlaceDetailsReducer,
    getInitialChillPlaceDetails()
  );

  let next = getNextSlot(chillPlaceDetails.day, chillPlaceDetails.slot);
  return (
    <div className="container">
      <h3>Choose the slot, area and floor that you want to chill at:</h3>
      {chillPlaceDetails.isWeekend && (
        <h5>PS: You shouldn't be attending classes on weekends! :P</h5>
      )}
      <div className="row">
        <div className="col-md-12">
          <select
            value={chillPlaceDetails.day}
            onChange={(event) => {
              let newDay = parseInt(event.target.value, 10);
              dispatchChillPlaceDetails({
                type: CHILLPLACE_DISPATCH_TYPES.CHANGE_DAY,
                payload: { day: newDay },
              });
            }}
          >
            {DayNames.map((val, ind) => (
              <option value={ind}>{val}</option>
            ))}
          </select>
          <select
            value={chillPlaceDetails.slot}
            onChange={(event) => {
              let newSlot = parseInt(event.target.value, 10);
              dispatchChillPlaceDetails({
                type: CHILLPLACE_DISPATCH_TYPES.CHANGE_SLOT,
                payload: { slot: newSlot },
              });
            }}
          >
            {Slots.map((val, ind) => (
              <option value={ind}>{val}</option>
            ))}
          </select>
          <select
            value={chillPlaceDetails.complex}
            onChange={(event) => {
              dispatchChillPlaceDetails({
                type: CHILLPLACE_DISPATCH_TYPES.CHANGE_COMPLEX,
                payload: {
                  complex: event.target.value,
                },
              });
            }}
          >
            {Object.keys(Complexes).map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
          <select
            value={chillPlaceDetails.floor}
            onChange={(event) => {
              dispatchChillPlaceDetails({
                type: CHILLPLACE_DISPATCH_TYPES.CHANGE_FLOOR,
                payload: {
                  floor: event.target.value,
                },
              });
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
            schedule={props.schedule}
            day={chillPlaceDetails.day}
            slot={chillPlaceDetails.slot}
            complex={chillPlaceDetails.complex}
            floor={chillPlaceDetails.floor}
            show_common_next={true}
          />
        </div>
        <div className="col-md-6">
          <EmptyRooms
            schedule={props.schedule}
            day={next.day}
            slot={next.slot}
            complex={chillPlaceDetails.complex}
            floor={chillPlaceDetails.floor}
            show_common_next={true}
          />
        </div>
      </div>
    </div>
  );
}

TwoSlotDisplay.propTypes = {
  schedule: PropTypes.array.isRequired,
};

export default TwoSlotDisplay;
