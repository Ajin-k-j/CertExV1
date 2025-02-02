import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        height: '20px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffff', // Background color of the footer
        borderTop: '1px solid #e0e0e0', // Optional border on top
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body2" sx={{ color: '#333', fontSize: "10px" }}>
        @Copyright Experion
      </Typography>
    </Box>
  );
};

export default Footer;
