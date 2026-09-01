# Prototipar uma Missão de Suporte interativa

Type: prototype
Status: resolved
Blocked by: 08, 11

## Question

Que protótipo mínimo de uma Missão de Suporte permite avaliar com iniciantes a estrutura, os Caminhos de Investigação, a Barreira de Segurança, o Feedback Acionável, o Caso de Transferência e o Registro de Atendimento?

## Comments

- Iniciado em 2026-08-31 após a aprovação de **Prototipar a navegação entre as duas jornadas**. A marca é **MANSK**.
- Hipótese de missão para discussão: **“O sistema não abre. Por onde começar?”**. Ensinar a separar relato, fato e hipótese, delimitar escopo, escolher ações seguras e encaminhar uma restrição de acesso sem alterar permissões.
- Caso de Transferência proposto: falha de impressão com evidências locais, ação reversível autorizada e confirmação com o usuário, para reaplicar o método fora do cenário de sistemas web.
- Comparar três apresentações no mesmo protótipo: **Um passo por vez**, **Bancada de investigação** e **Conversa orientada**. Não reabrir a navegação ou a marca já aprovadas.
- Manter texto curto, aprofundamento opcional, dicas graduais sem pontuação, respostas estruturadas e avaliação determinística explícita. Texto livre não será julgado por IA nem tratado como semanticamente validado só por estar preenchido.
- Estado em memória, conta fictícia, sem integrações, uploads, métricas ou dados reais. Uma missão percorrida no protótipo não comprova aprendizagem. O gate inicialmente anotado como anterior à resolução foi separado: esta decisão encerra o formato para planejamento; o piloto com iniciantes permanece pendente nos critérios de qualidade, sem ser declarado realizado ou dispensado.
- Artefato histórico recuperável no commit `793720f`, em `.scratch/portfolio-guia-ti/prototypes/support-mission/`. Seu código descartável foi retirado da área ativa após a aprovação; a decisão e os limites ficam neste ticket, e o roteiro de piloto segue em **Definir qualidade, privacidade, métricas e critérios de aceite**.
- Primeira checagem técnica: fluxo completo percorrido; verificados feedback, caminho alternativo de investigação, barreiras de autorização, dicas graduais, registro curto e nova tentativa. As três apresentações não apresentaram rolagem horizontal na verificação móvel.
- **Aprovação do responsável:** considerou a experiência muito boa e a linguagem simples; observou que estava um pouco sugestiva, mas confirmou que gostou e autorizou avançar. A observação é um ponto para revisão editorial e piloto, não um pedido de refazer a interface agora.
- **Refinamento posterior aprovado em conceito:** durante [Definir arquitetura curricular e governança de atualização](16-definir-arquitetura-curricular-e-governanca.md), o responsável aprovou a conversa roteirizada com perguntas escolhidas, testes simulados e descoberta gradual de evidências como formato principal da investigação. Explicações, exercícios e debriefing permanecem ao redor dela. Preservar a aprovação histórica do formato-base sem tratar a nova interação como já prototipada, comparativamente aprovada ou validada com iniciantes; seu detalhamento continua naquele ticket.

## Answer

O protótipo **“O sistema não abre. Por onde começar?”** foi aprovado como referência do formato e da linguagem das Missões de Suporte. A resolução autoriza avançar no planejamento; não comprova aprendizagem, acessibilidade completa ou prontidão de produção.

### Estrutura de referência

Apresentar o conteúdo progressivamente, com uma ideia ou decisão principal por Bloco da Missão. A versão apresentada usa **Um passo por vez** como referência de entrada. As alternativas **Bancada de investigação** e **Conversa orientada** foram exploratórias; não há evidência de preferência comparativa nem justificativa para implementar três interfaces no MVP.

A missão mínima combina:

1. Relato fictício, objetivo observável, conceito essencial e Microdesafio com feedback.
2. Caso demonstrado que expõe o raciocínio e seus limites, sem alterar dados de clientes.
3. Investigação guiada com diferentes caminhos capazes de reunir evidências suficientes, sem exigir uma sequência única de cliques.
4. Caso de Transferência em outro contexto, sem dicas específicas abertas por padrão.
5. Registro de Atendimento curto e estruturado.
6. Debriefing por segurança, evidência, condução e comunicação, com exemplo opcional e nova tentativa.

O caso principal mostrou uma restrição de acesso que deve ser encaminhada ao responsável, sem ampliar permissões. O Caso de Transferência usou impressão interrompida, observação local, reposição autorizada de papel e confirmação do resultado. Esses cenários são referências de prototipação, não a composição final obrigatória do currículo.

### Linguagem, ajuda e sugestividade

Preservar linguagem simples, técnica e amigável, avaliações objetivas e detalhes longos em Aprofundamento Opcional. Dicas continuam graduais e solicitadas pelo aluno, sem pontuação ou punição; os limites de segurança permanecem explícitos.

Registrar como risco editorial a **indução pela redação das alternativas**: se o aluno identifica a resposta apenas pelo texto que anuncia uma ação como correta ou autorizada, o Caso de Transferência pode não evidenciar raciocínio. Avaliar esse risco no piloto, distinguindo orientação útil na prática guiada de pistas que antecipam a conclusão na verificação independente. Não remover apoio inicial nem ocultar regras de segurança para tornar a atividade artificialmente difícil.

### Registro e verificação

O registro combina problema/impacto, evidências selecionadas, hipótese, testes/ação/resultado, condução e mensagem ao solicitante. Os limites de 180/220 caracteres usados no protótipo são hipóteses de concisão, não limites finais já medidos.

Verificações determinísticas podem conferir evidências e escolhas objetivas. Preencher um campo não prova qualidade de comunicação: texto livre exige critérios transparentes, comparação com exemplo e revisão humana, sem julgamento por IA no MVP. Missão Percorrida, Competência Demonstrada e Nível de Apoio permanecem conceitos separados.

### Evidência e pendências

- O responsável aprovou a experiência e a linguagem. Não houve piloto documentado com iniciantes.
- A checagem técnica anterior percorreu o fluxo completo e verificou caminhos alternativos, barreiras, ajuda gradual, formulário, retomada e layouts em desktop/celular. Ela não substitui validação pedagógica nem auditoria completa de acessibilidade.
- O [ticket de qualidade](15-definir-qualidade-privacidade-metricas-e-aceite.md) deve definir os critérios e exigir a evidência de piloto antes da publicação, incluindo investigação sem indução e comunicação compreensível.
- Autoria, versionamento, organização dos módulos e atualização do conteúdo serão definidos em [Definir arquitetura curricular e governança de atualização](16-definir-arquitetura-curricular-e-governanca.md), antes da pesquisa de stack.
- O código HTML/CSS/JavaScript serviu apenas à decisão e é recuperável pelo histórico Git. Não deve ser promovido diretamente a produção.
