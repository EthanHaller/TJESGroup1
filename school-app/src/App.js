import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Typography variant='h2'>{currentUser}</Typography>
      <Outlet />
    </React.Fragment>
  );
}

export default App;
