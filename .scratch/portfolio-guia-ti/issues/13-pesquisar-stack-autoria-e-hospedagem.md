# Pesquisar opções de stack, autoria e hospedagem

Type: research
Status: resolved
Blocked by: 09, 11, 12, 16

## Question

Quais opções técnicas atendem aos requisitos decididos para conteúdo, interatividade, progresso, acessibilidade, manutenção, custo e publicação, e quais são seus trade-offs verificáveis?

## Comments

- O responsável confirmou que seu plano HostGator é compartilhado e descartou usá-lo neste projeto. A dúvida anterior sobre “VM HostGator M” está encerrada; buscar hospedagem compatível, ponderando custo total e manutenção. Isso não cancela o contrato existente nem autoriza contratar ou implantar outro serviço. Evidências e recomendação provisória em [Stack, autoria e hospedagem](../../../docs/research/13-stack-autoria-e-hospedagem.md).
- Pesquisa iniciada após a conclusão do ticket 16, com a skill `research` e consulta a fontes oficiais. Comparar alternativas e registrar uma recomendação; contratação, integração, implantação e escolha definitiva permanecem fora desta etapa.
- Considerar o fluxo editorial aprovado em [Definir arquitetura curricular e governança de atualização](16-definir-arquitetura-curricular-e-governanca.md): autoria com apoio do Codex, rascunho, Prévia Editorial, revisão e publicação pelo responsável. O painel deve permitir editar textos, exercícios, dicas e feedback, organizar missões e controlar a publicação. Comparar alternativas de gestão de conteúdo sem presumir CMS próprio ou IA incorporada ao site. O ticket 16 foi resolvido; os bloqueadores estão concluídos e esta pesquisa está disponível para execução.
- A Ficha da Missão estruturada foi aprovada como padrão de criação e edição, com composição dos tipos de atividade disponíveis; mecânicas inéditas exigem desenvolvimento e testes. A Conversa Investigativa roteirizada, com perguntas selecionáveis e Testes Simulados, foi aprovada como formato principal da investigação; não integrar chat generativo para produzir respostas durante a atividade. O aluno decide quando apresentar sua conclusão, sem precisar esgotar perguntas e testes, mas a aceitação depende das evidências e critérios da ficha; pode retomar a investigação quando houver lacunas. O catálogo aprovado reúne perguntas ao cliente, testes simulados, análise de evidências em microdesafios e registro/conclusão em campos curtos. Aplicar o conjunto de decisões consolidado no ticket 16.
- A formação terá oito módulos, com quantidade de missões determinada pela cobertura das competências, não por uma quantidade igual por módulo. Permitir crescimento do inventário dentro do catálogo aprovado; a redação integral das lições não é pré-requisito desta pesquisa.
- Avaliar suporte às verificações de publicação aprovadas: salvar rascunhos incompletos, mas bloquear a publicação quando houver falha estrutural impeditiva ou faltar a confirmação humana de revisão na Prévia Editorial. A checagem automática deve cobrir campos obrigatórios, referências internas, respostas de perguntas e testes e critérios de encerramento; não substituir revisão técnica, pedagógica e de segurança.
- Considerar a política de fontes e revisão editorial aprovada: referências, atribuição e data da última revisão por missão; conteúdo essencial disponível dentro da missão; conferência antes de publicar e revisão manual semestral ou antecipada diante de erro ou mudança relevante. Não presumir serviço de monitoramento de links, agendamento automático ou dependência obrigatória de material externo.
- Verificar suporte à política de atualizações comuns: tentativas em andamento continuam na versão original; novas tentativas usam a versão publicada atual; resultados anteriores não são apagados pela atualização. Avaliar essa necessidade sem ampliar o contrato de dados do aluno.
- Considerar a retirada e substituição comuns aprovadas: impedir novas tentativas na missão retirada, permitir terminar tentativas já iniciadas em versões seguras e corretas e preservar resultados válidos. Exigir substituta revisada e publicada antes de remover a única cobertura de uma competência obrigatória. A retirada, por si só, não exige repetir competências; correções críticas continuam sendo exceção à continuidade. Não ampliar a retenção nem presumir equivalência quando objetivos ou critérios mudarem.
- Considerar a política aprovada de mudanças nos objetivos ou critérios: nova versão identificável, continuidade segura de tentativas iniciadas e aproveitamento apenas de evidências ainda válidas para critérios equivalentes. Requisitos novos ou alterados exigem complementação para reconhecer a conclusão atualizada; preservar a conclusão anterior vinculada aos requisitos atendidos, sem apresentá-la como comprovação automática dos novos requisitos. Distinguir complementação curricular de revalidação por correção crítica, sem ampliar o contrato de dados do aluno.
- Considerar também a política aprovada de correções críticas: suspensão da versão problemática, aviso aos afetados, publicação corrigida após revisão e revalidação somente das competências cuja evidência foi comprometida, preservando os registros anteriores e os resultados válidos das demais partes. A competência afetada deve indicar **Revisão necessária** e uma formação antes concluída, **Concluída anteriormente — revisão pendente**, até existir nova demonstração válida das competências afetadas.
- Comparar como representar versões, equivalências de critérios e avisos de correções críticas. O canal desses avisos ainda será escolhido no ticket 14 e validado nos critérios do ticket 15; não presumir nova integração de mensagens.
- Avaliar [Clerk](https://clerk.com/pricing), [Auth0](https://auth0.com/pricing) e [Firebase Authentication](https://firebase.google.com/docs/auth) como candidatos de autenticação gerenciada; escolher apenas um, sem integrar os três.
- Tratar como requisitos: custo recorrente de autenticação igual a R$ 0 no uso esperado do MVP, ausência de SMS, limites e alertas compreensíveis, exportação ou migração dos usuários e separação entre identidade e dados de aprendizagem.
- Revalidar preços, limites gratuitos e recursos diretamente nas fontes oficiais no momento da pesquisa e novamente antes da publicação.

## Answer

Pesquisa concluída em **31/08/2026**, sem escolha definitiva de stack, contratação, integração ou implantação. A HostGator compartilhada foi descartada expressamente pelo responsável; não cancelar seu contrato nem adaptar o produto apenas para caber nela.

Entregas com fontes primárias e separação entre fatos, inferências e verificações futuras:

- [Síntese de stack, autoria e hospedagem](../../../docs/research/13-stack-autoria-e-hospedagem.md).
- [Comparação de Payload, Sanity e Keystatic](../../../docs/research/13-autoria-e-cms.md).
- [Comparação de Firebase Authentication, Clerk e Auth0](../../../docs/research/13-identidade-e-portabilidade.md).
- [Hospedagem gerenciada: Railway e Render](../../../docs/research/13-hospedagem-gerenciada.md).

**Recomendação global para decidir no ticket 14:** priorizar Next.js/TypeScript + Payload + PostgreSQL, com Firebase Authentication como candidato. Avaliar Railway para a aplicação e PostgreSQL gerenciado separado, como Neon, para reduzir a operação do banco; manter Vercel Pro como alternativa e Render pago como contraponto de capacidade fixa. Essa combinação não foi implementada nem testada. Sanity Growth permanece alternativa quando reduzir operação editorial justificar sua mensalidade; Keystatic demanda mais composição de publicação e versões.

**Economia sem promessa de preço fechado:** Railway Hobby tem compromisso mínimo de US$5 convertido em consumo, com total variável; Vercel Pro parte de US$20 de plataforma antes de excedentes e componentes externos. Instância Render de US$7 tem 512 MB, capacidade não validada para a aplicação. Não tratar quotas gratuitas de Neon/Firebase como garantia de produção sem custos. O PostgreSQL por template da Railway exige manutenção do projeto, apesar do painel; banco gerenciado externo evita essa confusão, mas tem limites e custos próprios.

**Trabalho necessário em qualquer opção:** motor declarativo da Conversa Investigativa; validação no servidor e revisão humana da mesma edição antes da publicação; versões estáveis para tentativas; suspensão crítica; autorização dos dados privados; portabilidade, exclusão e recuperação. O painel editorial do CMS não é o painel de hospedagem e não terá acesso às respostas dos alunos. Hospedar não implementa essas regras.

**Limites da pesquisa:** hipóteses de volume e contas ilustrativas não são dimensionamento. Sem benchmark, teste de integração, comprovação de entrega de e-mails ou orçamento integral. O preço corrente da instância PostgreSQL Render não foi confirmado, portanto essa alternativa não tem total orçado. Backups, mídia, avisos, ambientes extras, câmbio/tributos e eventuais excedentes exigem orçamento e verificação. Limite rígido de gasto pode retirar o site do ar e depende de decisão explícita.

Próximo passo: [Escolher arquitetura, modelo de conteúdo e publicação](14-escolher-arquitetura-conteudo-e-publicacao.md), começando pelo teto mensal total e responsabilidades operacionais. A resolução desta pesquisa libera a escolha, não encerra o Wayfinder nem autoriza iniciar produção.
