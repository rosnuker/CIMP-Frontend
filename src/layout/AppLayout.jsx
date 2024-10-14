import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Outlet, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: "#F4C522",
  color: "#8A252C",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: "#8A252C",
      color: "#FFFFFF",
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(true);

  const [selectedIndex, setSelectedIndex] = React.useState(0); // State for nav
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (destination, index) => {
    navigate(destination);
    setSelectedIndex(index);  // Set the selected index on nav
  };

  const logout = () => {
    setUser(null);
    handleCloseUserMenu();
  };

  const items = [
    { text: 'Dashboard', icon: <DashboardIcon style={{ color: 'white' }} />, destination: "", roles: ['acc_person', 'encoder', 'owner'] },
    { text: 'User Management', icon: <DashboardIcon style={{ color: 'white' }} />, destination: "", roles: ['admin'] },
    { text: 'Inventory', icon: <InventoryIcon style={{ color: 'white' }} />, destination: "inventory", roles: ['encoder', 'owner'] },
    { text: 'Request', icon: <BookmarkAddIcon style={{ color: 'white' }} />, destination: "request", roles: ['hidden'] },
    { text: 'Receive', icon: <BookmarkAddedIcon style={{ color: 'white' }} />, destination: "receive", roles: ['hidden'] },
    { text: 'Logs History', icon: <HistoryIcon style={{ color: 'white' }} />, destination: "logs", roles: ['owner'] },
    { text: 'Search', icon: <SearchIcon style={{ color: 'white' }} />, destination: "search", roles: ['owner'] },
    { text: 'Filter', icon: <FilterAltIcon style={{ color: 'white' }} />, destination: "filter", roles: ['owner'] },
    { text: 'Pending', icon: <HourglassTopIcon style={{ color: 'white' }} />, destination: "pending", roles: ['owner'] },
    { text: 'Approved', icon: <CheckCircleIcon style={{ color: 'white' }} />, destination: "approved", roles: ['hidden'] },
  ];

  const filteredItems = items.filter(item => item.roles.includes(user.type));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar alt="CIT-U Logo" src="./src/assets/cit.png" sx={{ mr: 1 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontWeight="bold"
              sx={{ flexGrow: 1 }}
            >
              CIT-U Inventory Management Portal
            </Typography>
            <Tooltip title={ user !== null ? `${user.fname} ${user.lname}` : 'User'}>
              <IconButton color="inherit" onClick={handleOpenUserMenu}>
                <Avatar alt={ user !== null ? `${user.fname} ${user.lname}` : 'User' } /> 
              </IconButton>
            </Tooltip> 
            {/* {...stringAvatar(`${user.fname} ${user.lname}`)} */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Logout" onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {user !== null ? (`Welcome! ${user.fname}`) : ('Welcome! User')}
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon style={{color: 'white'}} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {filteredItems.map((item, index) => (
              <ListItemButton
                key={item.text}
                onClick={() => handleNavigate(item.destination, index)}
                sx={{
                  backgroundColor: selectedIndex === index ? '#F4C522' : 'transparent',
                  color: selectedIndex === index ? '#8A252C' : 'white',
                  '&:hover': {
                    backgroundColor: '#F4C522',
                    color: '#8A252C',
                  },
                }}
              >
                <ListItemIcon sx={{ color: selectedIndex === index ? '#8A252C' : 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
