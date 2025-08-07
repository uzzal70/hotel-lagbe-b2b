import moment from 'moment';

export const totalTimeCalculate = (segmentArray) => {
  let totalTravel = 0;
  let totalTransit = 0;
  segmentArray.forEach((segments, i) => {
    if (segmentArray[i + 1]) {
      const duration = moment(segmentArray[i + 1].departureDateTime).diff(
        moment(segmentArray[i].arrivalDateTime)
      );
      totalTransit += moment.duration(duration).asMinutes();
    }
  });

  segmentArray.forEach((segments) => {
    const duration = parseInt(segments.flightDuration);
    totalTravel += duration;
  });

  const totalTime = totalTransit + totalTravel;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;
  const formattedDuration = `${hours}h ${minutes}m`;
  return formattedDuration;
};
