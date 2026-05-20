export interface PlatformInitiative {
  id: string
  title: string
  description: string
  short: string
  projectLead: string
  projectLeadLabel: string
  tags: string[]
}

export interface PlatformInfo {
  ideologist: string
  ideologistLabel: string
  initiatives: PlatformInitiative[]
}

export const platformInfo: PlatformInfo = {
  ideologist: 'Шаршак Алексей Александрович',
  ideologistLabel: 'Идеолог проекта «КУБ»',
  initiatives: [
    {
      id: 'cavkazvision',
      title: 'CavkazVision',
      description: 'Проектная инициатива по развитию туристических маршрутов и цифровых сервисов для Кавказа.',
      short: 'Кавказ. Туризм. Цифровые маршруты.',
      projectLead: 'Пантелеев',
      projectLeadLabel: 'Проектное руководство',
      tags: ['Кавказ', 'туризм', 'цифровые сервисы'],
    },
    {
      id: 'kubanvision',
      title: 'KubanVision',
      description: 'Проектная инициатива по развитию туризма на Кубани, популяризации локальных маршрутов и цифрового сопровождения туристических идей.',
      short: 'Кубань. Туризм. Проектные инициативы.',
      projectLead: 'Пантелеев',
      projectLeadLabel: 'Проектное руководство',
      tags: ['Кубань', 'туризм', 'Краснодар'],
    },
  ],
}

export default platformInfo
