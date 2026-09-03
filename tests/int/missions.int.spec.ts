import config from '@/payload.config'
import { firstMissionData } from '@/content/first-mission'
import { getMissionPublicationIssues } from '@/domain/mission-publication'
import { getPayload, type Payload } from 'payload'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { assertIsolatedTestDatabase } from '../support/test-environment'

let payload: Payload | undefined
const createdMissionIDs = new Set<number | string>()

function trackMission<T extends { id: number | string }>(mission: T) {
  createdMissionIDs.add(mission.id)
  return mission
}

function validMissionData() {
  return {
    ...structuredClone(firstMissionData),
    title: '[teste] O sistema não abre',
    slug: `teste-o-sistema-nao-abre-${crypto.randomUUID()}`,
    versionLabel: '1.0-teste',
    authorship: {
      authorName: 'Responsável de teste',
      contribution: 'Cenário fictício criado exclusivamente para validar o fluxo editorial.',
      assistedByAI: false,
    },
    review: {
      technical: true,
      pedagogical: true,
      authorship: true,
      safety: true,
      sanitization: true,
      confirmed: true,
    },
  }
}

describe('Fluxo editorial da Ficha da Missão', () => {
  beforeAll(async () => {
    assertIsolatedTestDatabase()
    payload = await getPayload({ config: await config })
  })

  afterAll(async () => {
    await payload?.destroy()
  })

  afterEach(async () => {
    if (!payload) return

    for (const id of createdMissionIDs) {
      await payload.delete({ collection: 'missions' as never, id })
    }
    createdMissionIDs.clear()
  })

  it('mantém a primeira missão real como rascunho aguardando apenas a revisão humana', () => {
    expect(getMissionPublicationIssues(firstMissionData)).toEqual([
      'confirmação humana das revisões obrigatórias ausente',
    ])
  })

  it('salva uma ficha incompleta como rascunho sem torná-la pública', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const draft = trackMission(
      await payload.create({
        collection: 'missions' as never,
        data: {
          title: '[teste] Rascunho editorial incompleto',
        } as never,
        draft: true,
      }),
    )

    expect(draft).toMatchObject({
      _status: 'draft',
      title: '[teste] Rascunho editorial incompleto',
    })

    const publicResult = await payload.find({
      collection: 'missions' as never,
      overrideAccess: false,
      where: {
        id: {
          equals: (draft as { id: number }).id,
        },
      },
    })

    expect(publicResult.totalDocs).toBe(0)
  })

  it('bloqueia a publicação de uma ficha incompleta com pendências claras', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const draft = trackMission(
      await payload.create({
        collection: 'missions' as never,
        data: {
          title: '[teste] Publicação incompleta',
        } as never,
        draft: true,
      }),
    )

    await expect(
      payload.update({
        collection: 'missions' as never,
        id: (draft as { id: number }).id,
        data: {
          _status: 'published',
        } as never,
      }),
    ).rejects.toThrow(/Publicação bloqueada.*objetivo.*confirmação humana/i)
  })

  it.each([
    {
      expected: /referência interna de bloco inválida/i,
      mutate: (data: ReturnType<typeof validMissionData>) => {
        data.interactions[0].blockKey = 'bloco-inexistente'
      },
      name: 'referência interna inválida',
    },
    {
      expected: /pergunta ou teste sem retorno e feedback/i,
      mutate: (data: ReturnType<typeof validMissionData>) => {
        data.interactions[0].options[0].feedback = ''
      },
      name: 'interação sem feedback',
    },
    {
      expected: /encerramento sem critério/i,
      mutate: (data: ReturnType<typeof validMissionData>) => {
        data.verification.closingCriteria = []
      },
      name: 'encerramento sem critério',
    },
    {
      expected: /confirmação humana das revisões obrigatórias ausente/i,
      mutate: (data: ReturnType<typeof validMissionData>) => {
        data.review.confirmed = false
      },
      name: 'revisão sem confirmação humana',
    },
  ])('bloqueia $name', async ({ expected, mutate }) => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const data = validMissionData()
    mutate(data)

    await expect(
      payload
        .create({
          collection: 'missions' as never,
          data: {
            ...data,
            _status: 'published',
          } as never,
        })
        .then(trackMission),
    ).rejects.toThrow(expected)
  })

  it('bloqueia publicação sem uma interação identificada como Microdesafio', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const data = validMissionData()

    await expect(
      payload
        .create({
          collection: 'missions' as never,
          data: {
            ...data,
            interactions: data.interactions.map((interaction) => ({
              ...interaction,
              kind: 'client-question',
            })),
            _status: 'published',
          } as never,
        })
        .then(trackMission),
    ).rejects.toThrow(/Microdesafio/i)
  })

  it('bloqueia publicação com chave de opção repetida', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const data = validMissionData()
    data.interactions[0].options[1].key = data.interactions[0].options[0].key

    await expect(
      payload
        .create({
          collection: 'missions' as never,
          data: {
            ...data,
            _status: 'published',
          } as never,
        })
        .then(trackMission),
    ).rejects.toThrow(/chave de opção repetida/i)
  })

  it('bloqueia alteração de conteúdo no mesmo comando que publica um rascunho revisado', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const draft = trackMission(
      await payload.create({
        collection: 'missions' as never,
        data: validMissionData() as never,
        draft: true,
      }),
    )

    await expect(
      payload.update({
        collection: 'missions' as never,
        id: (draft as { id: number }).id,
        data: {
          _status: 'published',
          objective: 'Objetivo alterado depois da revisão.',
        } as never,
      }),
    ).rejects.toThrow(/salve.*rascunho.*revise/i)
  })

  it('normaliza o rótulo da versão antes de publicar', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const data = validMissionData()
    data.versionLabel = `  ${data.versionLabel}  `

    const published = trackMission(
      await payload.create({
        collection: 'missions' as never,
        data: {
          ...data,
          _status: 'published',
        } as never,
      }),
    )

    expect(published).toMatchObject({
      publishedVersionHistory: [{ versionLabel: '1.0-teste' }],
      versionLabel: '1.0-teste',
    })
  })

  it('publica uma ficha revisada e entrega a mesma versão ao visitante', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const data = validMissionData()
    const draft = trackMission(
      await payload.create({
        collection: 'missions' as never,
        data: data as never,
        draft: true,
      }),
    )

    const published = await payload.update({
      collection: 'missions' as never,
      id: (draft as { id: number }).id,
      data: {
        _status: 'published',
      } as never,
    })

    expect(published).toMatchObject({
      _status: 'published',
      publishedVersionHistory: [{ versionLabel: data.versionLabel }],
      title: data.title,
      versionLabel: data.versionLabel,
    })
    expect((published as { publishedAt?: string }).publishedAt).toBeTruthy()
    expect((published as { review?: { reviewedAt?: string } }).review?.reviewedAt).toBeTruthy()

    const publicResult = await payload.find({
      collection: 'missions' as never,
      overrideAccess: false,
      where: {
        id: {
          equals: (draft as { id: number }).id,
        },
      },
    })

    expect(publicResult.totalDocs).toBe(1)
    expect(publicResult.docs[0]).toMatchObject({
      title: data.title,
      versionLabel: data.versionLabel,
    })
  })

  it('exige novo rascunho, nova versão e nova revisão para alterar conteúdo publicado', async () => {
    if (!payload) throw new Error('Payload não foi inicializado')

    const data = validMissionData()
    const published = trackMission(
      await payload.create({
        collection: 'missions' as never,
        data: {
          ...data,
          _status: 'published',
        } as never,
      }),
    )

    await expect(
      payload.update({
        collection: 'missions' as never,
        id: (published as { id: number }).id,
        data: {
          objective: 'Objetivo alterado sem abrir uma nova versão.',
        } as never,
      }),
    ).rejects.toThrow(/novo rascunho/i)

    await expect(
      payload.update({
        collection: 'missions' as never,
        draft: true,
        id: (published as { id: number }).id,
        data: {
          _status: 'draft',
          objective: 'Objetivo alterado em rascunho.',
        } as never,
      }),
    ).rejects.toThrow(/nova versão editorial/i)

    const revisedDraft = await payload.update({
      collection: 'missions' as never,
      draft: true,
      id: (published as { id: number }).id,
      data: {
        _status: 'draft',
        objective: 'Objetivo alterado em rascunho.',
        versionLabel: '1.1-teste',
      } as never,
    })

    expect(revisedDraft).toMatchObject({
      _status: 'draft',
      publishedAt: null,
      review: {
        authorship: false,
        confirmed: false,
        pedagogical: false,
        safety: false,
        sanitization: false,
        technical: false,
      },
      versionLabel: '1.1-teste',
    })

    await expect(
      payload.update({
        collection: 'missions' as never,
        draft: true,
        id: (published as { id: number }).id,
        data: {
          _status: 'draft',
          versionLabel: data.versionLabel,
        } as never,
      }),
    ).rejects.toThrow(/versão.*publicada/i)

    await expect(
      payload.update({
        collection: 'missions' as never,
        draft: true,
        id: (published as { id: number }).id,
        data: {
          _status: 'draft',
          versionLabel: `  ${data.versionLabel}  `,
        } as never,
      }),
    ).rejects.toThrow(/versão.*publicada/i)

    const historyPreserved = await payload.update({
      collection: 'missions' as never,
      draft: true,
      id: (published as { id: number }).id,
      data: {
        publishedVersionHistory: [],
      } as never,
    })

    expect(historyPreserved).toMatchObject({
      publishedVersionHistory: [{ versionLabel: data.versionLabel }],
    })

    await expect(
      payload.update({
        collection: 'missions' as never,
        id: (published as { id: number }).id,
        data: {
          _status: 'published',
        } as never,
      }),
    ).rejects.toThrow(/confirmação humana/i)
  })
})
