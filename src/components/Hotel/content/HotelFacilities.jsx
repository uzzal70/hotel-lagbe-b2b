/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import CustomAccordion from './CustomAccordion';

const HotelFacilities = ({ item, div1Ref, div2Ref }) => {
  const facility = item?.facilities || [];
  const attractions = item?.nearByAttractions || [];
  const attributes = item?.attributes || [];

  return (
    <Grid
      container
      spacing={2}
      pt={2}
      sx={{
        pb: { xs: 15, md: 2 },
      }}
    >
      <Grid item xs={12} sm={6} md={4} ref={div1Ref}>
        <CustomAccordion
          title="Most Popular Facilities/Amenities"
          data={facility}
          type="facilities"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CustomAccordion
          title="Nearby Attractions"
          data={attractions}
          type="attractions"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} ref={div2Ref}>
        <CustomAccordion
          title="Attributes"
          data={attributes}
          type="attributes"
        />
      </Grid>
    </Grid>
  );
};

export default HotelFacilities;
