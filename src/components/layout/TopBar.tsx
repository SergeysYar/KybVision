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
    <header className="sticky top-0 z-20 border-b bg-white/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">{title}</div>
          <div className="hidden text-sm text-gray-500 sm:block">Локальное управление</div>
        </div>
        <div className="flex items-center gap-3">
          <Badge>mvp demo</Badge>
          <div className="hidden text-sm text-gray-700 md:block">Даниил</div>
        </div>
      </div>
    </header>
  )
}
