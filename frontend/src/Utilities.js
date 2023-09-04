export function getNextSlot(day, slot) {
  let next_day = day;
  if (slot === 8) {
    next_day = (day + 1) % 5;
  }

  return {
    day: next_day,
    slot: (slot + 1) % 9
  }
}

export function getPrevSlot(day, slot) {
  let prev_day = day;
  if (slot === 0) {
    prev_day = (day - 1) % 5;
  }

  return {
    day: prev_day,
    slot: (slot - 1) % 9
  }
}
