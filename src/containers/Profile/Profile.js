import fbService from 'api/fbService'
import { actionTypes } from 'context/actionTypes';
import { AppContext } from 'context/AppContext';
import React, { useContext } from 'react'
import { useHistory } from 'react-router';

const Profile = () => {
    const history = useHistory();
    const context = useContext(AppContext);
    const logoutHandle = async () => {
        await fbService.logout();
        localStorage.removeItem('user');
        context.dispatch({type: actionTypes.REMOVE_USER});
        history.push('/auth');
    }
    return (
        <div>
            <button onClick={logoutHandle}>Log Out</button>
        </div>
    )
}

export default Profile
