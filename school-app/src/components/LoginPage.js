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

    function usernameExists() {

    }

    function passwordMatches() {
        
    }
}

export default LoginPage