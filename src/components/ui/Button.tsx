"use client"
import React from 'react'
import { cn } from '../../shared/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button: React.FC<Props> = ({ variant = 'primary', size = 'md', className = '', children, disabled, ...rest }) => {
  const base = 'rounded-2xl font-semibold inline-flex items-center justify-center transition-all transform disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none'
  const sizes: Record<Size,string> = { sm: 'px-3 py-1 text-sm', md: 'px-4 py-2', lg: 'px-5 py-3 text-lg' }

  const variants: Record<Variant,string> = {
    primary: 'text-white shadow-md bg-gradient-to-r from-primary to-[var(--primary-soft)] hover:scale-[1.02] active:scale-[0.99]',
    secondary: 'bg-white border border-[var(--border)] text-foreground hover:bg-gray-50',
    ghost: 'bg-transparent text-primary hover:underline',
    glass: 'bg-[rgba(255,255,255,0.55)] backdrop-blur px-4 py-2 border border-[var(--border)]',
    danger: 'bg-red-500 text-white hover:opacity-95'
  }

  return (
    <button
      type={rest.type || 'button'}
      disabled={disabled}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
import React from 'react'
import { cn } from '../../shared/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button: React.FC<Props> = ({ variant = 'primary', size = 'md', className, children, disabled, ...rest }) => {
  const base = 'rounded-md font-medium transition inline-flex items-center justify-center'
  const sizes: Record<Size,string> = { sm: 'px-3 py-1 text-sm', md: 'px-4 py-2', lg: 'px-5 py-3 text-lg' }
  const variants: Record<Variant,string> = {
    primary: 'bg-primary text-white hover:opacity-95',
    secondary: 'bg-gray-100 text-foreground hover:bg-gray-200',
    ghost: 'bg-transparent text-primary'
  }
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export default Button
