import Token from '../Common/Token';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Event from './Event';
import { Box } from '@mui/material';

const EventMain = () => {
  const agentId = Token();
  const url = `/agent/totalEventBookingCountByAgentId/${agentId}`;
  const { data, isLoading, refetch } = useGetItemsQuery({ url });
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <Event data={data} />
    </Box>
  );
};

export default EventMain;
