import React from 'react'

interface Props {
  value: number
  label?: string
  showValue?: boolean
  color?: 'blue' | 'green' | 'orange'
}

export const ProgressBar: React.FC<Props> = ({ value, label, showValue = true, color = 'blue' }) => {
  const cl = color === 'green' ? 'bg-[var(--success)]' : color === 'orange' ? 'bg-[var(--warning)]' : 'bg-[var(--primary)]'
  const safe = Math.max(0, Math.min(100, value))
  return (
    <div>
      {label && <div className="text-sm mb-2 flex items-center justify-between"><div>{label}</div>{showValue && <div className="text-sm text-gray-600">{safe}%</div>}</div>}
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className={`h-full ${cl}`} style={{ width: `${safe}%`, transition: 'width 400ms ease' }} />
      </div>
    </div>
  )
}

export default ProgressBar
