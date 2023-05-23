import React, { useState } from 'react';
import { Typography } from '@mui/material';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router-dom';
import LoginPage from './LoginPage';

function Home() {
    const [currentUser, setCurrentUser] = useState(null)

    if (!currentUser) return ( <LoginPage setUser={user => setCurrentUser(user)} /> )
    return (
        <React.Fragment>
          <NavigationBar onLogout={() => setCurrentUser(null)} />
          <Outlet />
        </React.Fragment>
    );
}

export default Home;
