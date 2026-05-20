export type NavigationItem = {
  title: string
  href: string
  icon: string
  showInBottomNav: boolean
  description?: string
}

export const navigationItems: NavigationItem[] = [
  { title: 'Главная', href: '/dashboard', icon: '⌂', showInBottomNav: true },
  { title: 'Проект', href: '/project', icon: 'P', showInBottomNav: true },
  { title: 'Команда', href: '/team', icon: 'T', showInBottomNav: true },
  { title: 'Возможности', href: '/opportunities', icon: 'O', showInBottomNav: true },
  { title: 'AI-наставник', href: '/ai', icon: 'AI', showInBottomNav: true },
  { title: 'Профиль', href: '/profile', icon: 'U', showInBottomNav: true },
  { title: 'Админка', href: '/admin', icon: 'A', showInBottomNav: false },
]

export default navigationItems
import { ROUTES } from './routes'

export const NAVIGATION = [
  { title: 'Главная', href: ROUTES.DASHBOARD, icon: '🏠', showInBottomNav: true },
  { title: 'Проект', href: ROUTES.PROJECT, icon: '📁', showInBottomNav: true },
  { title: 'Команда', href: ROUTES.TEAM, icon: '🧑‍🤝‍🧑', showInBottomNav: true },
  { title: 'Возможности', href: ROUTES.OPPORTUNITIES, icon: '🎯', showInBottomNav: true },
  { title: 'AI', href: ROUTES.AI, icon: '🤖', showInBottomNav: true },
  { title: 'Профиль', href: ROUTES.PROFILE, icon: '👤', showInBottomNav: false },
  { title: 'Админка', href: ROUTES.ADMIN, icon: '🛠️', showInBottomNav: false },
]

export default NAVIGATION
