export const loadJSON = <T>(key: string, fallback: T): T => {
  try {
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
    localStorage.setItem(key, JSON.stringify(payload))
  } catch (e) {
    console.error('saveJSON error', e)
  }
}
