# Mapa Wayfinder: Portfólio e Guia de TI

## Destination

Chegar a uma especificação completa e pronta para `to-spec` e `to-tickets` do MVP público do `portfolio-guia-ti`, sem deixar decisões de produto, conteúdo, experiência, arquitetura, publicação ou qualidade para o implementador.

## Notes

- O produto terá duas jornadas explícitas: **Jornada Profissional** e **Jornada de Aprendizagem**, com textos e navegação definidos em [Prototipar a navegação entre as duas jornadas](issues/11-prototipar-duas-jornadas.md).
- O treinamento será público, em PT-BR, para iniciantes em suporte e tecnologia da informação.
- O primeiro MVP será uma **Formação Inicial de Suporte de TI** completa para o nível 1; redes será um dos módulos.
- O responsável pelo projeto fornecerá currículo, LinkedIn, experiências e conteúdo autoral revisado.
- Sessões HITL usam `grilling` e `domain-modeling`; pesquisas usam fontes primárias via `research`; decisões visuais usam `prototype` e `frontend-design` quando aplicável.
- Este mapa produz decisões, não o site. Ao concluir o mapa, seguir para `to-spec`, `to-tickets`, `implement` com TDD e `code-review`.
- `.scratch/` é parte do histórico Git. Não registrar credenciais, dados empresariais confidenciais ou informações pessoais não revisadas.

## Decisions so far

- [Fixar o destino do mapa](issues/01-fixar-destino-do-mapa.md) — o mapa termina com uma especificação do MVP pronta para virar tickets de implementação.
- [Fixar produto, público, idioma e recorte do MVP](issues/02-fixar-produto-publico-idioma-e-mvp.md) — duas jornadas públicas em PT-BR; o recorte inicial foi ampliado para uma formação completa de suporte nível 1.
- [Fixar GitHub e rastreador Markdown local](issues/03-fixar-github-e-rastreador-local.md) — código público no GitHub e planejamento versionado em `.scratch/`, sem usar GitHub Issues pelas skills.
- [Pesquisar fontes primárias para fundamentos de redes](issues/06-pesquisar-fontes-primarias-de-redes.md) — a trilha deve ensinar um diagnóstico orientado por hipóteses, separando conceitos duráveis de comandos específicos do sistema operacional.
- [Pesquisar ensino e acessibilidade para iniciantes](issues/07-pesquisar-ensino-e-acessibilidade.md) — lições devem combinar linguagem simples, apoio gradual, recuperação, feedback acionável e WCAG 2.2 AA, com validação pelo público real.
- [Reunir currículo, LinkedIn e experiências autorais](issues/04-reunir-materia-prima-autoral.md) — as fontes foram consolidadas em um inventário sanitizado que separa autodeclaração, evidência pública e pontos que exigem confirmação.
- [Definir competências da Formação Inicial de Suporte de TI](issues/05-definir-competencias-da-trilha-redes.md) — a formação parte do uso básico de computador e desenvolve autonomia progressiva para diagnosticar, resolver com segurança ou escalar com evidências.
- [Definir formato de lições, exercícios e feedback](issues/08-definir-formato-de-licoes-exercicios-e-feedback.md) — cada lição será uma Missão de Suporte curta e acessível, com investigação por caminhos seguros, ajuda progressiva, transferência e feedback acionável.
- [Decidir progresso, identidade e dados do aluno](issues/09-decidir-progresso-identidade-e-dados.md) — a formação terá Conta do Aluno 18+, progresso multidimensional e dados mínimos sob controle do titular, com autenticação gerenciada sem custo previsto no MVP.
- [Definir narrativa e conteúdo do portfólio](issues/10-definir-narrativa-do-portfolio.md) — o portfólio prioriza projetos freelancer, sustenta sua oferta com quatro casos delimitados e separa os caminhos de contato, formação e recrutamento.
- [Prototipar a navegação entre as duas jornadas](issues/11-prototipar-duas-jornadas.md) — marca MANSK, entrada orientada com casos editoriais e formação própria; primeiro acesso e retomada passam por Minha jornada.
- [Prototipar uma Missão de Suporte interativa](issues/12-prototipar-licao-interativa.md) — formato progressivo e linguagem simples aprovados; indução pelas alternativas e aprendizagem real permanecem pontos de validação nos critérios de qualidade.
- [Definir arquitetura curricular e governança de atualização](issues/16-definir-arquitetura-curricular-e-governanca.md) — oito módulos dimensionados por competências, Ficha da Missão com Conversa Investigativa roteirizada, painel editorial com revisão humana e políticas de fontes, versões, retirada, complementação e correção crítica; pesquisa de stack liberada, sem tecnologia escolhida.
- [Pesquisar opções de stack, autoria e hospedagem](issues/13-pesquisar-stack-autoria-e-hospedagem.md) — comparação concluída de CMS, identidade e hospedagem; HostGator compartilhada descartada; recomendação condicionada de Next.js/Payload, PostgreSQL gerenciado e aplicação na Railway, com alternativas e custos documentados. Escolha e orçamento permanecem no ticket 14, sem contratação ou stack aprovada.
- [Escolher arquitetura, modelo de conteúdo e publicação](issues/14-escolher-arquitetura-conteudo-e-publicacao.md) — Next.js/TypeScript, Payload, PostgreSQL e Firebase serão publicados em uma VPS Hostinger KVM 1 autogerenciada, condicionada a benchmark, com Cloudflare/Caddy/UptimeRobot, Resend e backup cifrado no Backblaze B2; toda a operação permanece sob teto recorrente de R$100 e gates de produção, sem contratação nesta etapa.
- [Pesquisar privacidade, maioridade e direitos do aluno](issues/17-pesquisar-privacidade-e-maioridade.md) — a coleta mínima pode ser preservada, mas autodeclaração 18+ não verifica idade e a Conta do Aluno permanece bloqueada até revisão jurídica sobre ECA Digital, bases, controlador, logs, retenção e transferências internacionais; direitos, exclusão, métricas e incidentes viram gates do ticket 15.
- [Definir qualidade, privacidade, métricas e critérios de aceite](issues/15-definir-qualidade-privacidade-metricas-e-aceite.md) — publicação exige cobertura editorial completa, piloto com iniciantes, WCAG 2.2 AA, testes críticos, benchmark do KVM 1, privacidade mínima verificável, direitos e exclusão ensaiados, backup/restauração, retenções, alertas e promoção manual; métricas opcionais ficam desligadas no lançamento.
- [Definir licenciamento de código, conteúdo e marca](issues/18-definir-licenciamento-de-codigo-e-conteudo.md) — o repositório continuará público, porém sem licença pública e sem autorização geral de reutilização; código, formação, portfólio e MANSK permanecem reservados, enquanto materiais de terceiros seguem seus próprios termos. A escolha poderá ser reaberta futuramente por escopo e versão.

## Out of scope

- Implementar ou publicar o site durante o Wayfinder.
- Traduzir o MVP para inglês.
- Incluir procedimentos internos, credenciais ou dados confidenciais de empresas.
- Criar área interna de empresa, visualizar respostas individuais na administração, emitir certificados, formar comunidade ou oferecer recursos sociais.
- Produzir especializações avançadas ou procedimentos de fabricantes antes de validar a **Formação Inicial de Suporte de TI**.
