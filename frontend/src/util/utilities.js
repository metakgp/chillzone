import { NETWORK_CHECK_URL } from "../constants/constants.js";

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
