import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface TotalDataCardProps {
  data: {
    [key: string]: any;
  };
  icons: {
    [key: string]: React.ReactElement;
  };
  labels: {
    [key: string]: string;
  };
}

const TotalDataCard: React.FC<TotalDataCardProps> = ({ data, icons, labels }) => {
  // Check if the data object has meaningful data
  const isEmpty = !data || Object.values(data).every(value => value === '' || value === 0);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '15px',
        boxShadow: 'none',
        width: {
          xs: '90vw', // full width on small screens
          sm: '70vw', // 70% width on small-medium screens
          md: '50vw', // 50% width on medium screens
          lg: '40vw', // 40% width on large screens
        },
        height: {
          xs: '15vh', // 15% height on small screens
          sm: '12vh', // 12% height on small-medium screens
          md: '10vh', // 10% height on medium screens
          lg: '8vh', // 8% height on large screens
        },
        textAlign: 'center',
      }}
    >
      {isEmpty ? (
        <Typography variant="h6" sx={{ color: '#808080' }}>
          No data available.
        </Typography>
      ) : (
        <Grid container spacing={3} alignItems="center">
          {Object.keys(data).map((key, index) => (
            <React.Fragment key={index}>
              <Grid item>
                <Box
                  sx={{
                    backgroundColor: '#7FFFD4',
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {icons[key]}
                </Box>
              </Grid>
              <Grid item sx={{ marginLeft: -2,textAlign:'left'}}>
                <Typography variant="subtitle1" sx={{ color: '#808080' }}>
                  {labels[key]}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20}}>
                  {data[key]}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TotalDataCard;
