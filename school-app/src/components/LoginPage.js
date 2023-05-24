import React, { useState } from 'react'
import { Button, TextField, Snackbar, Alert, Box, Typography } from '@mui/material'
import db from '../Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Navigate } from 'react-router-dom'

function LoginPage({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleShowError = () => {
        setShowError(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowError(false);
    };

    const attemptLogin = () => {
        userAndPasswordMatch(username, password)
    }

    if(currentUser) return ( <Navigate to={"/" + currentUser + "/home"} /> )
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: '25vh', mx: '40%'}}>
            <Typography variant='h4'>Log in</Typography>
            <TextField
                label="Username"
                onChange={changeUsername}
                sx={{ width: '100%', m: '5%' }}
            />
            <TextField
                label="Password"
                onChange={changePassword}
                sx={{ width: '100%', m: '5%' }}
            />
            <Button variant='contained' onClick={() => attemptLogin()} sx={{width: '40%', m: '5%'}}>Login</Button>
            <Snackbar open={showError} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Incorrect username or password!</Alert>
            </Snackbar>
        </Box>
    )

    async function userAndPasswordMatch( username, password ) {
        const users = collection(db, 'users')
        const q = query(users, where('username', '==', username), where('password', '==', password))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setCurrentUser(doc.id)
            return true
        });
        handleShowError();
    }
}

export default LoginPage