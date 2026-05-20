export type AiRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: AiRole
  text: string
  createdAt: string
  scenarioId?: string
  relatedRoute?: string
  category?: string
}
