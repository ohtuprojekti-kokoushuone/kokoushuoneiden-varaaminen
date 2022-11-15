import { formatMinutes } from './formatDateUtil';

export function createDropdownDurationObject(durations) {
  let durationObjects = [];
  durations.forEach((element) => {
    durationObjects.push({
      key: `${element}`,
      text: formatMinutes(element),
      value: element
    });
  });
  return durationObjects;
}
