import React from 'react'
import { demoProject } from '../data/project'
import { demoUser } from '../data/user'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ProjectCard from '../components/ProjectCard'
import StepRoadmap from '../components/StepRoadmap'
import { opportunities } from '../data/opportunities'
import Link from 'next/link'
import { Button } from '../components/Button'

export default function Dashboard(){
  const [user] = useLocalStorage('kub_user', demoUser)
  const [project] = useLocalStorage('kub_project', demoProject)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="card p-6 mb-4">
            <h2 className="text-xl font-bold">Привет, {user.name}</h2>
            <div className="text-sm text-gray-600">Твой трек: {user.track}</div>
          </div>

          <div className="card p-6 mb-4">
            <h3 className="text-lg font-semibold mb-2">Твой проект сейчас на этапе: {project.stage}</h3>
            <StepRoadmap current={project.stage} />
          </div>

          <div className="card p-6 mb-4">
            <h4 className="font-semibold mb-2">Что сделать дальше?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Заполнить карточку проекта — <Link href="/project"><a className="text-kubBlue font-medium">Открыть</a></Link></li>
              <li>• Найти разработчика — <Link href="/team"><a className="text-kubBlue font-medium">Поиск команды</a></Link></li>
              <li>• Посмотреть подходящий хакатон — <Link href="/opportunities"><a className="text-kubBlue font-medium">Возможности</a></Link></li>
            </ul>
          </div>

        </div>
        <aside>
          <div className="card p-4 mb-4">
            <h4 className="font-semibold">Подходящие возможности</h4>
            <div className="space-y-3 mt-3">
              {opportunities.slice(0,2).map(o=> (
                <div key={o.id} className="p-3 border rounded-md">
                  <div className="font-medium">{o.title}</div>
                  <div className="text-sm text-gray-600">{o.type} — {o.date}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right"><Link href="/opportunities"><a className="text-sm text-kubBlue">Все</a></Link></div>
          </div>

          <div className="card p-4">
            <h4 className="font-semibold">AI-наставник</h4>
            <p className="text-sm text-gray-600 mt-2">Нужна подсказка? <Link href="/ai"><a className="text-kubBlue">Спросить AI</a></Link></p>
          </div>
        </aside>
      </div>
    </div>
  )
}
