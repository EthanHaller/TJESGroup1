import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from '@mui/material'
import { Link, Outlet, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import db from '../Firebase'
import { doc, getDoc } from 'firebase/firestore';


function NavigationBar() {
    const params = useParams();
    const userId = params.id;
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        getUser( userId )
            .then(user => {
                setCurrentUser(user)
            })
    },[userId])

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                <IconButton component={Link} to={"/" + userId + "/home"}>
                    <HomeIcon sx={{ color: 'white' }} />
                </IconButton>
                <Typography variant='body1'>{currentUser && ("Welcome, " + currentUser.username)}</Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button variant='contained' sx={{ color: 'white', mr: '15px' }} component={Link} to="/">Logout</Button>
                </Toolbar>
            </AppBar>
            <div style={{ height: '90px' }}></div>
            <Outlet />
        </React.Fragment>
    )
}

async function getUser( id ) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    const cUser = {
        "username": docSnap.data().username,
        "role": docSnap.data().role
    }
    return (cUser)
}

export default NavigationBar