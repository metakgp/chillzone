import { HourSlotMap, NETWORK_CHECK_URL } from "../constants/constants";
import { Classroom, Complex, Floor } from "../lib/types";

export function getNextSlot(
  day: number,
  slot: number
): { day: number; slot: number } {
  let next_day = day;
  if (slot === 8) {
    next_day = (day + 1) % 5;
  }

  return {
    day: next_day,
    slot: (slot + 1) % 9,
  };
}

export function getPrevSlot(
  day: number,
  slot: number
): { day: number; slot: number } {
  let prev_day = day;
  if (slot === 0) {
    prev_day = (day - 1) % 5;
  }

  return {
    day: prev_day,
    slot: (slot - 1) % 9,
  };
}

export function getInitialChillzoneDetails(): Classroom {
  let slot = 0,
    today = new Date(),
    complex: Complex = "Any",
    floor: Floor = "Any";

  let day = today.getDay() - 1;
  let isWeekend = day < 0 || day >= 5;
  day = isWeekend ? 0 : day;
  const hours = today.getHours();
  if (hours in HourSlotMap) {
    slot = isWeekend ? 0 : HourSlotMap[hours as keyof typeof HourSlotMap];
  } else {
    slot = 0;
    if (hours >= 18) {
      day = (day + 1) % 9;
    }
  }
  return { day, slot, complex, floor, isWeekend };
}

export async function isInsideCampusNetwork(): Promise<boolean> {
  const TIMEOUT = 3000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(NETWORK_CHECK_URL, {
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
