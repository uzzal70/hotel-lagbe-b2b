import { baseUrl } from '../../../../baseurl';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import Token from '../../Common/Token';

// // export default Travelers;
export default function Travelers() {
  const agentId = Token();
  const url = `${baseUrl}/core/traveller/findTravellerbyAgentId/${agentId}`;
  const { data, error, isLoading, refetch } = useGetItemsQuery({ url });

  return { isLoading: isLoading, error: error, data: data, refetch: refetch };
}
