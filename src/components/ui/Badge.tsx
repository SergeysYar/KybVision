import React from 'react'

type Variant = 'blue' | 'green' | 'orange' | 'gray' | 'purple' | 'red'

interface Props {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

export const Badge: React.FC<Props> = ({ children, variant = 'gray', className = '' }) => {
  const cls: Record<Variant, string> = {
    blue: 'bg-blue-50 text-blue-700 border border-[var(--border)]',
    green: 'bg-green-50 text-green-700 border border-[var(--border)]',
    orange: 'bg-orange-50 text-orange-700 border border-[var(--border)]',
    gray: 'bg-gray-100 text-gray-700 border border-[var(--border)]',
    purple: 'bg-purple-50 text-purple-700 border border-[var(--border)]',
    red: 'bg-red-50 text-red-700 border border-[var(--border)]',
  }
  return <span className={`px-3 py-1 text-sm rounded-full ${cls[variant]} ${className}`}>{children}</span>
}

export default Badge
