import React from 'react'
import { Project } from '../types'

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <div className="text-sm text-gray-600 mb-2">{project.stage}</div>
      <p className="mb-2"><strong>Проблема:</strong> {project.problem}</p>
      <p className="mb-2"><strong>Решение:</strong> {project.solution}</p>
      <p className="mb-2"><strong>Ценность:</strong> {project.value}</p>
    </div>
  )
}

export default ProjectCard
