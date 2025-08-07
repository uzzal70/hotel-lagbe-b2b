/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import { baseUrl } from '../../../baseurl';
import InsuCardSkeleton from '../Loading/InsuCardSkeleton';
import moment from 'moment';
import DownloadPDFInsurance from './DownloadPDFInsurance';

const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const InsuranceBookingDetails = () => {
  const { id } = useParams();
  const url = `${baseUrl}/core/insurance/myOrderDetails/${id}`;
  const { data, isLoading, isError, error } = useGetItemsQuery({
    url,
  });

  // const [loading, setLoading] = useState(false);

  // const handleRefresh = async () => {
  //   setLoading(true);
  //   await refetch();
  //   setLoading(false);
  // };

  // console.log(error);

  // Material UI Card Component to display order details once loaded
  const OrderDetailsCard = ({ data }) => (
    <Box
      sx={{
        mb: { xs: 10, md: 3 },
        minHeight: '100vh',
        mt: 4,
      }}
    >
      <Grid container spacing={2} mb={5}>
        <Grid item xs={12} md={8}>
          <Box flex={1}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  mb={2}
                  sx={{
                    bgcolor: 'var(--bgcolor)',
                    pb: 1,
                  }}
                >
                  <img
                    src={data?.imageUrl}
                    alt="Logo"
                    style={{
                      width: '100px',
                      objectFit: 'cover',
                      marginRight: '16px',
                    }}
                  />
                  <Box>
                    <Typography variant={'h6'}>
                      {formatFieldName(data?.displayName || 'N/A')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      #Plane : {data?.planName}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Grid container spacing={{ xs: 1, md: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Box mb={3} className="border">
                        <Typography variant="body3" gutterBottom>
                          Order Information
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Order ID</Typography>
                          <Typography variant="body2">
                            {data?.orderRef}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">
                            Bimafy Order ID
                          </Typography>
                          <Typography variant="body2">
                            {data?.orderId}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Created At</Typography>
                          <Typography variant="body2">
                            {moment(data.bimafyOrderDetailsCreatedAt).format(
                              'DD MMM YYYY'
                            )}
                            {/* {new Date(
                              data.bimafyOrderDetailsCreatedAt
                            ).toLocaleDateString()} */}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Status</Typography>
                          <Typography
                            variant="body2"
                            className={`text-capitalize ${data?.orderStatus}`}
                            sx={{
                              color: `var(--${data?.orderStatus}t)`,
                            }}
                          >
                            {formatFieldName(data?.orderStatus || 'N/A')}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box mb={3} className="border">
                        <Typography variant="body3" gutterBottom>
                          Travel Details
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">
                            Travel Purpose
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-capitalize"
                          >
                            {formatFieldName(data?.travelPurpose || 'N/A')}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Country</Typography>
                          <Typography variant="body2">
                            {data?.countries} ({data?.countriesCode})
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">
                            Date of Travel
                          </Typography>
                          <Typography variant="body2">
                            {moment(data.dateOfTravel).format('DD MMM YYYY')}
                            {/* {new Date(data.dateOfTravel).toLocaleDateString()} */}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Days</Typography>
                          <Typography variant="body2">{data?.days}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box mb={3} className="border">
                        <Typography variant="body3" gutterBottom>
                          Financial Details
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Gross Premium</Typography>
                          <Typography variant="body2">
                            {data?.grossPremium}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Discount</Typography>
                          <Typography variant="body2">
                            - {data?.discount}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2">
                            Delivery Charge
                          </Typography>
                          <Typography variant="body2">
                            {data?.deliveryCharge}
                          </Typography>
                        </Box>
                        <Divider />
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Grand Total</Typography>
                          <Typography variant="body2">
                            {parseFloat(
                              data?.grossPremium - data?.discount
                            ).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box mb={3} className="border">
                        <Typography variant="body3" gutterBottom>
                          Comment
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box mb={3} className="border">
                          <Typography variant="body2">
                            {data?.remarks || 'No Comment'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box my={2}>
                  <Typography variant="h6" color="warning" textAlign="center">
                    Benefits
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: data?.detailsContent,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Box>
                  <Typography variant="body3" gutterBottom>
                    Person Details
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Name</Typography>
                    <Typography variant="body2">
                      {data?.deliveryName}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Name In Passport</Typography>
                    <Typography variant="body2">
                      {data?.nameInPassport}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Passport Number</Typography>
                    <Typography variant="body2">{data?.passportNo}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Date of Birth</Typography>
                    <Typography variant="body2">
                      {moment(data.dateOfBirth).format('DD MMM YYYY')}
                      {/* {new Date(data.dateOfBirth).toLocaleDateString()} */}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Occupation</Typography>
                    <Typography variant="body2">{data?.occupation}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            {data?.passportFileUrl && (
              <Card
                variant="outlined"
                sx={{
                  mt: 1,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Passport copy
                  </Typography>
                  <Box
                    sx={{
                      img: {
                        height: '150px',
                        width: 'auto',
                      },
                    }}
                  >
                    <img src={data?.passportFileUrl} />
                  </Box>
                </CardContent>
              </Card>
            )}

            <Card
              variant="outlined"
              sx={{
                mt: 1,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Email</Typography>
                    <Typography variant="body2">{data?.email}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Phone</Typography>
                    <Typography variant="body2">{data?.mobile}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Box
              sx={{
                mt: 2,
                textAlign: 'center',
                border: '1px solid var(--stroke)',
                py: 1,
                borderRadius: '5px',
              }}
            >
              <DownloadPDFInsurance data={data} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      <Container
        sx={{
          minHeight: '100vh',
        }}
      >
        {isLoading ? (
          // <Skeleton variant="rectangular" width="100%" height={200} />
          <Box my={5}>
            <InsuCardSkeleton />
          </Box>
        ) : isError ? (
          <Alert
            severity="error"
            sx={{
              mt: 5,
            }}
          >
            Error loading order details {error?.data?.message}
          </Alert>
        ) : (
          <OrderDetailsCard data={data} />
        )}
      </Container>
    </div>
  );
};
export default InsuranceBookingDetails;
