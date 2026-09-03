import { APIError, type CollectionBeforeValidateHook } from 'payload'

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' ? (value as UnknownRecord) : {}
}

function asRecords(value: unknown): UnknownRecord[] {
  return Array.isArray(value) ? value.map(asRecord) : []
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeVersionLabel(value: unknown) {
  return hasText(value) ? value.trim() : value
}

function hasValidHttpUrl(value: unknown) {
  if (!hasText(value)) return false

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const editorialFieldNames = [
  'title',
  'slug',
  'module',
  'summary',
  'objective',
  'versionLabel',
  'competencies',
  'scenario',
  'blocks',
  'interactions',
  'verification',
  'debriefing',
  'sources',
  'authorship',
] as const

function getEditorialSnapshot(value: unknown) {
  const mission = asRecord(value)

  return Object.fromEntries(
    editorialFieldNames.map((fieldName) => [
      fieldName,
      fieldName === 'versionLabel'
        ? normalizeVersionLabel(mission[fieldName])
        : mission[fieldName],
    ]),
  )
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value as UnknownRecord)
      .filter(([, nestedValue]) => nestedValue !== undefined)
      .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
      .map(([key, nestedValue]) => [key, canonicalize(nestedValue)]),
  )
}

function hasEditorialChanges(originalDoc: unknown, nextDoc: unknown) {
  return (
    JSON.stringify(canonicalize(getEditorialSnapshot(originalDoc))) !==
    JSON.stringify(canonicalize(getEditorialSnapshot(nextDoc)))
  )
}

function getPublishedVersionHistory(value: unknown) {
  const mission = asRecord(value)
  const seenVersionLabels = new Set<string>()
  const history = asRecords(mission.publishedVersionHistory).flatMap((entry) => {
    const versionLabel = normalizeVersionLabel(entry.versionLabel)
    if (!hasText(versionLabel) || seenVersionLabels.has(versionLabel)) return []

    seenVersionLabels.add(versionLabel)
    return [{ ...entry, versionLabel }]
  })
  const currentVersionLabel = normalizeVersionLabel(mission.versionLabel)

  if (
    mission._status === 'published' &&
    hasText(currentVersionLabel) &&
    !seenVersionLabels.has(currentVersionLabel)
  ) {
    history.push({ versionLabel: currentVersionLabel })
  }

  return history
}

function resetReview(data: UnknownRecord, publishedVersionHistory: UnknownRecord[]) {
  return {
    ...data,
    publishedAt: null,
    publishedVersionHistory,
    review: {
      authorship: false,
      confirmed: false,
      pedagogical: false,
      reviewedAt: null,
      safety: false,
      sanitization: false,
      technical: false,
    },
  }
}

export function getMissionPublicationIssues(value: unknown) {
  const mission = asRecord(value)
  const issues: string[] = []

  const requiredIdentification = [
    ['título', mission.title],
    ['slug', mission.slug],
    ['módulo', mission.module],
    ['resumo público', mission.summary],
    ['objetivo', mission.objective],
    ['versão editorial', mission.versionLabel],
  ] as const

  for (const [label, fieldValue] of requiredIdentification) {
    if (!hasText(fieldValue)) issues.push(`${label} ausente`)
  }

  const competencies = asRecords(mission.competencies)
  if (
    competencies.length === 0 ||
    competencies.some((competency) => !hasText(competency.key) || !hasText(competency.label))
  ) {
    issues.push('competência identificável ausente')
  }

  const scenario = asRecord(mission.scenario)
  if (
    !hasText(scenario.openingMessage) ||
    !hasText(scenario.context) ||
    !hasText(scenario.safetyBoundary)
  ) {
    issues.push('cenário incompleto')
  }

  const blocks = asRecords(mission.blocks)
  const blockKeys = new Set(
    blocks.map((block) => block.key).filter((key): key is string => hasText(key)),
  )
  if (
    blocks.length === 0 ||
    blocks.some(
      (block) =>
        !hasText(block.key) ||
        !hasText(block.kind) ||
        !hasText(block.title) ||
        !hasText(block.body),
    )
  ) {
    issues.push('bloco da missão incompleto')
  }
  if (blockKeys.size !== blocks.length) issues.push('chave de bloco repetida')

  const interactions = asRecords(mission.interactions)
  const interactionKeys = new Set(
    interactions
      .map((interaction) => interaction.key)
      .filter((key): key is string => hasText(key)),
  )
  if (
    interactions.length === 0 ||
    interactions.some(
      (interaction) =>
        !hasText(interaction.key) ||
        !hasText(interaction.blockKey) ||
        !hasText(interaction.kind) ||
        !hasText(interaction.prompt),
    )
  ) {
    issues.push('interação incompleta')
  }
  if (interactionKeys.size !== interactions.length) issues.push('chave de interação repetida')
  if (!interactions.some((interaction) => interaction.kind === 'microchallenge')) {
    issues.push('Microdesafio ausente')
  }
  if (
    interactions.some(
      (interaction) => hasText(interaction.blockKey) && !blockKeys.has(interaction.blockKey),
    )
  ) {
    issues.push('referência interna de bloco inválida')
  }

  if (
    interactions.some((interaction) => {
      const options = asRecords(interaction.options)
      return (
        options.length < 2 ||
        options.some(
          (option) =>
            !hasText(option.key) ||
            !hasText(option.label) ||
            !hasText(option.outcome) ||
            !hasText(option.feedback),
        )
      )
    })
  ) {
    issues.push('pergunta ou teste sem retorno e feedback')
  }
  if (
    interactions.some((interaction) => {
      const options = asRecords(interaction.options)
      const optionKeys = new Set(
        options.map((option) => option.key).filter((key): key is string => hasText(key)),
      )
      return optionKeys.size !== options.length
    })
  ) {
    issues.push('chave de opção repetida')
  }

  const verification = asRecord(mission.verification)
  const requiredInteractions = asRecords(verification.requiredInteractions)
  if (
    requiredInteractions.length === 0 ||
    requiredInteractions.some(
      (reference) => !hasText(reference.key) || !interactionKeys.has(reference.key),
    )
  ) {
    issues.push('referência de verificação inválida')
  }
  const closingCriteria = asRecords(verification.closingCriteria)
  if (
    closingCriteria.length === 0 ||
    closingCriteria.some((criterion) => !hasText(criterion.description))
  ) {
    issues.push('encerramento sem critério')
  }

  const debriefing = asRecord(mission.debriefing)
  if (!hasText(debriefing.summary) || !hasText(debriefing.nextStep)) {
    issues.push('debriefing incompleto')
  }

  const sources = asRecords(mission.sources)
  if (
    sources.length === 0 ||
    sources.some(
      (source) =>
        !hasText(source.title) ||
        !hasText(source.publisher) ||
        !hasValidHttpUrl(source.url),
    )
  ) {
    issues.push('fonte ausente ou URL inválida')
  }

  const authorship = asRecord(mission.authorship)
  if (!hasText(authorship.authorName) || !hasText(authorship.contribution)) {
    issues.push('autoria incompleta')
  }

  const review = asRecord(mission.review)
  const reviewChecks = [
    review.technical,
    review.pedagogical,
    review.authorship,
    review.safety,
    review.sanitization,
  ]
  if (review.confirmed !== true || reviewChecks.some((check) => check !== true)) {
    issues.push('confirmação humana das revisões obrigatórias ausente')
  }

  return issues
}

export const validateMissionPublication: CollectionBeforeValidateHook = ({ data, originalDoc }) => {
  const originalMission = asRecord(originalDoc)
  const submittedData = asRecord(data)
  const mergedMission = {
    ...originalMission,
    ...submittedData,
  }
  const normalizedVersionLabel = normalizeVersionLabel(mergedMission.versionLabel)
  if (hasText(normalizedVersionLabel)) {
    mergedMission.versionLabel = normalizedVersionLabel
    submittedData.versionLabel = normalizedVersionLabel
  }

  const hasPersistedOriginal =
    typeof originalMission.id === 'number' || hasText(originalMission.id)
  const editorialChanged =
    hasPersistedOriginal && hasEditorialChanges(originalMission, mergedMission)
  const publishedVersionHistory = getPublishedVersionHistory(originalMission)

  if (
    editorialChanged &&
    originalMission._status === 'published' &&
    mergedMission._status === 'published'
  ) {
    throw new APIError(
      'Alteração bloqueada. Crie um novo rascunho, identifique uma nova versão editorial e revise novamente antes de publicar.',
      400,
    )
  }

  if (
    editorialChanged &&
    hasText(mergedMission.versionLabel) &&
    publishedVersionHistory.some((entry) => entry.versionLabel === mergedMission.versionLabel)
  ) {
    throw new APIError(
      `Alteração bloqueada. A versão editorial ${mergedMission.versionLabel} já foi publicada; informe uma nova versão editorial.`,
      400,
    )
  }

  if (
    editorialChanged &&
    originalMission._status === 'draft' &&
    mergedMission._status === 'published'
  ) {
    throw new APIError(
      'Alteração bloqueada. Salve o novo conteúdo como rascunho e revise a versão antes de publicar.',
      400,
    )
  }

  if (editorialChanged && mergedMission._status === 'draft') {
    return resetReview(submittedData, publishedVersionHistory)
  }

  if (mergedMission._status !== 'published') {
    return {
      ...submittedData,
      publishedVersionHistory,
    }
  }

  const issues = getMissionPublicationIssues(mergedMission)
  if (issues.length > 0) {
    throw new APIError(`Publicação bloqueada. Corrija: ${issues.join('; ')}.`, 400)
  }

  return {
    ...data,
    publishedAt: hasText(mergedMission.publishedAt)
      ? mergedMission.publishedAt
      : new Date().toISOString(),
    publishedVersionHistory: getPublishedVersionHistory({
      ...mergedMission,
      _status: 'published',
      publishedVersionHistory,
    }),
    review: {
      ...asRecord(mergedMission.review),
      reviewedAt: hasText(asRecord(mergedMission.review).reviewedAt)
        ? asRecord(mergedMission.review).reviewedAt
        : new Date().toISOString(),
    },
  }
}
