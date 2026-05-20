import React from 'react'

export const SectionTitle: React.FC<{ title: string; description?: string; action?: React.ReactNode }> = ({ title, description, action }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        {description && <div className="text-sm text-gray-600">{description}</div>}
      </div>
      <div>{action}</div>
    </div>
  )
}

export default SectionTitle
