import React from 'react'

const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = 'font-bold rounded focus:outline-none focus:shadow-outline'
  const variantStyles = {
    primary: 'bg-teal-500 hover:bg-teal-700 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
  }
  const sizeStyles = {
    sm: 'py-1 px-2 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-3 px-6 text-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;