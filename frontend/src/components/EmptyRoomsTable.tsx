import { useMemo, useState } from "react";
import { Table, Form, Row, Col, Button, Stack, Badge } from "react-bootstrap";
import { Slots, DayNames } from "../constants/constants";
import { EmptySchedule } from "../lib/types";
import capacityMap from "../data/roomCapacities.json";

type CapacityMap = Record<string, number>;

function getBuilding(room: string): string {
  const match = room.match(/^[A-Za-z]+/);
  return match ? match[0] : "Other";
}

export function EmptyRoomsTable(props: { schedule: EmptySchedule }) {
  const [building, setBuilding] = useState<string>("All");
  const [startSlot, setStartSlot] = useState<number>(0);
  const [endSlot, setEndSlot] = useState<number>(Slots.length - 1);
  const [minCapacity, setMinCapacity] = useState<number | "">("");

  const buildingOptions = useMemo(() => {
    const set = new Set<string>();
    props.schedule.forEach((day) =>
      day.forEach((slot) =>
        slot.forEach((room) => {
          set.add(getBuilding(room));
        })
      )
    );
    return ["All", ...Array.from(set).sort()];
  }, [props.schedule]);

  const trimmedSlots = useMemo(
    () => Slots.slice(startSlot, endSlot + 1),
    [startSlot, endSlot]
  );

  const filteredSchedule = useMemo(() => {
    return props.schedule.map((day) =>
      day.slice(startSlot, endSlot + 1).map((slotRooms) =>
        slotRooms.filter((room) => {
          const matchesBuilding =
            building === "All" || getBuilding(room) === building;
          const cap = (capacityMap as CapacityMap)[room];
          const matchesCapacity =
            minCapacity === "" ? true : cap !== undefined && cap >= minCapacity;
          return matchesBuilding && matchesCapacity;
        })
      )
    );
  }, [props.schedule, startSlot, endSlot, building, minCapacity]);

  const clearFilters = () => {
    setBuilding("All");
    setStartSlot(0);
    setEndSlot(Slots.length - 1);
    setMinCapacity("");
  };

  return (
    <div>
      <h1>Empty Rooms</h1>

      <Form className="mb-3">
        <Row className="gy-2 gx-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label visuallyHidden>Building</Form.Label>
            <Form.Select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            >
              {buildingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All" ? "All buildings" : opt}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={2}>
            <Form.Label visuallyHidden>Start slot</Form.Label>
            <Form.Select
              value={startSlot}
              onChange={(e) =>
                setStartSlot(Math.min(Number(e.target.value), endSlot))
              }
            >
              {Slots.map((slot, idx) => (
                <option value={idx} key={slot}>
                  Start: {slot}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={2}>
            <Form.Label visuallyHidden>End slot</Form.Label>
            <Form.Select
              value={endSlot}
              onChange={(e) =>
                setEndSlot(Math.max(Number(e.target.value), startSlot))
              }
            >
              {Slots.map((slot, idx) => (
                <option value={idx} key={slot}>
                  End: {slot}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={3}>
            <Form.Label visuallyHidden>Minimum capacity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min capacity (optional)"
              value={minCapacity}
              min={0}
              onChange={(e) => {
                const value = e.target.value;
                setMinCapacity(value === "" ? "" : Number(value));
              }}
            />
          </Col>
          <Col xs={12} md={2} className="d-grid">
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </Col>
        </Row>
      </Form>

      <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
        <Badge bg="secondary">
          Slots: {Slots[startSlot]} – {Slots[endSlot]}
        </Badge>
        <Badge bg="secondary">
          Building: {building === "All" ? "Any" : building}
        </Badge>
        {minCapacity !== "" && (
          <Badge bg="secondary">Min capacity: {minCapacity}</Badge>
        )}
      </Stack>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {trimmedSlots.map((k) => {
              return <th key={k}>{k}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {filteredSchedule.map((k: string[][], ind) => {
            return (
              <EmptyRoomsTableRow
                key={DayNames[ind]}
                schedule={k}
                day={ind}
              />
            );
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
      {props.schedule.map((k, idx) => {
        return (
          <td className="success" key={`${props.day}-${idx}`}>
            {k.join(", ") || "—"}
          </td>
        );
      })}
    </tr>
  );
}

export default EmptyRoomsTable;


