import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  padding?: string
}

export const GlassCard: React.FC<Props> = ({ children, className = '', padding = 'p-6' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className={`glass ${padding} rounded-3xl overflow-hidden`}> 
        <div className="relative z-10">{children}</div>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-20 w-48 h-48 bg-gradient-to-tr from-white/30 to-transparent opacity-30 transform rotate-12 blur-2xl" />
        </div>
      </div>
    </div>
  )
}

export default GlassCard
