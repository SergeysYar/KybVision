import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import GlassCard from '../../components/ui/GlassCard'

export const AiPreview: React.FC = ()=>{
  return (
    <div>
      <PageTitle title="AI-наставник" subtitle="Сценарный помощник без подключения внешних API" />
      <GlassCard>
        <div className="text-sm">Задавайте вопросы — система отвечает по заранее заданным сценариям.</div>
      </GlassCard>
    </div>
  )
}

export default AiPreview
