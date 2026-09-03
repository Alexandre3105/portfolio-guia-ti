import config from '@/payload.config'
import { getPayload } from 'payload'

export async function getLatestPublishedMission() {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'missions',
    draft: false,
    limit: 1,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs[0] ?? null
}
