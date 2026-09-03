# Issue tracker: Markdown local

Issues, PRDs e mapas deste repositório vivem como arquivos Markdown versionados em `.scratch/`. O repositório pode manter GitHub Issues habilitado para visitantes, mas as skills não devem ler nem publicar trabalho nesse canal.

## Convenções

- Um esforço por diretório: `.scratch/<feature-slug>/`.
- PRD: `.scratch/<feature-slug>/PRD.md`.
- Tickets de decisão Wayfinder: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numerados a partir de `01`.
- Backlog de implementação gerado por `to-tickets`: `.scratch/<feature-slug>/tickets.md`, com um título `##` e uma caixa de seleção para cada ticket numerado.
- Comentários e histórico complementar são acrescentados sob `## Comments`.

## Quando uma skill disser "publicar no issue tracker"

Crie um arquivo no diretório do esforço em `.scratch/`, sem chamar `gh issue create`.

## Quando uma skill disser "buscar o ticket relevante"

Leia o arquivo indicado pelo caminho ou pelo número local do ticket.

## Tickets de implementação

Depois que o Wayfinder e a especificação estiverem concluídos, `to-tickets` pode consolidar o backlog executável em `.scratch/<feature>/tickets.md`. Nesse arquivo:

- cada título `## NN — ...` representa uma unidade de trabalho;
- dependências e critérios de aceite permanecem dentro da seção do ticket;
- a conclusão é registrada marcando as caixas correspondentes;
- a numeração desse backlog é independente e pode coincidir com a dos tickets de decisão Wayfinder, pois os documentos representam fases diferentes.

## Tickets Wayfinder

Cada ticket de decisão usa este cabeçalho:

```markdown
Type: research | prototype | grilling | task
Status: open | claimed | resolved
Blocked by: none | NN, NN

## Question

<pergunta que a sessão deve resolver>
```

Quando resolvido, o arquivo recebe uma seção `## Answer` e o mapa ganha apenas um resumo curto com link para o ticket. Para tickets Wayfinder, `Status` representa o ciclo `open → claimed → resolved`. Outros fluxos de triagem usam os valores descritos em `triage-labels.md`.

## Operações Wayfinder

- **Mapa**: `.scratch/<effort>/map.md`.
- **Ticket filho**: `.scratch/<effort>/issues/<NN>-<slug>.md`.
- **Bloqueio**: `Blocked by: NN, NN`; todos os bloqueadores precisam estar `resolved`.
- **Fronteira**: tickets `open`, sem bloqueadores pendentes e ainda não reivindicados; o menor número vem primeiro.
- **Reivindicar**: alterar `Status` para `claimed` e salvar antes de trabalhar.
- **Resolver**: acrescentar `## Answer`, alterar `Status` para `resolved` e adicionar ao mapa um resumo com link.

Os tickets devem ser criados primeiro e os bloqueios conectados em uma segunda passagem. Novas decisões só deixam a seção `Not yet specified` quando já puderem ser expressas como uma pergunta precisa.
