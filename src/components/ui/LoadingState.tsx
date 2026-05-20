"use client"

import React from 'react'

interface Props {
  title?: string
  description?: string
  variant?: 'card' | 'page' | 'inline'
}

export default function LoadingState({ title, description, variant = 'page' }: Props) {
  const base = 'animate-pulse bg-slate-200/60 rounded'
  if (variant === 'inline') {
    return <div className="inline-block w-24 h-4 rounded bg-slate-200/60 animate-pulse" />
  }

  if (variant === 'card') {
    return (
      <div className="p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
        <div className="h-6 w-3/4 mb-3 rounded bg-slate-200/60 animate-pulse" />
        <div className="h-4 w-full mb-2 rounded bg-slate-200/60 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-slate-200/60 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
        <div className="h-8 w-2/3 mb-4 rounded bg-slate-200/60 animate-pulse" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-slate-200/60 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-slate-200/60 animate-pulse" />
          <div className="h-4 w-4/6 rounded bg-slate-200/60 animate-pulse" />
        </div>
        {title && <div className="mt-4 text-sm text-gray-600">{title}</div>}
        {description && <div className="mt-2 text-xs text-gray-500">{description}</div>}
      </div>
    </div>
  )
}
