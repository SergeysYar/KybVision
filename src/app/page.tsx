import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/ui/PageTitle'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'

export default function HomePage(){
  return (
    <div className="max-w-4xl mx-auto">
      <PageTitle title="КУБ" subtitle="От идеи до MVP — по понятному маршруту" />
      <p className="mb-4 text-gray-700">Платформа сопровождения школьных и студенческих проектов.</p>
      <div className="flex gap-3 mb-6">
        <Link href="/onboarding"><Button>Начать</Button></Link>
        <Link href="/dashboard"><Button variant="ghost">Открыть demo</Button></Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard><div className="font-semibold">Определи трек</div><div className="text-sm text-gray-600">Короткий тест</div></GlassCard>
        <GlassCard><div className="font-semibold">Собери проект</div><div className="text-sm text-gray-600">Карточка проекта и команда</div></GlassCard>
        <GlassCard><div className="font-semibold">Найди возможности</div><div className="text-sm text-gray-600">Хакатоны, гранты, конкурсы</div></GlassCard>
      </div>
    </div>
  )
}
