export function formatMinutes(totalmins) {
  if (totalmins < 0) {
    return false;
  }
  const mins = totalmins % 60;
  const hours = Math.floor(totalmins / 60);

  if (hours === 0) {
    return mins + 'min';
  } else if (mins === 0) {
    return hours + 'h';
  }
  return hours + 'h ' + mins + 'min';
}
