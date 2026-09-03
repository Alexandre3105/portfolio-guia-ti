import type { Mission } from '@/payload-types'

import { PublicMicrochallenge } from './public-microchallenge'

type MissionExperienceProps = {
  editorial?: boolean
  mission: Mission
}

export function MissionExperience({ editorial = false, mission }: MissionExperienceProps) {
  const conceptBlocks = mission.blocks?.filter((block) => block.kind === 'essential-concept') ?? []
  const interaction = mission.interactions?.find(
    (candidate) => candidate.kind === 'microchallenge',
  )
  const options =
    interaction?.options?.map((option) => ({
      feedback: option.feedback,
      key: option.key,
      label: option.label,
      outcome: option.outcome,
    })) ?? []

  return (
    <div className="mission-experience">
      <header className="mission-heading">
        <div>
          <p className="eyebrow">{mission.module}</p>
          <h2>{mission.title}</h2>
        </div>
        <p className="mission-version">Versão {mission.versionLabel}</p>
      </header>

      <div className="mission-objective">
        <p className="section-index">OBJETIVO</p>
        <p>{mission.objective}</p>
      </div>

      {editorial && mission.competencies?.length ? (
        <section className="mission-editorial-section" aria-labelledby="competencias-title">
          <p className="section-index">COMPETÊNCIAS</p>
          <div>
            <h3 id="competencias-title">O que esta versão observa</h3>
            <ul>
              {mission.competencies.map((competency) => (
                <li key={competency.key}>{competency.label}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mission-scenario" aria-labelledby="cenario-title">
        <div className="mission-scenario__label">
          <p className="eyebrow">Cliente fictício</p>
          <p id="cenario-title">Início do atendimento</p>
        </div>
        <blockquote>{mission.scenario?.openingMessage}</blockquote>
        {editorial ? <p className="mission-context">{mission.scenario?.context}</p> : null}
      </section>

      <aside className="mission-safety">
        <p className="section-index">LIMITE</p>
        <p>{mission.scenario?.safetyBoundary}</p>
      </aside>

      {conceptBlocks.map((block) => (
        <section className="mission-concept" key={block.key}>
          <p className="section-index">CONCEITO ESSENCIAL</p>
          <div>
            <h3>{block.title}</h3>
            <p>{block.body}</p>
          </div>
        </section>
      ))}

      {interaction && options.length >= 2 ? (
        <PublicMicrochallenge options={options} prompt={interaction.prompt} />
      ) : (
        <div className="mission-empty">Esta versão ainda não possui um Microdesafio completo.</div>
      )}

      {editorial ? (
        <>
          <section className="mission-editorial-section" aria-labelledby="encerramento-title">
            <p className="section-index">ENCERRAMENTO</p>
            <div>
              <h3 id="encerramento-title">Critérios desta versão</h3>
              <ul>
                {mission.verification?.closingCriteria?.map((criterion) => (
                  <li key={criterion.id ?? criterion.description}>{criterion.description}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mission-editorial-section" aria-labelledby="debriefing-title">
            <p className="section-index">DEBRIEFING</p>
            <div>
              <h3 id="debriefing-title">Síntese curta</h3>
              <p>{mission.debriefing?.summary}</p>
              <p>{mission.debriefing?.nextStep}</p>
            </div>
          </section>

          <section className="mission-editorial-section" aria-labelledby="fontes-title">
            <p className="section-index">FONTES E AUTORIA</p>
            <div>
              <h3 id="fontes-title">Base revisável</h3>
              <ul>
                {mission.sources?.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="noreferrer" target="_blank">
                      {source.title} · {source.publisher}
                    </a>
                  </li>
                ))}
              </ul>
              <p>{mission.authorship?.contribution}</p>
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}
