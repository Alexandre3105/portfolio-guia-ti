import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Formação | MANSK',
  description: 'Formação investigativa para aprender a resolver problemas de tecnologia.',
}

export default function FormationPage() {
  return (
    <article className="route-page route-page--learning">
      <header className="route-intro">
        <p className="eyebrow">Jornada de aprendizagem</p>
        <h1>Aprenda a investigar antes de concluir.</h1>
        <p className="introduction">
          Uma formação para desenvolver lógica, fazer perguntas melhores, testar com segurança e
          explicar o próximo passo sem respostas enormes.
        </p>
      </header>

      <div className="route-callout">
        <p className="section-index" aria-hidden="true">
          MÉTODO
        </p>
        <p>
          Situações curtas, evidências reveladas aos poucos e feedback técnico, objetivo e amigável.
          A primeira prévia interativa será publicada em uma entrega própria.
        </p>
      </div>

      <Link className="text-link" href="/">
        ← Voltar à entrada
      </Link>
    </article>
  )
}
