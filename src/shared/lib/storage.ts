export const STORAGE_KEYS = {
  KUB_USER_TRACK: 'kub_user_track',
  KUB_COMPLETED_TRACK_TEST: 'kub_completed_track_test',
  KUB_TEST_RESULT: 'kub_test_result',
  KUB_TEST_ANSWERS: 'kub_test_answers',
  KUB_PROJECT: 'kub_project',
  KUB_MY_TEAM_REQUEST: 'kub_my_team_request',
  KUB_AI_CHAT_HISTORY: 'kub_ai_chat_history',
  KUB_HIDE_DEMO_BANNER: 'kub_hide_demo_banner',
  KUB_ADMIN_OPPORTUNITIES: 'kub_admin_opportunities',
  KUB_ADMIN_TEAM_REQUESTS: 'kub_admin_team_requests',
  KUB_ADMIN_PROJECTS: 'kub_admin_projects',
  KUB_ADMIN_AI_SCENARIOS: 'kub_admin_ai_scenarios',
}

export const loadJSON = <T>(key: string, fallback: T): T => {
  try {
    if (typeof window === 'undefined') return fallback
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (e) {
    console.error('loadJSON error', e)
    return fallback
  }
}

export const saveJSON = (key: string, payload: unknown) => {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(payload))
  } catch (e) {
    console.error('saveJSON error', e)
  }
}

export const safeJsonParse = <T>(value: string | null, fallback: T): T => {
  if (value === null) return fallback
  try {
    return JSON.parse(value) as T
  } catch (e) {
    console.warn('safeJsonParse error', e)
    return fallback
  }
}

export const safeReadLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    if (typeof window === 'undefined') return fallback
    const raw = localStorage.getItem(key)
    return safeJsonParse(raw, fallback)
  } catch (e) {
    console.warn('safeReadLocalStorage error', e)
    return fallback
  }
}

export const isBrowser = () => typeof window !== 'undefined'

export const readStorage = <T>(key: string, fallback: T): T => {
  try {
    if (!isBrowser()) return fallback
    const raw = localStorage.getItem(key)
    return safeJsonParse(raw, fallback)
  } catch (e) {
    console.warn('readStorage error', e)
    return fallback
  }
}

export const writeStorage = (key: string, value: unknown) => {
  try {
    if (!isBrowser()) return
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('writeStorage error', e)
  }
}

export const removeStorage = (key: string) => {
  try {
    if (!isBrowser()) return
    localStorage.removeItem(key)
  } catch (e) {
    console.error('removeStorage error', e)
  }
}

export const removeKey = (key: string) => {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  } catch (e) {
    console.error('removeKey error', e)
  }
}

export const safeReadProject = <T>(fallback: T | null): T | null => {
  try {
    if (!isBrowser()) return fallback
    const raw = localStorage.getItem(STORAGE_KEYS.KUB_PROJECT)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (e) {
    console.warn('safeReadProject parse error', e)
    return fallback
  }
}

export const safeSaveProject = (project: unknown) => {
  try {
    if (!isBrowser()) return
    localStorage.setItem(STORAGE_KEYS.KUB_PROJECT, JSON.stringify(project))
  } catch (e) {
    console.error('safeSaveProject error', e)
  }
}

export const safeReadArrayFromStorage = <T>(key: string, fallback: T[]): T[] => {
  try {
    if (!isBrowser()) return fallback
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T[]
  } catch (e) {
    console.warn('safeReadArrayFromStorage parse error', e)
    return fallback
  }
}

export const safeWriteArrayToStorage = <T>(key: string, value: T[]): void => {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('safeWriteArrayToStorage error', e)
  }
}

export default { STORAGE_KEYS, loadJSON, saveJSON, removeKey, safeReadProject, safeSaveProject, safeReadArrayFromStorage, safeWriteArrayToStorage }
