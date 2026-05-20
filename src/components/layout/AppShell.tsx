"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import TopBar from './TopBar'
import DemoBanner from '../ui/DemoBanner'
import { safeReadLocalStorage } from '../../shared/lib/storage'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const hideOn = ['/', '/onboarding', '/test']
  const showBanner = !hideOn.includes(pathname) && !safeReadLocalStorage<boolean>('kub_hide_demo_banner', false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-72">
        <TopBar />
        {showBanner && <DemoBanner />}
        <main className="px-4 py-6 pb-28 sm:px-6 lg:px-8">{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}
