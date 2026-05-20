export type ProjectStage = 'idea' | 'card' | 'team' | 'contest' | 'mvp'

export type TeamRole = 'developer' | 'designer' | 'marketer' | 'analyst' | 'mentor'

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
  requiredRoles: TeamRole[]
  createdAt: string
  updatedAt: string
}
