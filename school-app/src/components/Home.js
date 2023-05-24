import React, { useState } from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import Events from './Events';

function Home() {
    return (
      <React.Fragment>
        <Box
          style={{
            backgroundImage: "url(https://cdnsm5-ss2.sharpschool.com/UserFiles/Servers/Server_1057363/Image/Custom-Banner/TJES.jpg)",
            backgroundRepeat:"no-repeat",
            backgroundSize: '100vw 100%',
            height: '40vw',
            borderBottomStyle: 'solid'
          }}
        >
          <Typography color='white' sx={{ typography: {xs: 'h5', sm: 'h4', md: 'h3', lg: 'h1'}, p: '50px' }}>Thomas Jefferson Elementary School</Typography>
        </Box>
        <Box pt='50px'>
          <Typography variant='h3' display='flex' justifyContent='center'>Upcoming Events</Typography>
          <Events />
        </Box>
      </React.Fragment>
    );
}

export default Home;