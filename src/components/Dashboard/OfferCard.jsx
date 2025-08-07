/* eslint-disable react/prop-types */
import { Box, Stack } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import { createRef } from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import companyInfo from '../../common/companyInfo';

const OfferCard = ({ font }) => {
  const url = `/agent/getAllActiveBanners?platform=${companyInfo.platform}`;
  const { data, isLoading, isError } = useGetItemsQuery({
    url,
  });
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const sliderRef = createRef();

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };
  if (isLoading) {
    return '';
  }
  if (isError) {
    return '';
  }
  return (
    <Box>
      <Box
        className="airlines-slide"
        sx={{
          button: {
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'var(--white)',
            cursor: 'pointer',
            overflow: 'hidden',
          },
          '.slick-next': {
            display: 'none !important',
          },
          '.slick-prev': {
            display: 'none !important',
          },

          '.slick-track': {
            marginLeft: 0,
          },
          '.slick-slide > div': {
            margin: '1px 5px',
            width: 'auto',
          },
          '.slick-list': {
            margin: '0px -10px',
          },
          // px: data?.length > 4 ? 4.5 : 1,
        }}
        position="relative"
      >
        <Box>
          <Slider
            ref={sliderRef}
            {...settings}
            nextArrow={null}
            prevArrow={null}
          >
            {data &&
              data?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{ bgcolor: 'var(--white)', borderRadius: '6px' }}
                  >
                    <div>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          zIndex: 2,
                          cursor: 'pointer',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '10px',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={item?.cdnUrl}
                            alt=""
                            style={{ width: '100%' }}
                          />
                        </Box>
                      </Stack>
                    </div>
                  </Box>
                );
              })}
          </Slider>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: -10,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            height: '100%',
          }}
        >
          <button onClick={goToPrev}>
            <ArrowForwardIosRoundedIcon
              sx={{
                transform: 'rotate(180deg)',
                fontSize: font || 25,
                p: 0.7,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--disable)',
              }}
            />
          </button>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: -10,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            height: '100%',
          }}
        >
          <button onClick={goToNext}>
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: font || 25,
                p: 0.7,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--disable)',
              }}
            />
          </button>
        </Box>
      </Box>

      {/* <Stack direction="column" spacing={1}>
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <img src={ImageImport.cardImg1} alt="" style={{ width: '100%' }} />
        </Box>
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <img src={ImageImport.cardImg2} alt="" style={{ width: '100%' }} />
        </Box>
      </Stack> */}
    </Box>
  );
};

export default OfferCard;
