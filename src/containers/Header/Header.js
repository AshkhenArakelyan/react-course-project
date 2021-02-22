import React from 'react';
import NavLink from 'components/NavLink/NavLink';

class Header extends React.Component {
    render () {
        return (
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/posts">Posts</NavLink></li>
                    <li><NavLink to="/todos">Todos</NavLink></li>                               
                </ul>
            </nav>
        )
    }
}

export default Header;