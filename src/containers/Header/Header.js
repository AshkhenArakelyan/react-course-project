import React from 'react';
import NavLink from 'components/NavLink/NavLink';

import logo from 'assets/logo.webp';

import './Header.scss';
import { ExpandLessOutlined } from '@material-ui/icons';

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
    {
        title: 'Auth',
        to: '/auth'
    },
]
class Header extends React.Component {
    render () {
        return (
            <nav className="app-nav">
                <ul className="app-nav__list">
                    {headerLinks.map(el => {
                        return <li key={el.title}><NavLink to={el.to}>{el.title}</NavLink></li>
                    })}
                </ul>
            </nav>
        )
    }
}

export default Header;