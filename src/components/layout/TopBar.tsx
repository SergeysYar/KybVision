import React from 'react'
import { cn } from '../../shared/lib/cn'

export const TopBar: React.FC<{ title?: string; userName?: string }> = ({ title = 'КУБ', userName = 'Даниил' }) => {
  return (
    <div className={cn('w-full flex items-center justify-between py-3 px-4', 'glass')}>
      <div className="font-bold">{title}</div>
      <div className="flex items-center gap-3 text-sm">
        <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded">MVP demo</div>
        <div className="text-gray-700">{userName}</div>
      </div>
    </div>
  )
}

export default TopBar
