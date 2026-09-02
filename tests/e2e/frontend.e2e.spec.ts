import { expect, type Page, test } from '@playwright/test'

async function expectNoHorizontalOverflow(page: Page, path: string) {
  await page.goto(path)

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(
    viewport.scrollWidth,
    `${path} não deve ultrapassar a largura ${viewport.clientWidth}px`,
  ).toBe(viewport.clientWidth)
}

test.describe('Fundação pública da MANSK', () => {
  test('apresenta a identidade do produto', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('MANSK | Portfólio e Formação em TI')
    await expect(page.getByRole('link', { name: 'MANSK — início' })).toBeVisible()
    await expect(
      page.getByText('Soluções digitais para operações, dados e aprendizagem.'),
    ).toBeVisible()
  })

  test('expõe um health check mínimo e sem dados pessoais', async ({ request }) => {
    const response = await request.get('/api/health')

    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual({
      service: 'mansk-web',
      status: 'ok',
    })
    expect(response.headers()['cache-control']).toContain('no-store')
  })
})

test.describe('Entrada Orientada', () => {
  test('apresenta as duas intenções e navegação pública compartilhável', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: 'O que você quer resolver hoje?' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Tenho um problema ou projeto\./ }),
    ).toHaveAttribute('href', '/portfolio')
    await expect(
      page.getByRole('link', {
        name: /Quero aprender a resolver problemas de tecnologia\./,
      }),
    ).toHaveAttribute('href', '/formacao')

    const navigation = page.getByRole('navigation', { name: 'Navegação principal' })
    await expect(navigation.getByRole('link', { name: 'Projetos' })).toHaveAttribute(
      'href',
      '/portfolio#projetos',
    )
    await expect(navigation.getByRole('link', { name: 'Formação' })).toHaveAttribute(
      'href',
      '/formacao',
    )
    await expect(navigation.getByRole('link', { name: 'Trajetória' })).toHaveAttribute(
      'href',
      '/portfolio#trajetoria',
    )
    await expect(navigation.getByRole('link', { name: 'Entrar' })).toHaveAttribute(
      'href',
      '/entrar',
    )
  })

  test('preserva contexto ao navegar pelas jornadas e pelo histórico', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /Tenho um problema ou projeto\./ }).click()
    await expect(page).toHaveURL('/portfolio')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Projetos que partem do problema real.' }),
    ).toBeVisible()

    await page.goBack()
    await expect(
      page.getByRole('heading', { level: 1, name: 'O que você quer resolver hoje?' }),
    ).toBeVisible()

    await page
      .getByRole('link', { name: /Quero aprender a resolver problemas de tecnologia\./ })
      .click()
    await expect(page).toHaveURL('/formacao')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Aprenda a investigar antes de concluir.' }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'MANSK — início' })).toHaveAttribute('href', '/')

    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos' })
      .click()
    await expect(page).toHaveURL('/portfolio#projetos')
    await expect(page.getByRole('heading', { level: 2, name: 'Casos de projeto' })).toBeVisible()

    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Trajetória' })
      .click()
    await expect(page).toHaveURL('/portfolio#trajetoria')
    await expect(page.getByRole('heading', { level: 2, name: 'Trajetória' })).toBeVisible()

    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Entrar' })
      .click()
    await expect(page).toHaveURL('/entrar')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Seu acesso começa depois da prévia.' }),
    ).toBeVisible()
  })

  test('mantém as duas escolhas e toda a navegação disponíveis no celular', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const navigation = page.getByRole('navigation', { name: 'Navegação principal' })
    for (const label of ['Projetos', 'Formação', 'Trajetória', 'Entrar']) {
      await expect(navigation.getByRole('link', { name: label, exact: true })).toBeVisible()
    }

    const learningChoice = page.getByRole('link', {
      name: /Quero aprender a resolver problemas de tecnologia\./,
    })
    await expect(learningChoice).toBeVisible()
    await learningChoice.click()
    await expect(page).toHaveURL('/formacao')

    await page.goBack()
    const professionalChoice = page.getByRole('link', { name: /Tenho um problema ou projeto\./ })
    await professionalChoice.click()
    await expect(page).toHaveURL('/portfolio')
  })

  test('percorre a ordem lógica por Tab com foco visível e ativa a escolha', async ({ page }) => {
    await page.goto('/')

    const focusOrder = [
      page.getByRole('link', { name: 'Pular para o conteúdo' }),
      page.getByRole('link', { name: 'MANSK — início' }),
      page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', {
        name: 'Projetos',
        exact: true,
      }),
      page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', {
        name: 'Formação',
        exact: true,
      }),
      page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', {
        name: 'Trajetória',
        exact: true,
      }),
      page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', {
        name: 'Entrar',
        exact: true,
      }),
      page.getByRole('link', { name: /Tenho um problema ou projeto\./ }),
      page.getByRole('link', { name: /Quero aprender a resolver problemas de tecnologia\./ }),
    ]

    for (const link of focusOrder) {
      await page.keyboard.press('Tab')
      await expect(link).toBeFocused()
      await expect(link).toHaveCSS('outline-style', 'solid')
    }

    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/formacao')
  })

  for (const width of [320, 390, 640, 768, 1280]) {
    test(`não cria rolagem horizontal nas rotas públicas em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 })

      for (const path of ['/', '/portfolio', '/formacao', '/entrar']) {
        await expectNoHorizontalOverflow(page, path)
      }
    })
  }
})
