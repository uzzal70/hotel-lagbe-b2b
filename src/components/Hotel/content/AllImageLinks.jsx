/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import HotelOverviewModal from '../modal/HotelOverviewModal';

const AllImageLinks = ({
  item,
  onClick,
  modalIsOpen,
  closeModal,
  data,
  modalState,
}) => {
  const allImageLinks =
    item?.images?.flatMap((img) =>
      img.links
        .filter((link) => link.size === 'Xxl') // Filter size "Xxl" and exclude index 3
        .map((link) => ({ url: link.url, size: link.size }))
    ) || [];
  const remainingImages = allImageLinks.length - 5;
  return (
    <>
      <Grid container spacing={0.5}>
        {allImageLinks
          .slice(0, 5)
          .filter((_, idx) => idx !== 0) // Remove index 0
          .map((img, idx) => (
            <Grid item xs={6} key={idx} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 120, sm: 180, lg: 166 },
                  borderRadius: 1,
                  overflow: 'hidden',
                  '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover img': { transform: 'scale(1.1)' },
                  cursor: 'pointer',
                }}
              >
                <img src={img.url} alt="Hotel Image" onClick={onClick} />
              </Box>
              {idx === 3 &&
                remainingImages > 0 && ( // Since index 0 is removed, 3rd item is now at index 2
                  <Typography
                    onClick={onClick}
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: { xs: 9, md: 12 },
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(245, 221, 11, 0.8)',
                        color: 'black',
                      },
                    }}
                  >
                    + {remainingImages}{' '}
                    <CollectionsIcon sx={{ width: 15, mx: 0.5 }} />
                  </Typography>
                )}
            </Grid>
          ))}
      </Grid>
      {modalIsOpen && (
        <HotelOverviewModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          item={data || {}}
          modalState={modalState}
          nearByAttractions={true}
        />
      )}
    </>
  );
};

export default AllImageLinks;
