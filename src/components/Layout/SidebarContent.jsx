/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Collapse, Stack, Tooltip, Typography } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { memo, useCallback, useState } from 'react';
import ImageImport from '../../assets/ImageImport';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ExpandMore } from '@mui/icons-material';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
// import SubChildContent from './SubChildContent';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Logout from '../Login/Logout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarsIcon from '@mui/icons-material/Stars';
import TokenToName from '../Common/TokenToName';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';
import SimCardOutlinedIcon from '@mui/icons-material/SimCardOutlined';
import Navigation from './Navigation';
import SubMenNavigation from './SubMenNavigation';
import NightShelterIcon from '@mui/icons-material/NightShelter';

const navItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    tooltip: 'Dashboard',
    icon: (isActive) => (
      <img
        src={isActive ? ImageImport.dashboard : ImageImport.dashboarIn}
        alt="Icon"
      />
    ),
  },

  {
    path: 'hotelbookinglist',
    label: 'Hotel Booking',
    tooltip: 'Hotel history',
    newItem: true,
    icon: (isActive) => (
      <NightShelterIcon
        sx={{
          color: isActive ? 'var(--primary)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
  // {
  //   path: 'allbooking',
  //   label: 'All Booking',
  //   tooltip: 'All booking',
  //   icon: (isActive) => (
  //     <AirplaneTicketOutlinedIcon
  //       sx={{
  //         color: isActive ? 'var(--primary)' : '#b6b5b5',
  //         fontSize: 22,
  //       }}
  //     />
  //   ),
  // },
];

const navItems1 = [
  {
    path: 'partial',
    label: 'Partial Payment',
    tooltip: 'Partial Payment',
    icon: (isActive) => (
      <img
        src={isActive ? ImageImport.partiala : ImageImport.partial}
        alt="Icon"
      />
    ),
  },
  {
    path: 'emergencycredit',
    label: 'Emergency Credit',
    tooltip: 'Emergency Credit',
    newItem: true,
    icon: (isActive) => (
      <AddCardOutlinedIcon
        sx={{
          color: isActive ? 'var(--primary)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
];
const navItems2 = [
  {
    path: 'esimhistory',
    label: 'e-Sim',
    tooltip: 'e sim package',
    newItem: true,
    icon: (isActive) => (
      <SimCardOutlinedIcon
        sx={{
          color: isActive ? 'var(--primary)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
  // {
  //   path: 'insurancehistory',
  //   label: 'Insurance',
  //   tooltip: 'Insurance',
  //   newItem: true,
  //   icon: (isActive) => (
  //     <HandshakeIcon
  //       sx={{
  //         color: isActive ? 'var(--primary)' : '#b6b5b5',
  //         fontSize: 22,
  //       }}
  //     />
  //   ),
  // },
  {
    path: 'transactionhistory',
    label: 'Account Ledger',
    tooltip: 'Transaction History',
    icon: (isActive) => (
      <ReceiptLongIcon
        sx={{
          color: isActive ? 'var(--black)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
  {
    path: 'salesreport',
    label: 'Sales Report',
    tooltip: 'Sales Report',
    icon: (isActive) => (
      <AssessmentIcon
        sx={{
          color: isActive ? 'var(--black)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
  {
    path: 'myprofile',
    label: 'My Profile',
    tooltip: 'My Profile',
    icon: (isActive) => (
      <AccountBoxTwoToneIcon
        sx={{
          color: isActive ? 'var(--black)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
    condition: 'agentRole', // Rendered only if agentRole is true
  },
  {
    path: 'reward',
    label: 'Reward points',
    tooltip: 'Reward',
    icon: (isActive) => (
      <StarsIcon
        sx={{
          color: isActive ? 'var(--black)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
];
const navItems3 = [
  {
    path: 'support',
    label: 'Support',
    tooltip: 'Support',
    icon: (isActive) => (
      <SupportAgentIcon
        sx={{
          color: isActive ? 'var(--black)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
  {
    path: 'tutorial',
    label: 'Tutorial',
    tooltip: 'Tutorial',
    icon: (isActive) => (
      <OndemandVideoRoundedIcon
        sx={{
          color: isActive ? 'var(--black)' : '#b6b5b5',
          fontSize: 22,
        }}
      />
    ),
  },
];

const navItemsSub = [
  {
    path: 'bookinghistory',
    label: 'Booking History',
    tooltip: 'Booking History',
    icon: (isActive) => (
      <img
        src={isActive ? ImageImport.bookhistorya : ImageImport.bookhistory}
        alt="Icon"
      />
    ),
    submenu: true, // Indicates that this item has a submenu
    submenuItems: [
      {
        title: 'Flight',
        pathName: 'bookinghistory',
        list1: '',
        list2: '',
      },
      {
        title: 'Manual Booking',
        pathName: 'manualbooking-list',
        path: 'bookinghistory',
        list1: '',
        list2: '',
      },
      {
        title: 'Void',
        pathName: 'void',
        list1: 'History',
        pathName2: '/bookinghistory/voidquotation',
        list2: 'Quotation',
      },
      {
        title: 'Refund',
        pathName: 'refund',
        list1: 'History',
        pathName2: '/bookinghistory/refundquotation',
        list2: 'Quotation',
      },
      {
        title: 'Reissue',
        pathName: 'reissue',
        list1: 'History',
        pathName2: '/bookinghistory/reissuequotation',
        list2: 'Quotation',
      },
      {
        title: 'Group fare history',
        pathName: 'saleshistory',
        list1: 'History',
        list2: 'Quotation',
      },
    ],
  },
];
const navItemsSub1 = [
  {
    path: 'deposit',
    label: 'Deposit',
    tooltip: 'Deposit',
    icon: (isActive) => (
      <img
        src={isActive ? ImageImport.diposita : ImageImport.diposit}
        alt="Icon"
      />
    ),
    submenu: true,
    submenuItems: [
      // {
      //   title: 'Instant Deposit',
      //   pathName: 'deposit',
      //   list1: '',
      //   list2: '',
      // },
      {
        title: 'Add Deposit Request',
        pathName: 'depositreq',
        list1: '',
        list2: '',
      },
      {
        title: 'Deposit History',
        pathName: 'deposithistory',
        list1: '',
        list2: '',
      },
      {
        title: 'Bank List',
        pathName: 'banklist',
        list1: '',
        list2: '',
      },
      {
        title: 'MFS List',
        pathName: 'mobilebankinglist',
        list1: '',
        list2: '',
      },
    ],
  },
];

const navItemsSub2 = [
  {
    path: 'travellar',
    label: 'Traveller',
    tooltip: 'Traveller',
    icon: (isActive) => (
      <img
        src={isActive ? ImageImport.travellara : ImageImport.travellar}
        alt="Icon"
      />
    ),
    submenu: true,
    submenuItems: [
      {
        title: 'Traveller List',
        pathName: 'travellar',
        list1: '',
        list2: '',
      },
      {
        title: 'Add Traveller',
        pathName: 'addtravellar',
        list1: '',
        list2: '',
      },
    ],
  },
  {
    path: 'staff',
    label: 'Staff',
    tooltip: 'Staff',
    icon: (isActive) => (
      <img src={isActive ? ImageImport.staffa : ImageImport.staff} alt="Icon" />
    ),
    condition: 'agentRole',
    submenu: true,
    submenuItems: [
      {
        title: 'Staff List',
        pathName: 'staff',
        list1: '',
        list2: '',
      },
      {
        title: 'Add Staff',
        pathName: 'addstaff',
        list1: '',
        list2: '',
      },
    ],
  },
];

const SidebarContent = memo(({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokenise = TokenToName();
  const agentRole = tokenise?.role === 'AGENT' ? true : false;

  const [value, setValue] = useState('Dashboard');
  const [subMenus, setSubMenus] = useState({
    bookignSubMenu: false,
    depositSubMenu: false,
    travellarSubMenu: false,
    staffSubMenu: false,
  });
  const { bookignSubMenu, depositSubMenu, travellarSubMenu, staffSubMenu } =
    subMenus;

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);

      const closeOnValues = [
        '/dashboard',
        'allbooking',
        'groupfare',
        'saleshistory',
        'hotelbookinglist',
        'bookinghistory',
        'manualbooking-list',
        'Void',
        'Refund',
        'Reissue',
        'partial',
        'emergencycredit',
        'Instant Deposit',
        'Add Deposit Request',
        'Deposit History',
        'Bank List',
        'MFS List',
        'esimhistory',
        'insurancehistory',
        'transactionhistory',
        'salesreport',
        'myprofile',
        'reward',
        'support',
        'tutorial',
        'Traveller',
        'Add Traveller',
        'Traveller List',
        'Staff List',
        'Add Staff',
      ];

      if (
        closeOnValues.includes(newValue) ||
        bookignSubMenu ||
        depositSubMenu ||
        travellarSubMenu ||
        staffSubMenu
      ) {
        setOpen?.(false);
      }
    },
    [bookignSubMenu, depositSubMenu, travellarSubMenu, staffSubMenu, setOpen]
  );

  const toggleSubMenu = useCallback((menu) => {
    setSubMenus((prevMenus) => ({
      ...prevMenus,
      [menu]: !prevMenus[menu],
    }));
  }, []);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ height: '85vh' }}
      >
        <Stack
          pt={{ xs: 1, md: 0 }}
          direction="column"
          spacing={2.5}
          sx={{
            '.active-link': {
              color: 'var(--primary)',
              position: 'relative',
              transition: 'color 0.3s ease-in-out',
            },
            '.active-link::after': {
              content: "''",
              position: 'absolute',
              width: '4px',
              height: '35px',
              left: 0,
              background: 'var(--primary)',
              transition: 'all 0.3s ease-in-out',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
            },
            '.link': {
              cursor: 'pointer',
              color: 'var(--secondary)',
              transition: 'color 0.3s ease-in-out',
            },
            '.Mui-checked': {
              color: 'var(--primary)',
            },
          }}
        >
          {/* <Box
            className={
              location?.pathname.startsWith('/event') ? 'active-link' : 'link'
            }
            sx={{
              bgcolor: '#fec02a',
              py: 1,
            }}
          >
            <NavLink
              to="/event"
              onClick={() => {
                handleChange('event');
              }}
            >
              <Stack direction="row" spacing={1.5} pl={3}>
                <Tooltip title="Event" followCursor>
                  <TwoWheelerRoundedIcon
                    sx={{
                      color: value === 'event' ? 'var(--black)' : 'unset',
                      fontSize: 22,
                    }}
                  />
                </Tooltip>
                <Typography
                  sx={{
                    opacity: open ? 1 : 0,
                    fontSize: '90%',
                    color: value === 'event' ? 'var(--primary)' : 'unset',
                  }}
                  className="content"
                >
                  Win&nbsp;Royel&nbsp;Enfield
                </Typography>
              </Stack>
            </NavLink>
          </Box> */}
          <Navigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItems}
          />

          {/* Booking history submenu lists */}

          <SubMenNavigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItemsSub}
            submenuState={subMenus}
            toggleSubMenu={toggleSubMenu}
          />
          <Navigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItems1}
          />

          {/* Deposit & Traveller history submenu lists */}
          <SubMenNavigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItemsSub1}
            submenuState={subMenus}
            toggleSubMenu={toggleSubMenu}
          />

          <Navigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItems2}
            agentRole={agentRole}
          />

          {/* Staff history submenu lists */}

          <SubMenNavigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItemsSub2}
            submenuState={subMenus}
            toggleSubMenu={toggleSubMenu}
            agentRole={agentRole}
          />

          <Navigation
            location={location}
            value={value}
            handleChange={handleChange}
            open={open}
            navItems={navItems3}
          />
        </Stack>
        <Box mt={3}>
          <Logout pl={3} />
        </Box>
      </Stack>
    </>
  );
});

export default SidebarContent;
