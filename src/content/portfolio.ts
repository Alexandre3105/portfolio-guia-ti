export type CaseStudy = {
  eyebrow: string
  id: string
  name: string
  summary: string
  evidence: {
    label: 'Problema' | 'Participação' | 'Solução' | 'Resultado' | 'Limites'
    text: string
  }[]
  progress?: {
    label: 'Planejado' | 'Construído' | 'Validado'
    text: string
  }[]
}

const reviewedCaseStudies: CaseStudy[] = [
  {
    eyebrow: 'Produto em uso · Operações',
    id: 'acompanhapet',
    name: 'AcompanhaPET',
    summary:
      'Da observação da rotina a um sistema usado para organizar partes centrais de um pet shop.',
    evidence: [
      {
        label: 'Problema',
        text: 'A NB Petshop dependia de controles em papel e tinha pouca visibilidade integrada de vendas, estoque e finanças.',
      },
      {
        label: 'Participação',
        text: 'Mapeei necessidades, dirigi o produto, conduzi treinamento e implantação. A infraestrutura e os testes automatizados foram trabalhados com meu irmão, desenvolvedor pleno. Mantive as revisões manuais e o acompanhamento semanal com a cliente. O código foi produzido por agentes de IA sob direção e revisão humanas — um processo de Desenvolvimento Assistido por IA.',
      },
      {
        label: 'Solução',
        text: 'Construímos uma ferramenta de gestão com vendas, controle financeiro, rotinas fiscais e estoque unificado para produtos vendidos por peso e por pacote.',
      },
      {
        label: 'Resultado',
        text: 'O sistema está em uso e substituiu o papel em partes centrais da operação. Em produção, emite NFC-e e atualiza o estoque a partir das notas emitidas.',
      },
      {
        label: 'Limites',
        text: 'O caso não publica valores, documentos fiscais, credenciais, telas identificáveis nem dados pessoais ou internos da cliente.',
      },
    ],
  },
  {
    eyebrow: 'Caso anônimo · Dados',
    id: 'dashboard-comercial',
    name: 'Dashboard comercial',
    summary:
      'Indicadores comerciais organizados para enxergar vendas, funil e performance com mais contexto.',
    evidence: [
      {
        label: 'Problema',
        text: 'A leitura de vendas, etapas do funil e performance dos vendedores estava dispersa, dificultando comparações consistentes.',
      },
      {
        label: 'Participação',
        text: 'Conduzi o ciclo completo no Power BI: tratamento e modelagem dos dados, criação de medidas, definição de indicadores, construção, validação com a organização e apresentação dos resultados.',
      },
      {
        label: 'Solução',
        text: 'Um dashboard comercial que centralizou indicadores e permitiu navegar por períodos, etapas do funil e vendedores.',
      },
      {
        label: 'Resultado',
        text: 'A análise passou a evidenciar diferenças de performance e possíveis gargalos comerciais sem depender de leituras isoladas.',
      },
      {
        label: 'Limites',
        text: 'A organização permanece anônima. Não são publicados números, pessoas, dados reais, valores ou capturas identificáveis.',
      },
    ],
  },
  {
    eyebrow: 'Caso anônimo · Implantação',
    id: 'implantacao-academia',
    name: 'Implantação em academia',
    summary:
      'Tecnologia adaptada à rotina real para que a equipe dependesse menos do suporte no dia a dia.',
    evidence: [
      {
        label: 'Problema',
        text: 'A equipe precisava incorporar um sistema de gestão sem perder o fluxo real de cobranças, acompanhamento de alunos e relatórios.',
      },
      {
        label: 'Participação',
        text: 'Prestei suporte, observei e compreendi a operação, conduzi a implantação conforme as necessidades levantadas e treinei a equipe usuária.',
      },
      {
        label: 'Solução',
        text: 'Implantação orientada pelo processo da academia, acompanhada de treinamento aplicado às tarefas recorrentes.',
      },
      {
        label: 'Resultado',
        text: 'A equipe passou a realizar com mais autonomia a baixa de cobranças, o acompanhamento do retorno de alunos e a extração de relatórios, com rotina mais organizada e tarefas mais ágeis.',
      },
      {
        label: 'Limites',
        text: 'Academia, empresa e produtos permanecem anônimos. O resultado é qualitativo e não representa métrica ou causalidade comprovada.',
      },
    ],
  },
  {
    eyebrow: 'Produto autoral · Aprendizagem',
    id: 'portfolio-guia-ti',
    name: 'portfolio-guia-ti',
    summary:
      'Um portfólio que também transforma raciocínio de suporte em formação investigativa e atualizável.',
    evidence: [
      {
        label: 'Problema',
        text: 'Experiências profissionais estavam dispersas, enquanto iniciantes encontravam conteúdo específico sem uma trilha para aprender a investigar com segurança.',
      },
      {
        label: 'Participação',
        text: 'Mapeei o produto, defini as duas jornadas, organizei o conteúdo autoral e conduzo a implementação com planejamento, testes e revisão assistidos por agentes de IA.',
      },
      {
        label: 'Solução',
        text: 'Uma experiência pública que conecta Casos de Projeto a uma formação baseada em Missões de Suporte, decisões graduais e feedback objetivo.',
      },
      {
        label: 'Resultado',
        text: 'A fundação técnica, a Entrada Orientada e a Jornada Profissional possuem implementação versionada e verificação automatizada.',
      },
      {
        label: 'Limites',
        text: 'O produto segue em construção. Ainda não há piloto com aprendizes, publicação em produção nem evidência de eficácia pedagógica.',
      },
    ],
    progress: [
      {
        label: 'Planejado',
        text: 'Duas jornadas, arquitetura curricular, privacidade, autoria e critérios de aceite.',
      },
      {
        label: 'Construído',
        text: 'Fundação executável, Entrada Orientada e primeira narrativa profissional.',
      },
      {
        label: 'Validado',
        text: 'Comportamento público, navegação, reflow, integração e build no CI.',
      },
    ],
  },
]

export function assertPublicCaseStudies(studies: CaseStudy[], restrictedFragments: string[] = []) {
  const configuredContent = JSON.stringify(studies)

  for (const restrictedFragment of restrictedFragments) {
    if (
      configuredContent
        .toLocaleLowerCase('pt-BR')
        .includes(restrictedFragment.toLocaleLowerCase('pt-BR'))
    ) {
      throw new Error(`Conteúdo restrito encontrado: ${restrictedFragment}`)
    }
  }

  if (/R\$\s*[\d.]/i.test(configuredContent)) {
    throw new Error('Valor financeiro não pode ser publicado')
  }

  if (/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/.test(configuredContent)) {
    throw new Error('CPF não pode ser publicado')
  }

  return studies
}

const configuredRestrictedFragments = (process.env.PORTFOLIO_RESTRICTED_TERMS ?? '')
  .split(',')
  .map((fragment) => fragment.trim())
  .filter(Boolean)

export const caseStudies = assertPublicCaseStudies(
  reviewedCaseStudies,
  configuredRestrictedFragments,
)
