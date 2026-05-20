import { AiScenario } from '../../entities/ai-scenario/types'

const normalize = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:]/g, ' ')
    .replace(/\s+/g, ' ')

export const fallbackScenario: AiScenario = {
  id: 'fallback',
  keywords: [],
  question: 'Я не понял вопрос',
  answer: 'Пока я могу помочь с MVP, карточкой проекта, командой и конкурсами. Попробуй задать вопрос проще.',
  category: 'faq',
  relatedRoute: '/ai',
}

export const findAiScenario = (question: string, scenarios: AiScenario[]): AiScenario => {
  const normalized = normalize(question)
  if (!normalized) return fallbackScenario

  const scored = scenarios.map(scenario => {
    const matchCount = scenario.keywords.reduce((count, keyword) => {
      const normalizedKeyword = normalize(keyword)
      return normalized.includes(normalizedKeyword) ? count + 1 : count
    }, 0)
    return { scenario, matchCount }
  })

  const bestMatch = scored
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)[0]

  return bestMatch?.scenario ?? fallbackScenario
}
