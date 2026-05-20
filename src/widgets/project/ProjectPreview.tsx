import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import GlassCard from '../../components/ui/GlassCard'

export const ProjectPreview: React.FC = ()=>{
  return (
    <div>
      <PageTitle title="Карточка проекта" subtitle="Создание и редактирование карточки проекта" />
      <GlassCard>
        <div className="space-y-2">
          <div><strong>Проблема:</strong> заглушка</div>
          <div><strong>Решение:</strong> заглушка</div>
          <div><strong>Ценность:</strong> заглушка</div>
        </div>
      </GlassCard>
    </div>
  )
}

export default ProjectPreview
