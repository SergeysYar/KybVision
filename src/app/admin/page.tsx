"use client"

import React, { useEffect, useMemo, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/ui/PageHeader'
import GlassCard from '../../components/ui/GlassCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import EmptyState from '../../components/ui/EmptyState'
import SectionTitle from '../../components/ui/SectionTitle'
import Modal from '../../components/ui/Modal'

import mockOpportunities from '../../data/mockOpportunities'
import mockTeamRequests from '../../data/mockTeamRequests'
import mockProject from '../../data/mockProject'
import mockAiScenarios from '../../data/mockAiScenarios'

import { safeReadArrayFromStorage, safeWriteArrayToStorage } from '../../shared/lib/storage'
import type { TeamRequest } from '../../entities/team-request/types'
import type { Project } from '../../entities/project/types'

type TabKey = 'opportunities' | 'teamRequests' | 'projects' | 'aiScenarios'

type Opportunity = {
  id: string
  title: string
  type: string
  description: string
  date: string
  url?: string
  tracks: string[]
  tags: string[]
  isPublished: boolean
  city?: string
  format?: string
  difficulty?: string
  deadlineLabel?: string
}

type AiScenario = {
  id: string
  question: string
  answer: string
  category: string
  keywords: string[]
  quickActionLabel?: string
  relatedRoute?: string
}

const ADMIN_KEYS = {
  OPPORTUNITIES: 'kub_admin_opportunities',
  TEAM_REQUESTS: 'kub_admin_team_requests',
  PROJECTS: 'kub_admin_projects',
  AI_SCENARIOS: 'kub_admin_ai_scenarios',
}

const USER_KEYS = {
  PROJECT: 'kub_project',
  MY_TEAM_REQUEST: 'kub_my_team_request',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('opportunities')

  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [teamRequests, setTeamRequests] = useState<TeamRequest[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [aiScenarios, setAiScenarios] = useState<AiScenario[]>([])

  const [adminNotice, setAdminNotice] = useState<string | null>(null)

  // form state for opportunity
  const [oppForm, setOppForm] = useState<Partial<Opportunity>>({ tracks: [], tags: [], isPublished: false })

  // ai form
  const [aiForm, setAiForm] = useState<Partial<AiScenario>>({ keywords: [] })

  // project modal
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useEffect(() => {
    // init opportunities
    const storedOpp = safeReadArrayFromStorage<Opportunity>(ADMIN_KEYS.OPPORTUNITIES, [])
    if (storedOpp.length === 0) {
      safeWriteArrayToStorage(ADMIN_KEYS.OPPORTUNITIES, mockOpportunities)
      setOpportunities(mockOpportunities)
    } else {
      setOpportunities(storedOpp)
    }

    // team requests: merge admin + user key
    const storedRequests = safeReadArrayFromStorage<TeamRequest>(ADMIN_KEYS.TEAM_REQUESTS, [])
    const userRequest = safeReadArrayFromStorage<TeamRequest>(USER_KEYS.MY_TEAM_REQUEST, [])
    const combinedRequests = [...storedRequests]
    if (Array.isArray(userRequest) && userRequest.length > 0) {
      userRequest.forEach(r => {
        if (!combinedRequests.find(x => x.id === r.id)) combinedRequests.push(r)
      })
    }

    if (combinedRequests.length === 0) {
      safeWriteArrayToStorage(ADMIN_KEYS.TEAM_REQUESTS, mockTeamRequests)
      setTeamRequests(mockTeamRequests)
    } else {
      setTeamRequests(combinedRequests)
    }

    // projects: admin + user project
    const storedProjects = safeReadArrayFromStorage<Project>(ADMIN_KEYS.PROJECTS, [])
    const userProject = safeReadArrayFromStorage<Project>(USER_KEYS.PROJECT, [])
    const mergedProjects = [...storedProjects]
    if (Array.isArray(userProject) && userProject.length > 0) {
      userProject.forEach(p => { if (!mergedProjects.find(x => x.id === p.id)) mergedProjects.push(p) })
    }
    if (mergedProjects.length === 0) {
      safeWriteArrayToStorage(ADMIN_KEYS.PROJECTS, [mockProject])
      setProjects([mockProject])
    } else {
      setProjects(mergedProjects)
    }

    // ai scenarios
    const storedAi = safeReadArrayFromStorage<AiScenario>(ADMIN_KEYS.AI_SCENARIOS, [])
    if (storedAi.length === 0) {
      safeWriteArrayToStorage(ADMIN_KEYS.AI_SCENARIOS, mockAiScenarios)
      setAiScenarios(mockAiScenarios)
    } else {
      setAiScenarios(storedAi)
    }
  }, [])

  // summary counts
  const summary = useMemo(() => ({
    totalOpportunities: opportunities.length,
    publishedOpportunities: opportunities.filter(o => o.isPublished).length,
    teamRequests: teamRequests.length,
    projects: projects.length,
    aiScenarios: aiScenarios.length,
  }), [opportunities, teamRequests, projects, aiScenarios])

  const saveOpportunities = (next: Opportunity[]) => {
    setOpportunities(next)
    safeWriteArrayToStorage(ADMIN_KEYS.OPPORTUNITIES, next)
  }

  const saveTeamRequests = (next: TeamRequest[]) => {
    setTeamRequests(next)
    safeWriteArrayToStorage(ADMIN_KEYS.TEAM_REQUESTS, next)
  }

  const saveProjects = (next: Project[]) => {
    setProjects(next)
    safeWriteArrayToStorage(ADMIN_KEYS.PROJECTS, next)
  }

  const saveAi = (next: AiScenario[]) => {
    setAiScenarios(next)
    safeWriteArrayToStorage(ADMIN_KEYS.AI_SCENARIOS, next)
  }

  // opportunity actions
  const handleAddOpportunity = () => {
    // validation
    if (!oppForm.title || !oppForm.description || !oppForm.date || !oppForm.tracks || oppForm.tracks.length === 0) {
      setAdminNotice('Ошибка: заполните обязательные поля (название, описание, дата, хотя бы один трек).')
      return
    }
    const id = String(Date.now()) + Math.floor(Math.random() * 1000)
    const newOpp: Opportunity = {
      id,
      title: oppForm.title!,
      type: oppForm.type || 'grant',
      description: oppForm.description!,
      date: oppForm.date!,
      url: oppForm.url || '',
      tracks: oppForm.tracks || [],
      tags: oppForm.tags || [],
      isPublished: Boolean(oppForm.isPublished),
      city: oppForm.city,
      format: oppForm.format,
      difficulty: oppForm.difficulty,
      deadlineLabel: oppForm.deadlineLabel,
    }
    const next = [newOpp, ...opportunities]
    saveOpportunities(next)
    setOppForm({ tracks: [], tags: [], isPublished: false })
    setAdminNotice('Возможность добавлена')
  }

  const togglePublish = (id: string) => {
    const next = opportunities.map(o => o.id === id ? { ...o, isPublished: !o.isPublished } : o)
    saveOpportunities(next)
    setAdminNotice('Статус публикации обновлён')
  }

  const deleteOpportunity = (id: string) => {
    const next = opportunities.filter(o => o.id !== id)
    saveOpportunities(next)
    setAdminNotice('Возможность удалена')
  }

  // team request actions
  const setTeamStatus = (id: string, status: TeamRequest['status']) => {
    const next = teamRequests.map(r => r.id === id ? { ...r, status } : r)
    saveTeamRequests(next)
    // if user's request updated, also persist to kub_my_team_request
    const userReq = safeReadArrayFromStorage<TeamRequest>(USER_KEYS.MY_TEAM_REQUEST, [])
    const found = next.find(x => userReq.findIndex(u => u.id === x.id) !== -1)
    if (found) safeWriteArrayToStorage(USER_KEYS.MY_TEAM_REQUEST, [found])
    setAdminNotice('Статус заявки обновлён')
  }

  const deleteTeamRequest = (id: string) => {
    const next = teamRequests.filter(r => r.id !== id)
    saveTeamRequests(next)
    setAdminNotice('Заявка удалена')
  }

  // projects
  const openProjectModal = (p: Project) => setOpenProject(p)
  const closeProjectModal = () => setOpenProject(null)

  const adminReset = () => {
    const ok = typeof window !== 'undefined' && window.confirm('Сбросить данные админки? Это удалит только admin-данные.')
    if (!ok) return
    safeWriteArrayToStorage(ADMIN_KEYS.OPPORTUNITIES, mockOpportunities)
    safeWriteArrayToStorage(ADMIN_KEYS.TEAM_REQUESTS, mockTeamRequests)
    safeWriteArrayToStorage(ADMIN_KEYS.PROJECTS, [mockProject])
    safeWriteArrayToStorage(ADMIN_KEYS.AI_SCENARIOS, mockAiScenarios)
    setOpportunities(mockOpportunities)
    setTeamRequests(mockTeamRequests)
    setProjects([mockProject])
    setAiScenarios(mockAiScenarios)
    setAdminNotice('Данные админки сброшены до demo-состояния')
  }

  // ai actions
  const handleSaveAi = () => {
    if (!aiForm.question || !aiForm.answer || !aiForm.keywords || aiForm.keywords.length === 0) {
      setAdminNotice('Ошибка: заполните вопрос, ответ и ключевые слова')
      return
    }
    if (aiForm.id) {
      const next = aiScenarios.map(a => a.id === aiForm.id ? { ...(a as AiScenario), ...(aiForm as AiScenario) } : a)
      saveAi(next)
      setAdminNotice('Сценарий обновлён')
    } else {
      const id = String(Date.now())
      const newOne: AiScenario = {
        id,
        question: aiForm.question!,
        answer: aiForm.answer!,
        category: aiForm.category || 'faq',
        keywords: aiForm.keywords || [],
        quickActionLabel: aiForm.quickActionLabel,
        relatedRoute: aiForm.relatedRoute,
      }
      saveAi([newOne, ...aiScenarios])
      setAdminNotice('Сценарий добавлен')
    }
    setAiForm({ keywords: [] })
  }

  const handleEditAi = (id: string) => {
    const found = aiScenarios.find(a => a.id === id)
    if (!found) return
    setAiForm(found)
    setActiveTab('aiScenarios')
  }

  const handleDeleteAi = (id: string) => {
    const next = aiScenarios.filter(a => a.id !== id)
    saveAi(next)
    setAdminNotice('Сценарий удалён')
  }

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader title="Demo-админка" description="Локальное управление возможностями, заявками, проектами и сценариями AI-наставника." badge="localStorage" />

      <GlassCard className="mb-6 p-6">
        <div className="grid gap-4 sm:grid-cols-5">
          <div className="col-span-3">
            <div className="text-sm text-gray-500">Статистика админки</div>
            <div className="mt-2 text-2xl font-semibold">Управление demo-данными</div>
          </div>
          <div className="col-span-2 flex items-center justify-end gap-3">
            <Button variant="danger" onClick={adminReset}>Сбросить данные админки</Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">Возможностей</div>
            <div className="mt-1 font-semibold">{summary.totalOpportunities}</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">Опубликовано</div>
            <div className="mt-1 font-semibold">{summary.publishedOpportunities}</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">Заявок команд</div>
            <div className="mt-1 font-semibold">{summary.teamRequests}</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">Проектов</div>
            <div className="mt-1 font-semibold">{summary.projects}</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">AI-сценариев</div>
            <div className="mt-1 font-semibold">{summary.aiScenarios}</div>
          </div>
        </div>
      </GlassCard>

      <div className="mb-4 flex gap-3">
        <Button variant={activeTab === 'opportunities' ? 'primary' : 'ghost'} onClick={() => setActiveTab('opportunities')}>Возможности</Button>
        <Button variant={activeTab === 'teamRequests' ? 'primary' : 'ghost'} onClick={() => setActiveTab('teamRequests')}>Заявки команд</Button>
        <Button variant={activeTab === 'projects' ? 'primary' : 'ghost'} onClick={() => setActiveTab('projects')}>Проекты</Button>
        <Button variant={activeTab === 'aiScenarios' ? 'primary' : 'ghost'} onClick={() => setActiveTab('aiScenarios')}>AI-сценарии</Button>
      </div>

      {adminNotice && <GlassCard className="mb-4 p-3"><div className="text-sm text-green-700">{adminNotice}</div></GlassCard>}

      {/* Opportunities */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          <Card title="Возможности" className="p-6">
            <SectionTitle>Добавить возможность</SectionTitle>
            <div className="grid gap-3">
              <Input placeholder="Название" value={oppForm.title || ''} onChange={e => setOppForm({ ...oppForm, title: e.target.value })} />
              <Select value={oppForm.type || 'grant'} onChange={e => setOppForm({ ...oppForm, type: e.target.value })}>
                <option value="grant">grant</option>
                <option value="contest">contest</option>
                <option value="hackathon">hackathon</option>
                <option value="event">event</option>
                <option value="club">club</option>
                <option value="accelerator">accelerator</option>
              </Select>
              <Textarea placeholder="Описание" value={oppForm.description || ''} onChange={e => setOppForm({ ...oppForm, description: e.target.value })} />
              <Input type="date" value={oppForm.date || ''} onChange={e => setOppForm({ ...oppForm, date: e.target.value })} />
              <Input placeholder="https://example.ru" value={oppForm.url || ''} onChange={e => setOppForm({ ...oppForm, url: e.target.value })} />
              <div className="flex gap-2 items-center">
                <label className="text-sm">Треки:</label>
                {['Новичок', 'Есть идея', 'Почти проект'].map(t => (
                  <label key={t} className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={oppForm.tracks?.includes(t) || false} onChange={e => {
                      const prev = oppForm.tracks || []
                      const nextTracks = e.target.checked ? [...prev, t] : prev.filter(x => x !== t)
                      setOppForm({ ...oppForm, tracks: nextTracks })
                    }} />
                    <span className="text-sm">{t}</span>
                  </label>
                ))}
              </div>
              <Input placeholder="Теги через запятую" value={oppForm.tags?.join(',') || ''} onChange={e => setOppForm({ ...oppForm, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
              <Input placeholder="Город" value={oppForm.city || ''} onChange={e => setOppForm({ ...oppForm, city: e.target.value })} />
              <Select value={oppForm.format || 'online'} onChange={e => setOppForm({ ...oppForm, format: e.target.value })}>
                <option value="online">online</option>
                <option value="offline">offline</option>
                <option value="hybrid">hybrid</option>
              </Select>
              <Select value={oppForm.difficulty || 'beginner'} onChange={e => setOppForm({ ...oppForm, difficulty: e.target.value })}>
                <option value="beginner">beginner</option>
                <option value="middle">middle</option>
                <option value="advanced">advanced</option>
              </Select>
              <div className="flex gap-3">
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!oppForm.isPublished} onChange={e => setOppForm({ ...oppForm, isPublished: e.target.checked })} />Опубликовано</label>
                <Button onClick={handleAddOpportunity}>Добавить возможность</Button>
              </div>
            </div>
          </Card>

          <Card title="Список возможностей" className="p-6">
            <div className="overflow-x-auto">
              {opportunities.length === 0 ? <EmptyState title="Возможностей пока нет" description="Добавьте первую возможность" action={{ label: 'Добавить', onClick: () => setActiveTab('opportunities') }} /> : (
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">Название</th>
                      <th className="py-2">Тип</th>
                      <th className="py-2">Дата</th>
                      <th className="py-2">Треки</th>
                      <th className="py-2">Статус</th>
                      <th className="py-2">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map(o => (
                      <tr key={o.id} className="border-t">
                        <td className="py-2 align-top">{o.title}</td>
                        <td className="py-2 align-top"><Badge>{o.type}</Badge></td>
                        <td className="py-2 align-top">{o.date}</td>
                        <td className="py-2 align-top">{o.tracks.join(', ')}</td>
                        <td className="py-2 align-top">{o.isPublished ? <Badge variant="green">Опубликовано</Badge> : <Badge variant="gray">Скрыто</Badge>}</td>
                        <td className="py-2 align-top">
                          <div className="flex gap-2 flex-wrap">
                            <Button size="sm" onClick={() => togglePublish(o.id)}>{o.isPublished ? 'Скрыть' : 'Опубликовать'}</Button>
                            <Button size="sm" variant="danger" onClick={() => deleteOpportunity(o.id)}>Удалить</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Team requests */}
      {activeTab === 'teamRequests' && (
        <Card title="Заявки команд" className="p-6">
          {teamRequests.length === 0 ? <EmptyState title="Заявки пока нет" description="Когда пользователь создаст заявку, она появится здесь." /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Пользователь</th>
                    <th className="py-2">Роль</th>
                    <th className="py-2">Кого ищет</th>
                    <th className="py-2">Описание</th>
                    <th className="py-2">Контакты</th>
                    <th className="py-2">Статус</th>
                    <th className="py-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {teamRequests.map(r => (
                    <tr key={r.id} className="border-t align-top">
                      <td className="py-2">{r.name ?? r.userName ?? 'Пользователь'}</td>
                      <td className="py-2">{r.role}</td>
                      <td className="py-2">{r.lookingFor ?? '-'}</td>
                      <td className="py-2">{r.description}</td>
                      <td className="py-2">{r.contacts?.telegram ?? r.contacts?.email ?? '-'}</td>
                      <td className="py-2">{r.status === 'active' ? <Badge variant="green">Активна</Badge> : r.status === 'closed' ? <Badge variant="gray">Закрыта</Badge> : <Badge variant="orange">На модерации</Badge>}</td>
                      <td className="py-2">
                        <div className="flex gap-2 flex-wrap">
                          <Button size="sm" onClick={() => setTeamStatus(r.id, 'active')}>Одобрить</Button>
                          <Button size="sm" onClick={() => setTeamStatus(r.id, 'moderation')}>На модерацию</Button>
                          <Button size="sm" variant="danger" onClick={() => { setTeamStatus(r.id, 'closed') }}>Закрыть</Button>
                          <Button size="sm" variant="danger" onClick={() => deleteTeamRequest(r.id)}>Удалить</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Projects */}
      {activeTab === 'projects' && (
        <Card title="Проекты" className="p-6">
          {projects.length === 0 ? <EmptyState title="Проектов пока нет" description="Когда пользователь сохранит карточку проекта, она появится здесь." /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Название</th>
                    <th className="py-2">Пользователь</th>
                    <th className="py-2">Стадия</th>
                    <th className="py-2">Нужна команда</th>
                    <th className="py-2">Роли</th>
                    <th className="py-2">Обновлено</th>
                    <th className="py-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id} className="border-t align-top">
                      <td className="py-2">{p.title}</td>
                      <td className="py-2">{p.ownerName ?? 'Пользователь'}</td>
                      <td className="py-2">{p.stage}</td>
                      <td className="py-2">{p.needsTeam ? 'Да' : 'Нет'}</td>
                      <td className="py-2">{p.requiredRoles?.join(', ')}</td>
                      <td className="py-2">{p.updatedAt}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openProjectModal(p)}>Просмотр</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Modal open={!!openProject} title={openProject?.title} onClose={closeProjectModal}>
            {openProject ? (
              <div className="space-y-3">
                <div><strong>Проблема:</strong><div>{openProject.problem}</div></div>
                <div><strong>Решение:</strong><div>{openProject.solution}</div></div>
                <div><strong>Ценность:</strong><div>{openProject.value}</div></div>
                <div><strong>Аудитория:</strong><div>{openProject.audience}</div></div>
                <div><strong>Стадия:</strong><div>{openProject.stage}</div></div>
                <div><strong>Нужна ли команда:</strong><div>{openProject.needsTeam ? 'Да' : 'Нет'}</div></div>
                <div><strong>Роли:</strong><div>{openProject.requiredRoles?.join(', ')}</div></div>
                <div><strong>Создано:</strong><div>{openProject.createdAt}</div></div>
                <div><strong>Обновлено:</strong><div>{openProject.updatedAt}</div></div>
              </div>
            ) : null}
          </Modal>
        </Card>
      )}

      {/* AI Scenarios */}
      {activeTab === 'aiScenarios' && (
        <div className="space-y-6">
          <Card title="AI-сценарии" className="p-6">
            <SectionTitle>Добавить / редактировать сценарий</SectionTitle>
            <Input placeholder="Вопрос" value={aiForm.question || ''} onChange={e => setAiForm({ ...aiForm, question: e.target.value })} />
            <Textarea placeholder="Ответ" value={aiForm.answer || ''} onChange={e => setAiForm({ ...aiForm, answer: e.target.value })} />
            <Select value={aiForm.category || 'faq'} onChange={e => setAiForm({ ...aiForm, category: e.target.value })}>
              <option value="mvp">mvp</option>
              <option value="project_card">project_card</option>
              <option value="team">team</option>
              <option value="opportunities">opportunities</option>
              <option value="pitch">pitch</option>
              <option value="problem">problem</option>
              <option value="next_step">next_step</option>
              <option value="hackathon">hackathon</option>
              <option value="grant">grant</option>
              <option value="faq">faq</option>
            </Select>
            <Input placeholder="Ключевые слова через запятую" value={(aiForm.keywords || []).join(',')} onChange={e => setAiForm({ ...aiForm, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
            <Input placeholder="Быстрая кнопка (опционально)" value={aiForm.quickActionLabel || ''} onChange={e => setAiForm({ ...aiForm, quickActionLabel: e.target.value })} />
            <Select value={aiForm.relatedRoute || '/dashboard'} onChange={e => setAiForm({ ...aiForm, relatedRoute: e.target.value })}>
              <option value="/dashboard">/dashboard</option>
              <option value="/project">/project</option>
              <option value="/team">/team</option>
              <option value="/opportunities">/opportunities</option>
              <option value="/ai">/ai</option>
            </Select>
            <div className="flex gap-3 mt-3">
              <Button onClick={handleSaveAi}>Сохранить сценарий</Button>
              <Button variant="secondary" onClick={() => setAiForm({ keywords: [] })}>Очистить</Button>
            </div>
          </Card>

          <Card title="Сценарии" className="p-6">
            {aiScenarios.length === 0 ? <EmptyState title="Сценариев пока нет" description="Добавьте первый сценарий" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">Вопрос</th>
                      <th className="py-2">Категория</th>
                      <th className="py-2">Ключевые слова</th>
                      <th className="py-2">Маршрут</th>
                      <th className="py-2">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiScenarios.map(a => (
                      <tr key={a.id} className="border-t align-top">
                        <td className="py-2">{a.question}</td>
                        <td className="py-2"><Badge>{a.category}</Badge></td>
                        <td className="py-2">{a.keywords.join(', ')}</td>
                        <td className="py-2">{a.relatedRoute}</td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleEditAi(a.id)}>Редактировать</Button>
                            <Button size="sm" variant="danger" onClick={() => handleDeleteAi(a.id)}>Удалить</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-3 text-sm text-gray-500">TODO: подключить пользовательские AI-сценарии из kub_admin_ai_scenarios к странице /ai.</div>
          </Card>
        </div>
      )}

    </PageContainer>
  )
}
