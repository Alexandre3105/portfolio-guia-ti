# PROTÓTIPO DESCARTÁVEL — Missão de Suporte

Responde a [Prototipar uma Missão de Suporte interativa](../../issues/12-prototipar-licao-interativa.md). Não é o site nem a stack de produção. Remover o código exploratório após registrar a decisão e sua evidência no ticket.

## Executar

Na raiz do repositório:

```powershell
python -m http.server 4174 --bind 127.0.0.1 --directory .scratch/portfolio-guia-ti/prototypes/support-mission
```

Abra `http://127.0.0.1:4174/?variant=A`. O servidor fica acessível somente nesta máquina.

## O que está sendo comparado

Três apresentações estruturais do mesmo conteúdo, alternáveis pelo seletor inferior ou pelas setas do teclado fora de campos e diálogos:

- `?variant=A`: **Um passo por vez**, leitura central e evidências recolhidas.
- `?variant=B`: **Bancada de investigação**, contexto, ações e evidências lado a lado em desktop.
- `?variant=C`: **Conversa orientada**, roteiro em turnos com consequências recentes e caderno recolhido; não é um chat de IA.

A troca de apresentação preserva a tentativa nesta aba. A navegação privada aprovada foi representada de forma reduzida; **Minha jornada** pausa/retoma a missão e **Voltar ao portfólio** mostra somente uma referência da entrada aprovada, não uma nova proposta de portfólio.

## Missão piloto

**O sistema não abre. Por onde começar?**

1. Relato, objetivo, conceito de fato/hipótese e Microdesafio com feedback.
2. Caso demonstrado sobre um filtro de relatório, sem alterar registros.
3. Investigação guiada de acesso negado, com mais de um caminho de evidências e encaminhamento ao responsável por acessos.
4. Caso de Transferência: impressão interrompida, observação local, ação autorizada e confirmação do resultado.
5. Registro de Atendimento com evidências selecionadas, escolhas de causa/condução e três campos curtos.
6. Debriefing por segurança, evidência, condução e comunicação; exemplo opcional, autoavaliação e nova tentativa.

O cenário, as alternativas e o agrupamento dos blocos são hipóteses de prototipação, não currículo final aprovado. Os tempos indicados são hipóteses editoriais, não resultados medidos.

## Limites explícitos

- Conta fictícia e estado somente em memória; recarregar recomeça. Sem login real, APIs, banco, uploads, analytics ou envio de respostas.
- Nenhuma ação opera computadores, impressoras ou permissões reais. As consequências são respostas roteirizadas com dados fictícios.
- Consultas ao glossário não alteram o Nível de Apoio; dicas específicas sobem gradualmente de orientação até demonstração, sem nota ou punição.
- O protótipo verifica fatos selecionados, resultado confirmado, conclusão e limites de autorização. Presença de texto não prova qualidade de comunicação: a comparação é explícita e humana, sem correção por IA.
- **Missão Percorrida** não implica **Competência Demonstrada**. O protótipo mantém a competência não verificada; não certifica aprendizagem.
- O caminho é registrado apenas em memória para o debriefing. Isso não decide armazenar cliques no produto; o contrato de dados aprovado continua valendo.
- A nova tentativa reinicia somente o Caso de Transferência e seu registro. Recarregar reinicia toda a missão.

## Roteiro de avaliação humana

Peça a uma pessoa iniciante que percorra o caso sem explicar antecipadamente as escolhas. Use somente dados fictícios e registre observações sanitizadas, sem nome, contato ou respostas pessoais do participante.

- Ela distingue relato de hipótese depois do Microdesafio?
- Consegue localizar as evidências e explicar por que escolheu uma verificação?
- Entende por que a Barreira de Segurança interrompe a ação e encontra uma alternativa?
- Transfere o método para a impressora sem depender das mesmas palavras do primeiro caso?
- Produz um registro curto que outra pessoa consegue continuar?
- Diferencia missão percorrida, apoio recebido e competência demonstrada?
- Onde há excesso de leitura, dúvida de navegação ou ajuda que revela a resposta cedo demais?

Ainda não há evidência de teste com iniciantes. Não resolver o ticket apenas porque o HTML funciona.

## Checagens técnicas — 2026-08-31

- Sintaxe JavaScript verificada com `node --check`.
- Fluxo percorrido no navegador: Microdesafio com erro e correção explicada, caso demonstrado, investigação, encaminhamento, transferência, registro e debriefing.
- Conferidos ação segura pouco fundamentada, barreiras de autorização, caminho alternativo pelo relato comparativo e três níveis de dica.
- Percorrida a resolução da impressão por observação da bandeja, reposição autorizada e teste confirmado; formulário incompleto não avançou.
- As três apresentações foram verificadas sem rolagem horizontal em 390 × 844 e 1440 × 900, com inspeção visual pontual; não é uma auditoria completa de acessibilidade.
- Verificados a passagem por Minha jornada, o retorno/avanço pelo histórico do navegador e a abertura/fechamento das referências. A revisão automatizada não substitui um teste manual completo de teclado.
- Sem erros ou avisos de JavaScript observados no percurso. Nenhum serviço externo foi integrado.

As checagens não validam a eficácia pedagógica nem todos os caminhos possíveis. Faltam avaliação do responsável, piloto com iniciantes e critérios finais de qualidade.
