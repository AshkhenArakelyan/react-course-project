import React from 'react';
import { connect } from 'react-redux';

import NavLink from 'components/NavLink/NavLink';

import logo from 'assets/logo.png';

import './Header.scss';

const Header = (props) => {
    return (
        <nav className="app-nav">
            <ul className="app-nav__list">
                <li key="Homepage">
                    <NavLink to={'/'}>
                        <img className="app-nav__list__logo" src={logo} alt="logo" />
                    </NavLink>
                </li>
                <li key="Pages">
                <NavLink to={'/posts'}>Posts</NavLink>
                <NavLink to={'/todos'}>Todos</NavLink>
                {!props.user ?
                    <NavLink to='/auth'>Auth</NavLink> : 
                    <NavLink to='/profile'>Profile</NavLink>
                } 
                </li>
            </ul>
        </nav>
    )
}
const mapStateToProps = state => {
    return {
        user: state.app.user,
    }
}
export default connect(mapStateToProps, null)(Header);
