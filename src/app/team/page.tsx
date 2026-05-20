"use client"

import { useEffect, useMemo, useState } from 'react'
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
import TeamRequestCard from '../../features/team/TeamRequestCard'

import mockTeamRequests from '../../data/mockTeamRequests'
import mockUser from '../../data/mockUser'
import demoProject from '../../data/mockProject'
import { saveJSON, loadJSON, removeKey, STORAGE_KEYS } from '../../shared/lib/storage'
import type { TeamRequest, TeamRole } from '../../entities/team-request/types'

type Tab = 'all' | 'mine'

const roleOptions: Array<{ label: string; value: string }> = [
  { label: 'Все роли', value: 'all' },
  { label: 'Разработчик', value: 'developer' },
  { label: 'Дизайнер', value: 'designer' },
  { label: 'Маркетолог', value: 'marketer' },
  { label: 'Аналитик', value: 'analyst' },
  { label: 'Автор идеи', value: 'idea_author' },
  { label: 'Наставник', value: 'mentor' },
]

const roleLabels: Record<TeamRole, string> = {
  developer: 'Разработчик',
  designer: 'Дизайнер',
  marketer: 'Маркетолог',
  analyst: 'Аналитик',
  idea_author: 'Автор идеи',
  mentor: 'Наставник',
}

const STORAGE_KEY = 'kub_my_team_request'

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [requests, setRequests] = useState<TeamRequest[]>([])
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [myRequest, setMyRequest] = useState<TeamRequest | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalRequest, setModalRequest] = useState<TeamRequest | null>(null)

  // Form state
  const [form, setForm] = useState({
    role: 'developer',
    lookingFor: 'developer',
    description: '',
    contacts: '',
    projectTitle: '',
    skills: '',
  })

  useEffect(() => {
    // load mock requests
    const base = mockTeamRequests.slice()
    // load my request from localStorage
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as TeamRequest
        setMyRequest(parsed)
        // avoid duplicate
        if (!base.find(r => r.id === parsed.id)) base.unshift(parsed)
      }
    } catch (e) {
      console.warn('Invalid my request in storage', e)
    }
    setRequests(base)
  }, [])

  const activeCount = useMemo(() => requests.filter(r => r.status === 'active').length, [requests])
  const rolesInSearch = useMemo(() => {
    const map = new Map<string, number>()
    requests.forEach(r => { if (r.lookingFor) map.set(r.lookingFor, (map.get(r.lookingFor)||0)+1) })
    return Array.from(map.entries()).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k)
  }, [requests])

  const filteredRequests = useMemo(() => {
    const list = requests.filter(r => r.status === 'active' || r.status === 'moderation' || r.status === 'closed')
    if (roleFilter !== 'all') {
      return list.filter(r => r.role === roleFilter || r.lookingFor === roleFilter)
    }
    return list
  }, [requests, roleFilter])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    // validation
    if (!form.description || form.description.trim().length < 15) return alert('Опишите заявку чуть подробнее')
    if (!form.contacts || form.contacts.trim().length === 0) return alert('Укажите Telegram или email')

    const skillsArr = form.skills.split(',').map(s=>s.trim()).filter(Boolean)
    const now = new Date().toISOString()
    const request: TeamRequest = myRequest ? {
      ...myRequest,
      role: form.role as TeamRole,
      lookingFor: form.lookingFor as TeamRole,
      description: form.description,
      contacts: parseContacts(form.contacts),
      projectTitle: form.projectTitle || undefined,
      skills: skillsArr.length ? skillsArr : undefined,
    } : {
      id: crypto && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : 'my-team-request',
      userId: mockUser.id,
      userName: mockUser.name,
      role: form.role as TeamRole,
      lookingFor: form.lookingFor as TeamRole,
      description: form.description,
      contacts: parseContacts(form.contacts),
      status: 'active',
      createdAt: now,
      projectTitle: form.projectTitle || undefined,
      skills: skillsArr.length ? skillsArr : undefined,
    }

    // save
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(request))
    } catch (e) {
      console.error('save my request', e)
    }

    // update state
    setMyRequest(request)
    setIsEditing(false)
    setActiveTab('mine')
    setRequests(prev => {
      const without = prev.filter(r => r.id !== request.id)
      return [request, ...without]
    })

    alert('Заявка сохранена и добавлена в общую доску')
  }

  const handleDelete = () => {
    try { window.localStorage.removeItem(STORAGE_KEY) } catch (e) { console.error(e) }
    setMyRequest(null)
    setRequests(prev => prev.filter(r => r.userId !== mockUser.id && r.id !== 'my-team-request'))
  }

  const handleClose = () => {
    if (!myRequest) return
    const newStatus = (myRequest.status === 'closed' ? 'active' : 'closed') as import('../../entities/team-request/types').TeamRequestStatus
    const updated: TeamRequest = { ...myRequest, status: newStatus }
    setMyRequest(updated)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setRequests(prev => prev.map(r => r.id === updated.id ? updated : r))
  }

  const openPropose = (req: TeamRequest) => {
    setModalRequest(req)
    setModalOpen(true)
  }

  const parseContacts = (raw: string) => {
    if (!raw) return undefined
    const cleaned = raw.trim()
    if (cleaned.includes('@') && cleaned.includes('.')) return { email: cleaned }
    if (cleaned.startsWith('@')) return { telegram: cleaned }
    if (cleaned.includes('@')) return { telegram: cleaned }
    return { telegram: cleaned }
  }

  // init form when editing
  useEffect(() => {
    if (myRequest && isEditing) {
      setForm({
        role: myRequest.role,
        lookingFor: myRequest.lookingFor ?? myRequest.role,
        description: myRequest.description,
        contacts: myRequest.contacts ? (myRequest.contacts.telegram ?? myRequest.contacts.email ?? '') : '',
        projectTitle: myRequest.projectTitle ?? '',
        skills: myRequest.skills ? myRequest.skills.join(', ') : '',
      })
    }
  }, [isEditing, myRequest])

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader title="Соберите команду" description="Создайте заявку или найдите участников для проекта." badge="КУБ" />

      <GlassCard className="mb-6 p-6">
        <div className="sm:flex sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Соберите команду быстрее</div>
            <div className="mt-2 text-sm text-gray-600">Создайте заявку, укажите роль и контакты. В MVP без чата: участники связываются напрямую по Telegram или email.</div>
            <div className="mt-3 text-sm text-gray-700">Активных заявок: {activeCount} · Ролей в поиске: {rolesInSearch.length} · Ваша заявка: {myRequest ? 'создана' : 'не создана'}</div>
            {demoProject && demoProject.requiredRoles && (
              <div className="mt-3 text-sm text-gray-600">По вашему проекту могут понадобиться: {demoProject.requiredRoles.slice(0,3).map(r=>roleLabels[r]).join(', ')}</div>
            )}
          </div>
        </div>
      </GlassCard>

      <div className="mb-6">
        <div className="flex gap-3">
          <button className={`px-4 py-2 rounded-2xl ${activeTab==='all'?'bg-blue-600 text-white':'bg-gray-100'}`} onClick={()=>setActiveTab('all')}>Все заявки</button>
          <button className={`px-4 py-2 rounded-2xl ${activeTab==='mine'?'bg-blue-600 text-white':'bg-gray-100'}`} onClick={()=>setActiveTab('mine')}>Моя заявка</button>
        </div>
      </div>

      {activeTab === 'all' ? (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <GlassCard className="p-4 mb-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Select label="Фильтр по роли" options={roleOptions} value={roleFilter} onChange={e=>setRoleFilter(e.target.value)} />
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="sm" onClick={()=>{ setRoleFilter('all') }}>Сбросить фильтр</Button>
                  <div className="text-sm text-gray-500">Показаны активные заявки и ваша заявка (если создана)</div>
                </div>
              </div>
            </GlassCard>

            {filteredRequests.length === 0 ? (
              <EmptyState title="Пока нет заявок" description="Создайте первую заявку, чтобы собрать команду." action={{ label: 'Создать заявку', onClick: ()=>{ setActiveTab('mine'); setIsEditing(false) } }} />
            ) : (
              <div className="grid gap-4">
                {filteredRequests.map(r => (
                  <TeamRequestCard key={r.id} request={r} isMine={myRequest?.id===r.id} onPropose={openPropose} />
                ))}
              </div>
            )}
          </div>

          <div>
            <Card title="Кого чаще всего ищут" className="p-4">
              <div className="flex flex-wrap gap-2">
                {rolesInSearch.length ? rolesInSearch.map((r:any)=> <Badge key={r}>{roleLabels[r as TeamRole]}</Badge>) : (
                  <div className="text-sm text-gray-500">Нет статистики</div>
                )}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          {myRequest ? (
            <Card title="Моя заявка" className="p-4">
              <TeamRequestCard request={myRequest} isMine onPropose={openPropose} />
              <div className="mt-4 flex gap-3">
                <Button variant="secondary" onClick={()=>setIsEditing(true)}>Редактировать</Button>
                <Button variant="secondary" onClick={handleClose}>{myRequest.status === 'closed' ? 'Открыть снова' : 'Закрыть заявку'}</Button>
                <Button variant="danger" onClick={handleDelete}>Удалить заявку</Button>
              </div>
            </Card>
          ) : (
            <Card title="Создать заявку" className="p-4">
              <form onSubmit={handleSubmit} className="grid gap-3">
                <Select label="Ваша роль" options={roleOptions.slice(1)} value={form.role} onChange={e=>setForm({...form, role: e.target.value})} />
                <Select label="Кого ищете" options={roleOptions.slice(1)} value={form.lookingFor} onChange={e=>setForm({...form, lookingFor: e.target.value})} />
                <Textarea label="Описание заявки" placeholder="Кратко опишите проект, задачу или формат участия" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <Input label="Контакты" placeholder="Например: @daniel_kub или name@mail.ru" value={form.contacts} onChange={e=>setForm({...form, contacts: e.target.value})} />
                <Input label="Название проекта" placeholder="Например: Навигатор студенческих инициатив" value={form.projectTitle} onChange={e=>setForm({...form, projectTitle: e.target.value})} />
                <Input label="Навыки через запятую" placeholder="React, дизайн, презентации, аналитика" value={form.skills} onChange={e=>setForm({...form, skills: e.target.value})} />
                <div className="flex gap-3">
                  <Button type="submit">Сохранить заявку</Button>
                  <Button variant="secondary" onClick={()=>{ setForm({ role: 'developer', lookingFor: 'developer', description: '', contacts: '', projectTitle: '', skills: '' }) }}>Очистить</Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      )}

      <Modal open={modalOpen} title="Связаться с участником" onClose={()=>setModalOpen(false)}>
        {modalRequest ? (
          <div>
            <div className="text-sm text-gray-600">Имя: <b>{modalRequest.userName}</b></div>
            <div className="text-sm text-gray-600">Проект: {modalRequest.projectTitle ?? '—'}</div>
            <div className="text-sm text-gray-600">Ищет: {modalRequest.lookingFor ? roleLabels[modalRequest.lookingFor] : '—'}</div>
            <div className="mt-3 text-sm text-gray-700">Контакты:</div>
            <div className="mt-2">
              {modalRequest.contacts ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">{modalRequest.contacts.telegram ?? modalRequest.contacts.email}</div>
                  <Button size="sm" onClick={async ()=>{ try { await navigator.clipboard.writeText(modalRequest.contacts?.telegram ?? modalRequest.contacts?.email ?? ''); alert('Контакт скопирован') } catch { alert('Скопируйте контакт вручную') } }}>Скопировать контакт</Button>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Контакт не указан</div>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-600">В MVP внутреннего чата нет. Напишите участнику напрямую по указанным контактам.</div>
          </div>
        ) : null}
      </Modal>
    </PageContainer>
  )
}
