"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationItems } from '../../shared/constants/navigation'
import { isActivePath } from '../../shared/lib/navigation'
import Badge from '../ui/Badge'

export default function Sidebar() {
  const pathname = usePathname() || '/'

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r bg-white/65 p-6 shadow-lg backdrop-blur-xl lg:flex">
      <div className="mb-6">
        <div className="text-2xl font-bold">КУБ</div>
        <div className="text-sm text-gray-600">От идеи до MVP</div>
      </div>

      <nav aria-label="Главное меню" className="flex-1 overflow-auto">
        <ul className="space-y-2">
          {navigationItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-2xl p-3 transition-all ${
                  isActivePath(pathname, item.href)
                    ? 'border border-blue-200 bg-gradient-to-r from-blue-50 to-white text-slate-900 shadow-sm'
                    : 'bg-white/40 text-slate-700 hover:bg-white/80 hover:text-slate-900'
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/30 text-sm font-medium">{item.icon}</div>
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
