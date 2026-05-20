"use client"

import React, { useEffect, useState } from 'react'
import Badge from './Badge'
import { safeReadLocalStorage, saveJSON } from '../../shared/lib/storage'

const HIDE_KEY = 'kub_hide_demo_banner'

export default function DemoBanner() {
  const [hidden, setHidden] = useState<boolean>(true)

  useEffect(() => {
    const hiddenStored = safeReadLocalStorage<boolean>(HIDE_KEY, false)
    setHidden(Boolean(hiddenStored))
  }, [])

  const close = () => {
    try {
      saveJSON(HIDE_KEY, true)
    } catch (e) {
      // ignore
    }
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass rounded-2xl p-3 flex items-center justify-between shadow-sm mt-4">
        <div className="flex items-center gap-3">
          <Badge>MVP demo</Badge>
          <div className="text-sm text-gray-700">MVP demo: данные сохраняются локально, без backend и внешних API.</div>
        </div>
        <div>
          <button className="text-sm text-gray-500 hover:text-gray-800" onClick={close} aria-label="Закрыть баннер">Закрыть</button>
        </div>
      </div>
    </div>
  )
}
