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

    const attemptLogin = (event) => {
        event.preventDefault();
        userAndPasswordMatch(username, password)
    }

    if(currentUser) return ( <Navigate to={"/" + currentUser + "/home"} /> )
    return (
        <>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: '25vh', mx: '40%'}}>
            
            <form onSubmit = {attemptLogin} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h4'>Log in</Typography>
                <TextField
                    error = {showError}
                    label="Username"
                    onChange={changeUsername}
                    sx={{ width: '150%', m: '5%' }}
                />
                <TextField
                    error = {showError}
                    label="Password"
                    onChange={changePassword}
                    type='password'
                    sx={{ width: '150%', m: '5%' }}
                />
                <Button type = "submit" variant='contained' sx={{width: '80%', m: '5%'}}>Login</Button>
            </form>
            <Snackbar open={showError} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Incorrect username or password!</Alert>
            </Snackbar>
        </Box>
        </>
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