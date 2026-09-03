import { firstMissionData } from '@/content/first-mission'
import config from '@/payload.config'
import { expect, test } from '@playwright/test'
import { getPayload, type Payload } from 'payload'

import { assertIsolatedTestDatabase } from '../support/test-environment'

let missionID: number | undefined
let draftMissionID: number | undefined
let payload: Payload | undefined
let userID: number | undefined

const adminEmail = `editorial-${crypto.randomUUID()}@example.test`
const adminPassword = 'Teste-editorial-123!'

test.beforeAll(async () => {
  assertIsolatedTestDatabase()
  payload = await getPayload({ config: await config })

  const mission = await payload.create({
    collection: 'missions',
    data: {
      ...firstMissionData,
      title: '[teste] O sistema não abre. Por onde começar?',
      slug: `teste-previa-publica-${crypto.randomUUID()}`,
      versionLabel: '1.0-e2e',
      interactions: [
        {
          key: 'pergunta-inicial',
          blockKey: 'primeira-evidencia',
          kind: 'client-question',
          prompt: 'Qual pergunta você faria ao cliente?',
          options: firstMissionData.interactions[0].options,
        },
        ...firstMissionData.interactions,
      ],
      review: {
        technical: true,
        pedagogical: true,
        authorship: true,
        safety: true,
        sanitization: true,
        confirmed: true,
      },
      _status: 'published',
    },
  })

  missionID = mission.id
  expect(mission.interactions?.map((interaction) => interaction.kind)).toEqual([
    'client-question',
    'microchallenge',
  ])

  const draftMission = await payload.create({
    collection: 'missions',
    data: {
      ...firstMissionData,
      title: '[teste] Rascunho da Prévia Editorial',
      slug: `teste-previa-editorial-${crypto.randomUUID()}`,
    },
    draft: true,
  })
  draftMissionID = draftMission.id

  const user = await payload.create({
    collection: 'users',
    data: {
      email: adminEmail,
      password: adminPassword,
    },
  })
  userID = user.id
})

test.afterAll(async () => {
  if (payload && missionID) {
    await payload.delete({ collection: 'missions', id: missionID })
  }
  if (payload && draftMissionID) {
    await payload.delete({ collection: 'missions', id: draftMissionID })
  }
  if (payload && userID) {
    await payload.delete({ collection: 'users', id: userID })
  }

  await payload?.destroy()
})

test('visitante realiza o Microdesafio publicado sem persistir resposta', async ({ page }) => {
  await page.goto('/formacao')

  await expect(
    page.getByRole('heading', { name: '[teste] O sistema não abre. Por onde começar?' }),
  ).toBeVisible()
  await expect(page.getByText('Versão 1.0-e2e')).toBeVisible()
  await expect(page.getByText('O que você faria primeiro?')).toBeVisible()

  await page
    .getByRole('button', { name: 'Reiniciar o serviço para verificar se o acesso volta.' })
    .click()

  await expect(
    page.getByText('A ação poderia interromper outras pessoas, e você ainda não sabe se o problema é geral.'),
  ).toBeVisible()
  await expect(
    page.getByText('Primeiro delimite o problema. Uma mudança sem evidência pode aumentar o impacto.'),
  ).toBeVisible()

  await page.reload()

  await expect(page.getByText('O que você faria primeiro?')).toBeVisible()
  await expect(
    page.getByText('Primeiro delimite o problema. Uma mudança sem evidência pode aumentar o impacto.'),
  ).not.toBeVisible()
})

test('responsável autenticado revisa e publica o rascunho pelo painel', async ({
  page,
}) => {
  if (!draftMissionID) throw new Error('Rascunho editorial não foi preparado')

  const loginResponse = await page.request.post('/api/users/login', {
    data: {
      email: adminEmail,
      password: adminPassword,
    },
  })
  expect(loginResponse.ok()).toBe(true)

  await page.goto(`/formacao/previa-editorial/${draftMissionID}`)

  await expect(page.getByText('Prévia Editorial', { exact: true })).toBeVisible()
  await expect(page.getByText('Rascunho não público', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: '[teste] Rascunho da Prévia Editorial' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Voltar à ficha' })).toHaveAttribute(
    'href',
    `/admin/collections/missions/${draftMissionID}`,
  )

  await page.goto(`/admin/collections/missions/${draftMissionID}`)
  await expect(page).toHaveURL(new RegExp(`/admin/collections/missions/${draftMissionID}`))

  await page.getByRole('button', { name: /publish/i }).click()
  await expect(page.getByText(/Publicação bloqueada.*confirmação humana/i)).toBeVisible()

  await page.getByRole('button', { name: 'Fontes e revisão' }).click()

  const reviewLabels = [
    'Revisão técnica concluída',
    'Revisão pedagógica concluída',
    'Autoria e atribuições revisadas',
    'Segurança revisada',
    'Sanitização revisada',
    'Confirmo pessoalmente a revisão desta versão',
  ]

  for (const label of reviewLabels) {
    await page.getByLabel(label).check()
  }

  await page.getByRole('button', { name: /publish/i }).click()
  await expect(page.getByText(/updated successfully|publicada com sucesso/i)).toBeVisible()

  await page.goto('/formacao')
  await expect(
    page.getByRole('heading', { name: '[teste] Rascunho da Prévia Editorial' }),
  ).toBeVisible()
})
