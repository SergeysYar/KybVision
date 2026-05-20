"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { navigationItems } from '../../shared/constants/navigation'
import Badge from '../ui/Badge'

function findTitle(pathname: string) {
  const found = navigationItems.find(i => pathname === i.href || pathname.startsWith(`${i.href}/`))
  return found ? found.title : 'КУБ'
}

export default function TopBar() {
  const pathname = usePathname() || '/'
  const title = findTitle(pathname)

  return (
    <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-500 hidden sm:block">Локальное управление</div>
        </div>
        <div className="flex items-center gap-3">
          <Badge>mvp demo</Badge>
          <div className="text-sm text-gray-700 hidden md:block">Даниил</div>
        </div>
      </div>
    </header>
  )
}
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
