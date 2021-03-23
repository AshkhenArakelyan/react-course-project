import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from 'store/actions/app';

import fbService from 'api/fbService';

import { validateEmail, validatePassword, validateName } from 'utils/validation';

import Input from 'components/Input/Input';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import { Button } from '@material-ui/core';

import './Signup.scss'

const Signup = (props) => {
    const history = useHistory();
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
          }else if (!validateName(credentials.name)) {
            setErrorState({
                nameError: "Name field is required!",
            });
          } else {
                try{
                    setLoading(true);
                    const user = await fbService.signup(credentials);
                    props.setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    history.push('/profile');
                } catch(err) {
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
            <ErrorMessage text={errorState.nameError}/>
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
            <div className="app-auth-signup__button">
                <Button 
                    onClick={handleSignup} 
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >Signup</Button>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.app.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
