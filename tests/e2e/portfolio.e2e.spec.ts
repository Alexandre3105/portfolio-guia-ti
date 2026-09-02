import { expect, test } from '@playwright/test'

test.describe('Jornada Profissional', () => {
  test('abre com a promessa e apresenta o AcompanhaPET como evidência delimitada', async ({
    page,
  }) => {
    await page.goto('/portfolio')

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Transformo problemas técnicos em soluções compreensíveis, seguras e documentadas, conectando suporte, implantação, ensino e desenvolvimento.',
      }),
    ).toBeVisible()
    await expect(
      page.getByText('Soluções digitais para operações, dados e aprendizagem.'),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'Conte seu problema' })).toHaveAttribute(
      'href',
      '#contato',
    )

    const caseStudy = page.getByRole('article', { name: 'AcompanhaPET' })
    await expect(caseStudy).toBeVisible()
    for (const evidenceLabel of ['Problema', 'Participação', 'Solução', 'Resultado', 'Limites']) {
      await expect(caseStudy.getByText(evidenceLabel, { exact: true })).toBeVisible()
    }
    await expect(caseStudy).toContainText('NB Petshop')
    await expect(caseStudy).toContainText('Desenvolvimento Assistido por IA')
    await expect(caseStudy).toContainText('meu irmão')
    await expect(caseStudy).toContainText('testes automatizados')
    await expect(caseStudy).toContainText('acompanhamento semanal')
    await expect(caseStudy).toContainText('NFC-e')
    await expect(caseStudy).not.toContainText('R$')
  })

  test('organiza os quatro casos pelo mesmo contrato de evidência e preserva anonimato', async ({
    page,
  }) => {
    await page.goto('/portfolio#projetos')

    const caseNames = [
      'AcompanhaPET',
      'Dashboard comercial',
      'Implantação em academia',
      'portfolio-guia-ti',
    ]
    const caseHeadings = page.locator('#projetos article h3')
    await expect(caseHeadings).toHaveText(caseNames)

    for (const caseName of caseNames) {
      const caseStudy = page.getByRole('article', { name: caseName })
      for (const evidenceLabel of ['Problema', 'Participação', 'Solução', 'Resultado', 'Limites']) {
        await expect(caseStudy.getByText(evidenceLabel, { exact: true })).toBeVisible()
      }
    }

    const dashboard = page.getByRole('article', { name: 'Dashboard comercial' })
    await expect(dashboard).toContainText('Power BI')
    await expect(dashboard).toContainText('funil')
    await expect(dashboard).toContainText('possíveis gargalos')

    const academy = page.getByRole('article', { name: 'Implantação em academia' })
    await expect(academy).toContainText('baixa de cobranças')
    await expect(academy).toContainText('retorno de alunos')
    await expect(academy).toContainText('extração de relatórios')

    const guide = page.getByRole('article', { name: 'portfolio-guia-ti' })
    for (const state of ['Planejado', 'Construído', 'Validado']) {
      await expect(guide.getByText(state, { exact: true })).toBeVisible()
    }

    await expect(dashboard).toContainText('A organização permanece anônima')
    await expect(academy).toContainText('Academia, empresa e produtos permanecem anônimos')
  })

  test('conduz da entrada ao contato, apresenta as duas ofertas e aponta à trajetória pública', async ({
    page,
  }) => {
    await page.goto('/portfolio')

    const journeySections = page.locator('main [data-professional-step]')
    const sectionIds = await journeySections.evaluateAll((sections) =>
      sections.map((section) => section.id),
    )
    expect(sectionIds).toEqual([
      'entrada-profissional',
      'projetos',
      'como-posso-ajudar',
      'trajetoria',
      'contato',
    ])

    const services = page.getByRole('region', { name: 'Como posso ajudar' })
    await expect(services.getByRole('heading', { name: 'Soluções para operações' })).toBeVisible()
    await expect(services).toContainText(/ferramentas/i)
    await expect(services).toContainText('automações')
    await expect(services).toContainText('documentação')
    await expect(services).toContainText('treinamento')
    await expect(services.getByRole('heading', { name: 'Dados para decisões' })).toBeVisible()
    await expect(services).toContainText('Power BI')
    await expect(services).toContainText('análise estatística')
    await expect(services).toContainText('Machine learning é conhecimento em desenvolvimento')

    const trajectory = page.getByRole('region', { name: 'Trajetória' })
    const linkedIn = trajectory.getByRole('link', { name: 'Ver trajetória no LinkedIn' })
    await expect(linkedIn).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/alexandre-blank-lopes-029057215/',
    )
    await expect(trajectory.locator('a[href$=".pdf"]')).toHaveCount(0)
  })

  test('organiza a mensagem no navegador e oferece revisão antes do WhatsApp', async ({ page }) => {
    await page.goto('/portfolio#contato')

    const applicationWrites: string[] = []
    page.on('request', (request) => {
      if (
        ['fetch', 'xhr'].includes(request.resourceType()) &&
        new URL(request.url()).origin === 'http://127.0.0.1:3000'
      ) {
        applicationWrites.push(`${request.method()} ${request.url()}`)
      }
    })

    await page.getByLabel('Como posso chamar você?').fill('  Marina  ')
    await page
      .getByLabel('Qual problema ou projeto você quer resolver?')
      .fill('  Quero organizar o fluxo de vendas.  ')
    await page
      .getByLabel('O que acontece hoje?')
      .fill('As informações ficam em planilhas separadas.')
    await page
      .getByLabel('Qual resultado você espera?')
      .fill('Comparar o funil e decidir os próximos passos.')

    await page.getByRole('button', { name: 'Revisar mensagem' }).click()

    const review = page.getByRole('region', { name: 'Revise sua mensagem' })
    await expect(review).toBeVisible()
    await expect(review).toContainText('Olá, Alexandre! Meu nome é Marina.')
    await expect(review).toContainText('Problema ou projeto: Quero organizar o fluxo de vendas.')
    await expect(review).toContainText(
      'Cenário atual: As informações ficam em planilhas separadas.',
    )
    await expect(review).toContainText(
      'Resultado esperado: Comparar o funil e decidir os próximos passos.',
    )

    const whatsappLink = review.getByRole('link', { name: 'Abrir conversa no WhatsApp' })
    const href = await whatsappLink.getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\/(?:\d+)?\?text=/)
    expect(applicationWrites).toEqual([])

    await page.reload()
    await expect(page.getByLabel('Qual problema ou projeto você quer resolver?')).toHaveValue('')
    await expect(page.getByRole('region', { name: 'Revise sua mensagem' })).toHaveCount(0)
  })

  test('oferece uma apresentação social coerente com a marca', async ({ page, request }) => {
    await page.goto('/portfolio')

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'MANSK')
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      'Soluções digitais para operações, dados e aprendizagem.',
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.png$/)

    const image = await request.get('/og.png')
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toBe('image/png')
  })
})
