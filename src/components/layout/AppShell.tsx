"use client"

import React from 'react'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import TopBar from './TopBar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-72">
        <TopBar />
        <main className="px-4 py-6 pb-28 sm:px-6 lg:px-8">{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}
"use client"
import React from 'react'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import TopBar from './TopBar'

export const AppShell: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex bg-transparent">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-3"><TopBar title={title} /></div>
        <main className="flex-1 app-container">{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}

export default AppShell
