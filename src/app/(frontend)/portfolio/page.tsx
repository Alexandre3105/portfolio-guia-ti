import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactComposer } from '@/components/contact-composer'
import { caseStudies } from '@/content/portfolio'

export const metadata: Metadata = {
  title: 'Projetos | MANSK',
  description: 'Projetos de operações, dados e aprendizagem conduzidos por Alexandre Blank Lopes.',
}

export const dynamic = 'force-dynamic'

export default function PortfolioPage() {
  return (
    <article className="professional-page">
      <header id="entrada-profissional" className="portfolio-hero" data-professional-step="entrada">
        <div className="portfolio-hero__marker" aria-hidden="true">
          <span>Jornada</span>
          <strong>01</strong>
        </div>

        <div className="portfolio-hero__content">
          <p className="eyebrow">Alexandre Blank Lopes · MANSK</p>
          <h1>
            Transformo problemas técnicos em soluções compreensíveis, seguras e documentadas,
            conectando suporte, implantação, ensino e desenvolvimento.
          </h1>
          <p className="positioning">Soluções digitais para operações, dados e aprendizagem.</p>

          <div className="portfolio-hero__actions">
            <Link className="solid-link" href="#contato">
              Conte seu problema <span aria-hidden="true">↓</span>
            </Link>
            <Link className="text-link" href="/formacao">
              Explorar a formação
            </Link>
          </div>
        </div>
      </header>

      <section
        id="projetos"
        className="portfolio-section"
        aria-labelledby="projetos-title"
        data-professional-step="projetos"
      >
        <header className="portfolio-section__heading">
          <p className="section-index">01 / Evidências</p>
          <h2 id="projetos-title">Casos de projeto</h2>
          <p>
            O problema vem primeiro. Cada caso explicita o que fiz, o resultado observado e o que
            permanece fora da publicação.
          </p>
        </header>

        <div className="case-list">
          {caseStudies.map((caseStudy, index) => (
            <article
              key={caseStudy.id}
              className="case-study"
              aria-labelledby={`${caseStudy.id}-title`}
            >
              <header className="case-study__header">
                <p className="case-study__index">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <p className="eyebrow">{caseStudy.eyebrow}</p>
                  <h3 id={`${caseStudy.id}-title`}>{caseStudy.name}</h3>
                  <p className="case-study__summary">{caseStudy.summary}</p>
                </div>
              </header>

              <dl className="evidence-list">
                {caseStudy.evidence.map((evidence) => (
                  <div key={evidence.label}>
                    <dt>{evidence.label}</dt>
                    <dd>{evidence.text}</dd>
                  </div>
                ))}
              </dl>

              {caseStudy.progress ? (
                <div className="progress-strip" aria-label="Estado atual do projeto">
                  {caseStudy.progress.map((progress) => (
                    <div key={progress.label}>
                      <p>{progress.label}</p>
                      <span>{progress.text}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section
        id="como-posso-ajudar"
        className="portfolio-section"
        aria-labelledby="servicos-title"
        data-professional-step="servicos"
      >
        <header className="portfolio-section__heading">
          <p className="section-index">02 / Oferta</p>
          <h2 id="servicos-title">Como posso ajudar</h2>
          <p>
            Não começo pela ferramenta. Primeiro entendo o fluxo, as pessoas envolvidas e a decisão
            que a solução precisa apoiar.
          </p>
        </header>

        <div className="service-grid">
          <article className="service-card">
            <p className="service-card__index">01</p>
            <h3>Soluções para operações</h3>
            <p>
              Ferramentas, automações, implantação, documentação e treinamento para tornar rotinas
              mais claras, seguras e sustentáveis por quem as executa.
            </p>
            <ul aria-label="Capacidades para operações">
              <li>Mapeamento da necessidade</li>
              <li>Implantação orientada ao uso</li>
              <li>Treinamento e documentação</li>
            </ul>
          </article>

          <article className="service-card">
            <p className="service-card__index">02</p>
            <h3>Dados para decisões</h3>
            <p>
              Power BI, tratamento e modelagem de dados, medidas e análise estatística para
              transformar informações dispersas em perguntas que podem ser respondidas.
            </p>
            <p className="service-card__limit">
              Machine learning é conhecimento em desenvolvimento e ainda não é apresentado como caso
              comprovado.
            </p>
          </article>
        </div>
      </section>

      <section
        id="trajetoria"
        className="portfolio-section"
        aria-labelledby="trajetoria-title"
        data-professional-step="trajetoria"
      >
        <header className="portfolio-section__heading">
          <p className="section-index">03 / Trajetória</p>
          <h2 id="trajetoria-title">Trajetória</h2>
          <p>
            Uma combinação de operação, ensino e tecnologia que me ajuda a traduzir o problema antes
            de construir a resposta.
          </p>
        </header>

        <div className="trajectory-grid">
          <article>
            <p className="eyebrow">Operação</p>
            <h3>Entender o trabalho real</h3>
            <p>
              Experiências com vendas, estoque e atendimento formaram o olhar para processos,
              exceções e necessidades de quem usa uma solução todos os dias.
            </p>
          </article>
          <article>
            <p className="eyebrow">Ensino</p>
            <h3>Explicar para gerar autonomia</h3>
            <p>
              A prática como instrutor de tecnologia reforçou a capacidade de organizar conceitos,
              criar atividades e acompanhar iniciantes sem pular etapas.
            </p>
          </article>
          <article>
            <p className="eyebrow">Tecnologia</p>
            <h3>Investigar, implantar e evoluir</h3>
            <p>
              Suporte, implantação, treinamento, dados e Desenvolvimento Assistido por IA se
              conectam em um processo com planejamento, testes e revisão humana.
            </p>
          </article>
        </div>

        <a
          className="linkedin-link"
          href="https://www.linkedin.com/in/alexandre-blank-lopes-029057215/"
          target="_blank"
          rel="noreferrer"
        >
          Ver trajetória no LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section
        id="contato"
        className="portfolio-section"
        aria-labelledby="contato-title"
        data-professional-step="contato"
      >
        <header className="portfolio-section__heading">
          <p className="section-index">04 / Contato</p>
          <h2 id="contato-title">Conte seu problema</h2>
          <p>
            Esta primeira conversa serve para compreender a necessidade. Escopo, prazo e solução só
            fazem sentido depois do contexto.
          </p>
        </header>

        <ContactComposer whatsappNumber={process.env.WHATSAPP_NUMBER} />
      </section>
    </article>
  )
}
