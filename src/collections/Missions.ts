import type { CollectionConfig } from 'payload'

import { validateMissionPublication } from '@/domain/mission-publication'

const isAuthenticated = ({ req }: { req: { user: unknown } }) => Boolean(req.user)

const moduleOptions = [
  'Atender e investigar',
  'Computadores e periféricos',
  'Sistemas operacionais e ferramentas',
  'Redes e conectividade',
  'Sistemas web, contas e integrações',
  'Segurança, privacidade e recuperação',
  'Dispositivos conectados',
  'Desafio final de atendimento',
]

export const Missions: CollectionConfig = {
  slug: 'missions',
  labels: {
    plural: 'Fichas da Missão',
    singular: 'Ficha da Missão',
  },
  admin: {
    defaultColumns: ['title', 'module', 'versionLabel', '_status', 'updatedAt'],
    group: 'Formação',
    preview: (doc) =>
      typeof doc.id === 'number' || typeof doc.id === 'string'
        ? `/formacao/previa-editorial/${doc.id}`
        : null,
    useAsTitle: 'title',
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: ({ req }) =>
      req.user
        ? true
        : {
            _status: {
              equals: 'published',
            },
          },
    readVersions: isAuthenticated,
    update: isAuthenticated,
  },
  hooks: {
    beforeValidate: [validateMissionPublication],
  },
  versions: {
    drafts: {
      validate: false,
    },
    maxPerDoc: 20,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identificação',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug público',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'module',
              type: 'select',
              label: 'Módulo da Formação',
              options: moduleOptions,
              required: true,
            },
            {
              name: 'summary',
              type: 'textarea',
              label: 'Resumo público',
              required: true,
            },
            {
              name: 'objective',
              type: 'textarea',
              label: 'Objetivo observável',
              required: true,
            },
            {
              name: 'versionLabel',
              type: 'text',
              label: 'Versão editorial',
              defaultValue: '1.0',
              required: true,
              admin: {
                description:
                  'Ao alterar conteúdo já publicado, salve um novo rascunho com outra versão e refaça as revisões.',
              },
            },
            {
              name: 'publishedVersionHistory',
              type: 'array',
              admin: {
                hidden: true,
                readOnly: true,
              },
              fields: [
                {
                  name: 'versionLabel',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'competencies',
              type: 'array',
              label: 'Competências',
              minRows: 1,
              fields: [
                {
                  name: 'key',
                  type: 'text',
                  label: 'Chave',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Competência observável',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Cenário e blocos',
          fields: [
            {
              name: 'scenario',
              type: 'group',
              label: 'Cenário fictício',
              fields: [
                {
                  name: 'openingMessage',
                  type: 'textarea',
                  label: 'Relato inicial',
                  required: true,
                },
                {
                  name: 'context',
                  type: 'textarea',
                  label: 'Contexto disponível',
                  required: true,
                },
                {
                  name: 'safetyBoundary',
                  type: 'textarea',
                  label: 'Limite de segurança e autorização',
                  required: true,
                },
              ],
            },
            {
              name: 'blocks',
              type: 'array',
              label: 'Blocos da Missão',
              minRows: 1,
              fields: [
                {
                  name: 'key',
                  type: 'text',
                  label: 'Chave interna',
                  required: true,
                },
                {
                  name: 'kind',
                  type: 'select',
                  label: 'Tipo de bloco',
                  options: [
                    { label: 'Conceito essencial', value: 'essential-concept' },
                    { label: 'Microdesafio', value: 'microchallenge' },
                    { label: 'Caso demonstrado', value: 'demonstrated-case' },
                    { label: 'Investigação guiada', value: 'guided-investigation' },
                    { label: 'Caso de Transferência', value: 'transfer-case' },
                    { label: 'Registro de Atendimento', value: 'service-record' },
                    { label: 'Debriefing', value: 'debriefing' },
                  ],
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título do bloco',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'textarea',
                  label: 'Conteúdo essencial',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Interações e verificação',
          fields: [
            {
              name: 'interactions',
              type: 'array',
              label: 'Interações do catálogo aprovado',
              minRows: 1,
              fields: [
                {
                  name: 'key',
                  type: 'text',
                  label: 'Chave interna',
                  required: true,
                },
                {
                  name: 'blockKey',
                  type: 'text',
                  label: 'Chave do bloco relacionado',
                  required: true,
                },
                {
                  name: 'kind',
                  type: 'select',
                  label: 'Mecânica',
                  options: [
                    { label: 'Microdesafio', value: 'microchallenge' },
                    { label: 'Perguntar ao cliente fictício', value: 'client-question' },
                    { label: 'Realizar Teste Simulado', value: 'simulated-test' },
                  ],
                  required: true,
                },
                {
                  name: 'prompt',
                  type: 'textarea',
                  label: 'Pergunta ou decisão',
                  required: true,
                },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Opções e retornos',
                  minRows: 2,
                  fields: [
                    {
                      name: 'key',
                      type: 'text',
                      label: 'Chave',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'textarea',
                      label: 'Opção apresentada',
                      required: true,
                    },
                    {
                      name: 'outcome',
                      type: 'textarea',
                      label: 'Evidência ou consequência revelada',
                      required: true,
                    },
                    {
                      name: 'feedback',
                      type: 'textarea',
                      label: 'Feedback Acionável',
                      required: true,
                    },
                    {
                      name: 'isRecommended',
                      type: 'checkbox',
                      label: 'Decisão bem fundamentada neste cenário',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
            {
              name: 'verification',
              type: 'group',
              label: 'Verificação determinística',
              fields: [
                {
                  name: 'requiredInteractions',
                  type: 'array',
                  label: 'Interações necessárias nesta versão',
                  minRows: 1,
                  fields: [
                    {
                      name: 'key',
                      type: 'text',
                      label: 'Chave da interação',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'closingCriteria',
                  type: 'array',
                  label: 'Critérios de encerramento',
                  minRows: 1,
                  fields: [
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Critério observável',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'debriefing',
              type: 'group',
              label: 'Debriefing da Missão',
              fields: [
                {
                  name: 'summary',
                  type: 'textarea',
                  label: 'Síntese curta',
                  required: true,
                },
                {
                  name: 'nextStep',
                  type: 'textarea',
                  label: 'Próxima ação sugerida',
                  required: true,
                },
                {
                  name: 'optionalDeepening',
                  type: 'textarea',
                  label: 'Aprofundamento Opcional',
                },
              ],
            },
          ],
        },
        {
          label: 'Fontes e revisão',
          fields: [
            {
              name: 'sources',
              type: 'array',
              label: 'Fontes revisadas',
              minRows: 1,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título',
                  required: true,
                },
                {
                  name: 'publisher',
                  type: 'text',
                  label: 'Responsável pela publicação',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
              ],
            },
            {
              name: 'authorship',
              type: 'group',
              label: 'Autoria',
              fields: [
                {
                  name: 'authorName',
                  type: 'text',
                  label: 'Responsável autoral',
                  required: true,
                },
                {
                  name: 'contribution',
                  type: 'textarea',
                  label: 'Contribuição e limites de autoria',
                  required: true,
                },
                {
                  name: 'assistedByAI',
                  type: 'checkbox',
                  label: 'Preparação com Desenvolvimento Assistido por IA',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'review',
              type: 'group',
              label: 'Confirmação humana',
              admin: {
                description:
                  'Marque somente depois de revisar a Prévia Editorial. A validação automática não substitui essa confirmação.',
              },
              fields: [
                {
                  name: 'technical',
                  type: 'checkbox',
                  label: 'Revisão técnica concluída',
                  defaultValue: false,
                },
                {
                  name: 'pedagogical',
                  type: 'checkbox',
                  label: 'Revisão pedagógica concluída',
                  defaultValue: false,
                },
                {
                  name: 'authorship',
                  type: 'checkbox',
                  label: 'Autoria e atribuições revisadas',
                  defaultValue: false,
                },
                {
                  name: 'safety',
                  type: 'checkbox',
                  label: 'Segurança revisada',
                  defaultValue: false,
                },
                {
                  name: 'sanitization',
                  type: 'checkbox',
                  label: 'Sanitização revisada',
                  defaultValue: false,
                },
                {
                  name: 'confirmed',
                  type: 'checkbox',
                  label: 'Confirmo pessoalmente a revisão desta versão',
                  defaultValue: false,
                },
                {
                  name: 'reviewedAt',
                  type: 'date',
                  label: 'Revisada em',
                  admin: {
                    readOnly: true,
                  },
                },
              ],
            },
            {
              name: 'publishedAt',
              type: 'date',
              label: 'Publicada em',
              admin: {
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
  ],
}
