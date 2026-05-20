"use client"

import React from 'react'
import Button from '../../components/ui/Button'

interface Props {
  label: string
  onClick: () => void
}

export const QuickQuestionButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <Button variant="secondary" size="sm" className="whitespace-nowrap" onClick={onClick}>
      {label}
    </Button>
  )
}

export default QuickQuestionButton
