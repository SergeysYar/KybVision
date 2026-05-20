"use client"

import React from 'react'
import Badge from '../../components/ui/Badge'
import type { ChatMessage } from './types'

interface Props {
  message: ChatMessage
}

export const AiChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} py-2`}> 
      <div className={`max-w-[80%] rounded-3xl p-4 shadow-sm ${isUser ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 border border-[var(--border)]'}`}>
        {!isUser && message.category && (
          <Badge variant="gray" className="mb-2">{message.category}</Badge>
        )}
        <div className="whitespace-pre-wrap text-sm leading-6">{message.text}</div>
        {message.relatedRoute && !isUser && (
          <div className="mt-3">
            <a href={message.relatedRoute} className="inline-block rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">Перейти к разделу</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default AiChatMessage
