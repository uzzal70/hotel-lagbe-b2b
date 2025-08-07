import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import BackButton from '../components/Common/BackButton';
import RefreshButton from '../components/Common/RefreshButton';
import CustomButton from '../components/Common/CustomButton';
import MiniCard from '../components/Common/MiniCard';

const HeaderTitle = ({
  headerTitle,
  show,
  loading,
  setRefetch,
  setLoading,
  LinkTo,
  LinkToText,
  showCustomButtons,
  onDepositRequest,
  onInstantDeposit,
  backButtonText,
  miniCardValue,
  handleRefresh,
  handleAddTravellar,
}) => {
  return (
    <Box
      sx={{
        color: 'var(--white)',
        fontSize: { xs: 14, sm: 16, md: 20 },
        fontWeight: 500,
        py: 1.5,
        px: { xs: 1, sm: 2, md: 3 },
        bgcolor: 'var(--header-titlebg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: { xs: 0, md: 70, lg: 80 },
        zIndex: 1,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <BackButton text={backButtonText} />
        <Box component="span">{headerTitle || ''}</Box>
        {setRefetch && (
          <RefreshButton
            loading={loading}
            setRefetch={setRefetch}
            setLoading={setLoading}
            handleRefresh={handleRefresh}
          />
        )}
        {LinkTo && (
          <Box
            sx={{
              border: '1px solid var(--white)',
              pb: 0.5,
              borderRadius: 1,
              ml: 3,
              a: {
                color: 'var(--white)',
                fontSize: { xs: 12, md: 14 },
                px: 2,
                fontWeight: 400,
                textDecoration: 'none',
              },
            }}
          >
            <Link to={LinkTo || '/dashboard'}>{LinkToText || ''}</Link>
          </Box>
        )}
      </Stack>

      {/* Right section: Custom Buttons (optional) */}
      {showCustomButtons && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: 'flex', md: 'flex' }, pl: 2 }}
        >
          {onDepositRequest && (
            <CustomButton
              padding="2px 10px"
              fontSize={{ xs: 12, sm: 14 }}
              value="Deposit Request"
              bgcolor="var(--white)"
              textcolor="var(--primary)"
              hovercolor="var(--bgcolor)"
              handleClick={onDepositRequest}
            />
          )}
          {onInstantDeposit && (
            <CustomButton
              padding={{ xs: '2px 5px', md: '2px 10px' }}
              fontSize={{ xs: 12, sm: 14 }}
              value="Instant Deposit"
              bgcolor="var(--white)"
              textcolor="var(--primary)"
              hovercolor="var(--white)"
              handleClick={onInstantDeposit}
            />
          )}
        </Stack>
      )}
      {miniCardValue && (
        <MiniCard
          width={{ xs: '150px', md: '150x' }}
          title={'Deposit Amount'}
          value={miniCardValue || 0}
        />
      )}
      {handleAddTravellar && (
        <CustomButton
          padding={{ xs: '2px 5px', md: '2px 10px' }}
          value="Add Staff"
          bgcolor="var(--white)"
          textcolor="var(--primary)"
          hovercolor="var(--white)"
          handleClick={handleAddTravellar}
        />
      )}
    </Box>
  );
};

export default HeaderTitle;
