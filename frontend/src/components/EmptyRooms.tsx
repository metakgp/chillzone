import React from "react";
import { Table } from "react-bootstrap";
import { DayNames, Slots, Complexes, Floors } from "../constants/constants";
import chunk from "lodash.chunk";
import intersection from "lodash.intersection";
import { emptyAllDay, getNextSlot, getPrevSlot } from "../util/utilities";
import { Complex, Floor } from "../lib/types";

type EmptyRoomsProps = {
  schedule: string[][][];
  day: number;
  slot: number;
  floor: Floor;
  complex: Complex;
  show_common_next?: boolean;
  show_common_prev?: boolean;
};

function EmptyRooms(props: EmptyRoomsProps) {
  let day = props.day,
    slot = props.slot,
    complex = props.complex,
    floor = props.floor;

  if (!(day >= 0 && day < 5 && slot >= 0 && slot < 9)) {
    return (
      <h3>
        That day/slot ({day}/{slot}) combination is invalid. 0 &lt;= Day &lt; 5
        and 0 &lt;= Slot &lt; 9
      </h3>
    );
  }

  let schedule = props.schedule[day][slot];
  let v_rooms = schedule.filter((item) => {
    return item.includes("V");
  });
  if (Complexes[complex] === "V") {
    schedule = schedule.filter((item) => {
      return item.includes("V");
    });
  } else if (Complexes[complex] === "") {
    if (Floors[floor] !== "") {
      schedule = schedule.filter((item) => {
        return item.charAt(2) === Floors[floor] && !item.includes("V");
      });
    } else {
      schedule = schedule.filter((item) => {
        return !item.includes("V");
      });
    }
    schedule = schedule.concat(v_rooms);
  } else {
    schedule = schedule.filter((item) => {
      return (
        item.includes(Complexes[complex] + Floors[floor]) && !item.includes("V")
      );
    });
  }

  let schedule_chunked = chunk(schedule, 4);

  let common_rooms: string[] = [];

  //list of all rooms that are empty in all slots for the day
  let empty_all_day = emptyAllDay(props.schedule[day])

  if (props.show_common_next) {
    let next = getNextSlot(day, slot);
    let next_day = next.day;
    let next_slot = next.slot;
    common_rooms = intersection(
      props.schedule[day][slot],
      props.schedule[next_day][next_slot]
    );
  }

  if (props.show_common_prev) {
    let prev = getPrevSlot(day, slot);
    let prev_day = prev.day;
    let prev_slot = prev.slot;
    common_rooms = intersection(
      props.schedule[day][slot],
      props.schedule[prev_day][prev_slot]
    );
  }

  return (
    <div>
      <h3>
        Empty Rooms on {DayNames[day]} from {Slots[slot]}
      </h3>
      <Table striped bordered hover>
        <tbody>
          {schedule_chunked.map((val) => (
            <tr>
              {val.map((room) => {
                return (
                  <td 
                    className={
                      (common_rooms.includes(room) ? "bold " : "") +
                      (empty_all_day.includes(room) ? "yellowWarn" : "")
                    }>
                    {room}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmptyRooms;
