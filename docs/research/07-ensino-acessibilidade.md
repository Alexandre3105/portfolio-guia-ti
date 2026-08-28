# Ensino e acessibilidade para iniciantes

Pesquisa do ticket Wayfinder 07, realizada em 28 de agosto de 2026.

## Pergunta

Quais práticas respaldadas por fontes primárias devem orientar linguagem simples, progressão didática, exercícios, feedback, acessibilidade e redução de carga cognitiva para iniciantes?

## Método e leitura da evidência

Foram consultados somente padrões, orientações oficiais e artigos originais. As fontes têm papéis diferentes:

- **Requisito normativo:** a WCAG 2.2 define critérios testáveis de acessibilidade, mas não cobre todas as necessidades cognitivas.
- **Orientação oficial:** W3C COGA e o portal do Governo Federal orientam a redação; CAST UDL 3.0 orienta o desenho pedagógico. São referências de projeto, não provas de que uma interface específica funcionará.
- **Evidência experimental:** os estudos de exemplos resolvidos, segmentação, recuperação e feedback sustentam mecanismos de aprendizagem. Em geral, foram conduzidos com materiais e públicos mais estreitos do que jovens iniciantes em suporte de TI; portanto, o efeito no produto precisa ser validado em piloto.

## Recomendações

### 1. Escrever para compreensão e ação

Cada página deve começar pelo resultado que o aluno alcançará e apresentar primeiro a informação necessária para a tarefa. O texto deve usar palavras comuns, frases curtas e diretas, blocos pequenos e uma instrução por etapa. O Governo Federal recomenda ir direto ao ponto, deixar detalhes como opcionais, evitar siglas e jargões não explicados e preferir verbos de ação; a orientação cognitiva do W3C acrescenta linguagem literal, conteúdo sem ambiguidade, resumos e separação visual entre instruções. ([Governo Federal — Linguagem Simples](https://www.gov.br/servidor/pt-br/assuntos/laboragov/curadoria-tematica/linguagem-simples); [W3C COGA — Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/))

Termos técnicos necessários não devem ser apagados, porque fazem parte do trabalho de suporte. Devem ser apresentados assim: **termo técnico → explicação simples → exemplo concreto → uso no trabalho**. Siglas são expandidas na primeira ocorrência, e palavras, símbolos ou relações desconhecidas recebem definição no ponto de uso ou em glossário acessível. O CAST recomenda pré-ensinar vocabulário crítico, relacioná-lo ao conhecimento prévio e oferecer representações alternativas para palavras, ícones e diagramas. ([CAST — Clarify vocabulary, symbols, and language structures](https://udlguidelines.cast.org/representation/language-symbols/vocabulary-symbols-structure/))

Exemplo editorial:

> **IP (Internet Protocol)** é o conjunto de regras usado para endereçar dispositivos em uma rede. Pense no endereço IP como o número que ajuda a rede a encontrar o destino. No suporte, você consulta esse número para identificar o computador e investigar falhas de comunicação.

Evitar analogias apresentadas como equivalências perfeitas. Toda analogia deve terminar com seu limite: por exemplo, um IP ajuda a localizar um dispositivo, mas não funciona em todos os aspectos como um endereço residencial.

### 2. Progredir de apoio forte para autonomia

Uma lição para iniciantes deve seguir a sequência:

1. ativar ou fornecer o pré-requisito;
2. declarar um objetivo observável e ligado ao trabalho;
3. explicar um conceito por vez;
4. mostrar um caso resolvido, com decisões e resultado;
5. propor prática guiada com pistas;
6. retirar as pistas gradualmente;
7. pedir uma resolução independente;
8. aplicar o mesmo princípio em um caso diferente.

Essa ordem combina duas linhas de evidência. Nos experimentos clássicos de álgebra, estudar exemplos resolvidos favoreceu a aquisição de esquemas em comparação com começar pela resolução convencional; a teoria de carga cognitiva explica que a busca por tentativa e erro pode consumir capacidade necessária para aprender, sobretudo no novato. ([Sweller e Cooper, 1985 — *The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra*](https://doi.org/10.1207/s1532690xci0201_3); [Sweller, 1988 — *Cognitive Load During Problem Solving: Effects on Learning*](https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog1202_4))

O CAST recomenda conectar conhecimento prévio, incorporar avaliações formativas e retirar os andaimes conforme cresce a independência, além de praticar a transferência em novas situações. ([CAST — Connect prior knowledge to new learning](https://udlguidelines.cast.org/representation/building-knowledge/prior-knowledge/); [CAST — Build fluencies with graduated support](https://udlguidelines.cast.org/action-expression/expression-communication/fluencies-practice-performance/); [CAST — Maximize transfer and generalization](https://udlguidelines.cast.org/representation/building-knowledge/transfer-generalization/))

Textos, diagramas e animações extensos devem ser divididos em segmentos que o aluno controla. Em dois experimentos com animação narrada sobre formação de raios, o controle de ritmo e a apresentação por partes melhoraram transferência, mas não retenção; isso apoia segmentação, sem justificar uma regra universal de duração. ([Mayer e Chandler, 2001 — *When Learning Is Just a Click Away?*](https://doi.org/10.1037/0022-0663.93.2.390))

Aplicação ao guia: antes de pedir que o aluno diagnostique “sem internet”, mostrar um atendimento completo — observar sintomas, consultar configuração, testar o gateway, testar um IP externo, testar um nome e interpretar cada resultado. Depois, fornecer um caso parcialmente preenchido e, por fim, um cenário novo sem roteiro.

### 3. Usar exercícios como aprendizagem, não apenas como prova

Inserir perguntas curtas de recuperação após blocos importantes e revisitar conceitos em lições posteriores. Em dois experimentos com textos em prosa, recuperar o conteúdo produziu melhor retenção depois de dois dias e uma semana do que estudar novamente, embora o reestudo tenha sido melhor no teste imediato. O resultado indica que sensação de familiaridade imediata não é uma medida suficiente de aprendizagem duradoura. ([Roediger e Karpicke, 2006 — *Test-Enhanced Learning*](https://pubmed.ncbi.nlm.nih.gov/16507066/))

Em um estudo de aulas on-line segmentadas, pequenos testes entre trechos reduziram divagação, aumentaram anotações e melhoraram o desempenho de universitários. A amostra foi pequena e usou uma aula de estatística; a implicação segura é experimentar verificações breves, sem concluir que qualquer quiz produzirá o mesmo efeito. ([Szpunar, Khan e Schacter, 2013 — *Interpolated Memory Tests Reduce Mind Wandering and Improve Learning of Online Lectures*](https://www.pnas.org/doi/10.1073/pnas.1221764110))

Os exercícios devem priorizar recuperação livre, ordenação de passos, leitura de saídas e diagnóstico de cenários. Questões de múltipla escolha podem expor o aluno a alternativas falsas; em experimentos originais, feedback corretivo aumentou os benefícios e reduziu a retenção de respostas incorretas. Portanto, toda questão fechada deve mostrar a resposta correta e explicar por que ela faz sentido, inclusive quando o aluno acerta. ([Butler e Roediger, 2008 — *Feedback Enhances the Positive Effects and Reduces the Negative Effects of Multiple-Choice Testing*](https://pubmed.ncbi.nlm.nih.gov/18491500/); [Butler, Karpicke e Roediger, 2008 — feedback e confiança](https://pubmed.ncbi.nlm.nih.gov/18605878/))

O feedback deve ser imediato quando a atividade ensina um procedimento, específico e orientado à próxima ação. Em vez de apenas “incorreto”, informar: o que foi observado, qual princípio se aplica, como corrigir e qual tentativa fazer agora. O CAST recomenda feedback relevante, construtivo, acessível, oportuno e focado em progresso, estratégia e reflexão, não em comparação entre alunos. ([CAST — Offer action-oriented feedback](https://udlguidelines.cast.org/engagement/effort-persistence/feedback/))

### 4. Tratar acessibilidade como definição de pronto

Adotar **WCAG 2.2 nível AA** como baseline técnico. Para o guia interativo, isso exige ao menos estrutura e sequência programaticamente reconhecíveis; operação completa por teclado; ordem e indicador de foco visíveis; contraste mínimo; texto redimensionável e conteúdo responsivo; títulos, cabeçalhos e rótulos descritivos; navegação e identificação consistentes; instruções de entrada; e erros identificados em texto com sugestão de correção quando conhecida. A WCAG 2.2 também inclui alvo de ponteiro de pelo menos 24 × 24 CSS pixels ou espaçamento equivalente, salvo exceções. ([W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/); [W3C — novidades da WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/))

Vídeos gravados devem ter legendas sincronizadas; áudio deve ter transcrição, e vídeos instrucionais devem oferecer alternativa textual que preserve a informação necessária. Legendas automáticas precisam de revisão. ([W3C WAI — Captions/Subtitles](https://www.w3.org/WAI/media/av/captions/); [W3C WAI — Transcripts](https://www.w3.org/WAI/media/av/transcripts/))

Conformidade AA não encerra acessibilidade cognitiva. O próprio W3C registra que a WCAG não atende todas as necessidades cognitivas e recomenda orientação suplementar e participação de usuários no design e nos testes. Assim, linguagem simples, previsibilidade, ausência de distrações e explicações em camadas devem continuar como requisitos do produto. ([W3C — Cognitive Accessibility](https://www.w3.org/WAI/cognitive/))

Automação não substitui avaliação manual. A validação deve combinar checagem de conformidade com testes por pessoas, incluindo iniciantes e, quando possível, usuários com deficiência. Um participante não representa toda uma deficiência; o relatório do teste deve registrar perfil, método e limites da amostra. ([W3C WAI — Involving Users in Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/involving-users/))

## Implicações para os tickets 08 e 15

### Ticket 08 — formato de lição, exercício e feedback

Usar como unidade mínima de lição:

`objetivo operacional → pré-requisito/gancho → explicação curta → exemplo resolvido → prática guiada → recuperação sem consulta → feedback acionável → caso de transferência → resumo/checklist`

- Limitar cada tela a uma decisão ou ideia principal; detalhes avançados ficam em expansão ou leitura complementar.
- Não bloquear o avanço por um único erro. Permitir nova tentativa, dica progressiva e consulta ao exemplo.
- Explicar termos técnicos no contexto e manter um glossário navegável.
- Alternar leitura com análise de saídas reais, ordenação de procedimentos e cenários de atendimento.
- Oferecer texto equivalente para todo conteúdo visual ou audiovisual; mídia alternativa complementa o texto, não vira pré-requisito exclusivo.

### Ticket 15 — qualidade e critérios de aceite

Incluir três camadas de aceite:

1. **Conteúdo:** revisão de linguagem simples, precisão técnica, siglas expandidas, analogias com limites e instruções testadas por um iniciante.
2. **Acessibilidade:** WCAG 2.2 AA com análise automatizada e manual; navegação integral por teclado; zoom/reflow; contraste; foco; semântica; erros; legendas e transcrições.
3. **Aprendizagem:** piloto com tarefas imediatas e uma verificação posterior; medir se o aluno explica o conceito, executa o procedimento e transfere a decisão para um cenário novo, além de registrar onde pediu dica ou abandonou.

O MVP não deve prometer eficácia pedagógica antes desse piloto. As métricas iniciais devem ser tratadas como sinais de usabilidade e aprendizagem no contexto do produto, não como validação geral das teorias citadas.

## Síntese

O guia deve ensinar como um bom atendimento de suporte acontece: linguagem direta, contexto real, demonstração completa, prática apoiada, recuperação frequente, correção útil e autonomia gradual. A combinação de WCAG 2.2 AA, orientação cognitiva do W3C, UDL do CAST e validação com iniciantes oferece uma base defensável; os estudos experimentais justificam prototipar esse formato, mas não dispensam teste com o público real.
