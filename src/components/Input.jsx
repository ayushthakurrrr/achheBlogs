import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef((
  {
    type = 'text',
    placeholder,
    label,
    classname = '',
    ...props
  }, ref) => {

  const id = useId()
  return (
    <div>
      {label && <label htmlFor='id'>{label}</label>}
      <input type={type} id={id} placeholder={placeholder} className={`${classname}`} ref={ref} {...props}  />
    </div>
  )
})

export default Input