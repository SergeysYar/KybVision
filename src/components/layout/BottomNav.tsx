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
