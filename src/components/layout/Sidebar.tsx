"use client"

import Link from 'next/link'
import React from 'react'
import { navigationItems } from '../../shared/constants/navigation'
import { usePathname } from 'next/navigation'
import { isActivePath } from '../../shared/lib/navigation'
import Badge from '../ui/Badge'

export default function Sidebar() {
  const pathname = usePathname() || '/'

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col p-6 bg-white/65 backdrop-blur-xl border-r shadow-lg">
      <div className="mb-6">
        <div className="text-2xl font-bold">КУБ</div>
        <div className="text-sm text-gray-600">От идеи до MVP</div>
      </div>

      <nav aria-label="Главное меню" className="flex-1 overflow-auto">
        <ul className="space-y-2">
          {navigationItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} aria-current={isActivePath(pathname, item.href) ? 'page' : undefined} className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActivePath(pathname, item.href) ? 'bg-gradient-to-r from-blue-50 to-white border border-blue-200 shadow-sm text-slate-800' : 'hover:bg-white/70'}`}>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/30 text-sm font-medium">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.title}</div>
                  {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6">
        <Badge>mvp demo</Badge>
        <div className="mt-2 text-xs text-gray-600">Данные сохраняются локально</div>
      </div>
    </aside>
  )
}
import Link from 'next/link'
import React from 'react'
import { NAVIGATION } from '../../shared/constants/navigation'
import { usePathname } from 'next/navigation'

export const Sidebar: React.FC = () => {
  const path = usePathname() || ''

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 p-4 gap-3">
      <div className="glass p-3">КУБ</div>
      <nav className="mt-4 space-y-2">
        {NAVIGATION.map(item => {
          const active = path === item.href
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 p-2 rounded-md ${active ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}`}>
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
