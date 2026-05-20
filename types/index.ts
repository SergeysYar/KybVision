export type Track = 'Новичок' | 'Есть идея' | 'Почти проект'

export interface User {
  id: string
  name: string
  track: Track
  contacts?: { telegram?: string; email?: string }
  avatar?: string
  projectStage?: string
}

export interface Project {
  id: string
  userId: string
  title: string
  problem: string
  solution: string
  value: string
  audience: string
  stage: string
  needsTeam: boolean
  requiredRoles: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

export type OpportunityType = 'грант' | 'конкурс' | 'хакатон' | 'мероприятие' | 'кружок' | 'акселератор'

export interface Opportunity {
  id: string
  title: string
  type: OpportunityType
  description: string
  date: string
  url?: string
  tracks: Track[]
  tags: string[]
  isPublished: boolean
}

export interface TeamRequest {
  id: string
  userName: string
  role: string
  description: string
  contacts?: { telegram?: string; email?: string }
  status: 'open' | 'closed' | 'draft'
  createdAt: string
}

export interface AiScenario {
  id: string
  keywords: string[]
  question?: string
  answer: string
  category?: string
}
