"use client"

import { useEffect, useMemo, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/ui/PageHeader'
import GlassCard from '../../components/ui/GlassCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import EmptyState from '../../components/ui/EmptyState'
import SectionTitle from '../../components/ui/SectionTitle'
import mockOpportunities from '../../data/mockOpportunities'
import mockUser from '../../data/mockUser'
import { getCurrentTrack, getPublishedOpportunities, getRelevantOpportunities } from '../../shared/lib/mockHelpers'
import {
  filterOpportunities,
  formatOpportunityDate,
  getDifficultyLabel,
  getOpportunityFormatLabel,
  getOpportunityTypeLabel,
  isOpportunityForTrack,
  OpportunitySort,
  OpportunityTrackFilter,
  OpportunityTypeFilter,
} from '../../shared/lib/opportunityHelpers'
import type { Opportunity } from '../../entities/opportunity/types'
import type { Track } from '../../entities/user/types'

const typeOptions: Array<{ label: string; value: OpportunityTypeFilter }> = [
  { label: 'Все типы', value: 'all' },
  { label: 'Грант', value: 'grant' },
  { label: 'Конкурс', value: 'contest' },
  { label: 'Хакатон', value: 'hackathon' },
  { label: 'Мероприятие', value: 'event' },
  { label: 'Кружок', value: 'club' },
  { label: 'Акселератор', value: 'accelerator' },
]

const trackOptions: Array<{ label: string; value: OpportunityTrackFilter }> = [
  { label: 'Все треки', value: 'all' },
  { label: 'Мой трек', value: 'my' },
  { label: 'Новичок', value: 'Новичок' },
  { label: 'Есть идея', value: 'Есть идея' },
  { label: 'Почти проект', value: 'Почти проект' },
]

const sortOptions: Array<{ label: string; value: OpportunitySort }> = [
  { label: 'Ближайшие', value: 'nearest' },
  { label: 'Сначала поздние', value: 'latest' },
  { label: 'По типу', value: 'type' },
]

const typeBadgeVariant: Record<Opportunity['type'], 'blue' | 'purple' | 'orange' | 'gray' | 'green' | 'red'> = {
  grant: 'blue',
  contest: 'purple',
  hackathon: 'orange',
  event: 'gray',
  club: 'green',
  accelerator: 'red',
}

const trackBadgeVariant: Record<Track, 'gray' | 'blue' | 'green'> = {
  Новичок: 'gray',
  'Есть идея': 'blue',
  'Почти проект': 'green',
}

const trackTip: Record<Track, string> = {
  Новичок: 'Для трека “Новичок” подходят кружки, встречи и интенсивы, которые помогают сформировать первые шаги.',
  'Есть идея': 'Для трека “Есть идея” сейчас подходят хакатоны, конкурсы проектных идей и интенсивы по упаковке проекта.',
  'Почти проект': 'Для трека “Почти проект” выбирайте гранты, акселераторы и хакатоны с готовым прототипом.',
}

const infoText =
  'Если проект только на уровне идеи, выбирайте интенсивы, кружки и конкурсы идей. Если уже есть описание или прототип, смотрите хакатоны, гранты и акселераторы.'

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<OpportunityTypeFilter>('all')
  const [selectedTrack, setSelectedTrack] = useState<OpportunityTrackFilter>('my')
  const [sortOrder, setSortOrder] = useState<OpportunitySort>('nearest')
  const [currentTrack, setCurrentTrack] = useState<Track>(mockUser.track ?? 'Есть идея')
  const [hasStoredTrack, setHasStoredTrack] = useState(false)

  useEffect(() => {
    const track = getCurrentTrack(mockUser.track)
    setCurrentTrack(track)
    if (typeof window !== 'undefined') {
      setHasStoredTrack(window.localStorage.getItem('kub_user_track') !== null)
    }
  }, [])

  const publishedOpportunities = useMemo(() => getPublishedOpportunities(), [])

  const suitableOpportunities = useMemo(() => {
    return publishedOpportunities.filter(item => item.tracks.includes(currentTrack))
  }, [publishedOpportunities, currentTrack])

  const nearestOpportunity = useMemo(() => {
    return suitableOpportunities
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
  }, [suitableOpportunities])

  const recommendedOpportunities = useMemo(
    () => getRelevantOpportunities(currentTrack, 3),
    [currentTrack]
  )

  const filteredOpportunities = useMemo(
    () =>
      filterOpportunities({
        opportunities: publishedOpportunities,
        type: selectedType,
        track: selectedTrack,
        currentTrack,
        query: searchQuery,
        sort: sortOrder,
      }),
    [publishedOpportunities, selectedType, selectedTrack, currentTrack, searchQuery, sortOrder]
  )

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedTrack('my')
    setSortOrder('nearest')
  }

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader
        title="Возможности"
        description="Подберите конкурсы, гранты, хакатоны и мероприятия под текущий этап проекта."
        badge="Лента MVP"
      />

      <GlassCard className="space-y-6 p-6 mb-6">
        <div className="sm:flex sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-sm text-gray-500">Текущий трек</div>
            <div className="mt-2 flex items-center gap-3 flex-wrap">
              <Badge variant={trackBadgeVariant[currentTrack]}>{currentTrack}</Badge>
              <span className="text-sm text-gray-600">Найдено {suitableOpportunities.length} подходящих событий</span>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Ближайшая</div>
            <div className="mt-2 text-base font-semibold text-slate-900">
              {nearestOpportunity ? `${nearestOpportunity.title} — ${formatOpportunityDate(nearestOpportunity.date)}` : 'Пока нет ближайших событий'}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">{trackTip[currentTrack]}</div>
        {!hasStoredTrack && <div className="text-sm text-gray-500">Трек можно уточнить после прохождения теста.</div>}
      </GlassCard>

      {recommendedOpportunities.length > 0 && (
        <Card title="Рекомендуем для вашего трека" description="События, которые подходят сейчас и скоро." className="mb-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {recommendedOpportunities.map(item => (
              <div key={item.id} className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <Badge variant={typeBadgeVariant[item.type]}>{getOpportunityTypeLabel(item.type)}</Badge>
                  <div className="text-sm text-gray-500">{formatOpportunityDate(item.date)}</div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tracks.map(track => (
                    <Badge key={track} variant={trackBadgeVariant[track]}>{track}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
                  <div className="text-sm text-gray-500">{item.deadlineLabel ?? formatOpportunityDate(item.date)}</div>
                  <Button size="sm" onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}>
                    Перейти
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr] mb-6">
        <GlassCard className="space-y-6 p-6">
          <SectionTitle title="Фильтры" description="Уточните ленту по типу, треку и дате." />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Поиск по названию, описанию или тегам"
            />
            <Select
              label="Тип"
              value={selectedType}
              options={typeOptions}
              onChange={event => setSelectedType(event.target.value as OpportunityTypeFilter)}
            />
            <Select
              label="Трек"
              value={selectedTrack}
              options={trackOptions}
              onChange={event => setSelectedTrack(event.target.value as OpportunityTrackFilter)}
            />
            <Select
              label="Сортировка"
              value={sortOrder}
              options={sortOptions}
              onChange={event => setSortOrder(event.target.value as OpportunitySort)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={resetFilters}>
              Сбросить фильтры
            </Button>
            <div className="text-sm text-gray-500">Поиск работает автоматически при вводе.</div>
          </div>
        </GlassCard>

        <Card title="Как выбрать возможность?" description="Подсказка для вашего проекта">
          <p className="text-sm text-gray-600">{infoText}</p>
        </Card>
      </div>

      {filteredOpportunities.length === 0 ? (
        <EmptyState
          title={publishedOpportunities.length === 0 ? 'Лента пока пуста' : 'Ничего не найдено'}
          description={
            publishedOpportunities.length === 0
              ? 'Администратор сможет добавить события в demo-админке.'
              : 'Попробуйте изменить фильтр по треку, типу или поисковый запрос.'
          }
          action={{ label: 'Сбросить фильтры', onClick: resetFilters }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOpportunities.map(item => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <Badge variant={typeBadgeVariant[item.type]}>{getOpportunityTypeLabel(item.type)}</Badge>
                <div className="text-sm text-gray-500">{formatOpportunityDate(item.date)}</div>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm text-gray-600 min-h-[3rem]">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tracks.map(track => (
                  <Badge key={track} variant={trackBadgeVariant[track]}>{track}</Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
                {item.format && <span>{getOpportunityFormatLabel(item.format)}</span>}
                {item.difficulty && <span>{getDifficultyLabel(item.difficulty)}</span>}
                {item.city && <span>{item.city}</span>}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="gray" className="text-xs px-2 py-1">{tag}</Badge>
                ))}
              </div>
              <div className="mt-6">
                {item.url ? (
                  <Button size="sm" onClick={() => window.open(item.url, '_blank', 'noopener')}>
                    Перейти
                  </Button>
                ) : (
                  <Button size="sm" disabled>
                    Ссылка скоро появится
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
