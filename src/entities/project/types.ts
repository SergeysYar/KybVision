export type ProjectStage = 'idea' | 'card' | 'team' | 'contest' | 'mvp'

export interface Project {
  id: string
  userId: string
  title: string
  problem: string
  solution: string
  value: string
  audience: string
  stage: ProjectStage
  needsTeam: boolean
  requiredRoles: string[]
  createdAt: string
  updatedAt: string
}
