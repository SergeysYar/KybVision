"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/ui/PageHeader'
import GlassCard from '../../components/ui/GlassCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import StepRoadmap from '../../components/ui/StepRoadmap'
import EmptyState from '../../components/ui/EmptyState'
import mockUser from '../../data/mockUser'
import mockProject from '../../data/mockProject'
import { getNextStepByProjectStage, getProjectProgress, getRoadmapStepStatus, getStageTitle } from '../../shared/lib/mockHelpers'
import { safeReadLocalStorage, removeKey } from '../../shared/lib/storage'
import type { Project } from '../../entities/project/types'
import type { TeamRequest } from '../../entities/team-request/types'
import type { Track } from '../../entities/user/types'

const TRACK_KEY = 'kub_user_track'
const COMPLETED_TEST_KEY = 'kub_completed_track_test'
const TEST_RESULT_KEY = 'kub_test_result'
const PROJECT_KEY = 'kub_project'
const TEAM_REQUEST_KEY = 'kub_my_team_request'
const AI_HISTORY_KEY = 'kub_ai_chat_history'
const TEST_ANSWERS_KEY = 'kub_test_answers'

const stageDescriptions: Record<Project['stage'], string> = {
  idea: 'Сформулируйте идею и проблему',
  card: 'Заполните карточку проекта',
  team: 'Найдите недостающих участников',
  contest: 'Выберите конкурс, грант или хакатон',
  mvp: 'Подготовьте демонстрацию MVP',
}

const roleLabels: Record<TeamRequest['role'], string> = {
  developer: 'Разработчик',
  designer: 'Дизайнер',
  marketer: 'Маркетолог',
  analyst: 'Аналитик',
  idea_author: 'Автор идеи',
  mentor: 'Наставник',
}

const stageLabels: Record<Project['stage'], string> = {
  idea: 'Идея',
  card: 'Карточка оформляется',
  team: 'Сбор команды',
  contest: 'Подготовка к конкурсу',
  mvp: 'Прототип / MVP',
}

const trackBadgeVariant: Record<Track, 'gray' | 'blue' | 'green'> = {
  Новичок: 'gray',
  'Есть идея': 'blue',
  'Почти проект': 'green',
}

const formatDate = (date?: string) => {
  if (!date) return 'Дата не указана'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return 'Дата не указана'
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(parsed)
}

const getSourceLabel = (source: 'localStorage' | 'mock data') => source === 'localStorage' ? 'localStorage' : 'mock data'

export default function ProfilePage() {
  const [track, setTrack] = useState<Track>(mockUser.track)
  const [trackSource, setTrackSource] = useState<'localStorage' | 'mock data'>('mock data')
  const [completedTrackTest, setCompletedTrackTest] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [project, setProject] = useState<Project>(mockProject)
  const [projectSource, setProjectSource] = useState<'localStorage' | 'mock data'>('mock data')
  const [teamRequest, setTeamRequest] = useState<TeamRequest | null>(null)
  const [hasAiHistory, setHasAiHistory] = useState(false)
  const [hasTestAnswers, setHasTestAnswers] = useState(false)

  useEffect(() => {
    const localTrack = typeof window !== 'undefined' ? window.localStorage.getItem(TRACK_KEY) : null
    if (localTrack === 'Новичок' || localTrack === 'Есть идея' || localTrack === 'Почти проект') {
      setTrack(localTrack)
      setTrackSource('localStorage')
    } else {
      setTrack(mockUser.track)
      setTrackSource('mock data')
    }

    const completed = safeReadLocalStorage<boolean>(COMPLETED_TEST_KEY, false)
    setCompletedTrackTest(completed)

    const result = safeReadLocalStorage<string | null>(TEST_RESULT_KEY, null)
    setTestResult(result)

    const storedProject = safeReadLocalStorage<Project | null>(PROJECT_KEY, null)
    if (storedProject && storedProject.stage) {
      setProject(storedProject)
      setProjectSource('localStorage')
    } else {
      setProject(mockProject)
      setProjectSource('mock data')
    }

    const storedTeamRequest = safeReadLocalStorage<TeamRequest | null>(TEAM_REQUEST_KEY, null)
    setTeamRequest(storedTeamRequest)

    const aiHistory = safeReadLocalStorage<unknown[]>(AI_HISTORY_KEY, [])
    setHasAiHistory(Array.isArray(aiHistory) && aiHistory.length > 0)

    const testAnswers = safeReadLocalStorage<unknown[]>(TEST_ANSWERS_KEY, [])
    setHasTestAnswers(Array.isArray(testAnswers) && testAnswers.length > 0)
  }, [])

  const stage = project?.stage ?? mockUser.projectStage ?? 'card'
  const progress = getProjectProgress(stage)
  const nextStep = getNextStepByProjectStage(stage)

  const roadmapSteps = useMemo(() => {
    const order: Array<Project['stage']> = ['idea', 'card', 'team', 'contest', 'mvp']
    return order.map(step => ({
      id: step,
      title: getStageTitle(step),
      description: stage === step ? stageDescriptions[step] : undefined,
      status: getRoadmapStepStatus(stage, step),
    }))
  }, [stage])

  const contacts = mockUser.contacts
  const hasContacts = Boolean(contacts?.telegram || contacts?.email)
  const hasProject = Boolean(project)
  const hasTeamRequest = Boolean(teamRequest && teamRequest.status)

  const projectDemoBadge = projectSource === 'mock data'
  const profileStatus = stageDescriptions[stage] ?? 'Следующий шаг — заполнить карточку проекта.'

  const handleReset = () => {
    const confirmed = typeof window !== 'undefined' && window.confirm('Сброс demo-данных удалит локальные трек, проект, заявку в команду и историю AI-наставника. Продолжить?')
    if (!confirmed) return

    removeKey(TRACK_KEY)
    removeKey(COMPLETED_TEST_KEY)
    removeKey(TEST_RESULT_KEY)
    removeKey(TEST_ANSWERS_KEY)
    removeKey(PROJECT_KEY)
    removeKey(TEAM_REQUEST_KEY)
    removeKey(AI_HISTORY_KEY)

    setTrack(mockUser.track)
    setTrackSource('mock data')
    setCompletedTrackTest(false)
    setTestResult(null)
    setProject(mockProject)
    setProjectSource('mock data')
    setTeamRequest(null)
    setHasAiHistory(false)
    setHasTestAnswers(false)
    alert('Demo-данные сброшены')
  }

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader title="Профиль" description="Ваш проектный трек, карточки проектов, заявки в команду и прогресс в КУБе." badge="MVP demo" />

      <GlassCard className="mb-6 p-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="text-2xl font-semibold">{mockUser.name}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant={trackBadgeVariant[track]}>{track}</Badge>
              {completedTrackTest ? <Badge variant="green">Тест пройден</Badge> : <Badge variant="gray">Трек не подтверждён</Badge>}
            </div>
            <div className="mt-4 text-sm text-gray-600">{projectDemoBadge ? 'Вы на этапе оформления идеи. Заполните карточку проекта, чтобы получить более точные рекомендации.' : `Вы на этапе ${stageLabels[stage].toLowerCase()}. ${profileStatus}`}</div>
          </div>
          <div className="grid gap-3">
            <Link href="/project"><Button>Открыть проект</Button></Link>
            <Link href="/dashboard"><Button variant="secondary">Перейти в кабинет</Button></Link>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[1.85fr_1fr]">
        <div className="space-y-6">
          <Card title="Информация" className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm text-gray-500">Имя</div>
                <div className="mt-2 text-lg font-semibold">{mockUser.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Трек</div>
                <div className="mt-2"><Badge variant={trackBadgeVariant[track]}>{track}</Badge></div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Контакты</div>
                <div className="mt-2 text-sm text-gray-700">
                  {hasContacts ? (
                    <div className="space-y-1">
                      {contacts?.telegram && <div>Telegram: {contacts.telegram}</div>}
                      {contacts?.email && <div>Email: {contacts.email}</div>}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Контакты не указаны</div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Дата создания</div>
                <div className="mt-2 text-sm text-gray-700">{formatDate(mockUser.createdAt)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Источник данных</div>
                <div className="mt-2 text-sm text-gray-700">{projectSource === 'localStorage' || trackSource === 'localStorage' ? 'localStorage' : 'mock data'}</div>
              </div>
            </div>
          </Card>

          <Card title="Прогресс" className="p-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">Текущий этап</div>
                  <div className="mt-2 text-lg font-semibold">{stageLabels[stage]}</div>
                </div>
                <div className="text-sm text-gray-600">{progress}%</div>
              </div>
              <ProgressBar value={progress} color={stage === 'mvp' ? 'green' : stage === 'team' ? 'orange' : 'blue'} />
              <div className="mt-4">
                <StepRoadmap steps={roadmapSteps} />
              </div>
              <div className="mt-4 text-sm text-gray-600">Следующий шаг: {nextStep}</div>
              <div className="mt-4">
                <Link href="/dashboard"><Button>Открыть dashboard</Button></Link>
              </div>
            </div>
          </Card>

          <Card title="Мои проекты" className="p-6">
            {hasProject ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 flex-wrap">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{projectDemoBadge ? 'demo' : 'основной'}</div>
                    <div className="mt-2 text-lg font-semibold">{project.title}</div>
                    <div className="mt-1 text-sm text-gray-500">{stageLabels[project.stage]}</div>
                  </div>
                  {projectDemoBadge && <Badge variant="gray">demo</Badge>}
                </div>
                <div className="grid gap-3">
                  <div>
                    <div className="text-sm text-gray-500">Проблема</div>
                    <p className="mt-1 text-sm text-gray-700">{project.problem}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Решение</div>
                    <p className="mt-1 text-sm text-gray-700">{project.solution}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Ценность</div>
                    <p className="mt-1 text-sm text-gray-700">{project.value}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.needsTeam && <Badge variant="orange">Нужна команда</Badge>}
                    {project.requiredRoles?.map(role => <Badge key={role}>{roleLabels[role]}</Badge>)}
                  </div>
                  <div className="text-sm text-gray-500">Обновлено: {formatDate(project.updatedAt)}</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/project"><Button>Открыть карточку</Button></Link>
                  <Link href="/opportunities"><Button variant="secondary">Подобрать возможности</Button></Link>
                  {project.needsTeam && <Link href="/team"><Button variant="secondary">Найти команду</Button></Link>}
                </div>
              </div>
            ) : (
              <EmptyState title="Проектов пока нет" description="Создайте карточку проекта, чтобы КУБ смог подобрать возможности." action={{ label: 'Открыть проект', onClick: () => window.location.assign('/project') }} />
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Мои заявки в команду" className="p-6">
            {hasTeamRequest ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-500">Статус: <Badge variant={teamRequest?.status === 'active' ? 'blue' : teamRequest?.status === 'closed' ? 'gray' : 'orange'}>{teamRequest?.status === 'active' ? 'Активна' : teamRequest?.status === 'closed' ? 'Закрыта' : 'На модерации'}</Badge></div>
                <div className="text-sm text-gray-500">Роль</div>
                <div className="text-base font-semibold">{teamRequest && roleLabels[teamRequest.role]}</div>
                {teamRequest?.lookingFor && (
                  <div className="text-sm text-gray-500">Ищет</div>
                )}
                {teamRequest?.lookingFor && <div className="text-base font-semibold">{roleLabels[teamRequest.lookingFor]}</div>}
                <div>
                  <div className="text-sm text-gray-500">Проект</div>
                  <div className="mt-1 text-sm text-gray-700">{teamRequest?.projectTitle ?? 'Не указано'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Описание</div>
                  <div className="mt-1 text-sm text-gray-700">{teamRequest?.description}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Контакты</div>
                  <div className="mt-1 text-sm text-gray-700">{teamRequest?.contacts?.telegram ?? teamRequest?.contacts?.email ?? 'Не указаны'}</div>
                </div>
                {teamRequest?.skills && (
                  <div className="flex flex-wrap gap-2">
                    {teamRequest.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                  </div>
                )}
                <div className="text-sm text-gray-500">Создано: {formatDate(teamRequest?.createdAt)}</div>
                <Link href="/team"><Button>Открыть поиск команды</Button></Link>
              </div>
            ) : (
              <EmptyState title="Заявки пока нет" description="Создайте заявку, чтобы найти разработчика, дизайнера, аналитика, маркетолога или наставника." action={{ label: 'Создать заявку', onClick: () => window.location.assign('/team') }} />
            )}
          </Card>

          <Card title="Demo-данные" className="p-6">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between gap-3"><span>Трек</span><Badge variant={trackSource === 'localStorage' ? 'green' : 'gray'}>{trackSource === 'localStorage' ? 'сохранено' : 'нет данных'}</Badge></div>
              <div className="flex items-center justify-between gap-3"><span>Результат теста</span><Badge variant={testResult ? 'green' : 'gray'}>{testResult ? 'сохранено' : 'нет данных'}</Badge></div>
              <div className="flex items-center justify-between gap-3"><span>Проект</span><Badge variant={projectSource === 'localStorage' ? 'green' : 'gray'}>{projectSource === 'localStorage' ? 'сохранено' : 'demo'}</Badge></div>
              <div className="flex items-center justify-between gap-3"><span>Заявка в команду</span><Badge variant={hasTeamRequest ? 'green' : 'gray'}>{hasTeamRequest ? 'сохранено' : 'нет данных'}</Badge></div>
              <div className="flex items-center justify-between gap-3"><span>История AI-наставника</span><Badge variant={hasAiHistory ? 'green' : 'gray'}>{hasAiHistory ? 'сохранено' : 'нет данных'}</Badge></div>
              <div className="flex items-center justify-between gap-3"><span>Ответы теста</span><Badge variant={hasTestAnswers ? 'green' : 'gray'}>{hasTestAnswers ? 'сохранено' : 'нет данных'}</Badge></div>
            </div>
          </Card>

          <Card title="Сброс demo-данных" className="p-6">
            <div className="text-sm text-gray-600">Сброс удалит локально сохранённый трек, проект, заявку в команду и историю AI-наставника. Mock data останутся доступными.</div>
            <div className="mt-4 flex flex-col gap-3">
              <Button variant="danger" onClick={handleReset}>Сбросить demo-данные</Button>
              <Link href="/onboarding"><Button variant="secondary">Вернуться на старт</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
