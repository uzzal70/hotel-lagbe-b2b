export const isTravelDateMoreThanThreeDaysAway = (travelDateTime) => {
  const currentDate = new Date(); // Get current date and time
  const travelDateTimeObj = new Date(travelDateTime); // Convert travelDateTime to a Date object

  // Calculate the difference in time (milliseconds)
  const differenceInTime = travelDateTimeObj - currentDate;

  // Convert difference to days (1 day = 24 * 60 * 60 * 1000 ms)
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  // Return true if difference is greater than 3, false otherwise
  return differenceInDays > 3;
};

// Example usage:
// const travelDateTime = '2024-12-11T06:30:00'; // Example travel date and time
// const result = isTravelDateMoreThanThreeDaysAway(travelDateTime);
// console.log(result); // Output: true if more than 3 days, false otherwise
