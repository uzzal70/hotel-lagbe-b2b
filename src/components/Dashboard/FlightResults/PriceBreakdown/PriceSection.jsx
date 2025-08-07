/* eslint-disable react/prop-types */
import { Box, Collapse, Stack, Typography } from '@mui/material';
import CustomButton from '../../../Common/CustomButton';
import PriceBreakdown from './PriceBreakdown';
import { ExpandLess } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import commaNumber from 'comma-number';
import { useSelector } from 'react-redux';
import CopyToObjectButton from '../../../Common/CopyToObjectButton';
import { FormatTime } from '../../../Common/TimeAndDistanceCalculation/FormateTime';
import moment from 'moment';
import { totalTimeCalculate } from '../../../Common/TimeAndDistanceCalculation/totalTimeCalculate';
import { TransitTimeCalculate } from '../../../Common/TimeAndDistanceCalculation/totalTimeDifference';
import { useState } from 'react';
import PenaltyModal from '../PenaltyModal';
import companyInfo from '../../../../common/companyInfo';

const PriceSection = ({
  data,
  open,
  handleChange,
  handleClose,
  handleClick: handleBooking,
  totalPassenger,
  rewardPointCalculate,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const grossTotalPrice = data?.grossTotalPrice;
  const totalClientPrice = data?.totalClientPrice;
  const { value } = useSelector((state) => state.toggleValue);

  const copyText = (
    <div>
      {data?.segments?.map((item, index) => {
        const firstSegmentData = item[0];
        const lastSegmentData = item[item?.length - 1];
        const isLastIndex = index === data.segments.length - 1;
        return (
          <div key={index}>
            {index === 0 && (
              <p>Airlines: {firstSegmentData?.marketingCarrierName}</p>
            )}
            {data?.segments?.length > 1 && isLastIndex && (
              <p>{'>> Return Flight'}</p>
            )}
            <p>
              {'From:'} {firstSegmentData?.departureAirportCode} (
              {moment(
                firstSegmentData?.departureDateTime?.split('T')[0]
              ).format('DD MMM')}{' '}
              {FormatTime(firstSegmentData?.departureDateTime)})
            </p>
            <p>
              {'To:'} {lastSegmentData?.arrivalAirportCode} (
              {moment(lastSegmentData?.arrivalDateTime?.split('T')[0]).format(
                'DD MMM'
              )}{' '}
              {FormatTime(lastSegmentData?.arrivalDateTime)})
            </p>
            <p>
              {'Duration:'} {totalTimeCalculate(item)}
              {item?.length > 1 && (
                <>
                  ( Transit:{' '}
                  {item.slice(0, -1).map((x, j, arr) => {
                    const transitTime = TransitTimeCalculate(
                      item[j + 1]?.departureDateTime?.split('+')[0],
                      x.arrivalDateTime?.split('+')[0]
                    );
                    return j < arr.length - 2
                      ? `${transitTime}, `
                      : transitTime;
                  })}
                  )
                </>
              )}
            </p>
            {isLastIndex && (
              <p>
                Fare: {data?.grossTotalPrice} {companyInfo.currencyType}
              </p>
            )}
            <p> </p>
          </div>
        );
      })}
    </div>
  );
  const isValidData =
    Array.isArray(data?.changePenalties) &&
    Array.isArray(data?.cancelPenalties) &&
    (data?.changePenalties.length > 0 || data?.cancelPenalties.length > 0);
  const isLccPresent = data?.isLcc === true || data?.isLcc === false;
  const checkButton =
    (data?.instantPay === 'true' || isLccPresent) &&
    data?.system !== 'NDC_V' &&
    data?.system !== 'NDC_TF';
    
  const totalDiffGross =
    data.totalClientPrice > data.grossTotalPrice
      ? commaNumber(data.totalClientPrice)
      : commaNumber(data.grossTotalPrice);

  return (
    <>
      <Box
        textAlign={'end'}
        sx={{
          mt: -3.5,
          display: { xs: 'block', md: 'none' },
        }}
      >
        <CopyToObjectButton fontSize={20}>{copyText}</CopyToObjectButton>
      </Box>
      <Stack
        direction={{ xs: 'row', md: 'column' }}
        justifyContent="space-between"
        sx={{
          height: '100%',
          bgcolor: 'var(--price-color)',
          p: { xs: 0.5, md: 1 },
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            justifyContent="space-between"
          >
            {value ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ color: 'var(--primary)', fontSize: { xs: 12, md: 15 } }}
              >
                <span>Agent&nbsp;Fare&nbsp;&nbsp;</span>
                <span style={{ fontWeight: 600 }}>
                  {companyInfo.currencyType}&nbsp;
                  {commaNumber(data.totalClientPrice)}
                </span>
              </Stack>
            ) : (
              <Box width="100%"></Box>
            )}

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                color: 'var(--secondary)',
                fontSize: value ? { xs: 12, md: 13 } : { xs: 12, md: 15 },
              }}
            >
              <span>Gross&nbsp;Fare&nbsp;&nbsp;</span>
              <span>
                {companyInfo.currencyType}&nbsp;
                {totalDiffGross}
              </span>
            </Stack>

            {!value ? <Box height={'19px'}></Box> : null}
          </Stack>

          <Box
            textAlign={'end'}
            sx={{
              position: { xs: 'unset', md: 'relative' },
              display: { xs: 'flex', md: 'block' },
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                color: 'var(--orengel)',
                fontSize: 10,
                fontWeight: 200,
                display: { xs: 'block', md: 'none' },
              }}
            >
              Reward Points: {rewardPointCalculate}
            </Typography>
            <Typography
              sx={{
                color: 'var(--secondary)',
                fontSize: 10,
                fontWeight: 300,
              }}
            >
              Price for{' '}
              <span style={{ fontWeight: 400 }}>{totalPassenger}</span>{' '}
              travellers
            </Typography>

            {/* {isValidData && (
              <CustomButton
                fontSize={{ xs: 10, md: '12px' }}
                border="none"
                textcolor="var(--info)"
                hovercolor="var(--white)"
                padding="0px 5px"
                value="Show Penalties"
                fontWeight={300}
                handleClick={() => setModalOpen(true)}
              />
            )} */}
            <Box
              sx={{
                mb: isValidData ? 1 : 2,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <CustomButton
                fontSize="12px"
                border="1px solid var(--stroke)"
                textcolor="var(--primary)"
                hovercolor="var(--white)"
                padding="0px 10px"
                value="Price Breakdown"
                handleClick={() => handleChange('priceBreakdown')}
                endIcon={<ExpandLess sx={{ transform: 'rotate(90deg)' }} />}
              />
              <Collapse in={open.priceBreakdown} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: '50%', md: '110%' },
                    left: { xs: '50%', md: 'unset' },
                    right: { xs: 'unset', md: '0' },
                    width: { xs: 350, sm: 350 },
                    transform: { xs: 'translate(-50%, -50%)', md: 'unset' },
                    backgroundColor: 'var(--white)',
                    height: 'fit-content',
                    zIndex: 3,
                    border: '1px solid var(--stroke)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <PriceBreakdown
                    ait={data.ait}
                    data={data.priceBreakdown}
                    handleChange={handleChange}
                    handleClose={handleClose}
                    open={open}
                    totalClientPrice={totalClientPrice}
                    grossTotalPrice={grossTotalPrice}
                    system={data?.system}
                    extraCommission={data?.extraCommission}
                  />
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: 'end',
            display: {
              xs: 'none',
              md:
                location?.pathname === '/dashboard/passengerinformation'
                  ? 'none'
                  : 'unset',
            },
            position: 'relative',
          }}
        >
          <CustomButton
            textcolor="var(--white)"
            bgcolor={checkButton ? 'var(--dark-green)' : 'var(--primary)'}
            hovercolor="var(--primary-rgb)"
            padding="2px 15px"
            value={checkButton ? 'Issue Now' : 'Book Flight'}
            handleClick={() => handleBooking()}
          />
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              bottom: -5,
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                py: 0,
                px: 1,
                // border: '1px solid black',
                borderRadius: 1,
                color: 'var(--primary)',
              }}
            >
              <CopyToObjectButton fontSize={20}>{copyText}</CopyToObjectButton>
            </Box>
          </Box>
        </Box>
      </Stack>

      {open && (
        <PenaltyModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          changePenalties={data?.changePenalties}
          cancelPenalties={data?.cancelPenalties}
        />
      )}
      {/* {!isDone && <Processoing content={processMessage || ''} />} */}
    </>
  );
};

export default PriceSection;
