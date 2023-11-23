import { HourSlotMap, NETWORK_CHECK_URL } from "../constants/constants.js";

export function getNextSlot(day, slot) {
  let next_day = day;
  if (slot === 8) {
    next_day = (day + 1) % 5;
  }

  return {
    day: next_day,
    slot: (slot + 1) % 9,
  };
}

export function getPrevSlot(day, slot) {
  let prev_day = day;
  if (slot === 0) {
    prev_day = (day - 1) % 5;
  }

  return {
    day: prev_day,
    slot: (slot - 1) % 9,
  };
}

export function getInitialChillPlaceDetails() {
  let slot = 0,
    today = new Date(),
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
  return { day, slot, complex, floor, isWeekend };
}

export async function isInsideCampusNetwork() {
  const TIMEOUT = 3000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(NETWORK_CHECK_URL, {
      timeout: TIMEOUT,
      signal: controller.signal,
    });
    clearTimeout(id);

    const data = await response.json();

    if (data.is_inside_kgp) return true;
    return false;
  } catch (err) {
    return false;
  }
}
