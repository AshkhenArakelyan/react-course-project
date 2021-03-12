import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import Input from 'components/Input/Input';

import './Signup.scss'
import fbService from 'api/fbService';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import { validateEmail, validatePassword } from 'utils/validation';
import { AppContext } from 'context/AppContext';
import { actionTypes } from 'context/actionTypes';

const Signup = () => {
    const history = useHistory();
    const context = useContext(AppContext)
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errorState, setErrorState] = useState({
        nameError: '',
        emailError: '',
        passwordError: ''
    });
    const [loading, setLoading] = useState(false);
    const changeHandler = (e) => {
        setErrorState({
            nameError: '',
            emailError: '',
            passwordError: ''
        })
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleSignup = async () => {
        if (!validateEmail(credentials.email)) {
            setErrorState({
                emailError: "Badly formatted email.",
            });
          } else if (!validatePassword(credentials.password)) {
            setErrorState({
                passwordError: "Password can't contain less then 6 characters",
            });
          } else {
                try{
                    setLoading(true);
                    const user = await fbService.signup(credentials);
                    console.log(user)
                    console.log('Success:', user);
                    context.dispatch({type: actionTypes.SET_USER, payload: {user} });
                    localStorage.setItem('user', JSON.stringify(user));
                    history.push('/profile');
                } catch(err) {
                    console.log('error:' + err);
                    setErrorState({
                        nameError: err.message,
                        emailError: err.message,
                        passwordError: err.message
                    })
                } finally {
                    setLoading(false);
                }
            }   
    }
    return (
        <div className="app-auth-signup">
            <Input 
                name='name'
                value={credentials.name}
                onChange={changeHandler}
                placeholder="Name"
                className="app-auth-signup__input"
                loading={loading}
            />
            <Input 
                name="email"
                value={credentials.email}
                onChange={changeHandler}
                placeholder="Email"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError}/>
            <Input 
                name="password"
                value={credentials.password}
                onChange={changeHandler}
                placeholder="Password"
                className="app-auth-signup__input"
                loading={loading}
                type="password"
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
