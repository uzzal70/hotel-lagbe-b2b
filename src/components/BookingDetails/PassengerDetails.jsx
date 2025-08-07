/* eslint-disable react/prop-types */
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {
  Box,
  // Button,
  Collapse,
  Grid,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
// import Card from '../Common/Card';
import moment from 'moment';
import Processoing from '../Common/Processoing';
import axios from 'axios';
import getAuthToken from '../Common/getAuthToken';
import { checkLocation } from '../Helper/handleSearch';
import CopyToClipboardButton from '../Common/CopyToClipboardButton';
// import { BaggageParse } from './BaggageParse';
import BaggageComponent from './BaggageComponent';
import { convertToSegments } from './convertToSegments';
import { baseUrl } from '../../../baseurl';
// import { GetTokenImage } from '../Common/GetTokenImage';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none !important',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '10px',
  outline: 'none !important',
};
const PassengerDetails = ({ data, allData }) => {
  const mainData = allData?.segments || [];
  const segmentedData = convertToSegments(mainData);
  const depart = segmentedData?.[0]?.[0]?.departureLocation || 'DA';
  const arrival =
    segmentedData?.[0]?.[segmentedData?.[0]?.length - 1]?.arrivalLocation || '';

  const [expandedState, setExpandedState] = useState(
    new Array(data)?.fill(false)?.map((_, index) => index === 0)
  );

  const handleExpand = (index) => {
    setExpandedState((prevExpandedState) => {
      const newExpandedState = [...prevExpandedState];
      newExpandedState[index] = !newExpandedState[index];
      return newExpandedState;
    });
  };

  const paxDefined = (code) => {
    const paxMap = {
      A: 'Adult',
      C: 'Child',
      I: 'Infant',
    };
    return paxMap[code] || 'unknown';
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = getAuthToken();
  const viewImage = async (text, id) => {
    setSelectedImage(null);
    setIsModalOpen(true);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${baseUrl}/core/passengers/${text}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'arraybuffer',
        }
      );

      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      setSelectedImage(`data:image/png;base64,${base64String}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box>
      {data?.map((item, index) => (
        <Box
          key={index}
          sx={{
            mb: { xs: 1, md: 1.5 },
            border: '1px solid var(--bgcolor)',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              cursor: 'pointer',
              bgcolor: 'var(--bgcolor)',

              px: 2,
              py: 0.5,
            }}
            onClick={() => handleExpand(index)}
          >
            <Typography
              sx={{
                color: 'var(--black)',
                fontWeight: { xs: 400, sm: 500 },
                textTransform: 'uppercase',
                fontSize: { xs: 12, md: 16 },
                span: {
                  fontSize: { xs: 11, md: 13 },
                },
              }}
            >
              <>
                {item?.prefix || ''} {item.firstName} {item.lastName}{' '}
                <span
                  style={{
                    color: 'var(--red)',
                    display: item?.status === 'VALID' && 'none',
                  }}
                >
                  ({item?.status?.replace(/_/g, ' ').toLowerCase()})
                </span>
              </>
            </Typography>

            <KeyboardArrowDownOutlinedIcon
              sx={{
                color: 'var(--dark-sky)',
                fontWeight: 600,
                fontSize: { xs: 25, md: 28 },
                transition: 'transform 0.3s ease-in-out',
                transform: `rotate(${expandedState[index] ? 180 : 0}deg)`,
              }}
            />
          </Stack>
          <Collapse in={expandedState[index]}>
            <Box
              sx={{
                bgcolor: 'var(--white)',
                p: { xs: 1, md: 2 },
                borderRadius: '16px',
              }}
            >
              <Grid container justifyContent={'space-between'}>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      mt: 1,
                      boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: 'var(--secondary)',
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Name </Box>

                      <Box>Pax Type</Box>
                      <Box>Date of Birth</Box>
                      <Box>Passport Number</Box>
                      <Box>Passport Expiry Date</Box>
                      <Box>Nationality</Box>
                      <Box>Email </Box>
                      <Box>Phone Number </Box>
                    </Box>
                    <Box
                      sx={{
                        fontSize: 12,
                        fontWeight: 400,
                        textAlign: 'end',
                        color: 'var(--secondary)',
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: 500,
                          display: 'flex',
                          gap: 2,
                          justifyContent: 'end',
                        }}
                      >
                        <Box>
                          <CopyToClipboardButton
                            textToCopy={`${item?.prefix || ''} ${
                              item.firstName
                            } ${item.lastName}`}
                            fontSize={17}
                          />
                        </Box>
                        {item?.prefix || ''} {item.firstName} {item.lastName}
                      </Box>

                      <Box>{paxDefined(item?.passengerType[0])}</Box>
                      <Box>
                        {moment(
                          item?.dateOfBirth?.split('T')[0],
                          'YYYY-MM-DD'
                        ).format('DD MMM YYYY')}
                      </Box>
                      <Box>
                        {checkLocation(depart, arrival) === 'Domestic'
                          ? 'Domestic'
                          : item?.passportNo}
                      </Box>

                      <Box>
                        {checkLocation(depart, arrival) === 'Domestic'
                          ? 'Domestic'
                          : moment(
                              item?.passportEx?.split('T')[0],
                              'YYYY-MM-DD'
                            ).format('DD MMM YYYY')}
                      </Box>
                      <Box>{item.nationalityCountry || ''}</Box>
                      <Box>{item?.email}</Box>
                      <Box>{item?.phone}</Box>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box>
                    <BaggageComponent
                      item={item}
                      viewImage={viewImage}
                      paxDefined={paxDefined}
                      segmentedData={segmentedData}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Box>
      ))}

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ ...style, width: 'auto', height: 'auto' }}>
          {isLoading ? (
            <Processoing
              content={'We are processing your request please wait'}
            />
          ) : (
            <>
              {selectedImage === 'data:image/png;base64,' ? (
                'Passport / Visa copy is not uploaded'
              ) : (
                <img
                  src={selectedImage}
                  alt="&nbsp;Passport / Visa Copy is not available."
                  style={{ maxHeight: '60vh' }}
                />
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PassengerDetails;
