"use client"

import React from 'react'

// Lightweight motion helpers: use CSS transitions if framer-motion not installed.

export const FadeIn: React.FC<{children?: React.ReactNode, className?: string}> = ({ children, className = '' }) => {
  return (
    <div className={`opacity-0 translate-y-2 animate-fade-in ${className}`}>
      {children}
    </div>
  )
}

export const StaggerContainer: React.FC<{children?: React.ReactNode, className?: string}> = ({ children, className = '' }) => (
  <div className={`stagger-root ${className}`}>{children}</div>
)

export const StaggerItem: React.FC<{children?: React.ReactNode, className?: string}> = ({ children, className = '' }) => (
  <div className={`stagger-item ${className}`}>{children}</div>
)

export default { FadeIn, StaggerContainer, StaggerItem }
