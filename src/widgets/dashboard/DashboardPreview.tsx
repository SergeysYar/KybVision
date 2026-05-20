import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import GlassCard from '../../components/ui/GlassCard'

export const DashboardPreview: React.FC = ()=>{
  return (
    <div>
      <PageTitle title="Центр управления проектом" subtitle="Трек, этап, следующий шаг и быстрые действия" />
      <GlassCard>
        <div className="text-sm">Твой проект сейчас на этапе: <strong>оформление идеи</strong></div>
      </GlassCard>
    </div>
  )
}

export default DashboardPreview
