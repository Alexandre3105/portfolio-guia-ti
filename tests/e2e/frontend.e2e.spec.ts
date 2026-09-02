import { expect, test } from '@playwright/test'

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

    await page.goto('/formacao')
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

  test('mantém as escolhas e toda a navegação acessíveis no celular', async ({ page }) => {
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
    await professionalChoice.focus()
    await expect(professionalChoice).toBeFocused()
    await expect(professionalChoice).toHaveCSS('outline-style', 'solid')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/portfolio')

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)

    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/')
    const hasOverflowAtMinimumWidth = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasOverflowAtMinimumWidth).toBe(false)
  })
})
