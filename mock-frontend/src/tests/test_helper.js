export function getCurrentDateStr() {
  const dateFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const currentDate = new Date();
  let currentDateStr = currentDate.toLocaleDateString('fi-FI', dateFormatOptions).replace('klo ', '');
  const indexToReplace = currentDateStr.lastIndexOf('.');
  currentDateStr = currentDateStr.substring(0, indexToReplace) + ':' + currentDateStr.substring(indexToReplace + 1);

  return currentDateStr;
}

export function getDateStrInNMin(nMinutes) {
  Date.prototype.addMinutes = function (m) {
    this.setTime(this.getTime() + m * 60 * 1000);
    return this;
  };

  const dateFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const currentDate = new Date();
  let oneHourLaterFromCurrent = currentDate
    .addMinutes(nMinutes)
    .toLocaleDateString('fi-FI', dateFormatOptions)
    .replace('klo ', '');
  const indexToReplace = oneHourLaterFromCurrent.lastIndexOf('.');
  oneHourLaterFromCurrent =
    oneHourLaterFromCurrent.substring(0, indexToReplace) + ':' + oneHourLaterFromCurrent.substring(indexToReplace + 1);

  return oneHourLaterFromCurrent;
}
