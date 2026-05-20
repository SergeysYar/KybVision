import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = (props) => {
  return <input className="w-full border rounded-md px-3 py-2" {...props} />
}

export default Input
