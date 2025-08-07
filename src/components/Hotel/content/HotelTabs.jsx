/* eslint-disable react/prop-types */
// components/common/HotelTabs.js
import { Box, Tabs, Tab } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/slices/hotelHeaderSlice';

const HotelTabs = ({ item, value, handleChange, handleScrollToDiv, hotelDiv, roomDiv }) => {
    const dispatch = useDispatch();

    const handleOpenModal = (item, modal) => {
        dispatch(openModal({ item, modal }));
    };


    const tabs = [
        {
            label: 'Hotel',
            onClick: () => handleScrollToDiv(hotelDiv),
        },
        {
            label: 'Room',
            onClick: () => handleScrollToDiv(roomDiv),
        },
        {
            label: 'Attributes',
            onClick: () => handleOpenModal(item, 'Attributes'),
        },
        {
            label: 'Reviews',
            onClick: () => handleOpenModal(item, 'Reviews'),
        },
        {
            label: 'Overview',
            onClick: () => handleOpenModal(item, 'Overview'),
        },
        {
            label: 'Map',
            onClick: () => handleOpenModal(item, 'Show Map'),
        },
    ];

 

    return (
        <Box sx={{ width: '100%' }} mt={2}>
            <Tabs
                value={value}
                onChange={(_, newValue) => handleChange(newValue)}
                textColor="inherit"
                indicatorColor="primary"
                aria-label="scrollable tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                TabScrollButtonProps={{
                    sx: {
                      '&.Mui-disabled': { opacity: 0.3 },
                    },
                  }}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: 'white',
                }}
            >
                {tabs.map(({ label, onClick }) => (
                    <Tab
                    
                        key={label}
                        label={label}
                        onClick={onClick}
                        // sx={tabStyle}
                        
                        sx={{
                            textTransform: 'capitalize',
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: {
                              xs: '10px',
                              sm: '12px',
                              md: '14px',
                            },
                            width: { xs: '80px', md: 'auto' },
                            // pa: { xs: 0.5, md: 1 },
                            whiteSpace: 'nowrap',
                          }}// Spread the a11yProps for accessibility
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default HotelTabs;
