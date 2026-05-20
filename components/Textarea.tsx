import React from 'react'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: React.FC<Props> = (props) => {
  return <textarea className="w-full border rounded-md px-3 py-2 min-h-[100px]" {...props} />
}

export default Textarea
