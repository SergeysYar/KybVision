import { Opportunity } from '../types'

export const opportunities: Opportunity[] = [
  {
    id: 'o1',
    title: 'Школьный хакатон: Эко-решения',
    type: 'хакатон',
    description: 'Хакатон для проектов в области экологии и устойчивого развития.',
    date: '2026-07-15',
    url: 'https://example.com/hackathon',
    tracks: ['Новичок','Есть идея'],
    tags: ['экология','школа'],
    isPublished: true
  },
  {
    id: 'o2',
    title: 'Грант молодых инноваторов',
    type: 'грант',
    description: 'Финансирование на раннюю стадию разработки MVP.',
    date: '2026-09-01',
    url: 'https://example.com/grant',
    tracks: ['Есть идея','Почти проект'],
    tags: ['грант','финансирование'],
    isPublished: true
  }
]
