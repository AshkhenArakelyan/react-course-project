import React from 'react';
import PropTypes, { string } from 'prop-types';

import './Input.scss'

const Input = ({
    type='text',
    value,
    onChange,
    className='',
    loading=false,
    placeholder=''
}) => {
    return (
        <input 
        type={type}
        value={value}
        onChange={onChange}
        className={`app-input ${className}`}
        disabled={loading}
        placeholder={placeholder}
        />
    )
}
Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string
}
export default Input
