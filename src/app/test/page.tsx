'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageTitle from '../../components/ui/PageTitle'
import PageContainer from '../../components/layout/PageContainer'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import { useLocalStorage } from '../../shared/hooks/useLocalStorage'
import { mockUser } from '../../data/mockUser'
import { trackTestQuestions, getTrackFromAnswers, trackSummaries } from '../../features/track-test'
import type { Track } from '../../entities/user/types'

export default function TestPage() {
  const router = useRouter()
  const [user, setUser] = useLocalStorage('kub_user', mockUser)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Array<Track | null>>(Array(trackTestQuestions.length).fill(null))
  const [resultTrack, setResultTrack] = useState<Track | null>(null)

  const question = trackTestQuestions[currentQuestion]
  const selectedAnswer = answers[currentQuestion]
  const answeredCount = answers.filter(Boolean).length
  const progressValue = Math.round(((currentQuestion + 1) / trackTestQuestions.length) * 100)
  const canContinue = selectedAnswer !== null
  const isComplete = resultTrack !== null

  const resultData = useMemo(() => {
    if (!resultTrack) return null
    return trackSummaries[resultTrack]
  }, [resultTrack])

  const handleSelect = (track: Track) => {
    setAnswers(prev => {
      const next = [...prev]
      next[currentQuestion] = track
      return next
    })
  }

  const finishTest = () => {
    const chosenTrack = getTrackFromAnswers(
      answers.map(answer => answer || 'Новичок') as Track[]
    )
    setResultTrack(chosenTrack)
    setUser(prev => ({ ...prev, track: chosenTrack, completedTrackTest: true }))
  }

  const handleNext = () => {
    if (!canContinue) return
    if (currentQuestion < trackTestQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      return
    }
    finishTest()
  }

  const handleRestart = () => {
    setAnswers(Array(trackTestQuestions.length).fill(null))
    setCurrentQuestion(0)
    setResultTrack(null)
  }

  return (
    <PageContainer className="px-4 sm:px-0">
      <PageTitle title="Тест" subtitle="Короткий тест на определение трека — 5 вопросов" />

      <GlassCard className="space-y-6 p-6">
        {user.completedTrackTest && !isComplete ? (
          <div className="rounded-3xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-700">
            У вас уже есть сохранённый трек: <strong>{user.track}</strong>. Пройдите тест снова, чтобы обновить рекомендацию.
          </div>
        ) : null}

        {!isComplete ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-gray-500">Вопрос {currentQuestion + 1} из {trackTestQuestions.length}</div>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">{question.question}</h2>
              </div>
              <Badge variant={user.track === 'Новичок' ? 'gray' : user.track === 'Есть идея' ? 'blue' : 'green'}>
                {user.track}
              </Badge>
            </div>

            <ProgressBar value={progressValue} label={answeredCount === 0 ? 'Начало теста' : `Пройдено ${answeredCount} из ${trackTestQuestions.length}`} />

            <div className="grid gap-4">
              {question.options.map(option => {
                const selected = selectedAnswer === option.track
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.track)}
                    className={`text-left rounded-3xl border p-5 transition-colors duration-200 ${
                      selected
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="mt-2 text-sm text-gray-600">{option.description}</div>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">Выбрано {answeredCount}/{trackTestQuestions.length}</div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={handleRestart}>Начать заново</Button>
                <Button disabled={!canContinue} onClick={handleNext}>
                  {currentQuestion < trackTestQuestions.length - 1 ? 'Далее' : 'Показать результат'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Готово!</h2>
                <p className="mt-2 text-sm text-gray-600">Твой трек сохранён и теперь доступен в дашборде.</p>
              </div>
              <Badge variant={resultData?.badgeVariant ?? 'gray'}>{resultTrack}</Badge>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Результат теста</div>
              <p className="mt-3 text-gray-700">{resultData?.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={() => router.push('/dashboard')}>Открыть дашборд</Button>
              <Button variant="secondary" onClick={handleRestart}>Пройти заново</Button>
            </div>
          </div>
        )}
      </GlassCard>
    </PageContainer>
  )
}
