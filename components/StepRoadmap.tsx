import React from 'react'

const steps = ['Идея','Карточка','Команда','Конкурс','MVP']

export const StepRoadmap: React.FC<{ current?: string }> = ({ current }) => {
  return (
    <div className="flex items-center gap-4">
      {steps.map((s, i) => {
        const active = s === current
        return (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-kubBlue text-white' : 'bg-white text-gray-500 shadow-sm'}`}>
              {i+1}
            </div>
            <div className={`text-sm ${active ? 'font-semibold text-kubBlue' : 'text-gray-500'}`}>{s}</div>
          </div>
        )
      })}
    </div>
  )
}

export default StepRoadmap
