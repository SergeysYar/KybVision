import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import GlassCard from '../../components/ui/GlassCard'

export const TeamPreview: React.FC = ()=>{
  return (
    <div>
      <PageTitle title="Поиск команды" subtitle="Заявки на поиск участников и фильтры по ролям" />
      <GlassCard>
        <div className="text-sm">Список заявок, вкладка «Моя заявка», форма создания заявки</div>
      </GlassCard>
    </div>
  )
}

export default TeamPreview
