import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="entry" aria-labelledby="entry-title">
      <div className="entry-heading">
        <p className="eyebrow">Entrada orientada</p>
        <h1 id="entry-title">O que você quer resolver hoje?</h1>
        <div className="entry-support">
          <p className="positioning">Soluções digitais para operações, dados e aprendizagem.</p>
          <p className="introduction">
            Escolha um caminho. Você pode conhecer trabalhos reais ou desenvolver uma base prática
            para investigar problemas de tecnologia.
          </p>
        </div>
      </div>

      <div className="journey-grid">
        <Link className="journey-card journey-card--primary" href="/portfolio">
          <span className="journey-number" aria-hidden="true">
            01
          </span>
          <span className="journey-content">
            <span className="journey-label">Para projetos e negócios</span>
            <span className="journey-title">Tenho um problema ou projeto.</span>
            <span className="journey-description">
              Veja como transformo necessidades de operações e dados em soluções compreensíveis,
              seguras e documentadas.
            </span>
          </span>
          <span className="journey-action">
            Conhecer projetos <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link className="journey-card" href="/formacao">
          <span className="journey-number" aria-hidden="true">
            02
          </span>
          <span className="journey-content">
            <span className="journey-label">Para quem quer evoluir</span>
            <span className="journey-title">
              Quero aprender a resolver problemas de tecnologia.
            </span>
            <span className="journey-description">
              Conheça uma formação investigativa para construir raciocínio, testar hipóteses e
              comunicar soluções com clareza.
            </span>
          </span>
          <span className="journey-action">
            Conhecer a formação <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
