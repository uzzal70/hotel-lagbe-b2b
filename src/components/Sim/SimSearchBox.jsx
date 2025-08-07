/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { useState } from 'react';
import SimForm from './SimForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { setFilters } from '../../redux/slices/simFilterSlice';

const SimSearchBox = ({
  p,
  type,
  minHeight,
  country,
  region,
  // travelDate,
  count,
  nationality,
}) => {
  const navigate = useNavigate();
  const totalSimCards = useSelector((state) => state.simCards.count);
  const [simCardDetails, setSimCardDetails] = useState({
    type: type || 'GLOBAL',
    country: country || '',
    region: region || '',
    count: count || totalSimCards,
    isDatePickerOpen: false,
    nationality: nationality || 'Bangladesh',
  });

  const formatFieldName = (field) => {
    // Assume this function is implemented elsewhere
    return field.charAt(0).toUpperCase() + field.slice(1);
  };
  const dispatch = useDispatch();
  const handleSearch = async () => {
    try {
      setSimCardDetails((prev) => ({
        ...prev,
        isDatePickerOpen: false,
      }));
      dispatch(setFilters({ planSize: '' }));
      dispatch(setFilters({ validity: '' }));
      const emptyFields = Object.entries(simCardDetails).filter(
        ([key, value]) => {
          if (key === 'isDatePickerOpen') return false; // Ignore this field

          if (
            simCardDetails.type === 'GLOBAL' &&
            (key === 'country' || key === 'region')
          ) {
            return false;
          }

          if (
            simCardDetails.type === 'REGIONAL' &&
            key === 'region' &&
            value.trim() === ''
          ) {
            return true;
          }

          if (
            simCardDetails.type === 'LOCAL' &&
            key === 'country' &&
            value.trim() === ''
          ) {
            return true;
          }
        }
      );
      if (emptyFields.length > 0) {
        const fieldNames = emptyFields
          .map(([key]) => formatFieldName(key))
          .join(', ');
        toast.warning(`Please fill in the following fields: ${fieldNames}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: 'var(--white)',
            color: 'var(--primary)',
          },
        });
        return;
      }

      // Prepare urlparams from simCardDetails (instead of formData)
      const urlparams = {
        type: simCardDetails?.type || '',
        country: simCardDetails?.country || '',
        region: simCardDetails?.region || '',
        count: simCardDetails?.count?.toString() || '',
      };

      const encodedQuery = encodeURIComponent(JSON.stringify(urlparams));
      navigate(`/dashboard/sim?query=${encodedQuery}`);
    } catch (error) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          An error occurred during upload.
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        margin: 'auto',
        borderRadius: '8px',
        p: p || { xs: 1, sm: 2, md: 2.5, lg: 4 },
        pb: { xs: 1, md: 1 },
        minHeight: minHeight || '100px',
      }}
    >
      <SimForm
        totalSimCards={totalSimCards}
        simCardDetails={simCardDetails}
        setSimCardDetails={setSimCardDetails}
        handleSearch={handleSearch}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
};

export default SimSearchBox;
