import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import GlassCard from '../../components/ui/GlassCard'

export const OpportunitiesPreview: React.FC = ()=>{
  return (
    <div>
      <PageTitle title="Возможности" subtitle="Конкурсы, гранты, хакатоны и мероприятия" />
      <GlassCard>
        <div className="text-sm">Лента возможностей с фильтрами по типу, треку и дате.</div>
      </GlassCard>
    </div>
  )
}

export default OpportunitiesPreview
