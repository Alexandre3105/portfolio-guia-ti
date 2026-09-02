'use client'

import { type FormEvent, useState } from 'react'

type ContactComposerProps = {
  whatsappNumber?: string
}

function normalizeMessagePart(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)
}

function buildMessage(fields: {
  currentScenario: string
  expectedOutcome: string
  name: string
  problem: string
}) {
  const name = normalizeMessagePart(fields.name, 80)
  const problem = normalizeMessagePart(fields.problem, 500)
  const currentScenario = normalizeMessagePart(fields.currentScenario, 500)
  const expectedOutcome = normalizeMessagePart(fields.expectedOutcome, 500)

  return [
    `Olá, Alexandre!${name ? ` Meu nome é ${name}.` : ''}`,
    '',
    `Problema ou projeto: ${problem}`,
    currentScenario ? `Cenário atual: ${currentScenario}` : '',
    expectedOutcome ? `Resultado esperado: ${expectedOutcome}` : '',
    '',
    'Gostaria de conversar para entendermos o contexto e os próximos passos.',
  ]
    .filter((line, index, lines) => line || (index > 0 && lines[index - 1]))
    .join('\n')
}

export function ContactComposer({ whatsappNumber = '' }: ContactComposerProps) {
  const [name, setName] = useState('')
  const [problem, setProblem] = useState('')
  const [currentScenario, setCurrentScenario] = useState('')
  const [expectedOutcome, setExpectedOutcome] = useState('')
  const [reviewMessage, setReviewMessage] = useState<string | null>(null)

  const sanitizedNumber = whatsappNumber.replace(/\D/g, '')
  const whatsappHref = reviewMessage
    ? `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(reviewMessage)}`
    : undefined

  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReviewMessage(buildMessage({ currentScenario, expectedOutcome, name, problem }))
  }

  if (reviewMessage && whatsappHref) {
    return (
      <section className="contact-review" aria-labelledby="contact-review-title">
        <div className="contact-review__heading">
          <p className="section-index">Revisão local</p>
          <h3 id="contact-review-title">Revise sua mensagem</h3>
          <p>O texto ainda não foi enviado. Confira e escolha quando abrir o WhatsApp.</p>
        </div>

        <p className="contact-review__message">{reviewMessage}</p>

        {!sanitizedNumber ? (
          <p className="contact-channel-note">
            O destinatário direto ainda está em configuração; o WhatsApp pedirá que você escolha a
            conversa.
          </p>
        ) : null}

        <div className="contact-review__actions">
          <a className="solid-link" href={whatsappHref} target="_blank" rel="noreferrer">
            Abrir conversa no WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <button className="text-button" type="button" onClick={() => setReviewMessage(null)}>
            Editar mensagem
          </button>
        </div>
      </section>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleReview}>
      <div className="field-group field-group--short">
        <label htmlFor="contact-name">Como posso chamar você?</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome ou como prefere ser chamado"
        />
      </div>

      <div className="field-group">
        <label htmlFor="contact-problem">Qual problema ou projeto você quer resolver?</label>
        <textarea
          id="contact-problem"
          name="problem"
          required
          maxLength={500}
          rows={4}
          value={problem}
          onChange={(event) => setProblem(event.target.value)}
          placeholder="Descreva o ponto principal em poucas linhas."
        />
      </div>

      <div className="contact-form__supporting-fields">
        <div className="field-group">
          <label htmlFor="contact-scenario">O que acontece hoje?</label>
          <textarea
            id="contact-scenario"
            name="currentScenario"
            maxLength={500}
            rows={4}
            value={currentScenario}
            onChange={(event) => setCurrentScenario(event.target.value)}
            placeholder="Conte o cenário atual, sem dados confidenciais."
          />
        </div>

        <div className="field-group">
          <label htmlFor="contact-outcome">Qual resultado você espera?</label>
          <textarea
            id="contact-outcome"
            name="expectedOutcome"
            maxLength={500}
            rows={4}
            value={expectedOutcome}
            onChange={(event) => setExpectedOutcome(event.target.value)}
            placeholder="O que precisa ficar mais simples, visível ou organizado?"
          />
        </div>
      </div>

      <div className="contact-form__footer">
        <p>
          A mensagem é preparada somente neste navegador. Não inclua senhas, documentos ou dados de
          clientes.
        </p>
        <button className="solid-button" type="submit">
          Revisar mensagem <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
