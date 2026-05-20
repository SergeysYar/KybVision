import React, { useState } from 'react'
import { opportunities } from '../data/opportunities'
import { aiScenarios } from '../data/aiScenarios'

export default function Admin(){
  const [ops] = useState(opportunities)
  const [scenarios] = useState(aiScenarios)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Demo-админка</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="card p-4">
            <h4 className="font-semibold">Возможности ({ops.length})</h4>
            <ul className="mt-3 text-sm space-y-2">
              {ops.map(o=> <li key={o.id}>{o.title} — {o.type}</li>)}
            </ul>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold">AI-сценарии ({scenarios.length})</h4>
            <ul className="mt-3 text-sm space-y-2">
              {scenarios.map(s=> <li key={s.id}>{s.question || s.keywords.join(', ')} → {s.answer.slice(0,60)}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
