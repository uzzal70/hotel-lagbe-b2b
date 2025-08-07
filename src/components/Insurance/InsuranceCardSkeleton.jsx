import { Grid, Typography, Skeleton, Box } from '@mui/material';

const InsuranceCardSkeleton = () => {
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Skeleton variant="rectangular" width={40} height={40} />
        </Grid>

        <Grid item xs={7}>
          <Typography variant="body2" color="textSecondary">
            <Skeleton width="70%" />
          </Typography>
          <Typography variant="body1">
            <Skeleton width="90%" />
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body2" color="textSecondary">
            <Skeleton width="60%" />
          </Typography>
          <Typography variant="body1">
            <Skeleton width="50%" />
          </Typography>
        </Grid>

        <Grid item xs={2} sx={{ textAlign: 'right' }}>
          <Typography variant="body2" color="textSecondary">
            <Skeleton width="60%" />
          </Typography>
          <Skeleton variant="rectangular" width={60} height={30} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsuranceCardSkeleton;
