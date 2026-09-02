import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import './styles.css'

const description = 'Soluções digitais para operações, dados e aprendizagem.'

function getMetadataBase() {
  const configuredSiteUrl = process.env.SITE_URL

  if (configuredSiteUrl) {
    return new URL(configuredSiteUrl)
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('SITE_URL é obrigatória fora do ambiente de desenvolvimento')
  }

  return new URL('http://127.0.0.1:3000')
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  description:
    'Portfólio profissional e Formação Inicial de Suporte de TI por Alexandre Blank Lopes.',
  title: 'MANSK | Portfólio e Formação em TI',
  openGraph: {
    description,
    images: [
      {
        alt: 'MANSK — Soluções digitais para operações, dados e aprendizagem.',
        height: 630,
        url: '/og.png',
        width: 1200,
      },
    ],
    locale: 'pt_BR',
    siteName: 'MANSK',
    title: 'MANSK',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    description,
    images: ['/og.png'],
    title: 'MANSK',
  },
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
