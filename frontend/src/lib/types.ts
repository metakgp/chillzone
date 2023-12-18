import subjectDetails from "../data/subjectDetails.json";
import schedule from "../data/schedule.json";
import emptySchedule from "../data/empty_schedule.json";

export type Schedule = typeof schedule;

export type SubjectDetails = typeof subjectDetails;

export type EmptySchedule = typeof emptySchedule;

export type Complex = "Any" | "NC" | "NR" | "Vikramshila";
export type Floor = "Any" | "1" | "2" | "3" | "4";

export type Classroom = {
  day: number;
  slot: number;
  floor: Floor;
  complex: Complex;
  isWeekend: boolean;
};

export type ChangeDayAction = {
  type: "CHANGE_DAY";
  payload: {
    day: number;
  };
};

export type ChangeSlotAction = {
  type: "CHANGE_SLOT";
  payload: {
    slot: number;
  };
};

export type ChangeFloorAction = {
  type: "CHANGE_FLOOR";
  payload: {
    floor: Floor;
  };
};

export type ChangeComplexAction = {
  type: "CHANGE_COMPLEX";
  payload: {
    complex: Complex;
  };
};

export type ClassroomAction =
  | ChangeDayAction
  | ChangeComplexAction
  | ChangeFloorAction
  | ChangeSlotAction;
