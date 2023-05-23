import React, { useState } from 'react'
import { Button, TextField, Snackbar, Alert } from '@mui/material'
import db from '../Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false)

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
            .then(match => {
                match ? login() : handleShowError()
            })
    }

    const login = () => {
        //
    }

    return (
        <React.Fragment>
            <TextField
                label="Username"
                onChange={changeUsername}
            />
            <TextField
                label="Password"
                onChange={changePassword}
            />
            <Button onClick={() => attemptLogin()}>Login</Button>
            <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Incorrect username or password!</Alert>
            </Snackbar>
        </React.Fragment>
    )

    async function userAndPasswordMatch( username, password ) {
        const users = collection(db, 'users')
        const q = query(users, where('username', '==', username), where('password', '==', password))
        const querySnapshot = await getDocs(q)
        let exists = false
        querySnapshot.forEach((doc) => {
            exists = true
        });
        return exists;
    }
}

export default LoginPage