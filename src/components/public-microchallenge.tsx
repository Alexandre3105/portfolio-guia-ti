'use client'

import { useState } from 'react'

type Option = {
  feedback: string
  key: string
  label: string
  outcome: string
}

type PublicMicrochallengeProps = {
  options: Option[]
  prompt: string
}

export function PublicMicrochallenge({ options, prompt }: PublicMicrochallengeProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const selectedOption = options.find((option) => option.key === selectedKey)

  return (
    <section className="microchallenge" aria-labelledby="microchallenge-title">
      <div className="microchallenge__heading">
        <p className="section-index">MICRODESAFIO</p>
        <div>
          <h2 id="microchallenge-title">{prompt}</h2>
          <p>Escolha uma ação. A consequência será revelada depois do clique.</p>
        </div>
      </div>

      <div className="microchallenge__options" aria-label="Ações disponíveis">
        {options.map((option) => (
          <button
            aria-pressed={selectedKey === option.key}
            className="mission-option"
            key={option.key}
            onClick={() => setSelectedKey(option.key)}
            type="button"
          >
            <span>{option.label}</span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>

      <div className="microchallenge__result" aria-live="polite">
        {selectedOption ? (
          <>
            <p className="eyebrow">O que aconteceu</p>
            <p>{selectedOption.outcome}</p>
            <p className="microchallenge__feedback">{selectedOption.feedback}</p>
          </>
        ) : (
          <p className="microchallenge__waiting">Nenhuma ação escolhida.</p>
        )}
      </div>
    </section>
  )
}
