import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'normal' | 'danger'
}

const Button = (props: Props) => {
  const colors = getColors(props.theme, props.disabled)
  return (
    <button
      {...props}
      className={`
        ${colors}
        p-2 rounded-md
        min-w-20
        ${props.className || ''}`}
    />
  )
}

const getColors = (theme?: 'normal' | 'danger', disabled?: boolean) => {
  if (disabled) {
    return 'bg-gray-200 text-gray-500'
  }
  return theme === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'
}

export default Button
