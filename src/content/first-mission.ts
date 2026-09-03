import type { Mission } from '@/payload-types'

export const firstMissionData = {
  title: 'O sistema não abre. Por onde começar?',
  slug: 'o-sistema-nao-abre',
  module: 'Atender e investigar',
  summary:
    'Uma investigação curta para transformar um relato vago em evidências e um próximo passo seguro.',
  objective:
    'Distinguir relato, fato observado e hipótese antes de escolher a primeira evidência a coletar.',
  versionLabel: '1.0',
  competencies: [
    {
      key: 'separar-relato-fato-hipotese',
      label: 'Separar relato, fato observado e hipótese.',
    },
    {
      key: 'delimitar-problema',
      label: 'Delimitar o problema com perguntas curtas e úteis.',
    },
    {
      key: 'escolher-teste-seguro',
      label: 'Escolher uma verificação segura antes de alterar o ambiente.',
    },
  ],
  scenario: {
    openingMessage: 'Oi, o sistema não abre para mim. Preciso usar agora.',
    context:
      'O atendimento acabou de começar. Ainda não há mensagem de erro, horário exato nem informação sobre outras pessoas afetadas.',
    safetyBoundary:
      'Você pode fazer perguntas e orientar verificações sem alteração. Não reinicie serviços, não mude permissões e não altere dados.',
  },
  blocks: [
    {
      key: 'separar-o-que-sabemos',
      kind: 'essential-concept',
      title: 'O relato é o começo, não a causa',
      body:
        '“Não abre” descreve a experiência da pessoa. Para investigar, registre o que foi relatado, procure algo observável e só então formule hipóteses.',
    },
    {
      key: 'primeira-evidencia',
      kind: 'microchallenge',
      title: 'Qual é o primeiro passo?',
      body:
        'Escolha a ação que mais reduz a incerteza sem mudar o ambiente ou interromper outras pessoas.',
    },
  ],
  interactions: [
    {
      key: 'escolher-primeira-acao',
      blockKey: 'primeira-evidencia',
      kind: 'microchallenge',
      prompt: 'O que você faria primeiro?',
      options: [
        {
          key: 'perguntar-sintoma-e-alcance',
          label: 'Perguntar o que aparece na tela e se mais alguém foi afetado.',
          outcome:
            'A pessoa informa uma mensagem exata e confirma que outra colega consegue acessar normalmente.',
          feedback:
            'Boa investigação. Você obteve sintoma e alcance sem alterar o ambiente.',
          isRecommended: true,
        },
        {
          key: 'reiniciar-servico',
          label: 'Reiniciar o serviço para verificar se o acesso volta.',
          outcome:
            'A ação poderia interromper outras pessoas, e você ainda não sabe se o problema é geral.',
          feedback: 'Primeiro delimite o problema. Uma mudança sem evidência pode aumentar o impacto.',
          isRecommended: false,
        },
        {
          key: 'alterar-permissao',
          label: 'Conceder uma nova permissão ao usuário.',
          outcome:
            'Não há evidência de falha de permissão, e a mudança ultrapassa o limite deste atendimento.',
          feedback:
            'Não altere acesso por hipótese. Registre a evidência e encaminhe se uma autorização for necessária.',
          isRecommended: false,
        },
      ],
    },
  ],
  verification: {
    requiredInteractions: [{ key: 'escolher-primeira-acao' }],
    closingCriteria: [
      {
        description:
          'A escolha coleta uma evidência útil, respeita o limite de autorização e não trata uma hipótese como fato.',
      },
    ],
  },
  debriefing: {
    summary:
      'Um bom primeiro passo reduz a incerteza. Ele transforma um relato amplo em fatos que ajudam a escolher o próximo teste.',
    nextStep:
      'Registre a mensagem exata, quem foi afetado, quando começou e o que já foi verificado.',
    optionalDeepening:
      'Depois, compare o comportamento em outro usuário, dispositivo ou conexão que esteja dentro da sua autorização.',
  },
  sources: [
    {
      title: 'Explore troubleshooting methodologies',
      publisher: 'Microsoft Learn',
      url: 'https://learn.microsoft.com/en-us/training/modules/explore-troubleshooting-methodologies/',
    },
  ],
  authorship: {
    authorName: 'Alexandre Blank Lopes',
    contribution:
      'Objetivo, limites e cenário autoral baseados em experiência de suporte; texto estruturado com assistência de IA e revisão humana pendente.',
    assistedByAI: true,
  },
  review: {
    technical: false,
    pedagogical: false,
    authorship: false,
    safety: false,
    sanitization: false,
    confirmed: false,
  },
} satisfies Omit<Mission, 'createdAt' | 'id' | 'updatedAt'>
