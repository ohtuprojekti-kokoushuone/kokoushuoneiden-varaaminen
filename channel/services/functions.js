function getAvailableTimeAfter(start, searchEnd, reservations) {
  if (reservations.length === 0) return;

  reservations.sort((a, b) => (a.start.dateTime > b.start.dateTime ? 1 : -1));

  const firstReservation = reservations[0];
  let resStartDate = parseDate(firstReservation.start.dateTime);
  let resEndDate = parseDate(firstReservation.end.dateTime);

  if (resStartDate >= start) {
    return {
      earliestTime: resStartDate.toISOString(),
      isAvailable: true,
    };
  } else if (resEndDate >= start) {
    return {
      earliestTime: findFirstAvailableGap(reservations, searchEnd),
      isAvailable: false,
    };
  }
}

//returns first endTime, which has enough available time between it and next startTime
function findFirstAvailableGap(data, searchEnd) {
  const minGap = 15;

  for (let i = 0; i < data.length - 1; i++) {
    const current = parseDate(data[i].end.dateTime);
    const next = parseDate(data[i + 1].start.dateTime);

    if (diffInMinutes(current, next) >= minGap) {
      return current.toISOString();
    }
  }

  const last = parseDate(data[data.length - 1].end.dateTime);
  if (searchEnd >= last) {
    if (diffInMinutes(last, searchEnd) >= minGap) {
      return last.toISOString();
    }
  }
  return null;
}

function diffInMinutes(first, second) {
  return Math.trunc((second.getTime() - first.getTime()) / 1000 / 60);
}

function parseDate(str) {
  if (str.toLowerCase().indexOf('z') < 0) {
    //Adding Z correctly parses the date in UTC timezone instead of local timezone
    str += 'Z';
  }
  return new Date(str);
}

function filterRoom(room, employeeNum) {
  const isStudent = employeeNum.length === 0;
  if (isStudent) {
    return room.groups.includes('students') || room.groups.length === 0;
  }
  return true;
}

module.exports = {
  getAvailableTimeAfter: getAvailableTimeAfter,
  filterRoom: filterRoom,
};
