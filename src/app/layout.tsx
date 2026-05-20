import './globals.css'
import React from 'react'
import AppShell from '../components/layout/AppShell'

export const metadata = {
  title: 'КУБ — центр управления проектом',
  description: 'От идеи до MVP — по понятному маршруту',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
