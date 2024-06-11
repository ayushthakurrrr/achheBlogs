import React from 'react'

const Button = ({
    Children,
    type = "button",
    textColor = 'white',
    bgColor = 'blue',
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button className={`p-1 ${textColor} ${bgColor} ${className}`} type={type} disabled={disabled} {...props}>{disabled ? <div className='flex justify-center'><div className={`animate-spin rounded-full h-5 w-5 border-t-2 border-white`}></div></div> : Children}</button>
    )
}

export default Button 