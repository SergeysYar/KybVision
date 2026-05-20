import { Track } from '../../entities/user/types'

export interface TrackTestOption {
  id: string
  label: string
  track: Track
  description: string
}

export interface TrackTestQuestion {
  id: string
  question: string
  options: TrackTestOption[]
}

export const trackTestQuestions: TrackTestQuestion[] = [
  {
    id: 'q1',
    question: 'На каком этапе находится ваш проект?',
    options: [
      { id: 'q1a', label: 'Пока есть только идея', track: 'Новичок', description: 'Я ещё только формирую концепт и проверяю направление.' },
      { id: 'q1b', label: 'Есть концепция и первые проверки', track: 'Есть идея', description: 'Я уже проверил гипотезу и готов оформлять проект.' },
      { id: 'q1c', label: 'Уже есть рабочий прототип', track: 'Почти проект', description: 'Продукт протестирован, требуется поддержка для запуска.' },
    ],
  },
  {
    id: 'q2',
    question: 'Как строится команда?',
    options: [
      { id: 'q2a', label: 'Я действую один', track: 'Новичок', description: 'Сейчас ищу людей и базовую поддержку.' },
      { id: 'q2b', label: 'Есть несколько участников', track: 'Есть идея', description: 'Мы уже обсуждаем роли и структуру команды.' },
      { id: 'q2c', label: 'Команда сформирована', track: 'Почти проект', description: 'Мы работаем в связке и готовы выходить на рынок.' },
    ],
  },
  {
    id: 'q3',
    question: 'Какая ваша главная цель сейчас?',
    options: [
      { id: 'q3a', label: 'Найти направление и стартовать', track: 'Новичок', description: 'Мне нужно понять, с чего начать.' },
      { id: 'q3b', label: 'Проверить идею и подготовиться', track: 'Есть идея', description: 'Хочу собрать доказательства и сформировать план.' },
      { id: 'q3c', label: 'Запустить продукт и привлечь пользователей', track: 'Почти проект', description: 'Мне нужна помощь для масштабного роста.' },
    ],
  },
  {
    id: 'q4',
    question: 'Какая поддержка нужна сейчас?',
    options: [
      { id: 'q4a', label: 'Пошаговое руководство', track: 'Новичок', description: 'Хочу получить базовую систему для запуска.' },
      { id: 'q4b', label: 'Финансирование и партнеры', track: 'Есть идея', description: 'Мне нужны ресурсы на рост и пилот.' },
      { id: 'q4c', label: 'Выход на рынок и масштаб', track: 'Почти проект', description: 'Ищу возможности для коммерческого запуска.' },
    ],
  },
  {
    id: 'q5',
    question: 'Каково ваше текущее представление о продукте?',
    options: [
      { id: 'q5a', label: 'Идея формируется', track: 'Новичок', description: 'Я собираю вдохновение и начальные данные.' },
      { id: 'q5b', label: 'Есть прототип или сценарий', track: 'Есть идея', description: 'Я готов показать и протестировать концепт.' },
      { id: 'q5c', label: 'Продукт уже готов к запуску', track: 'Почти проект', description: 'Я хочу вывести проект на аудиторию.' },
    ],
  },
]

export const trackSummaries: Record<Track, { title: string; description: string; badgeVariant: 'gray' | 'blue' | 'green' }> = {
  'Новичок': {
    title: 'Новичок',
    description: 'Ты на старте: важнее всего собрать идею, сформировать команду и получить первые ориентиры.',
    badgeVariant: 'gray',
  },
  'Есть идея': {
    title: 'Есть идея',
    description: 'Проект уже обретает форму: укрепи гипотезы, найди возможности и продумай первые шаги.',
    badgeVariant: 'blue',
  },
  'Почти проект': {
    title: 'Почти проект',
    description: 'У тебя уже есть рабочая база: сконцентрируйся на запуске, масштабировании и выходе на рынок.',
    badgeVariant: 'green',
  },
}

export const getTrackFromAnswers = (answers: Track[]): Track => {
  const score: Record<Track, number> = {
    'Новичок': 0,
    'Есть идея': 0,
    'Почти проект': 0,
  }

  answers.forEach(answer => {
    if (answer in score) {
      score[answer] += 1
    }
  })

  const priority: Track[] = ['Почти проект', 'Есть идея', 'Новичок']
  return priority.reduce((best, track) => {
    if (score[track] > score[best]) {
      return track
    }
    return best
  }, 'Новичок' as Track)
}
