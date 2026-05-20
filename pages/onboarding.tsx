import Link from 'next/link'
import React from 'react'
import { Button } from '../components/Button'

export default function Onboarding() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="card p-8">
          <h1 className="text-2xl font-bold mb-2">Добро пожаловать в КУБ</h1>
          <p className="text-gray-600 mb-4">Платформа помощи школьным и студенческим проектам — от идеи до MVP.</p>
          <div className="flex gap-3">
            <Link href="/test"><Button>Пройти короткий тест</Button></Link>
            <Link href="/dashboard"><Button variant="ghost">Пропустить</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
