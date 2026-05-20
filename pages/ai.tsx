import React, { useState } from 'react'
import { aiScenarios } from '../data/aiScenarios'
import AiMessage from '../components/AiMessage'
import { Button } from '../components/Button'

export default function AiPage(){
  const [q, setQ] = useState('')
  const [history, setHistory] = useState<Array<{text:string, fromUser?:boolean}>>([])

  const ask = () => {
    const text = q.trim().toLowerCase()
    if(!text) return
    const found = aiScenarios.find(s => s.keywords.some(k => text.includes(k)))
    const answer = found ? found.answer : 'Извини, я не знаю точного ответа. Попробуй переформулировать или спросить про другое.'
    setHistory(h => [...h, { text: q, fromUser: true }, { text: answer }])
    setQ('')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">AI-наставник</h3>
          <div className="space-y-3 mb-3">
            {history.map((m, i)=>(
              <div key={i} className="mb-2"><AiMessage text={m.text} fromUser={!!m.fromUser} /></div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="flex-1 border rounded-md px-3 py-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Задайте вопрос (пример: Что такое MVP?)" />
            <Button onClick={ask}>Спросить</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
