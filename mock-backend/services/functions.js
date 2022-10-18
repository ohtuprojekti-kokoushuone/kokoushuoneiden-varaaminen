function getAvailableTimeAfter(start, data) {
  let isStart;
  let earliestTime;

  data.forEach((reservation) => {
    let date = parseDate(reservation.start.dateTime);
    if (date >= start) {
      if (!earliestTime || date < earliestTime) {
        earliestTime = date;
        isStart = true;
      }
    }

    date = parseDate(reservation.end.dateTime);
    if (date >= start) {
      if (!earliestTime || date < earliestTime) {
        earliestTime = date;
        isStart = false;
      }
    }
  });

  return {
    earliestTime: earliestTime.toISOString(),
    isAvailable: isStart,
  };
}

function parseDate(str) {
  if (str.toLowerCase().indexOf('z') < 0) {
    //Adding Z correctly parses the date in UTC timezone instead of local timezone
    str += 'Z';
  }
  return new Date(str);
}

module.exports = {
  getAvailableTimeAfter: getAvailableTimeAfter,
};
