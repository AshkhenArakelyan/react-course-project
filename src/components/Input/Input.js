import React from 'react';
import PropTypes, { string } from 'prop-types';

import './Input.scss'

const Input = ({
    name='',
    type='text',
    value,
    onChange,
    className='',
    loading=false,
    placeholder=''
}) => {
    return (
        <input 
        name={name}
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
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string
}
export default Input
