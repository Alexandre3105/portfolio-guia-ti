import { config as loadEnv } from 'dotenv'

const allowedDatabaseHosts = new Set(['127.0.0.1', 'localhost', 'postgres'])
const testDatabaseName = 'mansk_test'

export function assertIsolatedTestDatabase() {
  const databaseURL = process.env.DATABASE_URL
  if (!databaseURL) throw new Error('DATABASE_URL ausente no ambiente de teste')

  const parsedURL = new URL(databaseURL)
  const databaseName = decodeURIComponent(parsedURL.pathname.replace(/^\//, ''))

  if (!allowedDatabaseHosts.has(parsedURL.hostname) || databaseName !== testDatabaseName) {
    throw new Error(
      `Banco recusado nos testes: ${parsedURL.hostname}/${databaseName}. Use somente ${testDatabaseName} em um host local.`,
    )
  }
}

export function loadTestEnvironment() {
  loadEnv({ path: '.env.local' })
  loadEnv({ path: 'test.env', override: true })

  if (process.env.TEST_DATABASE_URL) {
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
  }

  assertIsolatedTestDatabase()
}
