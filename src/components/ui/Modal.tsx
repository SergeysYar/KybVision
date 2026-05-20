"use client"
import React from 'react'

interface Props {
  open: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
}

export const Modal: React.FC<Props> = ({ open, title, onClose, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button className="text-sm text-gray-500" onClick={onClose}>Закрыть</button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
