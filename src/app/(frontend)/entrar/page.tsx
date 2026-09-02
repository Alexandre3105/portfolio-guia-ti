import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Entrar | MANSK',
  description: 'Acesso à jornada de aprendizagem da MANSK.',
}

export default function SignInPage() {
  return (
    <article className="route-page route-page--compact">
      <header className="route-intro">
        <p className="eyebrow">Conta do aluno</p>
        <h1>Seu acesso começa depois da prévia.</h1>
        <p className="introduction">
          O login será ativado junto da Conta do Aluno. Até lá, você pode conhecer a proposta da
          formação sem cadastro.
        </p>
      </header>

      <div className="route-actions">
        <Link className="solid-link" href="/formacao">
          Conhecer a formação <span aria-hidden="true">→</span>
        </Link>
        <Link className="text-link" href="/">
          Voltar à entrada
        </Link>
      </div>
    </article>
  )
}
