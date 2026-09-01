# Stack, autoria e hospedagem para o MVP MANSK

Pesquisa do [ticket 13](../../.scratch/portfolio-guia-ti/issues/13-pesquisar-stack-autoria-e-hospedagem.md), concluída em **31/08/2026** com fontes primárias. Complementos: [CMS e autoria](13-autoria-e-cms.md), [identidade e portabilidade](13-identidade-e-portabilidade.md) e [hospedagem gerenciada](13-hospedagem-gerenciada.md).

Esta é uma recomendação documental, não escolha de arquitetura ou integração validada. Nenhum pacote foi instalado, serviço contratado, banco criado ou site publicado. Preços em USD, sem conversão cambial. As páginas de Vercel/Next.js e Neon que não puderam ser lidas pela ferramenta web foram conferidas por requisição HTTP às mesmas URLs oficiais, em formato textual.

## Requisitos e premissas

O [ticket 16](../../.scratch/portfolio-guia-ti/issues/16-definir-arquitetura-curricular-e-governanca.md) exige duas jornadas, oito módulos, missões configuráveis, conversa roteirizada, publicação revisada, versões preservadas e correções críticas. O [ticket 09](../../.scratch/portfolio-guia-ti/issues/09-decidir-progresso-identidade-e-dados.md) exige identidade gerenciada, progresso privado, portabilidade e exclusão, sem consulta editorial às respostas.

Para comparar custos, usamos **1 editor, 100 alunos ativos mensais e aproximadamente 30 missões**. São hipóteses de cálculo, não inventário, capacidade contratada ou decisões de produto. Não há ainda dados de tráfego, armazenamento, simultaneidade ou orçamento total aprovados. Autenticação gratuita é requisito; infraestrutura inteira gratuita não foi garantida.

## Recomendação para levar ao ticket 14

**Restrição confirmada:** o responsável confirmou que sua HostGator é compartilhada e descartou usá-la neste projeto. A comparação volta a hospedagem compatível com a aplicação, priorizando custo total e simplicidade operacional. Isso não solicita cancelamento do contrato existente nem aprova contratação de outro serviço. A preferência abaixo continua sendo recomendação, não escolha de stack.

**Priorizar Next.js + TypeScript + Payload + PostgreSQL, com Firebase Authentication como candidato de identidade e runtime Node.js gerenciado.** Esta preferência global é uma inferência de engenharia: o painel nasce de um CMS existente e suas validações podem compartilhar o backend do aplicativo; o motor pedagógico permanece código próprio, sem construir um CMS do zero.

Payload funciona dentro de Next.js e documenta implantação em provedores como Vercel, além de Docker. Next.js documenta suporte completo em Node.js/Docker e suporte limitado em exportação estática. Isso sustenta a compatibilidade de arquitetura, não prova que nossa combinação, versão e carga já funcionam. [Payload em produção](https://payloadcms.com/docs/production/deployment), [formas de implantação do Next.js](https://nextjs.org/docs/app/getting-started/deploying).

**Sanity Growth é a alternativa preferível quando reduzir a operação editorial pesar mais que concentrar regras e custo.** A pesquisa específica de CMS o favorece nesse critério; a preferência global por Payload pondera também controle de publicação e ausência de mensalidade de licença do núcleo. Essa diferença de prioridades deve ser decidida pelo responsável, não escondida como consenso técnico. [Comparação editorial](13-autoria-e-cms.md).

**Hospedagem candidata após descartar a HostGator: Railway para a aplicação, comparada com Vercel Pro, mantendo PostgreSQL gerenciado separado como hipótese de menor operação.** Railway tem menor compromisso mensal inicial, mas cobrança variável; isso não prova menor custo total. Neon é o candidato de banco já pesquisado, com gratuidade condicionada às cotas e à recuperação necessária. PostgreSQL disponibilizado por template na Railway não deve ser apresentado como banco totalmente gerenciado: sua própria documentação o classifica como `unmanaged`. A escolha precisa ponderar operar esse banco versus usar um serviço especializado. [Planos Railway](https://docs.railway.com/pricing/plans), [PostgreSQL Railway](https://docs.railway.com/databases/postgresql).

## Três composições comparadas

| Composição candidata | Adequação e trabalho próprio | Principal troca |
| --- | --- | --- |
| **A. Next.js/React/TypeScript + Payload + PostgreSQL + Firebase Auth** | Um aplicativo para portfólio, formação, API e painel gerado por schemas. Implementar catálogo pedagógico, autorização, publicação e snapshots estáveis. | Mais controle no backend; a equipe mantém Payload, suas migrações e dependências. Sem mensalidade de licença do CMS, mas com infraestrutura. |
| **B. Next.js/React/TypeScript + Sanity Growth + PostgreSQL + Firebase Auth** | Aplicativo e estado privado separados do conteúdo gerenciado. Studio oferece o painel; publicação para alunos passa por validação própria no servidor. | Menos operação do banco editorial, mas serviço adicional e US$15/mês por editor, além da hospedagem do aplicativo. |
| **C. Astro + React nas atividades + Keystatic + PostgreSQL + identidade gerenciada** | Portfólio orientado a conteúdo e atividades interativas em React. Exige backend privado e composição do fluxo Git, preview e publicação. | Pode reduzir a base estática, mas o painel e as versões para alunos exigem mais composição; não resolve login/progresso só com arquivos. |

Recursos e limitações de A/B/C estão documentados na [pesquisa de CMS](13-autoria-e-cms.md). Astro renderiza conteúdo em HTML e permite componentes interativos isolados, incluindo React; essa é uma alternativa válida, não incapacidade de construir aplicações. Nossa preferência por A evita introduzir outra divisão de framework junto do CMS integrado. [Astro Islands](https://docs.astro.build/en/concepts/islands/).

Nenhuma dessas opções entrega a Conversa Investigativa pronta. A escolha não autoriza chat generativo, LMS genérico com novas funcionalidades, execução de comandos reais ou avaliação de texto livre por IA.

## Hospedagem e custos: o que foi confirmado

### HostGator compartilhada: descartada pelo responsável

A documentação oficial classifica **Plano M como hospedagem compartilhada**, distinta de VPS. Sua matriz marca Node.js, PostgreSQL e Docker como incompatíveis com o compartilhado, e PHP/MySQL como compatíveis. Logo, **a composição A não pode ser hospedada integralmente nesse plano tal como proposta**. O responsável confirmou essa modalidade e pediu outra opção; não adaptar o produto a PHP/MySQL apenas para reaproveitar esse plano. [Compatibilidades HostGator](https://suporte.hostgator.com.br/hc/pt-br/articles/30811116692115-Quais-s%C3%A3o-as-compatibilidades-da-HostGator).

A dúvida sobre a modalidade foi encerrada. Não houve acesso ao painel/servidor, cancelamento de contrato, contratação, migração ou implantação. VPS própria não é a recomendação inicial: comparar primeiro serviços que reduzam a administração de sistema operacional, sem confundir hospedagem gerenciada com manutenção automática do código e banco.

### Outros candidatos pesquisados

| Serviço | Preço/cota consultados | Consequência para este projeto |
| --- | --- | --- |
| **Railway Hobby / Pro** | Mínimos de US$5 / US$20 por mês, respectivamente, convertidos em crédito de consumo. Se o consumo Hobby for US$8, o total-base é US$8, não US$13. [Planos](https://docs.railway.com/pricing/plans), [leitura da fatura](https://docs.railway.com/pricing/understanding-your-bill). | Candidato Node.js/Docker de menor entrada para a aplicação; CPU, memória, disco e tráfego tornam a conta variável. Não prometer aplicação e banco completos por US$5 nem confundir os planos Hobby de fornecedores diferentes. |
| **Vercel Pro** | US$20/mês de plataforma, um assento de deploy e US$20 de crédito de uso; outros assentos e consumo podem aumentar a conta. [Plano Pro](https://vercel.com/docs/plans/pro-plan), [preços](https://vercel.com/pricing). | Candidato de implantação gerenciada para A/B, sujeito a orçamento e testes. Crédito não é desconto que elimina a mensalidade. |
| **Vercel Hobby** | Uso pessoal não comercial; a política inclui divulgação de produto/serviço entre os exemplos comerciais. [Fair use](https://vercel.com/docs/limits/fair-use-guidelines). | Como MANSK busca clientes freelancer, **não orçar Hobby como hospedagem gratuita autorizada**. Essa aplicação da regra é uma inferência conservadora, não parecer jurídico. |
| **Render pago** | Instâncias de 512 MB/0,5 CPU por US$7/mês e 2 GB/1 CPU por US$25; separadas da mensalidade de workspace (Hobby US$0/Pro US$25). [Preços das instâncias](https://render.com/articles/render-vs-railway), [nomes atuais](https://render.com/docs/compute-plans), [workspaces](https://render.com/docs/new-workspace-plans). | Alternativa Node.js/Docker. US$7 não comprova RAM suficiente para Next.js + Payload. Banco, disco, tráfego e build são itens adicionais; a instância PostgreSQL atual ficou não orçada. |
| **Render Free** | Suspende serviço após 15 minutos ocioso; Postgres gratuito expira em 30 dias e não tem backups. O fornecedor desaconselha essas instâncias para produção. [Limitações](https://render.com/docs/free). | Não recomendar como produção persistente da formação. Não usar disco efêmero para registros ou uploads. |
| **Cloudflare Workers** | Free: 100 mil requisições/dia e 10 ms de CPU/invocação. Pago: mínimo US$5/mês, 10 milhões de requisições e 30 milhões de ms de CPU incluídos; excedentes cobrados. Ativos estáticos diretos têm tratamento gratuito. [Preços](https://developers.cloudflare.com/workers/platform/pricing/). | Candidato de menor base de execução, não equivalente automaticamente a Node.js. Não declarar custo zero ou compatibilidade completa do CMS/SDK sem testes. |
| **Neon PostgreSQL Free** | 100 CU-h/mês por projeto, 0,5 GB, 5 GB de saída; restauração de até seis horas ou 1 GB de alterações. Atingir limite gratuito pode suspender compute. [Preços e limites](https://neon.com/pricing). | Candidato de banco gerenciado, não garantia de disponibilidade ou backup suficiente. Consultas periódicas e histórico editorial também consomem recursos. |

A orientação atual da Cloudflare para Next.js indica **vinext em beta**, mantendo OpenNext como outro caminho documentado. Payload também apresenta material de implantação em Workers; isso não demonstra compatibilidade conjunta de autenticação, bibliotecas, versões e limites deste aplicativo. Por prudência, a recomendação inicial prefere Node.js gerenciado; Workers fica como alternativa a provar, não como incompatibilidade absoluta. [Next.js na Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [Payload deployment](https://payloadcms.com/docs/production/deployment).

### Cenários de base, não orçamento fechado

- **A com Railway e banco externo:** mínimo de US$5/mês na Railway, subindo conforme os recursos usados pela aplicação; somar banco, mídia, backup e avisos quando houver cobrança. Usar Neon/Firebase nas faixas gratuitas é hipótese condicionada, não orçamento fechado. O mínimo não demonstra que a aplicação inteira cabe nele.
- **A com Vercel Pro:** US$20 de hospedagem + US$0 de licença do núcleo Payload + banco/autenticação nas faixas gratuitas, **se** o uso e os requisitos operacionais couberem nelas.
- **B com Vercel Pro:** US$20 + US$15 para um editor Sanity Growth = **US$35/mês de base**, nas mesmas condições de banco/autenticação.
- **A com Render:** US$7 ou US$25 para a instância comparada, mais os demais componentes. O plano adequado depende de medição de build e runtime; não escolher o menor apenas pelo preço.

O [complemento de hospedagem](13-hospedagem-gerenciada.md) apresenta tarifas e contas ilustrativas Railway, separação de cobranças Render, deploy, persistência e responsabilidades de backup. São exemplos de consumo hipotético, não custos previstos para uma turma ou número de missões. A documentação Railway admite uso do próprio negócio; não foi encontrada restrição comercial específica de Hobby equivalente à Vercel. [Termos Railway](https://railway.com/legal/terms).

São somas dos preços acima e da [tabela editorial](13-autoria-e-cms.md), não cotações finais. **Não incluem** domínio, tributos/câmbio, excedentes, armazenamento de mídias/backups, necessidades pagas de recuperação nem eventual envio de e-mails e rotinas agendadas. Não existe benchmark para afirmar custo mensal total ou capacidade suportada.

Avisos de inatividade e correção não são e-mails de autenticação. Como exemplo para a próxima comparação, Resend oferece faixa Free com limite de 100 envios/dia; a cota mensal e a entrega real deverão ser confirmadas antes de orçar/adotar. Um aviso em massa pode exigir distribuição dos envios sem encurtar o prazo de 30 dias de cada aluno. Nenhum remetente foi configurado. [Resend pricing](https://resend.com/pricing).

### Controle de gastos não equivale a disponibilidade

Railway distingue alerta por e-mail de `hard limit`: atingir o limite rígido retira os workloads do ar. Vercel Pro permite pausa automática, mas ela precisa ser habilitada; apenas informar um orçamento não interrompe uso. O limite Vercel cobre consumo medido além do crédito, não toda a fatura nem serviços externos. Antes de habilitar qualquer pausa, aprovar o teto e explicar que alunos podem ficar sem acesso; não configurar essa política nesta pesquisa. [Controles Railway](https://docs.railway.com/pricing/cost-control), [Spend Management Vercel](https://vercel.com/docs/spend-management).

Na Neon Free, alcançar uma cota mensal pode suspender compute até o próximo período; uma janela curta de recuperação não substitui plano de backup testado. Não prometer produção gratuita somente pelo número pequeno de alunos. [Limites Neon](https://neon.com/pricing). O responsável continua mantendo dependências, migrações, autorização e conteúdo, mesmo quando a plataforma cuida da execução do servidor.

## Identidade e fronteiras de dados

Na consulta, Firebase favorece a combinação inicial de e-mail/senha gerenciados e mensagens localizadas; login por link no Spark tem apenas cinco envios/dia. Clerk permanece forte, mas e-mails PT-BR gratuitos precisam de comprovação. Auth0 requer considerar entrega externa de e-mail e limitação de exportação de hashes no Free. São candidaturas, não decisões de UX ou fornecedor. [Pesquisa de identidade](13-identidade-e-portabilidade.md), [limites Firebase](https://firebase.google.com/docs/auth/limits).

O Firebase Admin SDK atual documenta Node.js 22+ e operações administrativas no servidor. Fixar versões compatíveis do framework, CMS, SDK e runtime no momento da implementação; não tratar compatibilidade parcial de Workers com Node como equivalência comprovada. [Configuração Admin SDK](https://firebase.google.com/docs/admin/setup).

Desenho recomendado, ainda para aprovação:

1. **Conteúdo editorial:** fichas, fontes, versões e mídias revisadas, sem respostas pessoais.
2. **Publicação:** serviço no backend valida a ficha completa, a revisão humana da mesma edição e suas referências; gera uma cópia estável para execução. Apenas essa cópia aceita alimenta a formação.
3. **Aprendizagem:** estado mínimo e registros finais em domínio de dados privado, acessível ao próprio aluno. Não registrá-los como coleções editoriais nem confiar em esconder menus do CMS. A separação exige permissões de API e banco, não só organização de pastas.
4. **Identidade:** ID interno opaco associado ao ID do fornecedor; e-mail não vira chave da jornada. A credencial administrativa nunca chega ao navegador ou ao repositório público.

Um banco PostgreSQL pode hospedar dados logicamente separados com permissões próprias; isso não obriga criar vários bancos ou microserviços. O local exato dos snapshots e a estratégia de isolamento serão escolhidos no ticket 14.

## O que continuará sendo desenvolvimento

- Motor da missão: regras declarativas limitadas, caminhos alternativos, revelação gradual, barreiras e feedback; não componentes ou scripts arbitrários vindos do editor.
- Publicação idempotente com revisão vinculada à edição; referências também fixadas. O histórico do CMS não equivale a versão imutável para uma tentativa. Sanity valida schemas no Studio, não nas escritas do Content Lake; o guard precisa estar no backend. [Validação Sanity](https://www.sanity.io/docs/content-lake/schema-validation-and-the-content-lake), [versões Payload](https://payloadcms.com/docs/versions/overview).
- Estado operacional de versões separado do conteúdo: suspensão crítica deve impedir novas ações e retomadas mesmo após cache, sem apagar o histórico. Não prometer recolher conteúdo já entregue ao navegador nem implementar DRM.
- Aproveitamento de critérios equivalentes, complementação curricular e revalidação crítica são regras do produto, não recursos automáticos do CMS.
- Persistência mínima por bloco, autorização por titular, exportação e exclusão coordenada entre aplicativo e identidade. Não salvar todos os cliques ou o diálogo completo por conveniência técnica.
- Entrega de avisos, tratamento de falhas e repetição segura da rotina de seis meses + 30 dias; restauração de backups não pode reativar contas excluídas. Esses pontos dependem dos critérios de privacidade do ticket 15 e da pesquisa 17.

## Verificações necessárias antes da produção

Esta pesquisa **não executou** testes de integração, usabilidade, carga ou segurança. A especificação e os tickets de implementação devem exigir:

- Rascunho incompleto salvo; publicação inválida rejeitada inclusive por API/importação; edição posterior invalidando confirmação antiga; preview inacessível ao visitante.
- Publicar edição nova sem alterar tentativa antiga; suspensão crítica efetiva; cobertura obrigatória preservada ao retirar missão; resultados antigos sem ganho automático de critérios novos.
- Cadastro/verificação/recuperação em PT-BR, limite de provedor, sessão expirada, dois dispositivos, negação entre dois alunos e negação de respostas ao editor.
- Exportação e restauração de conteúdo e dados; teste de saída do provedor com conta fictícia; exclusão recuperável diante de falha parcial e retenção de backups definida.
- Semântica HTML, foco/teclado, alternativas a arrastar, leitura em celular e piloto com iniciantes. React, Next.js ou um CMS não garantem WCAG 2.2 AA; manter a [base de acessibilidade](07-ensino-acessibilidade.md).
- Medir build, RAM, latência de retomada, tamanho das fichas e consumo de banco; configurar alertas e verificar quais controles realmente interrompem cobrança. Nenhuma quota deve ser convertida diretamente em promessa de número de alunos.

## Decisão seguinte

Com a HostGator compartilhada descartada, o ticket 14 deve confirmar **teto mensal total e tolerância a serviços pagos**; depois escolher a composição, hospedagem, identidade e canal de aviso. Também deverá definir isolamento editorial/aluno, publicação de snapshots, recuperação, mídia, ambientes e versões compatíveis. Se orçamento total zero for obrigatório, tratar isso como restrição nova a comparar — não selecionar um plano inadequado ou prometer custo zero sem prova.

O ticket 13 está **resolved** pela entrega da comparação e de recomendações condicionadas. O ticket 14 está liberado para a escolha, sem arquitetura adotada, orçamento aprovado ou contratação. O Wayfinder permanece aberto: escolha arquitetural, qualidade/privacidade e licenciamento ainda precisam de decisões.
