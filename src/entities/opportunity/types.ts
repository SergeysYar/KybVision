export type OpportunityType = 'grant' | 'contest' | 'hackathon' | 'event' | 'club' | 'accelerator'

export interface Opportunity {
  id: string
  title: string
  type: OpportunityType
  description: string
  date: string
  url?: string
  tracks: Array<'Новичок'|'Есть идея'|'Почти проект'>
  tags: string[]
  isPublished: boolean
  city: string
  format: 'online' | 'offline' | 'hybrid'
  difficulty: 'beginner' | 'middle' | 'advanced'
  deadlineLabel: string
}
