import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/ui/PageTitle'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import platformInfo from '../data/platformInfo'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageTitle title="КУБ" subtitle="От идеи до MVP — по понятному маршруту" />
      <p className="mb-4 text-gray-700">Платформа сопровождения школьных и студенческих проектов.</p>
      <div className="mb-6 flex gap-3">
        <Link href="/onboarding"><Button>Начать</Button></Link>
        <Link href="/dashboard"><Button variant="ghost">Открыть demo</Button></Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <GlassCard><div className="font-semibold">Определи трек</div><div className="text-sm text-gray-600">Короткий тест</div></GlassCard>
        <GlassCard><div className="font-semibold">Собери проект</div><div className="text-sm text-gray-600">Карточка проекта и команда</div></GlassCard>
        <GlassCard><div className="font-semibold">Найди возможности</div><div className="text-sm text-gray-600">Хакатоны, гранты, конкурсы</div></GlassCard>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Локальные проектные инициативы</h2>
        <p className="mt-2 text-sm text-gray-600">{platformInfo.ideologistLabel}: {platformInfo.ideologist}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {platformInfo.initiatives.map(initiative => (
            <GlassCard key={initiative.id}>
              <div className="font-semibold">{initiative.title}</div>
              <div className="mt-2 text-sm text-gray-600">{initiative.description}</div>
              <div className="mt-3 text-sm text-gray-700">{initiative.projectLeadLabel}: {initiative.projectLead}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
