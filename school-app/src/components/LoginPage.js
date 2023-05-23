import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const attemptLogin = () => {
        if(usernameExists(username) && passwordMatches(username, password)) {
            //login
        }
    }

    return (
        <React.Fragment>
            <TextField
                label="Username"
                onChange={() => changeUsername()}
            />
            <TextField
                label="Password"
                onChange={() => changePassword()}
            />
            <Button onClick={() => attemptLogin()}>Login</Button>
        </React.Fragment>
    )

    function usernameExists( username ) {

    }

    function passwordMatches( username, password ) {

    }
}

export default LoginPage