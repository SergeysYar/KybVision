export type Track = 'Новичок' | 'Есть идея' | 'Почти проект'

export type ProjectStage = 'idea' | 'card' | 'team' | 'contest' | 'mvp'

export interface User {
  id: string
  name: string
  track: Track
  contacts?: { telegram?: string; email?: string }
  avatarUrl?: string
  projectStage?: ProjectStage
  completedOnboarding?: boolean
  completedTrackTest?: boolean
  createdAt?: string
}
