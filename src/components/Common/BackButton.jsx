/* eslint-disable react/prop-types */
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ text }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    text ? navigate(text) : navigate(-1);
  };
  return (
    <ArrowBackRoundedIcon
      sx={{
        color: 'var(--white)',
        fontSize: { xs: '22px', md: '30px' },
        cursor: 'pointer',
      }}
      onClick={() => handleClick()}
    />
  );
};

export default BackButton;
