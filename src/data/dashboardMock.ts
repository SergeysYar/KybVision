import type { StepStatus } from '../components/ui/StepRoadmap'

export const dashboardRoadmapSteps = [
  { id: 's1', title: 'Идея', description: 'Сформулировать проблему и цель', status: 'completed' as StepStatus },
  { id: 's2', title: 'Карточка', description: 'Оформить проектную карточку', status: 'current' as StepStatus },
  { id: 's3', title: 'Команда', description: 'Определить роли и найти участников', status: 'upcoming' as StepStatus },
  { id: 's4', title: 'Конкурс', description: 'Выбрать конкурс или хакатон', status: 'upcoming' as StepStatus },
  { id: 's5', title: 'MVP', description: 'Подготовить минимальный продукт', status: 'upcoming' as StepStatus },
]

export const dashboardNextActions = [
  'Заполнить карточку проекта',
  'Найти разработчика',
  'Посмотреть подходящий хакатон',
]

export const dashboardTips = [
  'Начните с простой формулировки проблемы и целевой аудитории.',
  'Показывайте ценность проекта через конкретные изменения для пользователя.',
  'Выберите один ближайший конкурс или хакатон для фокуса.',
  'Опишите роли, которые нужны команде, чтобы двигаться быстрее.',
  'Используйте карту этапов, чтобы видеть следующий шаг.'
]
