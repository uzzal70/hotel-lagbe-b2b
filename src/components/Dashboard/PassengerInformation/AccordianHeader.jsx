/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { InfoOutlined } from '@mui/icons-material';
const AccordianHeader = ({
  handleExpand,
  type,
  index,
  required,
  expandedState,
  traveler,
}) => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ cursor: 'pointer', py: 0.2 }}
        onClick={() => handleExpand(type, index)}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            sx={{
              color: 'var(--black)',
              fontWeight: { xs: 400, md: 400 },
              fontSize: { xs: 15, md: 16 },
            }}
          >
            Traveler {traveler || 1}
            &nbsp;&nbsp;
            <span className="custom-accordion">{type || 'adult'}</span>
          </Typography>
          <Typography
            sx={{
              color: required ? 'var(--dark-green)' : 'var(--red)',
              fontSize: 11,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {required ? (
              <>
                <CheckCircleOutlineIcon sx={{ fontSize: 13 }} />
                &nbsp;Edit
              </>
            ) : (
              <>
                <InfoOutlined sx={{ fontSize: 13 }} />
                &nbsp;Required
              </>
            )}
          </Typography>
        </Stack>

        <KeyboardArrowDownOutlinedIcon
          sx={{
            color: 'var(--fontcolor)',
            fontWeight: 600,
            fontSize: { xs: 25, md: 30 },
            transition: 'transform 0.3s ease-in-out',
            transform: `rotate(${expandedState ? 180 : 0}deg)`,
          }}
        />
      </Stack>
    </Box>
  );
};

export default AccordianHeader;
