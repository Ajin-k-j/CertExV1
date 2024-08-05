import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DepartmentIcon from '@mui/icons-material/Security';
import UserIcon from '@mui/icons-material/Person';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [isDepartment, setIsDepartment] = useState(true);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const toggleDepartmentUser = () => {
    setIsDepartment(!isDepartment);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: '10px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'red', fontWeight: 'bold' }}>
          CertEx
        </Typography>
        {isDepartment ? (
          <></> // No options shown when isDepartment is true
        ) : (
          <>
            <Button
              color="inherit"
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              sx={{
                color: hoverIndex === 0 ? 'blue' : 'inherit',
                borderBottom: hoverIndex === 0 ? '2px solid blue' : 'none',
              }}
            >
              {hoverIndex === 0 && <HomeIcon sx={{ marginRight: 1 }} />}
              Available Certifications
            </Button>
            <Button
              color="inherit"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              sx={{
                color: hoverIndex === 1 ? 'blue' : 'inherit',
                borderBottom: hoverIndex === 1 ? '2px solid blue' : 'none',
              }}
            >
              {hoverIndex === 1 && <DashboardIcon sx={{ marginRight: 1 }} />}
              User Dashboard
            </Button>
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          startIcon={isDepartment ? <DepartmentIcon /> : <UserIcon />}
          onClick={toggleDepartmentUser}
          sx={{ marginRight: 2 }}
        >
          {isDepartment ? 'User' : 'Department'}
        </Button>
        {/* <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton> */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
