"use client"

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/ui/PageHeader'
import GlassCard from '../../components/ui/GlassCard'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import EmptyState from '../../components/ui/EmptyState'
import SectionTitle from '../../components/ui/SectionTitle'
import AiChatMessage from '../../features/ai/AiChatMessage'
import QuickQuestionButton from '../../features/ai/QuickQuestionButton'
import mockAiScenarios from '../../data/mockAiScenarios'
import { findAiScenario, fallbackScenario } from '../../features/ai/aiSearch'
import { loadJSON, saveJSON } from '../../shared/lib/storage'
import type { ChatMessage } from '../../features/ai/types'

const STORAGE_KEY = 'kub_ai_chat_history'

const initialAssistantMessage: ChatMessage = {
  id: 'ai-init',
  role: 'assistant',
  text: 'Привет. Я AI-наставник КУБа. В MVP я работаю по сценариям и FAQ: помогаю разобраться с MVP, карточкой проекта, командой, конкурсами и следующим шагом.',
  createdAt: new Date().toISOString(),
  category: 'info',
}

const quickQuestions = [
  'Что такое MVP?',
  'Как оформить проект?',
  'Куда податься?',
  'Как найти команду?',
  'Что делать дальше?',
]

const categoryBadges = ['MVP', 'Карточка проекта', 'Команда', 'Возможности', 'Питч', 'Гранты', 'Хакатоны']

const normalizeInput = (value: string) => value.trim()

export default function AiPage() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage])
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const stored = loadJSON<ChatMessage[]>(STORAGE_KEY, [])
    if (stored && Array.isArray(stored) && stored.length > 0) {
      setMessages(stored)
    } else {
      setMessages([initialAssistantMessage])
    }
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    saveJSON(STORAGE_KEY, messages)
  }, [messages, hasHydrated])

  const sendMessage = (question: string) => {
    const cleaned = normalizeInput(question)
    if (!cleaned) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: cleaned,
      createdAt: new Date().toISOString(),
    }

    const scenario = findAiScenario(cleaned, mockAiScenarios)

    const answer = scenario === fallbackScenario ? fallbackScenario.answer : scenario.answer

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: answer,
      createdAt: new Date().toISOString(),
      scenarioId: scenario.id,
      relatedRoute: scenario.relatedRoute,
      category: scenario.category,
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInputValue('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }

  const clearHistory = () => {
    setMessages([initialAssistantMessage])
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  const hasOnlyInitialMessage = messages.length === 1 && messages[0].id === 'ai-init'

  const chatMessages = useMemo(() => messages, [messages])

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageHeader
        title="AI-наставник"
        description="Задайте вопрос о проекте, MVP, команде или конкурсах. В MVP наставник работает по сценариям и FAQ."
        badge="Сценарный режим"
      />

      <GlassCard className="mb-6 p-6">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="text-lg font-semibold">AI-наставник помогает понять следующий шаг</div>
            <div className="mt-3 text-sm text-gray-600">Наставник помогает понять следующий шаг: оформить идею, найти команду, выбрать возможность или подготовиться к MVP.</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Помогает с карточкой проекта</div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Подсказывает следующий шаг</div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Объясняет конкурсы и MVP</div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div>
          <Card className="p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <SectionTitle title="Чат" description="Задайте вопрос или выберите быстрый вариант." />
              <Button variant="secondary" size="sm" onClick={clearHistory}>Очистить историю</Button>
            </div>
            <div className="min-h-[500px] max-h-[620px] overflow-y-auto rounded-[2rem] border border-[var(--border)] bg-slate-50 p-4">
              {chatMessages.map(message => (
                <AiChatMessage key={message.id} message={message} />
              ))}
              {chatMessages.length === 0 && (
                <EmptyState title="Чат пуст" description="Задайте первый вопрос, чтобы начать диалог." />
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                className="flex-1"
                placeholder="Например: что такое MVP?"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
              />
              <Button type="submit" disabled={!inputValue.trim()}>Отправить</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Быстрые вопросы" className="p-4">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map(question => (
                <QuickQuestionButton key={question} label={question} onClick={() => handleQuickQuestion(question)} />
              ))}
            </div>
          </Card>

          <Card title="Темы, с которыми я помогаю" className="p-4">
            <div className="flex flex-wrap gap-2">
              {categoryBadges.map(category => (
                <Badge key={category}>{category}</Badge>
              ))}
            </div>
          </Card>

          <Card title="Как задавать вопрос" className="p-4">
            <div className="text-sm text-gray-600">
              Пишите коротко: “как оформить проблему”, “куда податься с идеей”, “как найти разработчика”. Чем ближе вопрос к проекту, тем точнее сценарный ответ.
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
