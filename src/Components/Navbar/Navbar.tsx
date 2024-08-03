import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ height: '50px', backgroundColor: '#fff' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 'bold', mr: 2 }}>
            certEx
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuIcon sx={{ color: '#2196f3' }} />
            <Typography variant="body1" sx={{ color: '#2196f3', ml: 1 }}>
              Available Certifications
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ color: '#212529', mr: 4 }}>
          User Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" sx={{ backgroundColor: '#fff', border: '1px solid #ccc', color: '#212529', mr: 2 }}>
            <AccountCircleIcon sx={{ color: '#2196f3', mr: 1 }} />
            Department
          </Button>
          <Avatar sx={{ backgroundColor: '#2196f3', mr: 2 }} />
          <Typography variant="body1" sx={{ color: '#212529', mr: 2 }}>
            User
          </Typography>
          <IconButton aria-label="notifications" sx={{ mr: 2 }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
          <IconButton aria-label="user">
            <AccountCircleIcon sx={{ color: '#212529' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
