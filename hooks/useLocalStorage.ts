import { useState, useEffect } from 'react'
import { loadJSON, saveJSON } from '../lib/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    return loadJSON<T>(key, initialValue)
  })

  useEffect(() => {
    saveJSON(key, state)
  }, [key, state])

  return [state, setState] as const
}
