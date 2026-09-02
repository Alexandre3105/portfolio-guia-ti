import { expect, test } from '@playwright/test'

test.describe('Fundação pública da MANSK', () => {
  test('apresenta a identidade do produto', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('MANSK | Portfólio e Formação em TI')
    await expect(page.getByRole('heading', { level: 1, name: 'MANSK' })).toBeVisible()
    await expect(page.getByText('Soluções digitais para operações, dados e aprendizagem.')).toBeVisible()
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
