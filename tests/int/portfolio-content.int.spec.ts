import { describe, expect, it } from 'vitest'
import { assertPublicCaseStudies, caseStudies, type CaseStudy } from '@/content/portfolio'

describe('conteúdo público dos Casos de Projeto', () => {
  it('aceita o inventário revisado do portfólio', () => {
    expect(() => assertPublicCaseStudies(caseStudies)).not.toThrow()
  })

  it('rejeita conteúdo que revele um identificador privado configurado fora do Git', () => {
    const unsafeCase: CaseStudy = {
      ...caseStudies[1],
      evidence: [
        ...caseStudies[1].evidence,
        {
          label: 'Limites',
          text: 'Projeto criado para Empresa Reservada.',
        },
      ],
    }

    expect(() => assertPublicCaseStudies([unsafeCase], ['Empresa Reservada'])).toThrow(
      'Conteúdo restrito encontrado: Empresa Reservada',
    )
  })

  it('rejeita valor financeiro e CPF no conteúdo configurado', () => {
    const baseCase = caseStudies[0]
    const withEvidence = (text: string): CaseStudy => ({
      ...baseCase,
      evidence: [{ label: 'Limites', text }],
    })

    expect(() => assertPublicCaseStudies([withEvidence('Faturamento de R$ 60.000')])).toThrow(
      'Valor financeiro não pode ser publicado',
    )
    expect(() => assertPublicCaseStudies([withEvidence('CPF 123.456.789-00')])).toThrow(
      'CPF não pode ser publicado',
    )
  })
})
