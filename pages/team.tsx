import React from 'react'
import { teamRequests } from '../data/teamRequests'
import { TeamRequest } from '../types'
import { Card } from '../components/Card'

export default function TeamPage(){
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Поиск команды</h2>
        <div className="space-y-3">
          {teamRequests.map((r: TeamRequest)=> (
            <div key={r.id} className="card p-3">
              <div className="font-medium">{r.userName} — {r.role}</div>
              <div className="text-sm text-gray-600">{r.description}</div>
              <div className="text-xs text-gray-500 mt-2">Контакты: {r.contacts?.telegram || r.contacts?.email || '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
