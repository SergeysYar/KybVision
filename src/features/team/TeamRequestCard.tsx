"use client"
import React from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import type { TeamRequest, TeamRole } from '../../entities/team-request/types'

interface Props {
  request: TeamRequest
  isMine?: boolean
  onPropose: (req: TeamRequest) => void
}

const roleLabels: Record<TeamRole, string> = {
  developer: 'Разработчик',
  designer: 'Дизайнер',
  marketer: 'Маркетолог',
  analyst: 'Аналитик',
  idea_author: 'Автор идеи',
  mentor: 'Наставник',
}

export const TeamRequestCard: React.FC<Props> = ({ request, isMine = false, onPropose }) => {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-gray-500">{request.userName}</div>
          <div className="mt-1 text-lg font-semibold">{request.projectTitle ?? 'Без проекта'}</div>
        </div>
        <div className="text-right">
          <Badge variant={request.status === 'active' ? 'blue' : request.status === 'closed' ? 'gray' : 'orange'}>
            {request.status === 'active' ? 'Активна' : request.status === 'closed' ? 'Закрыта' : 'На модерации'}
          </Badge>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700">{request.description}</div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="gray">{roleLabels[request.role]}</Badge>
        {request.lookingFor && <Badge variant="green">Ищет: {roleLabels[request.lookingFor]}</Badge>}
        {request.skills && request.skills.slice(0,4).map(s => <Badge key={s} variant="gray" className="text-xs px-2 py-1">{s}</Badge>)}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">{request.createdAt}</div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => onPropose(request)}>Предложить себя</Button>
          {isMine && (
            <Badge variant="purple">Ваша заявка</Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

export default TeamRequestCard
