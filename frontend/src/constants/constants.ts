export const NETWORK_CHECK_URL = "https://heimdall-api.metakgp.org/campus-check";
export const Slots = [
  "8 am",
  "9 am ",
  "10 am ",
  "11 am ",
  "12 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
];

export const DayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const HourSlotMap = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 5,
  15: 6,
  16: 7,
  17: 8,
};

export const Complexes = {
  Any: "",
  NC: "NC",
  NR: "NR",
  Vikramshila: "V",
};

export const Floors = {
  Any: "",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
};

export const DISPATCH_TYPES = {
  CHANGE_DAY: "CHANGE_DAY",
  CHANGE_SLOT: "CHANGE_SLOT",
  CHANGE_COMPLEX: "CHANGE_COMPLEX",
  CHANGE_FLOOR: "CHANGE_FLOOR",
} as const;
