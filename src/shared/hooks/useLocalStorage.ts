import { useState, useEffect } from 'react'
import { loadJSON, saveJSON } from '../lib/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    return loadJSON<T>(key, initialValue)
  })

  useEffect(() => {
    try {
      saveJSON(key, state)
    } catch (e) {
      console.error(e)
    }
  }, [key, state])

  const remove = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
    setState(initialValue)
  }

  return [state, setState, remove] as const
}
