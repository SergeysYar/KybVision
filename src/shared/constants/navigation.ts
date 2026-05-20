export type NavigationItem = {
  title: string
  href: string
  icon: string
  showInBottomNav: boolean
  description?: string
}

export const navigationItems: NavigationItem[] = [
  { title: 'Главная', href: '/dashboard', icon: 'D', showInBottomNav: true },
  { title: 'Проект', href: '/project', icon: 'P', showInBottomNav: true },
  { title: 'Команда', href: '/team', icon: 'T', showInBottomNav: true },
  { title: 'Возможности', href: '/opportunities', icon: 'O', showInBottomNav: true },
  { title: 'AI-наставник', href: '/ai', icon: 'AI', showInBottomNav: true },
  { title: 'Профиль', href: '/profile', icon: 'U', showInBottomNav: true },
  { title: 'Админка', href: '/admin', icon: 'A', showInBottomNav: false },
]

export default navigationItems
