export const STORAGE_KEYS = {
  USER: 'kub_user',
  PROJECT: 'kub_project',
  TEAM_REQUESTS: 'kub_team_requests',
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
    if (typeof window === 'undefined') return fallback
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECT)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (e) {
    console.warn('safeReadProject parse error', e)
    return fallback
  }
}

export const safeSaveProject = (project: unknown) => {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.PROJECT, JSON.stringify(project))
  } catch (e) {
    console.error('safeSaveProject error', e)
  }
}

export const safeReadArrayFromStorage = <T>(key: string, fallback: T[]): T[] => {
  try {
    if (typeof window === 'undefined') return fallback
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
