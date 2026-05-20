import React from 'react'

export const GlassCard: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`glass p-4 ${className}`}>{children}</div>
}

export default GlassCard
