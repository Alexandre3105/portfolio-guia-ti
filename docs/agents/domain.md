# Domain Docs

Este é um repositório de contexto único. A documentação de domínio é criada de forma incremental, somente quando houver linguagem ou decisões reais para registrar.

## Antes de explorar

- Leia `CONTEXT.md` na raiz, se existir.
- Leia os ADRs relevantes em `docs/adr/`, se existirem.
- Se os arquivos ainda não existirem, prossiga sem tratá-los como obrigatórios.

## Estrutura

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

`CONTEXT.md` é apenas um glossário do domínio, sem detalhes de implementação. Use os termos canônicos nele definidos e evite sinônimos que o próprio glossário rejeite.

Um ADR só deve ser criado quando a decisão for difícil de reverter, surpreendente sem contexto e resultado de uma escolha real entre alternativas. Conflitos com ADRs existentes precisam ser apontados explicitamente.
