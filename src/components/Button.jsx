import React from 'react'

const Button = ({
    Children,
    type = "button",
    textColor = 'white',
    bgColor = 'blue',
    className = '',
    ...props
}) => {
    return (
        <button className={`${textColor} ${bgColor} ${className}`} type={type} {...props}>{Children}</button>
    )
}

export default Button 