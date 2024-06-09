import { useReducer } from "react";
import EmptyRooms from "./EmptyRooms";
import {
  Slots,
  DayNames,
  Complexes,
  Floors,
  DISPATCH_TYPES,
} from "../constants/constants";
import { getNextSlot, getInitialChillzoneDetails } from "../util/utilities";
import {
  EmptySchedule,
  ClassroomAction,
  Classroom,
  ChangeDayAction,
  ChangeSlotAction,
  ChangeComplexAction,
  ChangeFloorAction,
  Complex,
  Floor,
} from "../lib/types";

const reducer = (state: Classroom, action: ClassroomAction) => {
  switch (action.type) {
    case DISPATCH_TYPES.CHANGE_DAY:
      const newDay = (action as ChangeDayAction).payload.day;
      if (newDay) {
        return {
          ...state,
          day: newDay,
        };
      }
    case DISPATCH_TYPES.CHANGE_SLOT: {
      const newSlot = (action as ChangeSlotAction).payload.slot;
      if (newSlot) {
        return { ...state, slot: newSlot };
      }
    }
    case DISPATCH_TYPES.CHANGE_COMPLEX: {
      const newComplex = (action as ChangeComplexAction).payload.complex;
      if (newComplex) {
        return { ...state, complex: newComplex };
      }
    }
    case DISPATCH_TYPES.CHANGE_FLOOR: {
      const newFloor = (action as ChangeFloorAction).payload.floor;
      if (newFloor) {
        return { ...state, floor: newFloor };
      }
    }
    default:
      return state;
  }
};

function TwoSlotDisplay(props: { schedule: EmptySchedule }) {
  const [chillzoneDetails, dispatchChillzoneDetails] = useReducer(
    reducer,
    getInitialChillzoneDetails()
  );

  let next = getNextSlot(chillzoneDetails.day, chillzoneDetails.slot);
  return (
    <div className="container">
      <h3>Choose the slot, area and floor that you want to chill at:</h3>
      {chillzoneDetails.isWeekend && (
        <h5>PS: You shouldn't be attending classes on weekends! :P</h5>
      )}
      <div className="row">
        <div className="col-md-12">
          <select
            value={chillzoneDetails.day}
            onChange={(event) => {
              let newDay = parseInt(event.target.value, 10);
              dispatchChillzoneDetails({
                type: DISPATCH_TYPES.CHANGE_DAY,
                payload: { day: newDay },
              });
            }}
          >
            {DayNames.map((val, ind) => (
              <option value={ind}>{val}</option>
            ))}
          </select>
          <select
            value={chillzoneDetails.slot}
            onChange={(event) => {
              let newSlot = parseInt(event.target.value, 10);
              dispatchChillzoneDetails({
                type: DISPATCH_TYPES.CHANGE_SLOT,
                payload: { slot: newSlot },
              });
            }}
          >
            {Slots.map((val, ind) => (
              <option value={ind}>{val}</option>
            ))}
          </select>
          <select
            value={chillzoneDetails.complex}
            onChange={(event) => {
              dispatchChillzoneDetails({
                type: DISPATCH_TYPES.CHANGE_COMPLEX,
                payload: {
                  complex: event.target.value as Complex,
                },
              });
            }}
          >
            {Object.keys(Complexes).map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
          <select
            value={chillzoneDetails.floor}
            onChange={(event) => {
              dispatchChillzoneDetails({
                type: DISPATCH_TYPES.CHANGE_FLOOR,
                payload: {
                  floor: event.target.value as Floor,
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
          Rooms in <b className='yellowText'>YELLOW</b> are empty all day. They may be locked.<br/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <EmptyRooms
            schedule={props.schedule}
            day={chillzoneDetails.day}
            slot={chillzoneDetails.slot}
            complex={chillzoneDetails.complex}
            floor={chillzoneDetails.floor}
            show_common_next={true}
          />
        </div>
        <div className="col-md-6">
          <EmptyRooms
            schedule={props.schedule}
            day={next.day}
            slot={next.slot}
            complex={chillzoneDetails.complex}
            floor={chillzoneDetails.floor}
            show_common_next={true}
          />
        </div>
      </div>
    </div>
  );
}

export default TwoSlotDisplay;
