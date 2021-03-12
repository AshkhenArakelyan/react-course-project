import { AppContext } from 'context/AppContext';
import React, { useState, useContext, useEffect } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const Auth = () => {
    const context = useContext(AppContext);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
    console.log('context:', context)
       
    })
    const toggleView = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div>
            {isLogin ?
            <Login/>:
            <Signup/>}
            <h3 onClick={toggleView}>{isLogin ? 'go to signup' : 'go to login'}</h3>
        </div>
    )
}

export default Auth
