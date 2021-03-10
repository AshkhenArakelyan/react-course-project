import React, {useState} from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);

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
