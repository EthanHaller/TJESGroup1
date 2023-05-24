import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';

function Home() {
    return (
        <React.Fragment>
          <Grid container wrap='wrap'>
            <Grid item xs={12} sm={6}>
            <Typography variant='h1' sx={{ width: '40%' }}>Thomas Jefferson Elementary School</Typography>
            </Grid>
            <Grid item>
            <img
              src="https://bloximages.newyork1.vip.townnews.com/dailyprogress.com/content/tncms/assets/v3/editorial/f/d3/fd3caa8e-16b8-11e4-8968-0017a43b2370/53d6ed929dcac.image.jpg"
              style={{ height: '100%', width: '100%', margin: '0' }}
              alt=''
            />
            </Grid>
          </Grid>
        </React.Fragment>
    );
}

export default Home;
