"use client"

import Link from 'next/link'
import React from 'react'
import { navigationItems } from '../../shared/constants/navigation'
import { usePathname } from 'next/navigation'
import { isActivePath } from '../../shared/lib/navigation'

export default function BottomNav() {
  const pathname = usePathname() || '/'
  const items = navigationItems.filter(i => i.showInBottomNav)

  return (
    <nav aria-label="Навигация" className="lg:hidden fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-2 my-2 rounded-2xl bg-white/75 backdrop-blur-xl border-t shadow-md p-2 flex justify-between">
        {items.map(item => {
          const active = isActivePath(pathname, item.href)
          return (
            <Link key={item.href} href={item.href} aria-label={item.title} className={`flex-1 text-center py-2 px-1 rounded-lg transition-all ${active ? 'text-blue-600 bg-blue-50' : 'text-slate-700'}`}>
              <div className="text-sm font-medium">{item.icon}</div>
              <div className="text-xs">{item.title}</div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
"use client"
import Link from 'next/link'
import React from 'react'
import { NAVIGATION } from '../../shared/constants/navigation'
import { usePathname } from 'next/navigation'

export const BottomNav: React.FC = () => {
  const path = usePathname() || ''
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-11/12 lg:hidden">
      <div className="glass p-2 flex justify-between">
        {NAVIGATION.filter(n=>n.showInBottomNav).map(item => {
          const active = path === item.href
          return (
            <Link key={item.href} href={item.href} className={`flex-1 text-center py-2 rounded ${active ? 'bg-blue-50 font-semibold' : ''}`}>
              <div>{item.icon}</div>
              <div className="text-xs">{item.title}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNav
