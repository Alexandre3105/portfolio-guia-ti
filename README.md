# MANSK

Portfólio profissional e formação interativa em tecnologia, em português do Brasil. O produto terá duas jornadas: uma para conhecer projetos reais e iniciar contato comercial; outra para aprender a investigar, resolver, explicar e encaminhar problemas de tecnologia.

Este repositório está na fase de implementação do MVP. O planejamento aprovado vive em [`.scratch/portfolio-guia-ti/`](.scratch/portfolio-guia-ti/), sem usar GitHub Issues no fluxo das skills.

## Fundação técnica

A base executável usa:

- **Next.js + TypeScript:** interface pública e rotas HTTP;
- **Payload CMS:** painel editorial em `/admin`, separado da futura conta do aluno;
- **PostgreSQL:** persistência do CMS e, nos tickets futuros, dos dados mínimos do produto;
- **Docker Compose:** ambiente local reproduzível, com o banco restrito ao próprio computador em `127.0.0.1`;
- **Playwright + Vitest:** teste pelo navegador e teste de integração com o Payload;
- **GitHub Actions:** valida lint, tipos, testes e build a cada mudança em `main` ou pull request.

Firebase Authentication, Resend, Hostinger VPS e os demais fornecedores listados no mapa não são configurados nesta etapa. Cada plataforma externa será explicada e autorizada somente no ticket correspondente.

## Pré-requisitos

- Node.js 22;
- pnpm 11;
- Docker Desktop para o PostgreSQL e para o ambiente completo.

## Executar em desenvolvimento

No PowerShell:

```powershell
Copy-Item .env.example .env
pnpm install
pnpm db:up
pnpm dev
```

A página pública abre em `http://localhost:3000`, o painel editorial em `http://localhost:3000/admin` e a rota de saúde em `http://localhost:3000/api/health`.

Na primeira visita ao painel, o Payload permite criar o usuário administrativo local. Não reutilize uma senha real ou de produção nesse ambiente.

Para executar aplicação e banco juntos em contêineres:

```powershell
pnpm docker:up
```

O Compose usa credenciais descartáveis apenas para desenvolvimento. Em produção, banco e segredos serão privados e injetados pelo ambiente de implantação.

## Painel editorial e primeira missão

O painel em `/admin` possui a coleção **Fichas da Missão**. Ela permite salvar rascunhos incompletos, revisar a experiência em uma Prévia Editorial e publicar somente depois das confirmações técnica, pedagógica, autoral, de segurança e de sanitização.

Para criar o rascunho inicial em um banco local vazio:

```powershell
pnpm seed:first-mission
```

O comando é idempotente: se a ficha já existir, não sobrescreve edições feitas no painel. A publicação continua sendo uma ação humana no Payload. A versão publicada alimenta o Microdesafio em `/formacao`; escolhas do visitante não são persistidas.

## Comandos de qualidade

| Comando | Finalidade |
| --- | --- |
| `pnpm lint` | Verifica regras de qualidade e padrões do Next.js. |
| `pnpm typecheck` | Valida os tipos TypeScript sem gerar arquivos. |
| `pnpm test:int` | Testa a integração Payload/PostgreSQL. Requer `pnpm db:up`. |
| `pnpm test:e2e` | Abre a aplicação em Chromium e testa página e health check. |
| `pnpm test` | Executa integração e navegador em sequência. |
| `pnpm build` | Gera o build de produção do Next.js. |
| `pnpm seed:first-mission` | Cria o primeiro rascunho editorial sem publicá-lo ou sobrescrever conteúdo existente. |
| `pnpm db:up` | Inicia o PostgreSQL e garante o banco isolado `mansk_test` sem apagar o volume existente. |
| `pnpm db:down` | Para o PostgreSQL local sem apagar o volume. |
| `pnpm docker:down` | Para a aplicação e o banco sem apagar dados. |

As suítes usam o banco local isolado `mansk_test`, criado de forma idempotente por `pnpm db:up` inclusive em volumes existentes. O Playwright inicia seu próprio servidor na porta `3100`. Assim, testes não publicam fichas nem criam administradores no banco usado pela prévia em `3000`.

## Variáveis de ambiente

Crie `.env` a partir de [`.env.example`](.env.example). O arquivo real é ignorado pelo Git.

- `DATABASE_URL`: conexão com o PostgreSQL;
- `PAYLOAD_SECRET`: chave longa e aleatória usada pelo Payload para proteger sessões e tokens.

Nunca versione credenciais, dados de clientes, respostas de alunos ou conteúdo empresarial confidencial.

## Escopo do MVP

A formação será genérica e investigativa: não ensinará procedimentos internos de uma empresa nem operações destrutivas sobre dados reais. Redes é uma das competências, não o curso inteiro. Exercícios, missões simuladas e conversas com clientes serão introduzidos pelos tickets verticais seguintes.

## Licenciamento

Ainda não existe licença pública para o código ou para o conteúdo autoral. Nenhum arquivo `LICENSE` será adicionado até uma decisão explícita posterior.
