"use client"

import React from 'react'
import { cn } from '../../shared/lib/cn'

export interface Option {
  label: string
  value: string
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: Option[]
  hint?: string
  error?: string | boolean
}

export const Select: React.FC<Props> = ({
  label,
  options = [],
  hint,
  error,
  className = '',
  disabled,
  children,
  ...rest
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <select
        className={cn(
          'w-full rounded-2xl border bg-white px-4 py-2',
          error ? 'border-red-400' : 'border-[var(--border)]'
        )}
        disabled={disabled}
        {...rest}
      >
        <option value="">Выберите...</option>
        {options.length > 0
          ? options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
      {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
      {error && typeof error === 'string' && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  )
}

export default Select
