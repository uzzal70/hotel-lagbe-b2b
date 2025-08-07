export default function convertMinuteToHAndM(minutes) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;
  return hours + 'h ' + remainingMinutes + 'm';
}
