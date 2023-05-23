import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import { Link } from 'react-router-dom'


function NavigaionBar() {
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                <Button variant='contained' sx={{ color: 'white', mr: '15px' }} component={Link} to="/">Example Button</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavigaionBar