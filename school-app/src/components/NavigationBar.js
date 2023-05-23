import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'


function NavigationBar() {

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button variant='contained' sx={{ color: 'white', mr: '15px' }} component={Link} to="/login">Login</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavigationBar