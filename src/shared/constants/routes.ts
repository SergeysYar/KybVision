export const ROUTES = {
  HOME: '/',
  ONBOARDING: '/onboarding',
  TEST: '/test',
  DASHBOARD: '/dashboard',
  PROJECT: '/project',
  TEAM: '/team',
  OPPORTUNITIES: '/opportunities',
  AI: '/ai',
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const

export type RouteKey = keyof typeof ROUTES

export default ROUTES
