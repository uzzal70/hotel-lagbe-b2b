import moment from 'moment';

export const TransitTimeCalculate = (startTimestamp, endTimestamp) => {
  const timeDifference = moment.duration(
    moment(startTimestamp).diff(moment(endTimestamp))
  );
  const hours = Math.floor(timeDifference.asHours());
  const minutes = Math.floor(timeDifference.asMinutes()) - hours * 60;
  const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}m`;
  return transit;
};
export const Compare = (startTimestamp, endTimestamp) => {
  const timeDifference = moment.duration(
    moment(startTimestamp).diff(moment(endTimestamp))
  );
  const hours = Math.floor(timeDifference.asHours());
  return hours;
};

export const GetAircraftName = (item) => {
  const equipment = item?.equipment;

  if (!equipment || typeof equipment !== 'string') {
    return 'Aircraft';
  }

  if (equipment.charAt(0) === '7') {
    return `Boeing ${equipment}`;
  }

  const airbusPrefixes = ['A3', 'A2', '22', '32', '33', '34', '35', '38'];
  if (airbusPrefixes.includes(equipment.slice(0, 2))) {
    return `Airbus ${equipment}`;
  }

  return equipment;
};
