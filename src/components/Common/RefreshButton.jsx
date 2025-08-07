/* eslint-disable react/prop-types */
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import { Box, Tooltip } from '@mui/material';

const RefreshButton = ({ setRefetch, setLoading, loading, reFunction, handleRefresh }) => {
  const refreshFunction = async () => {
    try {
      setLoading(true);

      const result = handleRefresh
        ? handleRefresh()
        : reFunction
          ? reFunction()
          : setRefetch((prev) => !prev);

      await result;

      await new Promise((resolve) => setTimeout(resolve, 100));

      setLoading(false);
    } catch (error) {
      console.error('Error occurred during refresh:', error);
      setLoading(false);
    }
  };

  return (
    <Box onClick={refreshFunction}>
      <Tooltip title="Refresh" followCursor>
        <RotateRightOutlinedIcon
          sx={{
            cursor: 'pointer',
            fontSize: 20,
            ml: 2,
            mb: -0.5,
          }}
          className={loading ? 'custom-spin' : ''}
        />
      </Tooltip>
    </Box>
  );
};

export default RefreshButton;
