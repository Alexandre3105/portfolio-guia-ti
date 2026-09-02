import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projetos | MANSK',
  description: 'Projetos de operações, dados e aprendizagem conduzidos por Alexandre Blank Lopes.',
}

export default function PortfolioPage() {
  return (
    <article className="route-page">
      <header className="route-intro">
        <p className="eyebrow">Jornada profissional</p>
        <h1>Projetos que partem do problema real.</h1>
        <p className="introduction">
          Cada caso será apresentado com contexto, participação, solução, resultado e limites — sem
          transformar intenção em resultado não comprovado.
        </p>
      </header>

      <div className="route-sections">
        <section id="projetos" className="route-section" aria-labelledby="projetos-title">
          <p className="section-index" aria-hidden="true">
            01
          </p>
          <div>
            <h2 id="projetos-title">Casos de projeto</h2>
            <p>
              Operações, análise de dados e aprendizagem. Os casos completos entram na próxima
              entrega.
            </p>
          </div>
        </section>

        <section id="trajetoria" className="route-section" aria-labelledby="trajetoria-title">
          <p className="section-index" aria-hidden="true">
            02
          </p>
          <div>
            <h2 id="trajetoria-title">Trajetória</h2>
            <p>
              Experiências em suporte, implantação, treinamento, dados e desenvolvimento serão
              conectadas aqui às evidências públicas.
            </p>
          </div>
        </section>
      </div>

      <Link className="text-link" href="/">
        ← Voltar à entrada
      </Link>
    </article>
  )
}
