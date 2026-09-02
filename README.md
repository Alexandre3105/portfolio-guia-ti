# MANSK

Portfólio profissional e formação interativa em tecnologia, em português do Brasil. O produto terá duas jornadas: uma para conhecer projetos reais e iniciar contato comercial; outra para aprender a investigar, resolver, explicar e encaminhar problemas de tecnologia.

Este repositório está na fase de implementação do MVP. O planejamento aprovado vive em [`.scratch/portfolio-guia-ti/`](.scratch/portfolio-guia-ti/), sem usar GitHub Issues no fluxo das skills.

## Fundação técnica

O Ticket 01 introduz somente a base executável:

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

## Comandos de qualidade

| Comando | Finalidade |
| --- | --- |
| `pnpm lint` | Verifica regras de qualidade e padrões do Next.js. |
| `pnpm typecheck` | Valida os tipos TypeScript sem gerar arquivos. |
| `pnpm test:int` | Testa a integração Payload/PostgreSQL. Requer `pnpm db:up`. |
| `pnpm test:e2e` | Abre a aplicação em Chromium e testa página e health check. |
| `pnpm test` | Executa integração e navegador em sequência. |
| `pnpm build` | Gera o build de produção do Next.js. |
| `pnpm db:down` | Para o PostgreSQL local sem apagar o volume. |
| `pnpm docker:down` | Para a aplicação e o banco sem apagar dados. |

## Variáveis de ambiente

Crie `.env` a partir de [`.env.example`](.env.example). O arquivo real é ignorado pelo Git.

- `DATABASE_URL`: conexão com o PostgreSQL;
- `PAYLOAD_SECRET`: chave longa e aleatória usada pelo Payload para proteger sessões e tokens.

Nunca versione credenciais, dados de clientes, respostas de alunos ou conteúdo empresarial confidencial.

## Escopo do MVP

A formação será genérica e investigativa: não ensinará procedimentos internos de uma empresa nem operações destrutivas sobre dados reais. Redes é uma das competências, não o curso inteiro. Exercícios, missões simuladas e conversas com clientes serão introduzidos pelos tickets verticais seguintes.

## Licenciamento

Ainda não existe licença pública para o código ou para o conteúdo autoral. Nenhum arquivo `LICENSE` será adicionado até uma decisão explícita posterior.
