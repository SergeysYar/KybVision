import { Project } from '../types'

export const demoProject: Project = {
  id: 'p1',
  userId: 'u1',
  title: 'Эко-уроки',
  problem: 'Школьникам сложно находить практические задания по экологии',
  solution: 'Платформа с короткими практическими заданиями и гайдлайнами',
  value: 'Повышает вовлечённость и реальные навыки',
  audience: 'школьники 14-18 лет',
  stage: 'оформление идеи',
  needsTeam: true,
  requiredRoles: ['дизайнер','разработчик'],
  description: 'Короткое описание проекта',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
