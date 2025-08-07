import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import PdfPage from './PdfPage';
import Processoing from '../../Common/Processoing';
import { Container } from '@mui/material';
import BookingDetailsLoader from '../BookingDetailsLoader';
import { baseUrl } from '../../../../baseurl';

const PdfFetchData = () => {
  const { id } = useParams();

  const params = window.location.search?.split('?')[1];
  const decodedString = decodeURIComponent(params);

  // const url = `${baseUrl}/core/booking/find/${id}`;
  const url = `${baseUrl}/core/booking/findOneByAgent/${id}`;
  const { data: booking, isLoading } = useGetItemsQuery({ url });
  const data = isLoading ? [] : booking?.data?.[0] || booking?.[0];
  const allData = isLoading ? [] : booking;

  const navigate = useNavigate();
  const validID = id;
  // useEffect(() => {
  //   if (validID) {
  //     navigate(-1);
  //   }
  // }, []);

  const adtObject =
    data?.passengers?.find((item) => item?.passengerType === 'ADT') || null;
  const cnnObject =
    data?.passengers?.find((item) => item?.passengerType === 'CNN') || null;
  const infObject =
    data?.passengers?.find((item) => item?.passengerType === 'INF') || null;
  const result = [adtObject, cnnObject, infObject].filter(Boolean);
  return (
    <div>
      {isLoading ? (
        <Container sx={{ pt: 3 }}>
          <BookingDetailsLoader />
        </Container>
      ) : (
        <PdfPage
          allData={allData}
          data={data}
          result={result}
          tickteText={decodedString}
        />
      )}
    </div>
  );
};

export default PdfFetchData;
