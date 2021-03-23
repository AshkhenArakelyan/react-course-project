import { AppContext } from 'context/AppContext';
import React, { useState, useContext, useEffect } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import './Auth.scss';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);

    const toggleView = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div className="app-auth">
            <h2 className="app-auth__title">{isLogin ? "Login" : "Sign up"}</h2>
            {isLogin ?
            <Login/>:
            <Signup/>}
            <h3 className="app-auth__form-change-link" onClick={toggleView}>{isLogin ? "Haven't account yet? Sign up" : "Already registered? Login"}</h3>
        </div>
    )
}

export default Auth
