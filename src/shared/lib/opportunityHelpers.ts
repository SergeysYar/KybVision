import type { Opportunity } from '../../entities/opportunity/types'
import type { Track } from '../../entities/user/types'

export type OpportunityTypeFilter = Opportunity['type'] | 'all'
export type OpportunityTrackFilter = Track | 'all' | 'my'
export type OpportunitySort = 'nearest' | 'latest' | 'type'

const opportunityTypeLabels: Record<Opportunity['type'], string> = {
  grant: 'Грант',
  contest: 'Конкурс',
  hackathon: 'Хакатон',
  event: 'Мероприятие',
  club: 'Кружок',
  accelerator: 'Акселератор',
}

const opportunityFormatLabels: Record<Opportunity['format'], string> = {
  online: 'Онлайн',
  offline: 'Очно',
  hybrid: 'Смешанный',
}

const difficultyLabels: Record<Opportunity['difficulty'], string> = {
  beginner: 'Для старта',
  middle: 'Средний уровень',
  advanced: 'Продвинутый уровень',
}

export const getOpportunityTypeLabel = (type: Opportunity['type']): string => {
  return opportunityTypeLabels[type] ?? type
}

export const getOpportunityFormatLabel = (format?: Opportunity['format']): string => {
  if (!format) return 'Формат не указан'
  return opportunityFormatLabels[format] ?? format
}

export const getDifficultyLabel = (difficulty?: Opportunity['difficulty']): string => {
  if (!difficulty) return 'Уровень не указан'
  return difficultyLabels[difficulty] ?? difficulty
}

export const formatOpportunityDate = (date?: string): string => {
  if (!date) return 'Дата уточняется'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return 'Дата уточняется'
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(parsed)
}

export const getOpportunitySortValue = (date?: string): number => {
  if (!date) return Number.POSITIVE_INFINITY
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? Number.POSITIVE_INFINITY : parsed.getTime()
}

export const isOpportunityForTrack = (opportunity: Opportunity, track: Track): boolean => {
  return opportunity.tracks.includes(track)
}

export const filterOpportunities = (options: {
  opportunities: Opportunity[]
  type: OpportunityTypeFilter
  track: OpportunityTrackFilter
  currentTrack: Track
  query: string
  sort: OpportunitySort
}): Opportunity[] => {
  const { opportunities, type, track, currentTrack, query, sort } = options
  const queryNormalized = query.trim().toLowerCase()

  let result = opportunities.filter(item => item.isPublished !== false)

  if (type !== 'all') {
    result = result.filter(item => item.type === type)
  }

  if (track !== 'all') {
    const selectedTrack = track === 'my' ? currentTrack : track
    result = result.filter(item => item.tracks.includes(selectedTrack))
  }

  if (queryNormalized.length > 0) {
    result = result.filter(item => {
      const title = item.title.toLowerCase()
      const description = item.description.toLowerCase()
      const tags = item.tags.map(tag => tag.toLowerCase())
      return title.includes(queryNormalized) || description.includes(queryNormalized) || tags.some(tag => tag.includes(queryNormalized))
    })
  }

  if (sort === 'nearest') {
    result = result.slice().sort((a, b) => getOpportunitySortValue(a.date) - getOpportunitySortValue(b.date))
  } else if (sort === 'latest') {
    result = result.slice().sort((a, b) => getOpportunitySortValue(b.date) - getOpportunitySortValue(a.date))
  } else if (sort === 'type') {
    result = result.slice().sort((a, b) => {
      const aLabel = opportunityTypeLabels[a.type] ?? a.type
      const bLabel = opportunityTypeLabels[b.type] ?? b.type
      return aLabel.localeCompare(bLabel, 'ru-RU')
    })
  }

  return result
}
