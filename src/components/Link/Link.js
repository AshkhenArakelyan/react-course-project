import React, { Children } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import './Link.scss'

const Link = ({children, to, className}) => {
    return (
        <RouterLink to={to} className={`app-link ${className}`}>
            { children }
        </RouterLink>
    )
}

export default Link
