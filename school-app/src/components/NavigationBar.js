import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

function NavigationBar({ onLogout }) {

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                <IconButton component={Link} to="/">
                    <HomeIcon sx={{ color: 'white' }} />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button variant='contained' sx={{ color: 'white', mr: '15px' }} onClick={() => onLogout()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavigationBar