# Autoria e CMS para a Formação Inicial de Suporte de TI

Consulta: **31/08/2026**. Pesquisa documental para o [ticket 13](../../.scratch/portfolio-guia-ti/issues/13-pesquisar-stack-autoria-e-hospedagem.md), subordinada às decisões do [ticket 16](../../.scratch/portfolio-guia-ti/issues/16-definir-arquitetura-curricular-e-governanca.md). Não houve instalação, contratação, implementação ou teste de integração.

Hipótese exclusivamente comparativa: **1 editor, 100 alunos ativos mensais e aproximadamente 30 missões**. Isso não fixa inventário, público ou orçamento. Alunos não são colaboradores do CMS; suas contas e respostas ficam fora dele. Valores em dólares, sem conversão, impostos ou custos do aplicativo.

## Síntese e recomendação

**Recomendação de pesquisa: Sanity Growth para o painel editorial**, se o orçamento aceitar sua mensalidade, priorizando reduzir a operação do banco e do serviço de conteúdo. O Studio é configurável e o Content Lake é hospedado pelo fornecedor; isso não elimina manutenção de schemas, integrações e aplicação. É uma inferência de adequação, não benchmark ou escolha aprovada. [Arquitetura do Sanity](https://github.com/sanity-io/sanity).

**Payload é a alternativa mais forte para controle técnico e regras de publicação no servidor**, caso operar sua infraestrutura seja aceitável. Keystatic favorece conteúdo em Git, mas exige mais composição do fluxo editorial e cuidado especial com o repositório público existente. A decisão global, incluindo hospedagem, continua no ticket 14.

## Recursos confirmados e adaptações

| Aspecto | Payload, self-hosted | Sanity, gerenciado | Keystatic, Git-based |
| --- | --- | --- | --- |
| Ficha e interações | Campos, arrays aninhados, blocos e lógica condicional geram o painel. [Campos](https://payloadcms.com/docs/fields/overview). | Arrays de objetos tipados e campos condicionais permitem representar o catálogo. [Arrays](https://www.sanity.io/docs/studio/array-type), [condições](https://www.sanity.io/docs/studio/conditional-fields). | Blocos com schemas distintos, arrays e campos alternados por seleção/checkbox. [Blocos](https://keystatic.com/docs/fields/blocks), [condições](https://keystatic.com/docs/fields/conditional). |
| Rascunhos incompletos | `draft: true` permite gravar incompleto; validação de drafts desabilitada por padrão. `_status: draft` sozinho não dispensa campos obrigatórios. [Drafts](https://payloadcms.com/docs/versions/drafts). | Rascunho separado mantém a publicação anterior; validação do Studio impede publicar inválidos, mas não impede escrita direta por API. [Documentos](https://www.sanity.io/docs/content-lake/documents), [validação](https://www.sanity.io/docs/content-lake/schema-validation-and-the-content-lake). | A documentação demonstra edição em branches. Não foi confirmado um fluxo nativo equivalente de salvar incompleto versus publicar validado; seria necessário esquema permissivo de rascunho e gate separado. [GitHub mode](https://keystatic.com/docs/github-mode). |
| Prévia e revisão | Preview configurável e hooks no servidor. Confirmação humana vinculada à versão exige regra própria. [Preview](https://payloadcms.com/docs/admin/preview), [hooks](https://payloadcms.com/docs/hooks/collections). | Visual editing/preview e ações de documento extensíveis; confirmação humana e gate seguro são integração própria. [Preview](https://www.sanity.io/docs/visual-editing/introduction-to-visual-editing), [ações](https://www.sanity.io/docs/studio/document-actions). | Receita oficial usa branch e draft mode. A consulta direta redirecionou para autenticação; o índice oficial confirmou apenas o padrão, não uma integração testada. [Receita](https://keystatic.com/docs/recipes/real-time-previews). |

Em todos, **condições de formulário não são o motor de investigação do aluno**. A aplicação deverá interpretar regras declarativas limitadas, revelar evidências, avaliar critérios e apresentar feedback. Representar o catálogo em campos não fornece essa execução pronta. Essa conclusão deriva da comparação entre os recursos documentados e o contrato do ticket 16.

### Publicação: a proteção deve existir fora do botão

Payload permite validações no painel e backend, além de hooks de ciclo de vida. O guard deverá conferir o documento completo, não somente campos enviados no update, e exigir revisão humana da mesma revisão de conteúdo. [Validação de blocos](https://payloadcms.com/docs/fields/blocks), [hooks](https://payloadcms.com/docs/hooks/collections).

**Sanity não executa validações do schema no Content Lake**: APIs, importações e bibliotecas podem escrever documentos inválidos. Substituir a ação Publish no Studio melhora a experiência, mas não protege contra outro cliente de escrita. A publicação para alunos deverá passar por endpoint autenticado que revalide estrutura, referências, respostas e critérios; confira a confirmação humana; e só então registre a versão aceita. Um webhook posterior não equivale a bloqueio prévio. [Limite oficial de validação](https://www.sanity.io/docs/content-lake/schema-validation-and-the-content-lake), [ações extensíveis](https://www.sanity.io/docs/studio/document-actions).

Para Keystatic, a proposta é branch editorial + prévia + validação + aprovação + artefato de publicação; não assumir que salvar ou fazer merge já satisfaz esses requisitos. Isso adiciona trabalho ao fluxo e não foi prototipado. O painel usa autenticação GitHub por acesso de escrita ao repositório; limitar branches na interface não substitui permissões do repositório. [GitHub mode](https://keystatic.com/docs/github-mode).

## Histórico editorial não é versão estável para o aluno

- **Payload:** armazena cópias e permite restauração, porém `maxPerDoc` é 100 por padrão; retenção automática pode eliminar versões antigas. Configurar retenção não cria, por si, as regras curriculares. [Versions](https://payloadcms.com/docs/versions/overview).
- **Sanity:** publicar aplica conteúdo sobre o documento publicado e remove o draft ou a versão de release utilizada. Portanto, nem `versions.*` nem o botão de histórico representam automaticamente edições permanentes da missão. [Ciclo dos documentos](https://www.sanity.io/docs/content-lake/documents).
- **Keystatic:** arquivos em Git favorecem revisão de alterações; a aplicação ainda precisa servir a edição exata, não apenas ler o arquivo atual. O armazenamento pode ser YAML/JSON, com campos de conteúdo separados. [Formatos](https://keystatic.com/docs/format-options).

**Proposta técnica comum, ainda para decisão:** no aceite editorial, criar snapshot imutável de conteúdo, critérios e referências necessárias, identificado por versão e hash. A tentativa aponta para essa versão, não para “latest”, `_rev` ou branch. Referências editoriais mutáveis também devem ser resolvidas/fixadas, para que editar uma dica compartilhada não altere silenciosamente uma tentativa antiga. O snapshot pode residir em armazenamento privado da aplicação, separado do CMS e dos registros pessoais; localização definitiva depende da arquitetura.

Separar conteúdo imutável de estado operacional mutável: disponível para novas tentativas, retirado ou suspenso por correção crítica. Retirada comum preserva tentativas seguras; suspensão crítica bloqueia a versão inclusive para retomadas, sem apagá-la. Equivalências de critérios, complementação e revalidação são regras próprias do produto, não restauração do CMS. O serviço deve verificar suspensão atual mesmo usando conteúdo em cache; arquivos públicos já distribuídos não podem ser recolhidos retroativamente. Propostas derivadas das políticas aprovadas, não funcionalidades nativas comprovadas.

## Permissões, Codex e separação dos dados

Payload permite controle por coleção/campo e operação; ocultar uma coleção na interface não substitui negar acesso à API. Para este produto, não incluir respostas, contas ou Registros de Atendimento em coleções editoriais. [Access Control](https://payloadcms.com/docs/access-control/overview).

Sanity distingue drafts, visíveis somente a usuários autenticados, de documentos publicados. **Dataset público não significa draft público**. Contudo, publicar ali a ficha integral pode expor roteiro, testes e critérios antes da investigação; o Growth permite dataset privado. A alternativa Free exigiria manter a ficha como draft e publicar ao aplicativo somente pelo servidor, deixando no CMS público apenas representação sanitizada, se necessária. Isso é adaptação adicional, não recomendação de publicar gabaritos. [Documentos](https://www.sanity.io/docs/content-lake/documents), [planos](https://www.sanity.io/pricing).

No Keystatic Cloud, acesso é por equipe e alcança todos os projetos dessa equipe; há login editorial sem conta GitHub. Não confundir isso com gestão de alunos. [Cloud](https://keystatic.com/docs/cloud). Como o repositório deste projeto é público, **não gravar nele fichas restritas, rascunhos não revisados ou dados pessoais**. Uma alternativa Git-based precisaria decidir armazenamento editorial separado; nenhum repositório novo foi autorizado ou criado.

Integração recomendada com Codex: gerar dados declarativos revisáveis; validar importação; gravar apenas rascunho; manter credenciais de publicação fora do agente e do navegador do aluno. Ações inéditas entram por código revisado e testes, nunca por `eval`, scripts ou componentes arbitrários no conteúdo. Para Keystatic, preferir dados JSON/YAML e catálogo fechado, embora o produto também aceite MDX/Markdoc. [Formatos](https://keystatic.com/docs/format-options). Importação Sanity igualmente requer validação própria. [Importação](https://www.sanity.io/docs/content-lake/importing-data).

## Licença, preço e limites consultados

| Opção | Licença e custo editorial | Limites/ressalvas relevantes |
| --- | --- | --- |
| Payload self-hosted | Núcleo MIT, sem mensalidade de licença. [Repositório oficial](https://github.com/payloadcms/payload). | Hospedagem, banco, arquivos, atualizações e backups não são gratuitos por consequência. A documentação exige avaliar esses componentes; não há preço único self-hosted nem benchmark deste projeto. [Deploy](https://payloadcms.com/docs/production/deployment). |
| Sanity Free | US$0; Studio MIT, Content Lake é serviço gerenciado. [Licença Studio](https://github.com/sanity-io/sanity), [preços](https://www.sanity.io/pricing). | 20 assentos; Admin/Viewer; 2 datasets públicos; 10 mil documentos; 250 mil chamadas API/mês; 1 milhão CDN/mês; 100 GB de ativos e 100 GB de banda/mês; revisão de drafts por 3 dias. |
| Sanity Growth | **US$15/assento/mês**, portanto US$15 para 1 editor, antes de excedentes. [Preços](https://www.sanity.io/pricing). | 2 datasets públicos/privados, 5 papéis, 25 mil documentos e revisão de drafts por 90 dias. Excedentes são cobrados; papéis personalizados e histórico completo não estão incluídos. |
| Keystatic | Núcleo MIT. Cloud Free até 3 usuários/equipe; Pro a partir de US$10/mês, mais US$5 por usuário além de 3. [Licença](https://github.com/Thinkmill/keystatic/blob/main/LICENSE), [Cloud](https://keystatic.com/docs/cloud). | O preço Cloud não representa hospedagem completa do site. A documentação do modo GitHub exige runtime para rotas da API. [Deploy](https://keystatic.com/docs/github-mode). |

No cenário de capacidade, o número de alunos não multiplica assentos editoriais. Entretanto, 30 missões não determinam banda, requisições, imagens ou número de snapshots: é preciso medir tamanho e acesso. Não estimar “custo total zero” a partir do plano do CMS. Revalidar preços antes de contratar; o requisito de autenticação gratuita é separado da mensalidade editorial.

## Pendências para escolha e verificação

Antes de assumir qualquer integração pronta: demonstrar um rascunho incompleto, importação inválida rejeitada no publish, confirmação humana invalidada após edição, prévia protegida, nova edição preservando tentativa antiga e suspensão crítica efetiva. Testar exportação/restauração dos conteúdos e snapshots, além de negação de acesso a dados de alunos pelo CMS. Isso é plano de verificação, não resultado obtido.

A preferência editorial por Sanity Growth precisa ser ponderada com o custo e a complexidade do gate adicional. Se a decisão priorizar concentrar regras no mesmo backend e assumir sua operação, Payload pode vencer na comparação global. Nenhuma das opções remove o desenvolvimento do motor pedagógico ou comprova a acessibilidade/usabilidade da futura tela editorial.
