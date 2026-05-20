"use client"
import React from 'react'
import { cn } from '../../shared/lib/cn'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string | boolean
}

export const Input: React.FC<Props> = ({ label, hint, error, className = '', disabled, ...rest }) => {
  return (
    <div className={cn('w-full', className)}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        className={cn('w-full rounded-2xl border px-4 py-2 bg-white placeholder:opacity-60',
          error ? 'border-red-400' : 'border-[var(--border)]')}
        disabled={disabled}
        {...rest}
      />
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
      {error && typeof error === 'string' && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  )
}

export default Input
