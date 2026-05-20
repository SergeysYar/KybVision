import { User } from '../entities/user/types'

export const mockUser: User = {
  id: 'u1',
  name: 'Даниил',
  track: 'Есть идея',
  contacts: { telegram: '@daniel_kub', email: 'danil@kub-demo.ru' },
  avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  projectStage: 'card',
  completedOnboarding: true,
  completedTrackTest: true,
  createdAt: '2026-03-12',
}

export default mockUser
