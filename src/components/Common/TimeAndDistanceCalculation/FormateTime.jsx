import moment from 'moment';

export const FormatTime = (time) => {
  const formattedTime = moment(time.slice(11, 19), 'HH:mm').format('hh:mm A');
  return (
    <>
      {formattedTime.slice(0, 5)}
      &nbsp;
      <span style={{ fontSize: 12 }}>{formattedTime.slice(-2)}</span>
    </>
  );
};

export const FormatDate = (date) => {
  const formattedTime = moment(date).format('DD MMM');
  return <>{formattedTime}</>;
};
