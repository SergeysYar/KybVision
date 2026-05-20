import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export const Button: React.FC<Props> = ({ children, variant = 'primary', className = '', ...rest }) => {
  const base = 'px-4 py-2 rounded-lg font-semibold transition'
  const styles = variant === 'primary' ? 'bg-kubBlue text-white hover:bg-opacity-95' : 'bg-white text-kubBlue border'
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
