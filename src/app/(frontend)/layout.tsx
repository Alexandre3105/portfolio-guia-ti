import React from 'react'
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
        {children}
      </body>
    </html>
  )
}
