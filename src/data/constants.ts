export const tracks = ['Новичок', 'Есть идея', 'Почти проект'] as const

export const opportunityTypes = ['grant', 'contest', 'hackathon', 'event', 'club', 'accelerator'] as const

export const teamRoles = ['developer', 'designer', 'marketer', 'analyst', 'idea_author', 'mentor'] as const

export const projectStages = ['idea', 'card', 'team', 'contest', 'mvp'] as const

export const opportunityTypeLabels: Record<typeof opportunityTypes[number], string> = {
  grant: 'Грант',
  contest: 'Конкурс',
  hackathon: 'Хакатон',
  event: 'Мероприятие',
  club: 'Кружок',
  accelerator: 'Акселератор',
}

export const teamRoleLabels: Record<typeof teamRoles[number], string> = {
  developer: 'Разработчик',
  designer: 'Дизайнер',
  marketer: 'Маркетолог',
  analyst: 'Аналитик',
  idea_author: 'Автор идеи',
  mentor: 'Наставник',
}

export const projectStageLabels: Record<typeof projectStages[number], string> = {
  idea: 'Идея',
  card: 'Карточка',
  team: 'Команда',
  contest: 'Конкурс',
  mvp: 'MVP',
}
