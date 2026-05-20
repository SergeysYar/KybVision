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
