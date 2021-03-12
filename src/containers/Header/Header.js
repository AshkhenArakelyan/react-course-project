import React, { useContext } from 'react';
import NavLink from 'components/NavLink/NavLink';

import logo from 'assets/logo.webp';

import './Header.scss';
import { AppContext } from 'context/AppContext';


const headerLinks = [
    {
        title: <img className="app-nav__list__logo" src={logo} alt="logo" />,
        to: '/'
    },
    {
        title: 'Posts',
        to: '/posts'
    },
    {
        title: 'Todos',
        to: '/todos'
    },
    
]
const Header = () => {
    const context = useContext(AppContext);
    console.log(context.state.user);
    return (
        <nav className="app-nav">
            <ul className="app-nav__list">
                {headerLinks.map(el => {
                    return <li key={el.title}><NavLink to={el.to}>{el.title}</NavLink></li>
                })}
                {!context.state.user ?
                    <li key={'auth'}><NavLink to='/auth'>Auth</NavLink></li> : 
                    <li key={'profile'}><NavLink to='/profile'>Profile</NavLink></li>
                }
            </ul>
        </nav>
    )
}

export default Header;