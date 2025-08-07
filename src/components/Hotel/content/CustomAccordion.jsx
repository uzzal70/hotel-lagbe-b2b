/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import { facilityIcons } from '../../Utils/facilityIcons';

const CustomAccordion = ({ title, data, type }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [expanded, setExpanded] = useState(isMdUp); // default state based on screen size

  useEffect(() => {
    setExpanded(isMdUp); // update if screen size changes
  }, [isMdUp]);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const renderList = () =>
    data.map((el, idx) => {
      const name = type === 'attributes' ? el.value : el.name;
      const matchingIcon = Object.keys(facilityIcons).find((key) =>
        name?.toLowerCase().includes(key.toLowerCase())
      );

      return (
        <ListItem key={idx}>
          <ListItemIcon>
            {matchingIcon ? (
              facilityIcons[matchingIcon]
            ) : (
              <CheckCircleIcon sx={{ color: '#CDD0D3', fontSize: 16 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                color="#344258"
                sx={{ fontSize: { xs: 10, md: 11, lg: 13 } }}
              >
                {type === 'facilities' && el.name}
                {type === 'attractions' &&
                  `${el.name}${
                    el.distance ? ` - ${el.distance}${el.unit || ''}` : ''
                  }`}
                {type === 'attributes' &&
                  `${el.key.toUpperCase()} : ${el.value}`}
              </Typography>
            }
          />
        </ListItem>
      );
    });

  return (
    <Accordion expanded={expanded} onChange={handleToggle} disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: 'var(--amenities)',
          color: 'var(--primary)',
          px: 2,
          py: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: 10, md: 11, lg: 17 }, fontWeight: 600 }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            maxHeight: { xs: 300, md: 500 },
            minHeight: { xs: 300, md: 500 },
            overflowY: 'auto',
          }}
        >
          {renderList()}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
