import React from 'react'

export const Card: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`card ${className}`}>{children}</div>
}

export default Card
