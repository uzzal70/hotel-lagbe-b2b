export default function totalDuration(segment) {
  const firstSegmentDeparture = new Date(
    segment[0][0].departureDateTime?.split('T')[0] +
      'T' +
      segment[0][0].departureTime
  );
  const lastSegmentArrival = new Date(
    segment[0][segment[0].length - 1].arrivalDateTime?.split('T')[0] +
      'T' +
      segment[0][segment[0].length - 1].arrivalTime
  );
  const departureUTC = firstSegmentDeparture.toISOString();
  const arrivalUTC = lastSegmentArrival.toISOString();

  // Convert UTC strings to Date objects
  const departureUTCDate = new Date(departureUTC);
  const arrivalUTCDate = new Date(arrivalUTC);

  const durationInMillis = arrivalUTCDate - departureUTCDate;
  const hours = Math.floor(durationInMillis / (1000 * 60 * 60));
  const minutes = Math.floor(
    (durationInMillis % (1000 * 60 * 60)) / (1000 * 60)
  );
  const durationInMinutes = Math.abs(hours * 60 + minutes);
  return { durationInMinutes };
}
