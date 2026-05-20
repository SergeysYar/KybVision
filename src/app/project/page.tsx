'use client'

import { useMemo, useState, type ChangeEvent } from 'react'
import Link from 'next/link'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/ui/PageHeader'
import GlassCard from '../../components/ui/GlassCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import ProgressBar from '../../components/ui/ProgressBar'
import SectionTitle from '../../components/ui/SectionTitle'
import EmptyState from '../../components/ui/EmptyState'
import mockProject from '../../data/mockProject'
import { STORAGE_KEYS, safeReadProject, safeSaveProject } from '../../shared/lib/storage'
import { getProjectRecommendations, getProjectCompleteness, getStageTitle } from '../../shared/lib/mockHelpers'
import type { Project, ProjectStage, TeamRole } from '../../entities/project/types'

const stageOptions: Array<{ label: string; value: ProjectStage }> = [
  { label: 'Идея', value: 'idea' },
  { label: 'Карточка оформляется', value: 'card' },
  { label: 'Сбор команды', value: 'team' },
  { label: 'Подготовка к конкурсу', value: 'contest' },
  { label: 'Прототип / MVP', value: 'mvp' },
]

const roleOptions: Array<{ label: string; value: TeamRole }> = [
  { label: 'Разработчик', value: 'developer' },
  { label: 'Дизайнер', value: 'designer' },
  { label: 'Маркетолог', value: 'marketer' },
  { label: 'Аналитик', value: 'analyst' },
  { label: 'Наставник', value: 'mentor' },
]

const emptyProject: Project = {
  id: '',
  userId: 'u1',
  title: '',
  problem: '',
  solution: '',
  value: '',
  audience: '',
  stage: 'card',
  needsTeam: true,
  requiredRoles: [],
  createdAt: '',
  updatedAt: '',
}

const initialLoader = () => {
  const stored = safeReadProject<Project>(null)
  if (stored) {
    return { form: stored, saved: stored }
  }

  if (mockProject) {
    return { form: mockProject, saved: mockProject }
  }

  return { form: emptyProject, saved: null }
}

export default function ProjectPage() {
  const initial = useMemo<{ form: Project; saved: Project | null }>(initialLoader, [])
  const [form, setForm] = useState<Project>(initial.form)
  const [savedProject, setSavedProject] = useState<Project | null>(initial.saved)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const completeness = useMemo(() => getProjectCompleteness(form), [form])
  const completenessHint = completeness < 60
    ? 'Карточка пока выглядит сырой. Заполните проблему, решение и ценность.'
    : completeness >= 80
      ? 'Карточка достаточно заполнена для поиска команды и подбора возможностей.'
      : 'Пошагово заполните проект, чтобы лучше подготовиться к поиску команды и возможностей.'

  const recommendations = useMemo(() => getProjectRecommendations(form.stage), [form.stage])

  const hasAnyData = Boolean(
    form.title.trim() || form.problem.trim() || form.solution.trim() || form.value.trim() || form.audience.trim()
  )

  const hasSavedProject = Boolean(savedProject)

  const handleField = (key: keyof Project, value: string | boolean | TeamRole[]) => {
    setForm((prev: Project) => {
      const next = { ...prev } as Project
      if (key === 'needsTeam') {
        next.needsTeam = Boolean(value)
        if (!next.needsTeam) {
          next.requiredRoles = []
        }
      } else if (key === 'requiredRoles') {
        next.requiredRoles = value as TeamRole[]
      } else if (key === 'stage') {
        next.stage = value as ProjectStage
      } else {
        next[key] = value as any
      }
      return next
    })
  }

  const toggleRole = (role: TeamRole) => {
    setForm((prev: Project) => {
      const nextRoles = prev.requiredRoles.includes(role)
        ? prev.requiredRoles.filter((item: TeamRole) => item !== role)
        : [...prev.requiredRoles, role]
      return { ...prev, requiredRoles: nextRoles }
    })
  }

  const validateForm = () => {
    const nextErrors: Record<string, string> = {}
    if (!form.title.trim()) nextErrors.title = 'Название проекта обязательно.'
    else if (form.title.trim().length < 3) nextErrors.title = 'Название слишком короткое.'

    if (!form.problem.trim()) nextErrors.problem = 'Поле «Проблема» обязательно.'
    if (!form.solution.trim()) nextErrors.solution = 'Поле «Решение» обязательно.'
    if (!form.value.trim()) nextErrors.value = 'Поле «Ценность» обязательно.'
    if (!form.audience.trim()) nextErrors.audience = 'Поле «Кому нужен проект» обязательно.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    const now = new Date().toISOString()
    const id = form.id || (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `project-demo-${Date.now()}`)

    const projectToSave: Project = {
      ...form,
      id,
      userId: form.userId || 'u1',
      updatedAt: now,
      createdAt: form.createdAt || now,
    }

    safeSaveProject(projectToSave)
    setForm(projectToSave)
    setSavedProject(projectToSave)
    setSuccessMessage('Карточка проекта сохранена')

    setTimeout(() => {
      setSuccessMessage('')
    }, 3200)
  }

  const handleReset = () => {
    setForm(emptyProject)
    setErrors({})
    setSuccessMessage('')
  }

  const handleDelete = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEYS.PROJECT)
      }
    } catch {
      // ignore
    }
    setForm(emptyProject)
    setSavedProject(null)
    setErrors({})
    setSuccessMessage('Сохранённая карточка удалена')
    setTimeout(() => setSuccessMessage(''), 3200)
  }

  const problemWarning = form.problem.trim().length > 0 && form.problem.trim().length < 20
    ? 'Проблему лучше описать подробнее.'
    : ''
  const solutionWarning = form.solution.trim().length > 0 && form.solution.trim().length < 20
    ? 'Решение лучше описать подробнее.'
    : ''

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader
        title="Карточка проекта"
        description="Оформите идею так, чтобы по ней можно было найти команду, подобрать конкурс и подготовить MVP."
        badge="MVP demo"
      />

      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr]">
        <GlassCard className="p-6">
          <div className="space-y-6">
            <SectionTitle title="Основная идея" description="Начните с ключевых данных проекта." />
            <div className="grid gap-4">
              <Input
                label="Название проекта"
                placeholder="Например: Навигатор студенческих инициатив"
                value={form.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleField('title', e.target.value)}
                error={errors.title}
              />
              <Input
                label="Кому нужен проект"
                placeholder="Например: студентам, школьникам, проектным командам"
                value={form.audience}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleField('audience', e.target.value)}
                hint="Укажите целевую аудиторию или пользователей проекта."
                error={errors.audience}
              />
            </div>

            <SectionTitle title="Проблема и решение" description="Опишите, что именно вы хотите изменить." />
            <div className="grid gap-4">
              <Textarea
                label="Проблема"
                placeholder="Опишите, кому и почему сейчас сложно"
                value={form.problem}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleField('problem', e.target.value)}
                hint="Хорошая формулировка проблемы отвечает на вопрос: кому сейчас сложно и почему."
                error={errors.problem || problemWarning}
                rows={4}
              />
              <Textarea
                label="Решение"
                placeholder="Опишите, что предлагает ваш проект"
                value={form.solution}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleField('solution', e.target.value)}
                hint="Не описывайте всё приложение сразу. Опишите главный механизм решения."
                error={errors.solution || solutionWarning}
                rows={4}
              />
              <Textarea
                label="Ценность"
                placeholder="Какую пользу получит пользователь, команда или организация"
                value={form.value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleField('value', e.target.value)}
                hint="Ценность — это измеримая или понятная польза для пользователя."
                error={errors.value}
                rows={4}
              />
            </div>

            <SectionTitle title="Стадия и команда" description="Определите, что нужно проекту сейчас." />
            <div className="grid gap-4">
              <Select
                label="Стадия проекта"
                value={form.stage}
                options={stageOptions}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleField('stage', e.target.value as ProjectStage)}
              />
              <Select
                label="Нужны ли люди в команде"
                value={form.needsTeam ? 'yes' : 'no'}
                options={[
                  { label: 'Да, нужны', value: 'yes' },
                  { label: 'Нет, команда уже есть', value: 'no' },
                ]}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleField('needsTeam', e.target.value === 'yes')}
              />
              {form.needsTeam && (
                <div className="rounded-3xl border border-[var(--border)] bg-white p-4">
                  <div className="mb-3 text-sm font-semibold">Какие роли нужны</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {roleOptions.map(role => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => toggleRole(role.value)}
                        className={`rounded-2xl border px-4 py-2 text-left transition ${
                          form.requiredRoles.includes(role.value)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 bg-white hover:border-primary/50'
                        }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                  {form.needsTeam && form.requiredRoles.length === 0 && (
                    <div className="text-xs text-gray-500 mt-3">Выберите хотя бы одну роль, чтобы заявка на поиск команды была точнее.</div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">Заполненность карточки</div>
                  <div className="text-lg font-semibold">{completeness}%</div>
                </div>
                <Badge variant={completeness >= 80 ? 'green' : completeness >= 60 ? 'blue' : 'gray'}>
                  {completeness >= 80 ? 'Готова' : completeness >= 60 ? 'В процессе' : 'Начало'}
                </Badge>
              </div>
              <div className="mt-4">
                <ProgressBar value={completeness} label={`Заполнено ${completeness}%`} />
                <div className="mt-3 text-sm text-gray-600">{completenessHint}</div>
              </div>
            </div>

            {successMessage && (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{successMessage}</div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSave}>Сохранить карточку</Button>
                <Button variant="secondary" onClick={handleReset}>Сбросить форму</Button>
                {hasSavedProject && (
                  <Button variant="ghost" onClick={handleDelete}>Удалить сохранённую карточку</Button>
                )}
              </div>
              <div className="text-sm text-gray-500">Последнее сохранение: {savedProject?.updatedAt ? new Date(savedProject.updatedAt).toLocaleDateString('ru-RU') : 'нет'}</div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle title="Preview карточки" description="Как будет выглядеть ваш проект." />
            {hasAnyData ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">{form.title || 'Название проекта'}</div>
                    <div className="text-sm text-gray-500 mt-1">Стадия: {getStageTitle(form.stage)}</div>
                  </div>
                  <Badge variant={form.needsTeam ? 'orange' : 'green'}>{form.needsTeam ? 'Нужна команда' : 'Команда есть'}</Badge>
                </div>
                <div className="grid gap-3">
                  <div className="text-sm text-gray-600"><span className="font-semibold">Кому нужен:</span> {form.audience || '...'} </div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Проблема:</span> {form.problem || 'Опишите проблему'} </div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Решение:</span> {form.solution || 'Опишите решение'} </div>
                  <div className="text-sm text-gray-600"><span className="font-semibold">Ценность:</span> {form.value || 'Опишите ценность'} </div>
                  {form.needsTeam && form.requiredRoles.length > 0 && (
                    <div className="text-sm text-gray-600"><span className="font-semibold">Роли:</span> {form.requiredRoles.map(role => roleOptions.find(item => item.value === role)?.label).filter(Boolean).join(', ')}</div>
                  )}
                </div>
              </div>
            ) : (
              <EmptyState
                title="Карточка ещё не сохранена"
                description="Заполните основные поля и сохраните проект, чтобы увидеть preview."
                action={{
                  label: 'Сохранить карточку',
                  onClick: handleSave,
                }}
              />
            )}
          </Card>

          <Card className="p-6">
            <SectionTitle title="Рекомендации по стадии" description="Что стоит сделать сейчас." />
            <div className="space-y-4">
              {recommendations.map(item => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-base font-semibold text-slate-900">{item.title}</div>
                  <div className="mt-2 text-sm text-gray-600">{item.description}</div>
                  <div className="mt-4">
                    <Link href={item.route}><Button variant="secondary" size="sm">Перейти</Button></Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle title="Быстрые переходы" description="Сделать прямо сейчас." />
            <div className="grid gap-3">
              <Link href="/opportunities"><Button>Подобрать возможности</Button></Link>
              {form.needsTeam && <Link href="/team"><Button variant="secondary">Найти команду</Button></Link>}
              <Link href="/ai"><Button variant="secondary">Спросить AI-наставника</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
