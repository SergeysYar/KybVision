'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/ui/PageHeader'
import GlassCard from '../../components/ui/GlassCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import StepRoadmap from '../../components/ui/StepRoadmap'
import SectionTitle from '../../components/ui/SectionTitle'
import EmptyState from '../../components/ui/EmptyState'
import mockUser from '../../data/mockUser'
import { mockProject } from '../../data/mockProject'
import {
  getCurrentTrack,
  hasStoredTrack,
  getCurrentProject,
  getRoadmapStepStatus,
  getStageTitle,
  getDashboardTip,
  getRelevantOpportunities,
  getProjectProgress,
  getNextStepByProjectStage,
} from '../../shared/lib/mockHelpers'
import type { ProjectStage } from '../../entities/project/types'
import type { Opportunity } from '../../entities/opportunity/types'

const roadmapSteps = [
  { id: 'idea', title: 'Идея', description: 'Выбрать направление' },
  { id: 'card', title: 'Карточка', description: 'Описать проблему и решение' },
  { id: 'team', title: 'Команда', description: 'Найти роли' },
  { id: 'contest', title: 'Конкурс', description: 'Выбрать площадку' },
  { id: 'mvp', title: 'MVP', description: 'Показать первую версию' },
]

const actionCards = [
  {
    title: 'Заполнить карточку проекта',
    description: 'Опишите проблему, решение и ценность проекта.',
    href: '/project',
    label: 'Заполнить',
  },
  {
    title: 'Найти разработчика',
    description: 'Создайте заявку и укажите, кто нужен в команду.',
    href: '/team',
    label: 'К команде',
  },
  {
    title: 'Посмотреть подходящий хакатон',
    description: 'Выберите ближайшее событие для вашего трека.',
    href: '/opportunities',
    label: 'Смотреть',
  },
]

const opportunityBadgeVariant: Record<Opportunity['type'], 'blue' | 'purple' | 'orange' | 'gray' | 'green' | 'red'> = {
  grant: 'blue',
  contest: 'purple',
  hackathon: 'orange',
  event: 'gray',
  club: 'green',
  accelerator: 'red',
}

const stageBadgeVariant: Record<ProjectStage, 'gray' | 'blue' | 'green' | 'orange' | 'purple' | 'red'> = {
  idea: 'gray',
  card: 'blue',
  team: 'orange',
  contest: 'purple',
  mvp: 'green',
}

export default function DashboardPage() {
  const router = useRouter()
  const track = getCurrentTrack(mockUser.track)
  const hasTrack = hasStoredTrack()
  const storedProject = getCurrentProject(mockProject)
  const project = storedProject ?? mockProject
  const hasProject = storedProject !== null
  const stage = project.stage ?? (mockUser.projectStage ?? 'card')

  const progress = getProjectProgress(stage)
  const stageTitle = getStageTitle(stage)
  const nextStep = getNextStepByProjectStage(stage)
  const aiTip = getDashboardTip(stage)
  const relatedOpportunities = getRelevantOpportunities(track, 3)

  const todayFocus = useMemo(() => {
    return {
      step: nextStep,
      opportunity: relatedOpportunities[0]?.title ?? 'Найдите ближайшее событие для проекта',
      role: project.requiredRoles[0] ? `Найдите ${project.requiredRoles[0]}` : 'Найдите участника команды',
    }
  }, [nextStep, relatedOpportunities, project.requiredRoles])

  const roadmap = useMemo(
    () => roadmapSteps.map(item => ({
      ...item,
      status: getRoadmapStepStatus(stage, item.id as ProjectStage),
    })),
    [stage]
  )

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader
        title="Центр управления проектом"
        description="КУБ показывает твой трек, этап, следующий шаг и подходящие возможности."
        badge="КУБ"
        action={
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link href="/project"><Button variant="secondary">Карточка проекта</Button></Link>
            <Link href="/team"><Button variant="secondary">Найти команду</Button></Link>
            <Link href="/opportunities"><Button variant="secondary">Возможности</Button></Link>
          </div>
        }
      />

      <GlassCard className="grid gap-6 lg:grid-cols-[1.75fr_1fr] p-8 bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="space-y-4">
          <div className="text-sm text-gray-500">Привет, {mockUser.name}</div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold">Твой трек: {track}</div>
              <div className="mt-2 text-sm text-gray-600 max-w-2xl">
                КУБ собрал для тебя следующий шаг, подходящие возможности и маршрут до MVP.
              </div>
            </div>
            <Badge variant={track === 'Новичок' ? 'gray' : track === 'Есть идея' ? 'blue' : 'green'}>{track}</Badge>
          </div>
          {!hasTrack && (
            <div className="text-sm text-gray-600">Трек можно уточнить после прохождения теста.</div>
          )}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Сегодня в фокусе</div>
              <div className="mt-3 font-semibold">{todayFocus.step}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Возможность</div>
              <div className="mt-3 font-semibold">{todayFocus.opportunity}</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Роль</div>
              <div className="mt-3 font-semibold">{todayFocus.role}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Маршрут активен</div>
          <div className="mt-4 text-sm text-gray-600">Следующий этап для твоего проекта уже выделен. Пройдите шаги по очереди и используйте советы КУБа.</div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="rounded-3xl bg-slate-100 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Текущий этап</div>
              <div className="mt-2 font-semibold text-slate-900">{stageTitle}</div>
            </div>
            <div className="rounded-3xl bg-slate-100 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Следующий шаг</div>
              <div className="mt-2 font-semibold text-slate-900">{nextStep}</div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr] py-6">
        <div className="space-y-6">
          <GlassCard className="space-y-6 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm text-gray-500">Текущий этап проекта</div>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">{stageTitle}</h2>
                {hasProject ? (
                  <p className="mt-3 text-sm text-gray-600">Проект: {project.title}</p>
                ) : (
                  <p className="mt-3 text-sm text-gray-600">Демо-проект используется для примера. Заполните свою карточку, чтобы получить персональные рекомендации.</p>
                )}
              </div>
              <Badge variant={stageBadgeVariant[stage]}>{stageTitle}</Badge>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-500">Прогресс</div>
              <ProgressBar value={progress} label={`${progress}%`} />
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="text-sm text-gray-500">Следующий шаг</div>
                <div className="mt-2 font-semibold text-slate-900">{nextStep}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">Этап: {stageTitle}</div>
              <Link href="/project"><Button>Открыть карточку проекта</Button></Link>
            </div>
          </GlassCard>

          <Card title="Маршрут до MVP" description="От идеи до рабочего продукта" className="p-6">
            <StepRoadmap steps={roadmap} />
          </Card>

          <Card className="p-6">
            <SectionTitle title="Что сделать дальше?" description="Шаги для следующего этапа" />
            <div className="grid gap-4">
              {actionCards.map(action => (
                <div key={action.title} className="rounded-3xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold">{action.title}</div>
                    <p className="mt-2 text-sm text-gray-600">{action.description}</p>
                  </div>
                  <Link href={action.href}><Button size="sm">{action.label}</Button></Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500">Подсказка AI-наставника</div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">Что посмотреть сейчас</h2>
              </div>
              <Badge variant="green">AI</Badge>
            </div>
            <p className="mt-4 text-sm text-gray-700">{aiTip}</p>
            <div className="mt-6">
              <Link href="/ai"><Button>Задать вопрос</Button></Link>
            </div>
          </GlassCard>

          <Card className="p-6">
            <SectionTitle title="Подходящие возможности" description="События и программы для твоего трека" />
            {relatedOpportunities.length > 0 ? (
              <div className="space-y-4">
                {relatedOpportunities.map(opportunity => (
                  <div key={opportunity.id} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <Badge variant={opportunityBadgeVariant[opportunity.type]}>{opportunity.type}</Badge>
                      <div className="text-sm text-gray-500">{opportunity.date}</div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">{opportunity.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{opportunity.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {opportunity.tags.map(tag => (
                        <Badge key={tag} variant="gray">{tag}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-500">{opportunity.deadlineLabel}</div>
                      <a href={opportunity.url} target="_blank" rel="noreferrer"><Button variant="secondary" size="sm">Открыть</Button></a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Пока нет подходящих возможностей"
                description="Откройте полную ленту или измените трек после повторного теста."
                action={{
                  label: 'Открыть ленту',
                  onClick: () => router.push('/opportunities'),
                }}
              />
            )}
          </Card>
        </div>
      </div>

      <Card title="Быстрые переходы" className="p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/project"><Button>Карточка проекта</Button></Link>
          <Link href="/team"><Button variant="secondary">Найти команду</Button></Link>
          <Link href="/opportunities"><Button variant="secondary">Возможности</Button></Link>
        </div>
      </Card>
    </PageContainer>
  )
}
