import './styles.css'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#inicio" aria-label="MANSK — início">
          MANSK<span aria-hidden="true">.</span>
        </a>
        <p>Portfólio + Formação em TI</p>
      </header>

      <main id="inicio" className="foundation">
        <div className="foundation-copy">
          <p className="eyebrow">Produto autoral</p>
          <h1>MANSK</h1>
          <p className="promise">Soluções digitais para operações, dados e aprendizagem.</p>
          <p className="introduction">
            Uma experiência em construção para apresentar projetos reais e ensinar pessoas a
            investigar problemas de tecnologia com segurança, evidências e clareza.
          </p>

          <Link className="admin-link" href="/admin">
            Acessar painel editorial
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

      </main>

      <footer className="footer">
        <p>Alexandre Blank Lopes</p>
        <p>Produto autoral · PT-BR</p>
      </footer>
    </div>
  )
}
