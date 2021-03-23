import React, { useState }from 'react';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { setUser } from 'store/actions/app';

import fbService from 'api/fbService';

import Input from 'components/Input/Input';

import { Button } from '@material-ui/core';

import './Login.scss';

const Login = (props) => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const changeHandler = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value
        })
    }
    const handleLogin = async () => {
        const user = await fbService.login(credentials);
        localStorage.setItem('user', JSON.stringify(user));
        props.setUser(user);
        history.push('/profile');
    }

    return (
        <div className="app-auth-login">
            <Input 
            value={credentials.email}
            onChange={e => changeHandler('email', e.target.value)}
            placeholder="Email"
            className="app-auth-login__input"
            />
            <Input 
            value={credentials.password}
            onChange={e => changeHandler('password', e.target.value)}
            placeholder="Password"
            className="app-auth-login__input"
            type="password"
            />
            <div className="app-auth-login__button">
                <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
