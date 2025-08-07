export const TotalDistance = (segmentArray, value, time) => {
  let totalDistance = 0;
  for (let i = 0; i < segmentArray.length; i++) {
    totalDistance += parseInt(segmentArray[i][value]);
  }
  const hours = Math.floor(totalDistance / 60);
  const minutes = totalDistance % 60;
  const formattedDuration = `${hours}h ${minutes}m`;
  const totlaDistance = parseInt(totalDistance * 1.60934);
  return time ? formattedDuration : totlaDistance;
};
