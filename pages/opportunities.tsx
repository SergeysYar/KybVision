import React from 'react'
import { opportunities } from '../data/opportunities'

export default function Opportunities(){
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Возможности</h2>
        <div className="grid grid-cols-1 gap-4">
          {opportunities.map(o=> (
            <div key={o.id} className="card p-4">
              <div className="font-medium">{o.title}</div>
              <div className="text-sm text-gray-600">{o.type} — {o.date}</div>
              <div className="mt-2 text-sm">{o.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
