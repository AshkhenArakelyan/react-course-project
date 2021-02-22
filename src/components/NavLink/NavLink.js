import React from 'react';

import { NavLink as RouterNavLink} from 'react-router-dom';

import './NavLink.scss'

const NavLink = ( {children, to, className = ''} ) => {
    return (
        <RouterNavLink exact to={to} className={`app-nav-link ${className}`} activeClassName='app-nav-link--active'>
            {children}
        </RouterNavLink>
    )
}

export default NavLink
