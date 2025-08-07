/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Card,
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Checkbox,
  Divider,
  Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from '../Common/Token';
import { baseUrlHotel } from '../../../baseurl';
import BackButton from '../Common/BackButton';
import RefreshButton from '../Common/RefreshButton';
import HotelGuestNameChangeSkeleton from './HotelLoading/HotelGuestNameChangeSkeleton';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useHotelNameChangeRequestMutation } from '../../redux/slices/hotel/hotelApiSlice';
import CommonBackdrop from '../../common/CommonBackdrop';
import HeaderTitle from '../../common/HeaderTitle';

const titleOptions = ['Mr', 'Ms'];

const HotelGuestNameChange = () => {
  const navigate = useNavigate();
  const agentId = Token();
  const { id } = useParams();
  const url = `${baseUrlHotel}/agent-hotel/findOneBookingByAgentId?agentId=${agentId}&bookingId=${id}`;
  const { data, isLoading, refetch } = useGetItemsQuery({ url });

  const [hotelNameChangeRequest, { isLoading: isLoadingGName }] =
    useHotelNameChangeRequestMutation();
  const [loading, setLoading] = useState(false);
  const [unchangedGuestIds, setUnchangedGuestIds] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState([]);

  const handleRefresh = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  const room = data?.booking?.guestRoomAllocations?.roomAllocation || [];
  const allGuests = room.flatMap((item) => item.guests || []);

  const handleToggleGuest = (guest) => {
    const exists = selectedGuests.some((g) => g.id === guest?.id);
    if (exists) {
      setSelectedGuests((prev) => prev.filter((g) => g.id !== guest?.id));
      setUnchangedGuestIds((prev) => prev.filter((id) => id !== guest?.id));
    } else {
      setSelectedGuests((prev) => [
        ...prev,
        {
          id: guest?.id,
          title: guest?.title,
          firstName: guest?.firstName,
          lastName: guest.lastName,
          passPortNumber: guest.passPortNumber,
          passPortExpiry: guest.passPortExpiry,
          panCardNumber: guest.panCardNumber,
        },
      ]);
    }
  };

  const handleInputChange = (id, field, value) => {
    setSelectedGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
    setUnchangedGuestIds((prev) => prev.filter((guestId) => guestId !== id));
  };

  const isSelected = (guestId) => selectedGuests.some((g) => g.id === guestId);
  const getSelectedGuest = (guestId) =>
    selectedGuests.find((g) => g.id === guestId);

  const formik = useFormik({
    initialValues: {
      agentRemarks: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (selectedGuests.length === 0) {
        toast.error('Please select at least one guest.');
        return;
      }

      const emptyNameExists = selectedGuests.some((guest) => {
        return (
          !guest.title?.trim() ||
          !guest.firstName?.trim() ||
          !guest.lastName?.trim() ||
          !guest.passPortNumber?.trim() ||
          !guest.passPortExpiry?.trim() ||
          !guest.panCardNumber?.trim()
        );
      });

      if (emptyNameExists) {
        toast.error('Please fill all selected guest names and select title.');
        return;
      }

      const unchanged = selectedGuests.filter((selected) => {
        const original = allGuests.find((g) => g.id === selected.id);
        if (!original) return false;
        return (
          original.firstName.trim().toLowerCase() ===
            selected.firstName.trim().toLowerCase() &&
          original.lastName.trim().toLowerCase() ===
            selected.lastName.trim().toLowerCase() &&
          original.passPortNumber.trim().toLowerCase() ===
            selected.passPortNumber.trim().toLowerCase() &&
          original.passPortExpiry.trim().toLowerCase() ===
            selected.passPortExpiry.trim().toLowerCase() &&
          original.panCardNumber.trim().toLowerCase() ===
            selected.panCardNumber.trim().toLowerCase() &&
          original.title.trim().toLowerCase() ===
            selected.title.trim().toLowerCase()
        );
      });

      if (unchanged.length > 0) {
        setUnchangedGuestIds(unchanged.map((g) => g.id));
        toast.error('Guest data must be changed');
        return;
      }

      setUnchangedGuestIds([]);

      const body = {
        bookingId: id,
        userId: agentId,
        paxDetails: selectedGuests.map((guest) => ({
          guestId: guest.id,
          title: guest.title,
          firstName: guest.firstName,
          lastName: guest.lastName,
          passPortNumber: guest.passPortNumber,
          passPortExpiry: guest.passPortExpiry,
          panCardNumber: guest.panCardNumber,
        })),
        agentRemarks: values.agentRemarks,
        remarks: '',
      };

      try {
        const response = await hotelNameChangeRequest(body);
        if (response?.error?.data?.message) {
          toast.error(response.error.data.message);
        } else {
          toast.success('Guest name change submitted successfully');
          resetForm();
          setSelectedGuests([]);
          refetch();
          navigate(-1);
        }
      } catch (error) {
        toast.error(error.message || 'Submission failed');
      }
    },
  });

  if (loading || isLoading) return <HotelGuestNameChangeSkeleton />;
  return (
    <>
      <HeaderTitle
        headerTitle={'Guest Name Change'}
        loading={loading}
        setRefetch={refetch}
        setLoading={setLoading}
        handleRefresh={handleRefresh}
      />

      <Container
        sx={{
          '& .MuiInputLabel-root': {
            color: 'var(--placeholder)',
          },

          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid',
              borderColor: 'var(--stroke)',
            },
            '&:hover fieldset': {
              border: '1px solid',
              borderColor: 'var(--stroke)',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid',
              borderColor: 'var(--secondary)',
            },
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box my={2} sx={{ mb: { xs: 12, md: 1 } }}>
            <Grid container spacing={2}>
              {allGuests?.map((guest) => {
                const selected = isSelected(guest?.id);
                const selectedGuest = getSelectedGuest(guest?.id);

                const isUnchanged = unchangedGuestIds.includes(guest?.id);
                return (
                  <Grid item xs={12} sm={6} md={4} key={guest?.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderColor: isUnchanged
                          ? 'red'
                          : selected
                          ? 'var(--primary)'
                          : 'grey.300',
                        borderWidth: 1,
                        borderRadius: 2,
                        boxShadow: selected ? 2 : 0,
                        transition: '0.3s ease',
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        px={2}
                        py={1}
                        bgcolor={selected ? 'var(--primar)' : 'grey.100'}
                        borderTopLeftRadius={8}
                        borderTopRightRadius={8}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          textTransform="capitalize"
                        >
                          {guest?.title} {guest?.firstName} {guest?.lastName}
                        </Typography>
                        <Checkbox
                          checked={selected}
                          onChange={() => handleToggleGuest(guest)}
                          sx={{
                            color: 'var(--primary)',
                            '&.Mui-checked': { color: 'var(--primary)' },
                            p: 0,
                          }}
                        />
                      </Box>

                      <Divider />

                      <Box px={2} py={1.5}>
                        {[
                          ['Type', guest?.type.toUpperCase()],
                          ['Email', guest?.email],
                          ['Passport', guest?.passPortNumber],
                          ['Expiry', guest?.passPortExpiry],
                          // ['Pan Card', guest?.panCardNumber],
                        ].map(([label, value]) => (
                          <Typography
                            key={label}
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mb: 0.5 }}
                          >
                            <strong>{label}:</strong> {value || '-'}
                          </Typography>
                        ))}

                        <Box
                          mt={1}
                          display="flex"
                          flexDirection="column"
                          gap={1.5}
                        >
                          <Box display="flex" gap={2} flexWrap="wrap" mb={0.2}>
                            {titleOptions.map((option) => (
                              <Box
                                key={option}
                                display="flex"
                                alignItems="center"
                                fontSize="caption"
                              >
                                <input
                                  type="radio"
                                  id={`${guest?.id}-${option}`}
                                  name={`title-${guest?.id}`}
                                  value={option}
                                  checked={selectedGuest?.title === option}
                                  onChange={(e) =>
                                    handleInputChange(
                                      guest?.id,
                                      'title',
                                      e.target.value
                                    )
                                  }
                                  disabled={!selected}
                                  style={{
                                    cursor: selected
                                      ? 'pointer'
                                      : 'not-allowed',
                                  }}
                                />
                                <label
                                  htmlFor={`${guest?.id}-${option}`}
                                  style={{
                                    marginLeft: 4,
                                    fontSize: '0.75rem',
                                    color: selected ? '#333' : '#999',
                                    cursor: selected
                                      ? 'pointer'
                                      : 'not-allowed',
                                  }}
                                >
                                  {option}
                                </label>
                              </Box>
                            ))}
                          </Box>

                          {[
                            ['First Name', 'firstName'],
                            ['Last Name', 'lastName'],
                            ['Passport Number', 'passPortNumber'],
                            ['Expiry Date', 'passPortExpiry'],
                            // ['Pan Card Number', 'panCardNumber'],
                          ].map(([label, field]) => (
                            <TextField
                              key={field}
                              label={label}
                              value={selectedGuest?.[field] || ''}
                              onChange={(e) =>
                                handleInputChange(
                                  guest?.id,
                                  field,
                                  e.target.value
                                )
                              }
                              fullWidth
                              size="small"
                              disabled={!selected}
                              InputLabelProps={{
                                style: { fontSize: '0.75rem' },
                              }}
                              inputProps={{ style: { fontSize: '0.75rem' } }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          <Grid item xs={12} my={2}>
            <Typography variant="body2" fontSize={13} mb={0.5}>
              Remarks
            </Typography>
            <textarea
              name="agentRemarks"
              rows="4"
              className="form-control"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: 6,
                outline: 'none',
              }}
              placeholder="Write your remarks here..."
              value={formik.values.agentRemarks}
              onChange={formik.handleChange}
            />
          </Grid>

          <Box>
            <Button
              type="submit"
              sx={{
                fontSize: { xs: 13, sm: 14, md: 15 },
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1, sm: 0.5 },
                backgroundColor: 'var(--primary)',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#004aad',
                  color: '#fff',
                },
              }}
              disabled={isLoadingGName}
            >
              {isLoadingGName ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Container>
      <CommonBackdrop open={loading || isLoadingGName} />
    </>
  );
};

export default HotelGuestNameChange;
