import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  padding?: string
  title?: string
  description?: string
  action?: React.ReactNode
}

export const Card: React.FC<Props> = ({ children, className = '', padding = 'p-6', title, description, action }) => {
  return (
    <div className={`bg-[var(--card)] rounded-3xl shadow-sm border border-[var(--border)] ${padding} ${className} transition-all hover:-translate-y-0.5 hover:shadow-md`}> 
      {title && (
        <div className="mb-3 flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            {description && <div className="text-sm text-gray-600">{description}</div>}
          </div>
          {action}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Card
