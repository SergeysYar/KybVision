import { TeamRequest } from '../types'

export const teamRequests: TeamRequest[] = [
  {
    id: 't1',
    userName: 'Алиса',
    role: 'дизайнер',
    description: 'Нужен UI/UX для мобильной версии',
    contacts: { telegram: '@alisa' },
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 't2',
    userName: 'Иван',
    role: 'разработчик',
    description: 'Нужен фронтендер на React/Next',
    contacts: { email: 'ivan@example.com' },
    status: 'open',
    createdAt: new Date().toISOString()
  }
]
