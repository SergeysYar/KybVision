import React from 'react'
import Button from './Button'

export const EmptyState: React.FC<{ title: string; description?: string; icon?: React.ReactNode; action?: { label: string; onClick: () => void } }> = ({ title, description, icon, action }) => {
  return (
    <div className="card text-center p-6">
      {icon && <div className="mb-3">{icon}</div>}
      <div className="text-xl font-semibold mb-2">{title}</div>
      {description && <div className="text-sm text-gray-600 mb-4">{description}</div>}
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}

export default EmptyState
