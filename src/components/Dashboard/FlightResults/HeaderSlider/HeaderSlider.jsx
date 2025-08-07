/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Stack } from '@mui/material';
import './HeaderSlider.css';
import React from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import commaNumber from 'comma-number';
import companyInfo from '../../../../common/companyInfo';
const HeaderSlider = ({ uniqueCarriers, selectedAirlins, handleAirLine }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  const sliderRef = React.createRef();

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };
  return (
    <Box
      className="airlines-slide"
      sx={{
        button: {
          border: 'none',
          outline: 'none',
          backgroundColor: 'var(--bgcolor)',
          color: 'var(--icon-color)',
          cursor: 'pointer',
          // borderRadius: '5px',

          overflow: 'hidden',
          '&:hover': {
            color: 'var(--black)',
            backgroundColor: 'var(--bgcolor)',
          },
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
        px: uniqueCarriers?.length > 4 ? 4.5 : 1,
      }}
      position="relative"
    >
      <Box>
        <Slider ref={sliderRef} {...settings} nextArrow={null} prevArrow={null}>
          {uniqueCarriers.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{ bgcolor: 'var(--white)', borderRadius: '6px' }}
              >
                <input
                  type="checkbox"
                  id={item.code}
                  checked={selectedAirlins.includes(item.code)}
                  onChange={() => handleAirLine(item.code)}
                  style={{ position: 'absolute', zIndex: '-1' }}
                />
                <label htmlFor={item.code}>
                  <div>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        zIndex: 2,
                        cursor: 'pointer',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                        borderRadius: '6px',
                        backgroundColor: selectedAirlins.includes(item.code)
                          ? 'var(--primary)'
                          : 'initial',
                        color: selectedAirlins.includes(item.code)
                          ? 'var(--white)'
                          : 'var(--black)',
                      }}
                    >
                      <Box
                        sx={{
                          width: '25px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${item.code}.png`}
                          alt=""
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Box>
                      <Stack direction="column">
                        <Box
                          sx={{
                            fontSize: { xs: 11, md: 14 },
                          }}
                        >
                          {item.code}
                        </Box>
                        <Box
                          sx={{
                            fontSize: 10,
                            fontWeight: 300,
                          }}
                        >
                          {commaNumber(item.price)} {companyInfo?.currencyCode}
                        </Box>
                      </Stack>
                    </Stack>
                  </div>
                </label>
              </Box>
            );
          })}
        </Slider>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: { xs: -2, md: -1 },
          top: '50%',
          transform: 'translateY(-50%)',
          display: {
            xs: uniqueCarriers.length > 3 ? 'flex' : 'none',
            md: uniqueCarriers.length > 6 ? 'flex' : 'none',
          },
          height: '100%',
          button: {
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          },
        }}
      >
        <button onClick={goToPrev}>
          <ArrowForwardIosRoundedIcon
            sx={{ transform: 'rotate(180deg)', fontSize: 16, py: 0.1 }}
          />
        </button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: -3, md: -2 },
          top: '50%',
          transform: 'translateY(-50%)',
          display: {
            xs: uniqueCarriers.length > 3 ? 'flex' : 'none',
            md: uniqueCarriers.length > 6 ? 'flex' : 'none',
          },
          height: '100%',
          button: {
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
          },
        }}
      >
        <button onClick={goToNext}>
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 16, py: 0.1 }} />
        </button>
      </Box>
    </Box>
  );
};

export default HeaderSlider;
