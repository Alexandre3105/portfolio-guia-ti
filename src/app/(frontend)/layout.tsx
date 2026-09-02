import React from 'react'
import Link from 'next/link'
import './styles.css'

export const metadata = {
  description:
    'Portfólio profissional e Formação Inicial de Suporte de TI por Alexandre Blank Lopes.',
  title: 'MANSK | Portfólio e Formação em TI',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>

        <div className="site-shell">
          <header className="topbar">
            <div className="brand-lockup">
              <Link className="wordmark" href="/" aria-label="MANSK — início">
                MANSK<span aria-hidden="true">.</span>
              </Link>
              <p>por Alexandre Blank Lopes</p>
            </div>

            <nav aria-label="Navegação principal">
              <Link href="/portfolio#projetos">Projetos</Link>
              <Link href="/formacao">Formação</Link>
              <Link href="/portfolio#trajetoria">Trajetória</Link>
              <Link href="/entrar">Entrar</Link>
            </nav>
          </header>

          <main id="conteudo">{children}</main>

          <footer className="footer">
            <p>MANSK · produto autoral</p>
            <p>Portfólio + formação em tecnologia</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
