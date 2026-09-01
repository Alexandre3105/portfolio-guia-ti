# Autenticação gerenciada e portabilidade da identidade

Pesquisa delimitada do ticket Wayfinder 13. Fontes oficiais consultadas em **31 de agosto de 2026**; preços em USD, sujeitos a mudança. Nenhuma conta, integração, contratação ou exportação real foi executada.

## Pergunta e premissas

Qual candidato registrado — Clerk, Auth0 ou Firebase Authentication — permite autenticação sem SMS, e-mail verificado, custo recorrente inicial de R$ 0 e uma saída praticável do fornecedor?

O [ticket 09](../../.scratch/portfolio-guia-ti/issues/09-decidir-progresso-identidade-e-dados.md) determina conta individual, e-mail, identificador interno aleatório e nome de exibição opcional. Não exige senha nem login social. **100 usuários ativos por mês é somente hipótese comparativa de custo**, não volume aprovado. A análise não promete custo zero para hospedagem, banco, envio de avisos de inatividade ou manutenção. Recomendações abaixo são inferências, não escolhas aprovadas.

## Comparação resumida

| Candidato | Faixa de autenticação publicada | Hipótese de 100 ativos/mês | Principal ressalva |
| --- | --- | --- | --- |
| Clerk Hobby | US$ 0; até 50 mil usuários mensalmente retidos, MRU. Conta quem retorna pelo menos 24 horas após cadastro; não é MAU. | Dentro da faixa gratuita, sem SMS. | Templates de e-mail personalizados e MFA não incluídos; e-mail PT-BR gratuito não comprovado nesta consulta. [Preços](https://clerk.com/pricing). |
| Auth0 Free B2C | US$ 0; até 25 mil MAU. Essentials anunciado a partir de US$ 35/mês para 500 MAU. | Autenticação-base gratuita. | Produção exige provedor próprio de e-mail; hashes de senhas não são exportáveis no Free. [Preços](https://auth0.com/pricing), [operação B2C](https://auth0.com/docs/get-started/architecture-scenarios/business-to-consumer/operations), [exportação](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/export-data). |
| Firebase Authentication | Serviços sem telefone disponíveis sem cobrança. Com Identity Platform: faixa gratuita publicada de 50 mil MAU; Spark possui também limite de 3 mil ativos/dia nos provedores usuais. | E-mail/senha gerenciados cabem na faixa gratuita. | Envio de links de login no Spark: somente cinco/dia. Não confundir com verificação de e-mail. [Preços](https://firebase.google.com/pricing), [limites](https://firebase.google.com/docs/auth/limits). |

## E-mail, experiência e limites

**Clerk.** Oferece código e link de e-mail, além de senha, sem precisar habilitar telefone. Componentes prontos impõem intervalo de 30 segundos para reenviar código; código e link expiram em dez minutos. A política de mesmo navegador/dispositivo do link deve ser testada, sobretudo quando o aluno abre o e-mail no celular. [Opções de autenticação](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options).

O Hobby mantém marca Clerk, sessão fixa de sete dias e até três integrantes no painel do fornecedor. Pro custa US$ 25/mês ou US$ 20/mês com cobrança anual; exceder 50 mil MRU exige upgrade, com carência anunciada de um mês. Isso é limite comercial, não orçamento automaticamente aprovado. [Preços](https://clerk.com/pricing).

A UI possui `ptBR`, ainda documentado como recurso experimental; tradução de e-mails aparece na documentação de templates. Não foi comprovado que localizar a UI traduza gratuitamente as mensagens enviadas no Hobby. Essa lacuna precisa ser resolvida antes de recomendar Clerk para um MVP inteiramente PT-BR. [Localização](https://clerk.com/docs/guides/customizing-clerk/localization), [templates](https://clerk.com/docs/guides/customizing-clerk/email-sms-templates).

A API de backend permite 1.000 requisições/10 segundos em produção e 100/10 segundos em desenvolvimento. Criação de login/cadastro: cinco/10 segundos por IP; respostas limitadas usam HTTP 429 e `Retry-After`. Não há cota diária geral de e-mails comprovada nas páginas consultadas. [Limites](https://clerk.com/docs/guides/how-clerk-works/system-limits).

**Auth0.** Verificação pode usar link e atualizar `email_verified`; cadastro não equivale automaticamente à autorização para acessar o conteúdo. A aplicação deve exigir o estado verificado. [Verificação de e-mail](https://auth0.com/docs/manage-users/user-accounts/verify-emails).

O envio embutido serve para testes, limita-se a dez mensagens/minuto, descarta excedentes e não oferece confiabilidade para produção. Templates personalizados dependem de serviço externo. Logo, custo total de autenticação com e-mail é **condicional** a um serviço de entrega compatível e sua cota gratuita, ainda não escolhido. [Limitações do envio](https://support.auth0.com/center/s/article/Emails-to-Gmail-from-Auth0-never-arrive). No Free, Authentication API tem limite sustentado global de 300 requisições/minuto; Management API, duas/segundo. [Limites Free](https://auth0.com/docs/troubleshoot/customer-support/operational-policies/rate-limit-policy/rate-limit-configurations/free-public).

**Firebase.** No Spark, verificação de endereço permite 1.000 e-mails/dia; recuperação de senha, 150/dia; login por link, cinco/dia. A criação de contas é limitada a 100/hora por IP: uma turma numa mesma rede exige atenção. [Limites](https://firebase.google.com/docs/auth/limits).

O SDK envia verificação/recuperação pelo Google e permite definir idioma; templates têm personalização limitada. Controle completo da mensagem exige gerar links no backend e usar entrega própria. Portanto, e-mail/senha gerenciados são mais adequados à hipótese gratuita do que prometer login frequente por link no Spark. [Gestão web](https://firebase.google.com/docs/auth/web/manage-users), [links e customização](https://firebase.google.com/docs/auth/admin/email-action-links).

Blaze não tem mensalidade fixa, mas permite cobrança por consumo. Seus alertas de orçamento **não bloqueiam gastos**. Não vincular faturamento apenas para contornar cinco links/dia sem aprovar essa mudança de risco. [Planos e alertas](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans).

## Portabilidade realmente suportada

- **Clerk:** administradores podem baixar CSV com usuários e hashes de senha pelo painel. A importação requer algoritmo compatível; o fornecedor documenta uso de `external_id` para preservar referência anterior. Mudança do sistema de sessão provavelmente encerra sessões antigas: não prometer migração transparente de sessões. [Migração](https://clerk.com/docs/guides/development/migrating/overview).
- **Auth0:** exporta perfis em CSV ou NDJSON. Hashes não vêm pela API e sua exportação não está disponível no Free. Nos casos elegíveis, exige solicitação ao suporte, autorizações e entrega cifrada; não há prazo garantido. Plano de saída gratuito deve admitir redefinição de senha ou nova autenticação, sem descartar a jornada. [Perfis](https://auth0.com/docs/manage-users/user-migration/bulk-user-exports), [restrição Free](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/export-data), [processo de hashes](https://auth0.com/docs/manage-users/user-migration/export-password-hashes-and-mfa-secrets).
- **Firebase:** `auth:export` produz CSV/JSON. Exporta hashes do scrypt modificado do Firebase; usuários importados com outro algoritmo podem sair com hash/salt vazios até seu primeiro login. Preservar senhas exige destino compatível e parâmetros sensíveis do algoritmo; não basta copiar o arquivo. [CLI](https://firebase.google.com/docs/cli/auth). A listagem administrativa requer permissão específica para retornar hashes/salts. [Admin SDK](https://firebase.google.com/docs/auth/admin/manage-users).

**Inferência arquitetural:** manter um ID aleatório próprio e um vínculo com o identificador do fornecedor, sem e-mail como chave da jornada. Os fornecedores têm identificadores próprios: `id` no Clerk, `user_id` no Auth0 e `uid` no Firebase. [Clerk](https://clerk.com/docs/reference/backend/types/backend-user), [Auth0](https://auth0.com/docs/manage-users/user-accounts/identify-users), [Firebase](https://firebase.google.com/docs/auth/admin/manage-users). A portabilidade que o aluno recebe não deve conter hashes, credenciais ou segredos administrativos; exportação técnica de migração é outro procedimento, com acesso restrito. Nenhuma sessão portátil entre fornecedores foi demonstrada.

## Inatividade, exclusão e acesso editorial

Não foi encontrado um fluxo completo nativo que implemente **seis meses sem login → aviso → 30 dias → exclusão da identidade e da jornada**. Auth0 declara não ter exclusão automática por inatividade; `last_login` não avança em renovação de token. [Inatividade](https://support.auth0.com/center/s/article/how-to-remove-inactive-users). Clerk expõe `lastSignInAt`; Firebase expõe `lastSignInTime`. [Clerk](https://clerk.com/docs/reference/backend/types/backend-user), [Firebase](https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.usermetadata). A limpeza automática Firebase refere-se a contas **anônimas** antigas, não a esta política de alunos cadastrados. [Limpeza anônima](https://firebase.google.com/docs/auth/web/anonymous-auth).

**Inferência:** a aplicação precisa coordenar prazo, aviso, retorno, exclusão e confirmação, com tentativas recuperáveis quando uma API falhar. Definir precisamente o evento de login, sem confundir sessão persistente ou renovação de token com um novo login. O serviço de aviso e a execução periódica terão custos/limites próprios a verificar; não são fornecidos automaticamente pela cota de e-mails de autenticação. Excluir identidade não comprova exclusão do banco externo, logs e backups.

O editor precisa de autorização editorial independente da propriedade dos registros do aluno. Não criar organizações/equipes de alunos, não inserir respostas no perfil do provedor e não oferecer impersonação como recurso editorial. O backend deve verificar dono de cada registro. Essas são exigências de desenho e testes do projeto, não garantias obtidas ao instalar um SDK.

## Recomendação condicionada e próximos testes

**Priorizar Firebase e-mail/senha para validar custo zero e mensagens localizadas; manter Clerk como alternativa forte se e-mail PT-BR e recursos necessários forem confirmados no Hobby.** Auth0 fica atrás neste recorte pelo envio externo obrigatório e pela saída de senhas limitada no Free. Isso não escolhe stack nem exige Firebase para banco/hospedagem.

Antes da publicação, confirmar volume e picos esperados; revalidar planos; testar entrega PT-BR, verificação, recuperação, limite excedido, exportação/importação de conta fictícia, nova sessão após migração, exclusão coordenada e isolamento editor/aluno. Confirmar no painel quais alertas existem e quais limites realmente interrompem uso. Não houve teste autenticado, medição de entrega, auditoria de segurança ou comprovação jurídica nesta pesquisa.
