import type { Metadata } from 'next'
import Link from 'next/link'

import { MissionExperience } from '@/components/mission-experience'
import { getLatestPublishedMission } from '@/lib/missions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Formação | MANSK',
  description: 'Formação investigativa para aprender a resolver problemas de tecnologia.',
}

export default async function FormationPage() {
  const mission = await getLatestPublishedMission()

  return (
    <article className="route-page">
      <header className="route-intro">
        <p className="eyebrow">Jornada de aprendizagem</p>
        <h1>Aprenda a investigar antes de concluir.</h1>
        <p className="introduction">
          Uma formação para desenvolver lógica, fazer perguntas melhores, testar com segurança e
          explicar o próximo passo sem respostas enormes.
        </p>
      </header>

      {mission ? (
        <>
          <div className="formation-note">
            <p className="section-index">PRÉVIA PÚBLICA</p>
            <p>
              Experimente uma parte da formação. Não precisa entrar: sua escolha fica somente nesta
              tela e não é salva.
            </p>
          </div>
          <MissionExperience mission={mission} />
        </>
      ) : (
        <div className="route-callout">
          <p className="section-index" aria-hidden="true">
            EM REVISÃO
          </p>
          <p>
            A primeira missão está na Prévia Editorial. Ela só aparecerá aqui depois da revisão e
            confirmação humana.
          </p>
        </div>
      )}

      <div className="formation-return">
        <Link className="text-link" href="/">
          ← Voltar à entrada
        </Link>
      </div>
    </article>
  )
}
