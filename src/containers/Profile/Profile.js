
import React, {useEffect} from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { removeUser } from 'store/actions/app';

import fbService from 'api/fbService';

import userIcon from 'assets/user-icon.png'
import './Profile.scss';

const Profile = (props) => {
    const history = useHistory();
    const logoutHandle = async (user) => {
        await fbService.logout();
        localStorage.removeItem('user');
        props.removeUser(user);
        history.push('/auth');
    }
    useEffect(() => {
        if(!localStorage.getItem('user')) {
            history.push('/auth');
        }
    }, [])
    return (
        <div className="app-user">
            <div className="app-user__image-container">
                <div className="app-user__image-container__image">
                    <img className="app-user__image-container__image__img" src={userIcon} alt="user-icon" />
                </div>
            </div>
            <h1 className="app-user__name">Welcome to your account {` ${props.user?.displayName ? props.user?.displayName : null}`}!</h1>
            <button className="app-user__logout-button" onClick={logoutHandle}>Log Out</button>
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
        removeUser: (user) => dispatch(removeUser(user))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

