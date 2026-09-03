import config from '@/payload.config'
import { MissionExperience } from '@/components/mission-experience'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type EditorialPreviewPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditorialPreviewPage({ params }: EditorialPreviewPageProps) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const auth = await payload.auth({ headers: await headers() })

  if (!auth.user) redirect('/admin')

  const mission = await payload.findByID({
    collection: 'missions',
    disableErrors: true,
    draft: true,
    id,
    overrideAccess: false,
    user: auth.user,
  })

  if (!mission) notFound()

  const isPublished = mission._status === 'published'

  return (
    <article className="route-page editorial-preview">
      <div className="editorial-banner">
        <div>
          <p className="eyebrow">Prévia Editorial</p>
          <p>{isPublished ? 'Versão publicada' : 'Rascunho não público'}</p>
        </div>
        <Link className="text-link" href={`/admin/collections/missions/${mission.id}`}>
          Voltar à ficha
        </Link>
      </div>

      <header className="route-intro editorial-intro">
        <p className="eyebrow">Revisão antes da publicação</p>
        <h1>Veja a experiência como visitante.</h1>
        <p className="introduction">
          Confira linguagem, lógica, segurança, autoria e retornos. Esta tela não publica nem
          confirma a revisão por você.
        </p>
      </header>

      <MissionExperience editorial mission={mission} />
    </article>
  )
}
