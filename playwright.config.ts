import { defineConfig, devices } from '@playwright/test'

import { loadTestEnvironment } from './tests/support/test-environment'

loadTestEnvironment()

const testServerHost = '127.0.0.1'
const testServerPort = '3100'
const testServerShutdownPath = '/__e2e_shutdown__'
const testServerURL = `http://${testServerHost}:${testServerPort}`

process.env.E2E_SERVER_HOST = testServerHost
process.env.E2E_SERVER_PORT = testServerPort
process.env.E2E_SHUTDOWN_PATH = testServerShutdownPath
process.env.NEXT_DIST_DIR = '.next-playwright'
process.env.SITE_URL = testServerURL

export default defineConfig({
  expect: {
    timeout: 10_000,
  },
  globalTeardown: './tests/e2e/global-teardown.ts',
  testDir: './tests/e2e',
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: testServerURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: 'node scripts/start-e2e-server.mjs',
    reuseExistingServer: false,
    timeout: 120_000,
    url: testServerURL,
  },
})
