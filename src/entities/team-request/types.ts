export type TeamRequestStatus = 'active' | 'closed' | 'moderation'
export type TeamRole = 'developer' | 'designer' | 'marketer' | 'analyst' | 'idea_author' | 'mentor'

export interface TeamRequest {
  id: string
  userId?: string
  userName: string
  role: TeamRole
  description: string
  contacts?: { telegram?: string; email?: string }
  status: TeamRequestStatus
  createdAt: string
  projectTitle?: string
  lookingFor?: TeamRole
  skills?: string[]
}
