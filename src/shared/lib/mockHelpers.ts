import { mockAiScenarios } from '../../data/mockAiScenarios'
import { mockOpportunities } from '../../data/mockOpportunities'
import { mockTeamRequests } from '../../data/mockTeamRequests'
import { dashboardRoadmapSteps, dashboardTips } from '../../data/dashboardMock'
import type { AiScenario } from '../../entities/ai-scenario/types'
import type { Opportunity } from '../../entities/opportunity/types'
import type { TeamRequest } from '../../entities/team-request/types'
import type { Project, ProjectStage } from '../../entities/project/types'
import type { Track } from '../../entities/user/types'
import type { StepStatus } from '../../components/ui/StepRoadmap'

const fallbackScenario: AiScenario = {
  id: 'fallback',
  keywords: [],
  question: 'Я не понял вопрос',
  answer: 'Пока я лучше всего помогаю с MVP, карточкой проекта, командой, конкурсами и следующими шагами. Попробуйте задать вопрос проще или выберите один из быстрых вариантов.',
  category: 'faq',
  quickActionLabel: 'Вернуться к AI',
  relatedRoute: '/ai',
}

export const getOpportunitiesByTrack = (track: 'Новичок' | 'Есть идея' | 'Почти проект'): Opportunity[] => {
  return mockOpportunities.filter(item => item.tracks.includes(track))
}

export const getPublishedOpportunities = (): Opportunity[] => {
  return mockOpportunities.filter(item => item.isPublished)
}

export const getUpcomingOpportunities = (limit = 5): Opportunity[] => {
  return mockOpportunities
    .filter(item => new Date(item.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit)
}

export const getTeamRequestsByStatus = (status: 'active' | 'closed' | 'moderation'): TeamRequest[] => {
  return mockTeamRequests.filter(item => item.status === status)
}

export const getAiScenarioByQuestion = (question: string): AiScenario => {
  const normalized = question.toLowerCase()
  const found = mockAiScenarios.find(s => s.keywords.some(keyword => normalized.includes(keyword.toLowerCase())))
  return found ?? fallbackScenario
}

export const getProjectProgress = (stage: 'idea' | 'card' | 'team' | 'contest' | 'mvp'): number => {
  switch (stage) {
    case 'idea':
      return 20
    case 'card':
      return 40
    case 'team':
      return 60
    case 'contest':
      return 80
    case 'mvp':
      return 100
    default:
      return 0
  }
}

export const getNextStepByProjectStage = (stage: 'idea' | 'card' | 'team' | 'contest' | 'mvp'): string => {
  switch (stage) {
    case 'idea':
      return 'Сформулируйте проблему и решение'
    case 'card':
      return 'Заполните карточку проекта'
    case 'team':
      return 'Найдите недостающих участников'
    case 'contest':
      return 'Выберите конкурс или хакатон'
    case 'mvp':
      return 'Подготовьте демонстрацию MVP'
    default:
      return 'Продолжайте работу над проектом'
  }
}

export const getDashboardRoadmapSteps = (): Array<{ id: string; title: string; description: string; status: StepStatus }> => {
  return dashboardRoadmapSteps
}

export const getCurrentTrack = (fallback: Track): Track => {
  if (typeof window === 'undefined') return fallback || 'Есть идея'
  const stored = window.localStorage.getItem('kub_user_track')
  if (stored === 'Новичок' || stored === 'Есть идея' || stored === 'Почти проект') {
    return stored
  }
  return fallback || 'Есть идея'
}

export const hasStoredTrack = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem('kub_user_track') !== null
}

export const getCurrentProject = (fallback: Project): Project | null => {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem('kub_project')
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Project
    if (parsed && parsed.stage) return parsed
  } catch (e) {
    console.warn('Invalid project in storage', e)
  }
  return null
}

export const getRoadmapStepStatus = (currentStage: ProjectStage, stepId: ProjectStage): StepStatus => {
  const order: ProjectStage[] = ['idea', 'card', 'team', 'contest', 'mvp']
  const currentIndex = order.indexOf(currentStage)
  const stepIndex = order.indexOf(stepId)

  if (stepIndex < currentIndex) return 'completed'
  if (stepIndex === currentIndex) return 'current'
  return 'upcoming'
}

export const getStageTitle = (stage: ProjectStage): string => {
  switch (stage) {
    case 'idea':
      return 'Идея'
    case 'card':
      return 'Оформление идеи'
    case 'team':
      return 'Сбор команды'
    case 'contest':
      return 'Подбор конкурса'
    case 'mvp':
      return 'MVP'
    default:
      return 'Этап проекта'
  }
}

export const getDashboardTip = (stage: ProjectStage): string => {
  switch (stage) {
    case 'idea':
      return 'Начните с простой формулировки проблемы, целевой аудитории и ценности проекта.'
    case 'card':
      return 'Сначала сформулируйте проблему. Хорошая карточка проекта отвечает на три вопроса: кому сложно, что вы предлагаете и какую пользу это даст.'
    case 'team':
      return 'Определите конкретные роли и задачи, чтобы быстрее найти нужных участников.'
    case 'contest':
      return 'Выберите ближайший конкурс или хакатон, где ваш проект легко впишется.'
    case 'mvp':
      return 'Сосредоточьтесь на первой рабочей версии и на том, как её показать экспертам.'
    default:
      return dashboardTips[0] ?? 'Выберите следующий шаг и двигайтесь по маршруту.'
  }
}

export const getRelevantOpportunities = (track: Track, limit = 3): Opportunity[] => {
  return mockOpportunities
    .filter(item => item.isPublished && item.tracks.includes(track))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit)
}
