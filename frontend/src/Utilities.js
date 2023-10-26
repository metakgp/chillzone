import { NETWORK_CHECK_URL } from "./Constants";

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


// returns list of rooms that are empty the entire day
export function emptyAllDay(daySchedule) {
  var result = [];

  for(var i = 0; i < daySchedule.length; i++) {
    var currentList = daySchedule[i];
    for(var y = 0; y < currentList.length; y++) {
        var currentValue = currentList[y];
      if(result.indexOf(currentValue) === -1) {
        var existsInAll = true;
        for(var x = 0; x < daySchedule.length; x++) {
          if(daySchedule[x].indexOf(currentValue) === -1) {
            existsInAll = false;
            break;
          }
        }
        if(existsInAll) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
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
