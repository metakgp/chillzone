import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Slots, DayNames } from "../constants/constants";
import { SubjectDetails } from "../lib/types";
import subjectDetails from "../data/subjectDetails.json";

type CustomTableProps = {
  room: string;
  schedule: string[][];
};

type CustomTableRowProps = {
  schedule: string[];
  day: number;
};

export function CustomTable(props: CustomTableProps) {
  return (
    <div>
      <h1>{props.room}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {Slots.map((k: string) => {
              return <th>{k}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.schedule.map((k: string[], ind: number) => {
            return <CustomTableRow schedule={k} day={ind} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export function CustomTableRow(props: CustomTableRowProps) {
  const getTextToDisplay = (k: keyof SubjectDetails | "") => {
    if (k === "") {
      return <b>EMPTY</b>;
    } else {
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-id">{subjectDetails[k]}</Tooltip>}
        placement="top"
      >
        <span>{k}</span>
      </OverlayTrigger>;
    }
  };

  const getAlertLevel = (k: string) => {
    return k === "" ? "success" : "danger";
  };

  return (
    <tr>
      <td>
        <b>{DayNames[props.day]}</b>
      </td>
      {props.schedule.map((k: string) => {
        if (subjectDetails.hasOwnProperty(k)) {
          return (
            <td className={getAlertLevel(k)}>
              {getTextToDisplay(k as keyof SubjectDetails)}
            </td>
          );
        }
      })}
    </tr>
  );
}

export default CustomTable;
