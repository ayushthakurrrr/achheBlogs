import React from 'react'
import { useId } from 'react'

const Select = ({
    options,
    label,
    className = '',
    ...props
}, ref) => {
    const id = useId();
    return (
        <div>
            <label htmlFor="id"></label>
            <select id={id} {...props} ref={ref} className={`${className}`}>
                {options ? (options.map((item) => (
                    <option key={item} value={item}> {item} </option>
                ))) : (null)}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)