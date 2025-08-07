/* eslint-disable react/prop-types */
import { Grid, Box, Stack, Button } from '@mui/material';
import commaNumber from 'comma-number';
import moment from 'moment';

const CreaditHistoryPhone = ({ data }) => {
  return (
    <div>
      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        {data?.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box
              sx={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                p: 1,
                fontWeight: 300,
                span: {
                  color: 'var(--disable)',
                },
                color: 'var(--secondary)',
                borderRadius: 1,
                bgcolor: 'var(--white)',
              }}
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Button
                  size="small"
                  sx={{
                    color: 'var(--secondary)',
                    fontWeight: 400,
                    py: 0.3,
                    bgcolor:
                      item.bookingId !== null ? 'var(--bgcolor)' : 'inherit',
                  }}
                >
                  {item?.creditRef || 'N/A'}
                </Button>
                <Box
                  textTransform={'capitalize'}
                  className={item.creditRequestStatus?.toLowerCase()}
                  sx={{
                    py: 0.3,
                    bgcolor: 'var(--gray)',
                    borderRadius: '5px',
                    px: 2,
                    fontSize: 14,
                  }}
                >
                  {item.creditRequestStatus?.replace(/_/g, ' ').toLowerCase()}
                </Box>
              </Stack>
              <Box
                sx={{
                  py: 1,
                  color: 'var(--secondary)',
                  fontSize: 14,
                  span: {
                    color: 'var(--primary)',
                    fontWeight: 400,
                  },
                }}
              >
                <Box>
                  Credit Request Amount:{' '}
                  <span> {commaNumber(item?.creditRequestAmount || 0)}</span>
                </Box>
                <Box>
                  Credit Approve Amount:{' '}
                  <span>{commaNumber(item?.creditApprovedAmount || 0)}</span>
                </Box>
                {item?.dueDate && (
                  <Box>
                    Due Date:{' '}
                    <span>{moment(item?.dueDate).format('DD MMM YYYY ')}</span>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CreaditHistoryPhone;
