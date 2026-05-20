import React from 'react'
import Badge from './Badge'
import Button from './Button'

export const PageHeader: React.FC<{ title: string; description?: string; badge?: string; action?: React.ReactNode }> = ({ title, description, badge, action }) => {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          {badge && <Badge variant="blue">{badge}</Badge>}
        </div>
        {description && <div className="text-sm text-gray-600 mt-1">{description}</div>}
      </div>
      <div>{action}</div>
    </div>
  )
}

export default PageHeader
