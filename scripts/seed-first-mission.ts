import { firstMissionData } from '@/content/first-mission'
import config from '@/payload.config'
import { getPayload } from 'payload'

async function seedFirstMission() {
  const payload = await getPayload({ config: await config })

  try {
    const existing = await payload.find({
      collection: 'missions',
      draft: true,
      limit: 1,
      where: {
        slug: {
          equals: firstMissionData.slug,
        },
      },
    })

    if (existing.docs[0]) {
      payload.logger.info(
        `Ficha da Missão já existe (ID ${existing.docs[0].id}, status ${existing.docs[0]._status ?? 'draft'}). Nenhum conteúdo foi sobrescrito.`,
      )
      return
    }

    const mission = await payload.create({
      collection: 'missions',
      data: firstMissionData,
      draft: true,
    })

    payload.logger.info(
      `Rascunho da primeira Ficha da Missão criado com ID ${mission.id}. Revise a Prévia Editorial antes de publicar.`,
    )
  } finally {
    await payload.destroy()
  }
}

seedFirstMission()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
