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

  //intersects all the slots of a daySchedule
  //so only the rooms that are present in all slots get added to the "result" list 
  for(var i = 0; i < daySchedule.length; i++) {
    var slot = daySchedule[i]; 
    for(var y = 0; y < slot.length; y++) {
      var room = slot[y];
      if(result.indexOf(room) === -1) {

        //check if room exist in all and store in flag "emptyInAll"
        var emptyInAll = true;
        for(var x = 0; x < daySchedule.length; x++) {
          if(daySchedule[x].indexOf(room) === -1) {
            emptyInAll = false;
            break;
          }
        }

        if (emptyInAll) { 
          result.push(room);
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
