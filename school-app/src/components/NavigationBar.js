import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Typography, ButtonGroup } from '@mui/material'
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
                <Typography variant='body1' ml='20px' mr='20px'>{currentUser && ("Welcome, " + currentUser.username)}</Typography>
                <ButtonGroup variant="contained">
                    <Button sx={{ color: 'white' }} component={Link} to={"/" + userId + "/classes"}>Class List</Button>
                    <Button sx={{ color: 'white' }} component={Link} to={"/" + userId + "/students"}>Student Directory</Button>
                    <Button sx={{ color: 'white' }} component={Link} to={"/" + userId + "/staff"}>Staff Directory</Button>
                </ButtonGroup>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button variant='contained' sx={{ color: 'white', mr: '15px' }} component={Link} to="/">Logout</Button>
                </Toolbar>
            </AppBar>
            <div style={{ height: '64px' }}></div>
            <Outlet context={currentUser} />
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