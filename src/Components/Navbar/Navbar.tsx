import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DepartmentIcon from '@mui/icons-material/Security';
import UserIcon from '@mui/icons-material/Person';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const [isDepartment, setIsDepartment] = useState<boolean>(() => {
    // Retrieve the saved state from localStorage, or default to true
    const savedState = localStorage.getItem('isDepartment');
    return savedState ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    // Save the current state to localStorage whenever it changes
    localStorage.setItem('isDepartment', JSON.stringify(isDepartment));
  }, [isDepartment]);

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
    <AppBar position="static" color="transparent" elevation={0} sx={{ marginBottom: 1, backgroundColor: 'white', borderRadius: '10px', height: 50 }}>
      <Toolbar sx={{ minHeight: '48px' }}> {/* Adjust the minHeight to reduce navbar height */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'red', fontWeight: 'bold', fontSize: '1.2rem' }}>
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
                fontSize: '0.75rem', // Small font size
                padding: '4px 8px', // Reduced padding
                transition: 'font-size 0.3s ease', // Smooth transition
              }}
            >
              {hoverIndex === 0 && <HomeIcon sx={{ marginRight: 0.5, fontSize: '1rem' }} />}
              Available Certifications
            </Button>
            <Button
              color="inherit"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              sx={{
                color: hoverIndex === 1 ? 'blue' : 'inherit',
                borderBottom: hoverIndex === 1 ? '2px solid blue' : 'none',
                fontSize: '0.75rem', // Small font size
                padding: '4px 8px', // Reduced padding
                transition: 'font-size 0.3s ease', // Smooth transition
              }}
            >
              {hoverIndex === 1 && <DashboardIcon sx={{ marginRight: 0.5, fontSize: '1rem' }} />}
              User Dashboard
            </Button>
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          size="small"
          startIcon={isDepartment ? <DepartmentIcon /> : <UserIcon />}
          onClick={toggleDepartmentUser}
          sx={{ marginRight: 2, padding: '4px 8px', fontSize: '0.75rem' }} // Small font size and padding
        >
          {isDepartment ? 'User' : 'Department'}
        </Button>
        <IconButton
          edge="end"
          color="inherit"
          size="small"
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
