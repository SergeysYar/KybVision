import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { demoUser } from '../data/user'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from '../components/Button'

const QUESTIONS = [
  'У вас есть сформулированная идея?','Есть команда?','Есть прототип или MVP?','Планируете участвовать в конкурсах?','Нужны ли вам участники в команду?'
]

export default function TestPage(){
  const [answers, setAnswers] = useState<boolean[]>(Array(QUESTIONS.length).fill(false))
  const [, setUser] = useLocalStorage('kub_user', demoUser)
  const router = useRouter()

  const submit = () => {
    const score = answers.filter(Boolean).length
    let track: any = 'Новичок'
    if (score <=1) track = 'Новичок'
    else if (score <=3) track = 'Есть идея'
    else track = 'Почти проект'
    setUser({ ...demoUser, track })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-3">Короткий тест (5 вопросов)</h2>
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => (
              <label key={i} className="flex items-center gap-3">
                <input type="checkbox" checked={answers[i]} onChange={(e)=>{
                  const copy = [...answers]; copy[i]=e.target.checked; setAnswers(copy)
                }} />
                <span>{q}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={submit}>Посмотреть трек</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
