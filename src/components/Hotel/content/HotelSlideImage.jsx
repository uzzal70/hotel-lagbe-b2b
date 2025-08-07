/* eslint-disable react/prop-types */
import { Box, Stack, IconButton } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
const HotelSlideImage = ({ data, onClickImg, setOnClickImg }) => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false, // Dot icon hidden
        infinite: true,
        autoplay: true,
        arrows: false, // Hide default arrows
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: onClickImg || 0,
    };

    const goToNext = () => sliderRef.current?.slickNext();
    const goToPrev = () => sliderRef.current?.slickPrev();

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(onClickImg);
        }
    }, [onClickImg]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '50vh', lg: '60vh' },
                position: 'relative',
                borderRadius: 1

            }}
            bgcolor='var(--bg-imh)'
        >

            <Box sx={{ width: { xs: '90vw', md: '48vw' }, position: 'relative', pt: 0.75 }}>
                <Slider ref={sliderRef} {...settings}>
                    {data?.map((item, i) => (
                        <Box key={i} sx={{ borderRadius: '6px', overflow: 'hidden' }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                                    <img
                                        src={item?.url}
                                        alt="hotel"
                                        style={{
                                            width: '100%',
                                            height: '60vh',
                                            objectFit: 'contain',
                                            borderRadius: '10px',
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Slider>

                {/* Previous Button */}
                <IconButton
                    onClick={goToPrev}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '20px',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        color: 'black',
                        '&:hover': { bgcolor: 'gray' },
                        display: 'flex',
                        alignContents: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowBackIos />
                </IconButton>

                {/* Next Button */}
                <IconButton
                    onClick={goToNext}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '20px',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        color: 'black',
                        '&:hover': { bgcolor: 'gray' },
                    }}
                >
                    <ArrowForwardIos />
                </IconButton>

                {/* Next Button */}
                <IconButton
                    onClick={() => setOnClickImg('')}
                    sx={{
                        position: 'absolute',
                        top: { xs: 50, lg: -40 },
                        right: 10,
                        color: 'red',
                        '&:hover': { bgcolor: 'gray' },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default HotelSlideImage;
