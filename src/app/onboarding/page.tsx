import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import GlassCard from '../../components/ui/GlassCard'
import Link from 'next/link'
import Button from '../../components/ui/Button'

export default function OnboardingPage(){
  return (
    <div className="max-w-3xl mx-auto">
      <PageTitle title="Онбординг" subtitle="Короткий вводный курс о платформе" />
      <GlassCard>
        <div className="space-y-2">
          <div>• 3–4 слайда о платформе</div>
          <div>• Как пользоваться центром управления</div>
          <div>• Преимущества участия</div>
        </div>
        <div className="mt-4 text-right"><Link href="/test"><Button>Пройти тест</Button></Link></div>
      </GlassCard>
    </div>
  )
}
