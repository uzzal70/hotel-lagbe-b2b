/* eslint-disable react/prop-types */
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import HotelPdfDesign from './HotelPdfDesign';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useEffect, useState } from 'react';
import TokenToName from '../../Common/TokenToName';
import axios from 'axios';
import { baseUrl } from '../../../../baseurl';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import Token from '../../Common/Token';
import companyInfo from '../../../common/companyInfo';

const HotelPdf = ({
  data,
  hotelData,
  // numberOfRooms,
  // numberOfNight,
  // totalRoomPrice,
}) => {
  const tokenise = TokenToName();
  const agentId = Token();
  const getData = data?.booking?.guestRoomAllocations;
  const [checkImage, setCheckImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [markup, setMarkup] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/core/agent/getCompanyLogoFilebyId/${tokenise?.userId}`
        );
        setCheckImage(response.data);
      } catch (error) {
        console.error('Error fetching logo image:', error);
      }
    };

    fetchData();
  }, [tokenise?.userId]);

  const urlProfile = `/agent/findAgentByUserId/${agentId}`;
  const { data: profileData } = useGetItemsQuery({ url: urlProfile });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setMarkup('');
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: 'white',
        border: '1px solid rgb(234, 234, 235)',
        mb: 2,
      }}
    >
      <Typography
        sx={{
          mb: 1,
          px: 2,
          py: 1,
          fontSize: { xs: 10, md: 13 },
          fontWeight: 600,
          borderBottom: '1px solid var(--gray)',
          color: 'var(--primary)',
          borderRadius: '7px 7px 0px 0px',
        }}
        bgcolor="rgb(232, 230, 235)"
      >
        Download Invoice
      </Typography>
      <Box sx={{ p: 1, pt: 0 }}>
        {/* Download with Price (Modal trigger) */}
        <Box
          onClick={handleOpenModal}
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: { xs: 10, md: 13 },
            cursor: 'pointer',
            color: 'var(--primary)',
            bgcolor: 'var(--white)',
            padding: '6px 10px',
            border: '1px solid var(--stroke)',
            borderRadius: '5px',
            mb: 1,
          }}
        >
          <ArrowCircleDownIcon sx={{ fontSize: 14, mr: 1 }} />
          Download with price
        </Box>

        {/* Download Without Price (static) */}
        <PDFDownloadLink
          document={
            <HotelPdfDesign
              data={data}
              hotelData={hotelData}
              profileData={profileData}
              checkImage={checkImage}
              // markup={null}
            />
          }
          fileName={`${getData?.hotelName}.pdf`}
        >
          {({ blob, fileName, loading, error }) => (
            <Box
              sx={{
                color: 'var(--primary)',
                bgcolor: 'var(--white)',
                padding: '6px 10px',
                border: '1px solid var(--stroke)',
                borderRadius: '5px',
              }}
            >
              {loading ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--dark-green)',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  <ArrowCircleDownIcon
                    sx={{ fontSize: 18, color: 'var(--dark-green)' }}
                  />
                  &nbsp;&nbsp;Loading...
                </a>
              ) : (
                <>
                  {blob && (
                    <a
                      href={fileName}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--dark-green)',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      <ArrowCircleDownIcon
                        sx={{ fontSize: 18, color: 'var(--dark-green)' }}
                      />
                      &nbsp;&nbsp;Download Invoice
                    </a>
                  )}
                </>
              )}
              {error && `Error occurred: ${error.message}`}
            </Box>
          )}
        </PDFDownloadLink>
      </Box>

      {/* Modal for entering markup */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              width: { xs: '90%', sm: 400, md: 500 },
              p: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--primary)',
                }}
              >
                Download Voucher With Price
              </Typography>
              <Button onClick={handleCloseModal} sx={{ minWidth: 0 }}>
                ✕
              </Button>
            </Box>

            {/* Total Net Price */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography
                sx={{
                  color: 'var(--primary)',
                }}
              >
                Total Net Price
              </Typography>
              <Typography
                sx={{
                  color: 'var(--primary)',
                }}
              >
                {companyInfo.currencyType}{' '}
                {Number(getData?.finalFare || 0).toLocaleString()}
              </Typography>
            </Box>

            {/* Markup Input */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              sx={{
                color: 'var(--primary)',
              }}
            >
              <Typography>Enter Markup Amount</Typography>
              <TextField
                variant="outlined"
                type="number"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
                placeholder="0"
                size="small"
                InputProps={{
                  endAdornment: (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                      alt="Edit"
                      width={16}
                      height={16}
                      style={{ marginLeft: 5 }}
                    />
                  ),
                  style: { width: 100 },
                }}
              />
            </Box>

            <hr />

            {/* Total Price */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              mb={3}
            >
              <Typography
                sx={{
                  color: 'var(--primary)',
                  fontWeight: 600,
                }}
              >
                Total Customer Price
              </Typography>
              <Typography
                sx={{
                  color: 'var(--primary)',
                  fontWeight: 600,
                }}
              >
                {companyInfo.currencyCode}
                {Number(
                  (
                    Number(getData?.finalFare || 0) + Number(markup || 0)
                  ).toFixed(2)
                ).toLocaleString()}
              </Typography>
            </Box>

            {/* Download Button */}

            <PDFDownloadLink
              document={
                <HotelPdfDesign
                  data={data}
                  hotelData={hotelData}
                  profileData={profileData}
                  checkImage={checkImage}
                  markup={Number(
                    (
                      Number(getData?.finalFare || 0) + Number(markup || 0)
                    ).toFixed(2)
                  ).toLocaleString()}
                />
              }
              fileName={`${getData?.hotelName}.pdf`}
            >
              {({ blob, fileName, loading, error }) => (
                <Box
                  sx={{
                    border: '1px solid var(--stroke)',
                    borderRadius: '50px',
                    textTransform: 'capitalize',
                    bgcolor: 'var(--primary)',
                    color: 'white',
                    fontWeight: 'bold',
                    py: 1,
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                    },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {loading ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--white)',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      <ArrowCircleDownIcon
                        sx={{ fontSize: 18, color: 'var(--dark-green)' }}
                      />
                      &nbsp;&nbsp;Loading...
                    </a>
                  ) : (
                    <>
                      {blob && (
                        <a
                          href={fileName}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--white)',
                            fontWeight: 400,
                            fontSize: 14,
                          }}
                        >
                          <ArrowCircleDownIcon
                            sx={{ fontSize: 18, color: 'var(--white)' }}
                          />
                          &nbsp;&nbsp;Download Invoice
                        </a>
                      )}
                    </>
                  )}
                  {error && `Error occurred: ${error.message}`}
                </Box>
              )}
            </PDFDownloadLink>
          </Box>
        </Modal>
      </Modal>
    </Box>
  );
};

export default HotelPdf;
