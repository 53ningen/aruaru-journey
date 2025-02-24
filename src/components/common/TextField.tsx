import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const TextField = (props: Props) => {
  return (
    <input
      type="text"
      autoComplete="off"
      {...props}
      className={`
        border border-gray-300 
        p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${props.readOnly ? 'bg-gray-100' : ''}
        ${props.className || ''}`}
    />
  )
}

export default TextField
