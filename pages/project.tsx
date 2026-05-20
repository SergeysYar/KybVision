import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { demoProject } from '../data/project'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { Button } from '../components/Button'
import ProjectCard from '../components/ProjectCard'

export default function ProjectPage(){
  const [project, setProject] = useLocalStorage('kub_project', demoProject)
  const [form, setForm] = useState(project)

  const save = () => {
    setProject({ ...form, updatedAt: new Date().toISOString() })
    alert('Сохранено в demo-хранилище (localStorage)')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
        <div>
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Карточка проекта</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm">Название</label>
                <Input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
              </div>
              <div>
                <label className="text-sm">Проблема</label>
                <Textarea value={form.problem} onChange={e=>setForm({...form, problem:e.target.value})} />
              </div>
              <div>
                <label className="text-sm">Решение</label>
                <Textarea value={form.solution} onChange={e=>setForm({...form, solution:e.target.value})} />
              </div>
              <div>
                <label className="text-sm">Ценность</label>
                <Input value={form.value} onChange={e=>setForm({...form, value:e.target.value})} />
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <Button onClick={save}>Сохранить</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card p-4">
            <h4 className="font-semibold mb-3">Preview</h4>
            <ProjectCard project={project} />
          </div>
        </div>
      </div>
    </div>
  )
}
