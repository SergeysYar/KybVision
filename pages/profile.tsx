import React from 'react'
import { demoUser } from '../data/user'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Profile(){
  const [user, setUser] = useLocalStorage('kub_user', demoUser)

  const reset = () => {
    if (confirm('Сбросить demo-данные?')) {
      localStorage.clear()
      location.reload()
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="card p-4">
          <h3 className="text-lg font-semibold">Профиль</h3>
          <div className="mt-3 text-sm text-gray-700">Имя: {user.name}</div>
          <div className="text-sm text-gray-700">Трек: {user.track}</div>
          <div className="text-sm text-gray-700">Контакты: {user.contacts?.telegram || user.contacts?.email}</div>
          <div className="mt-4">
            <button className="px-3 py-2 rounded bg-red-500 text-white" onClick={reset}>Сброс demo-данных</button>
          </div>
        </div>
      </div>
    </div>
  )
}
