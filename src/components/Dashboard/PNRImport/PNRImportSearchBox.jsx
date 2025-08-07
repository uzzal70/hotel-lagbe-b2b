import { Box, Grid, Stack, Typography } from '@mui/material';
import webpImport from '../../../assets/webpImport';
import Select from 'react-select';
import { useState } from 'react';
import CopyToClipboardButton from '../../Common/CopyToClipboardButton';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const PNRImportSearchBox = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ source: '', pnr: '' });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const optionsData = [
    { name: 'Sabre', value: 'Sabre' },
    { name: 'Travelport', value: 'Travelport' },
  ];

  const handleAutoFill = (selectedOption) => {
    if (selectedOption) {
      const { value } = selectedOption;
      setData({
        ...data,
        source: value, // Assuming you want to set the 'source' property
      });
    }
  };

  const options = optionsData.map((x) => ({
    value: x.value,
    label: ` ${x.name}`,
  }));

  const handleImport = () => {
    toast.info(
      <Box sx={{ fontSize: 13, color: 'var(--info)' }}>Under Development</Box>
    );
    // navigate('/dashboard/pnrimportdetails', {
    //   state: {
    //     title: 'PNR Import for ',
    //   },
    // });
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        margin: 'auto',
        borderRadius: '8px',
        p: { xs: 1, sm: 2, md: 2.5, lg: 2.8 },
        py: { xs: 2, md: 0 },
        minHeight: '190px',
      }}
    >
      <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center" pt={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              bgcolor: 'var(--gray)',
              p: { xs: 1, md: 1.5 },
              color: 'var(--disable)',
              borderRadius: '5px',
              height: '70px',
            }}
          >
            <Box height="25px">
              <img src={webpImport.source} alt="" height="100%" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ fontSize: { xs: 10, md: 12 } }}>Source</Box>
              <Box
                sx={{
                  span: {
                    display: 'none',
                  },
                  svg: {
                    display: 'none',
                  },
                  fontSize: 16,
                  fontWeight: 400,
                  p: 0,
                  '.css-art2ul-ValueContainer2': {
                    p: 0,
                  },
                  input: {
                    bgcolor: 'red',
                  },
                }}
              >
                <Select
                  placeholder="Select Source"
                  onChange={handleAutoFill}
                  options={options}
                  noOptionsMessage={() => 'No Source'}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: 'var(--transparent)',
                      outline: 'none',
                      boxSizing: 'border-box',
                      boxShadow: 'none',
                      border: 'none',
                      minHeight: '0px ',
                      height: '30px ',
                      padding: 0,
                      margin: 0,
                      fontSize: '16px',
                      marginTop: -4,
                    }),
                    option: (provided) => ({
                      ...provided,
                    }),
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              bgcolor: 'var(--gray)',
              p: 1,
              color: 'var(--disable)',
              borderRadius: '5px',
              height: '70px',
            }}
          >
            <Box height="25px">
              <img src={webpImport.pnrInput} alt="" height="100%" />
            </Box>
            <Box
              className="placeholder"
              sx={{
                input: {
                  paddingBottom: '5px',
                  fontSize: 16,
                  border: 'none',
                  fontWeight: 400,
                  width: '100%',
                  bgcolor: 'transparent',
                  outline: 'none',
                  textTransform: 'uppercase',
                },

                label: {
                  fontSize: 12,
                  fontWeight: 400,
                  bgcolor: 'transparent',
                },
              }}
            >
              <label htmlFor="pnr">Source</label>
              <Box mt={'-1px'}>
                <input
                  id="pnr"
                  type="text"
                  name="pnr"
                  placeholder="Enter Your PNR"
                  autoComplete="off"
                  value={data.pnr}
                  onChange={handleOnchange}
                  maxLength={15}
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={2} order={{ xs: 4, sm: 4, md: 3 }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1, sm: 0 }}
            sx={{
              px: 1.5,
              py: { xs: 0.8, sm: 1 },
              width: '100%',
              height: { xs: 'auto', md: '70px' },
              bgcolor: 'var(--primary)',
              color: 'var(--white)',
              borderRadius: '5px',
              my: { xs: 2, sm: 'auto' },
            }}
            onClick={handleImport}
          >
            <Box textAlign="center">Submit</Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={10}
          lg={8}
          order={{ xs: 3, sm: 3, md: 4 }}
        >
          <Box width={'fit-content'}>
            <Typography sx={{ color: 'var(--disable)', fontSize: 12 }}>
              Transfer Queue Instruction {data.source}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                color: 'var(--disable)',
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              <Box sx={{ p: 1, bgcolor: 'var(--gray)', borderRadius: '5px' }}>
                W/GS/A/K1RL/ALLOTH/PNRU/L-{data.pnr || 'PNR'}
              </Box>
              <CopyToClipboardButton textToCopy={data.pnr} />
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </Box>
  );
};

export default PNRImportSearchBox;
