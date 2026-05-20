import React from 'react'

export type StepStatus = 'completed' | 'current' | 'upcoming'

export interface Step {
  id: string
  title: string
  description?: string
  status: StepStatus
}

interface Props {
  steps: Step[]
}

export const StepRoadmap: React.FC<Props> = ({ steps }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-6 items-center min-w-[600px]">
        {steps.map((s, idx) => {
          const isLast = idx === steps.length - 1
          return (
            <div key={s.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.status === 'completed' ? 'bg-[var(--success)] text-white' : s.status === 'current' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-400 border border-[var(--border)]'}`}>
                  {s.status === 'completed' ? '✓' : idx + 1}
                </div>
                {s.description && <div className="text-xs text-gray-500 mt-2 text-center max-w-[140px]">{s.description}</div>}
              </div>
              {!isLast && <div className="h-1 bg-gray-200 flex-1 rounded-full" style={{width:120}} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepRoadmap
