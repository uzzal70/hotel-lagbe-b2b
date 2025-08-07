import {
  Box,
  Collapse,
  Grid,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from '@mui/material';
import HotelSearchBox from './HotelSearchBox/HotelSearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/slices/modalOpen';
import moment from 'moment';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import HotelFilter from './content/HotelFilter';
import { setHotelFilterModal } from '../../redux/slices/hotelSearchSlice';
import React, { useState } from 'react';
const HotelModifyHeader = ({
  filterData,
  filters,
  resetFilters,
  filterLoading,
}) => {
  const dispatch = useDispatch();
  const modifyModal = useSelector((state) => state.modalValue.modifyModal);
  const selectedOption = useSelector((state) => state.hotel.selectedOption);
  const dateRange = useSelector((state) => state.hotel.dateRange);
  const startDate = moment(dateRange[0]?.startDate);
  const endDate = moment(dateRange[0]?.endDate);
  const nights = endDate.diff(startDate, 'days');
  const handleToggle = () => {
    dispatch(toggleModal({ modalName: 'modifyModal' }));
  };
  const filtermodal = useSelector((state) => state.hotel.filtermodal);

  const handleToggleFilter = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    dispatch(setHotelFilterModal({ ...filtermodal, [anchor]: open }));
  };
  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <HotelSearchBox
          pt={{ xs: 1, sm: 2, md: 2.5, lg: 3 }}
          filterNone={true}
        />
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          bgcolor: 'var(--primary)',
          p: 1,
          color: 'var(--white)',
          textAlign: 'center',
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
        }}
        noWrap
      >
        {selectedOption?.label}
      </Typography>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          bgcolor: 'var(--white)',
          p: 1,
          mt: 1,
          borderRadius: 1,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            {/* Check In */}
            <Grid item>
              <Box sx={{ fontSize: 12 }}>
                Check In
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--primary)',
                  }}
                  noWrap
                >
                  {moment(dateRange[0]?.startDate).format('DD MMM, YYYY')}
                </Typography>
              </Box>
            </Grid>

            {/* Nights */}
            <Grid item>
              <Box
                sx={{
                  fontSize: 10,
                  color: 'var(--disable)',
                  border: '1px solid var(--stroke)',
                  borderRadius: 1,
                  px: 1,
                }}
              >
                {nights} Night
              </Box>
            </Grid>

            {/* Check Out */}
            <Grid item>
              <Box sx={{ fontSize: 12 }}>
                Check Out
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--primary)',
                  }}
                  noWrap
                >
                  {moment(dateRange[0]?.endDate).format('DD MMM, YYYY')}
                </Typography>
              </Box>
            </Grid>

            {/* Icons */}
            <Grid item>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip title="Modify Search">
                  <ModeEditOutlineOutlinedIcon
                    sx={{
                      border: '1px solid var(--dark-sky)',
                      borderRadius: 1,
                      color: 'var(--dark-sky)',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleToggle()}
                  />
                </Tooltip>
                <Tooltip title="Filter">
                  <TuneSharpIcon
                    sx={{
                      border: '1px solid var(--primary)',
                      borderRadius: 1,
                      color: 'var(--secondary)',
                      cursor: 'pointer',
                    }}
                    onClick={handleToggleFilter('right', true)}
                  />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
          <Collapse
            in={modifyModal}
            sx={{ transition: '0.5s', mt: modifyModal ? 1.5 : 0 }}
          >
            <HotelSearchBox
              pt={{ xs: 1, sm: 2, md: 2.5, lg: 3 }}
              filterNone={true}
            />
          </Collapse>
        </Box>
      </Box>
      <Box>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={filtermodal[anchor]}
              onClose={handleToggleFilter(anchor, false)}
              onOpen={handleToggleFilter(anchor, true)}
              sx={{
                '.MuiPaper-root': {
                  width: '60%',
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                {filterData?.length > 0 && (
                  <HotelFilter
                    filterData={filterData}
                    filters={filters}
                    resetFilters={resetFilters}
                    filterLoading={filterLoading}
                  />
                )}
              </Box>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default HotelModifyHeader;
