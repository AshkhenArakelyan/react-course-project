import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import Input from 'components/Input/Input';

import './Signup.scss'
import fbService from 'api/fbService';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const Signup = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [errorState, setErrorState] = useState({
        emailError: '',
        passwordError: ''
    });
    const [loading, setLoading] = useState(false);
    const changeHandler = (name, value) => {
        setErrorState({
            emailError: '',
            passwordError: ''
        })
        setCredentials({
            ...credentials,
            [name]: value
        })
    }
    const handleSignup = async () => {
        try{
            setLoading(true);
            const user = await fbService.signup(credentials);
            console.log('Success:' + user);
        } catch(err) {
            console.log('error:' + err);
            setErrorState({
                emailError: err.message
            })
        } finally {
            setLoading(false);
        }
        
    }
    return (
        <div className="app-auth-signup">
            <Input 
                value={credentials.email}
                onChange={e => changeHandler('email', e.target.value)}
                placeholder="Email"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError}/>
            <Input 
                value={credentials.password}
                onChange={e => changeHandler('password', e.target.value)}
                placeholder="Password"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.passwordError}/>
            <Button 
                onClick={handleSignup} 
                variant="contained"
                color="primary"
                disabled={loading}
            >Signup</Button>
        </div>
    )
}

export default Signup
