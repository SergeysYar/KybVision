"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationItems } from '../../shared/constants/navigation'
import { isActivePath } from '../../shared/lib/navigation'

export default function BottomNav() {
  const pathname = usePathname() || '/'
  const items = navigationItems.filter(i => i.showInBottomNav)

  return (
    <nav aria-label="Навигация" className="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-2 my-2 flex justify-between rounded-2xl border-t bg-white/75 p-2 shadow-md backdrop-blur-xl">
        {items.map(item => {
          const active = isActivePath(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.title}
              className={`flex-1 rounded-lg px-1 py-2 text-center transition-all ${active ? 'bg-blue-50 text-blue-600' : 'bg-white/20 text-slate-700 hover:bg-white/40 hover:text-slate-900'}`}
            >
              <div className="text-sm font-medium">{item.icon}</div>
              <div className="text-xs">{item.title}</div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
