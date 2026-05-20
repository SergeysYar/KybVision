import React from 'react'

export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-5xl mx-auto ${className} pb-28`}>{children}</div>
  )
}

export default PageContainer
