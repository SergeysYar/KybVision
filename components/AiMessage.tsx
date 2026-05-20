import React from 'react'

export const AiMessage: React.FC<{ text: string; fromUser?: boolean }> = ({ text, fromUser = false }) => {
  return (
    <div className={`max-w-[80%] ${fromUser ? 'ml-auto bg-blue-50 text-right' : 'bg-white'} p-3 rounded-xl shadow-sm`}> 
      <div className="text-sm">{text}</div>
    </div>
  )
}

export default AiMessage
