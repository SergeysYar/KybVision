"use client"
import React from 'react'
import { cn } from '../../shared/lib/cn'

export interface Option { label: string; value: string }

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  hint?: string
  error?: string | boolean
}

export const Select: React.FC<Props> = ({ label, options, hint, error, className = '', disabled, ...rest }) => {
  return (
    <div className={cn('w-full', className)}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <select className={cn('w-full rounded-2xl border px-4 py-2 bg-white', error ? 'border-red-400' : 'border-[var(--border)]')} disabled={disabled} {...rest}>
        <option value="">Выберите...</option>
        {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
      {error && typeof error === 'string' && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  )
}

export default Select
