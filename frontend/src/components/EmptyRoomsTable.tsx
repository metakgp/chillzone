import { Table } from "react-bootstrap";
import { Slots, DayNames } from "../constants/constants";
import { EmptySchedule } from "../lib/types";

export function EmptyRoomsTable(props: { schedule: EmptySchedule }) {
  return (
    <div>
      <h1>Empty Rooms</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {Slots.map((k, ind) => {
              return <th>{k}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.schedule.map((k: string[][], ind) => {
            return <EmptyRoomsTableRow schedule={k} day={ind} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export function EmptyRoomsTableRow(props: {
  schedule: string[][];
  day: number;
}) {
  return (
    <tr>
      <td>
        <b>{DayNames[props.day]}</b>
      </td>
      {props.schedule.map((k) => {
        return <td className="success">{k.join(", ")}</td>;
      })}
    </tr>
  );
}

export default EmptyRoomsTable;
