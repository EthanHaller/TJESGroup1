import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from '@mui/material'
import { Link, Outlet, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

function NavigationBar() {
    const params = useParams();
    const userId = params.id;

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                <IconButton component={Link} to={"/" + userId + "/home"}>
                    <HomeIcon sx={{ color: 'white' }} />
                </IconButton>
                <Typography variant='body2'>{userId}</Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button variant='contained' sx={{ color: 'white', mr: '15px' }} component={Link} to="/">Logout</Button>
                </Toolbar>
            </AppBar>
            <div style={{ height: '90px' }}></div>
            <Outlet />
        </React.Fragment>
    )
}

export default NavigationBar