import moment from 'moment';
export const formatTimeDifference = (updatedAt) => {
  if (!updatedAt) return 'n/a';

  const now = moment();
  const updatedMoment = moment(updatedAt);
  const diffInHours = now.diff(updatedMoment, 'hours');
  const diffInDays = now.diff(updatedMoment, 'days');
  const diffInYears = now.diff(updatedMoment, 'years');

  if (diffInHours < 24) {
    const duration = moment.duration(now.diff(updatedMoment));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (hours >= 1) {
      return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    } else if (minutes >= 1) {
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds >= 1) {
      return `${seconds} sec${seconds > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  }

  if (diffInDays <= 6) {
    // For 1 to 6 days (inclusive): "Wednesday, 03:25 AM"
    return updatedMoment.format('hh:mm A, ddd');
  }

  if (diffInYears >= 1) {
    // For 1 year or more: "03:25 AM, 10 Jul 25"
    return updatedMoment.format('hh:mm A, DD MMM YY');
  }

  // For 7+ days but within same year: "03:25 AM, 10 Jul"
  return updatedMoment.format('hh:mm A, DD MMM');
};
