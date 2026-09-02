import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let payload: Payload | undefined

describe('Payload CMS com PostgreSQL', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  afterAll(async () => {
    await payload?.destroy()
  })

  it('consulta a collection de usuários pelo adapter PostgreSQL', async () => {
    if (!payload) {
      throw new Error('Payload não foi inicializado pelo setup do teste')
    }

    const users = await payload.find({
      collection: 'users',
    })

    expect(Array.isArray(users.docs)).toBe(true)
    expect(users.totalDocs).toBeGreaterThanOrEqual(0)
  })
})
