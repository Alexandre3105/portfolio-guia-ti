# Prototipar a navegação entre as duas jornadas

Type: prototype
Status: resolved
Blocked by: 08, 09, 10

## Question

Qual arquitetura de informação deixa claro, desde a entrada, como acessar o portfólio, experimentar a Prévia Pública e criar ou acessar a Conta do Aluno para iniciar ou retomar a formação sem misturar os dois objetivos?

## Comments

- Foram comparadas três variações descartáveis da navegação. A decisão consolidada está em `## Answer`; o HTML exploratório foi removido da área ativa ao preparar o protótipo seguinte. Uma cópia recuperável permanece localmente em `output/playwright/navigation-before-mission-2026-08-31.zip`, fora do Git.
- O artefato testa apenas arquitetura de informação e estados de entrada; stack, identidade visual, autenticação e integrações continuam simuladas.
- Primeira reação do responsável: a variação C, **Orientação guiada**, destacou-se positivamente e é a favorita atual.
- Direção-base aprovada: usar a **Orientação guiada** da variação C na entrada, incorporar a clareza editorial da variação B na apresentação dos casos e manter a formação como uma área própria, sem misturar conteúdo profissional com o Estado de Aprendizagem.
- Jornada Profissional aprovada como fluxo contínuo na página inicial: a escolha “Tenho um problema ou projeto” conduz aos casos editoriais na mesma página e mantém o Contato de Projeto acessível, reduzindo navegação desnecessária.
- Entrada da Jornada de Aprendizagem aprovada: uma área pública própria apresenta objetivo, competências e visão dos módulos, oferece a Prévia Pública e só então chama **“Iniciar formação”**. **“Entrar e continuar”** permanece visível para alunos existentes.
- Retomada aprovada: depois da autenticação, o aluno chega a **Minha jornada**, onde vê a missão atual, estados das missões e competências, Nível de Apoio e uma ação destacada para continuar. O produto não abre automaticamente no meio de uma atividade.
- Navegações aprovadas: a área pública usa **Projetos, Formação, Trajetória e Entrar**; a área privada usa **Minha jornada, Referências e Conta**, com **Voltar ao portfólio** como saída discreta. CTAs comerciais não aparecem durante uma missão.
- Acesso à raiz aprovado: um aluno autenticado não é redirecionado automaticamente. A Entrada Orientada permanece visível, mas a rota de aprendizagem passa a mostrar **“Continuar minha jornada”** e o contexto da missão atual.
- Primeiro acesso aprovado: após a Prévia Pública e a criação da Conta do Aluno, o iniciante chega a **Minha jornada**, recebe uma apresentação curta e encontra a primeira Missão de Suporte pronta para começar. Teste de nível, questionário inicial e tutorial longo ficam fora do MVP.
- Texto da rota de aprendizagem aprovado: **“Quero aprender a resolver problemas de tecnologia.”** A frase descreve a capacidade buscada em linguagem amigável; o nome formal Formação Inicial de Suporte de TI aparece como explicação da proposta.
- A rota profissional mantém **“Tenho um problema ou projeto.”**, formando com a rota de aprendizagem um par de escolhas orientado pela intenção do visitante.
- Identidade revisada pelo responsável em 2026-08-31: usar somente **MANSK** como marca visual, mantendo **Alexandre Blank Lopes** como assinatura profissional. A marca não deve sugerir uma empresa ou equipe inexistente; disponibilidade de domínio e conflitos serão verificados antes da publicação.
- Ordem aprovada da Jornada Profissional: **Entrada Orientada → Casos de Projeto → Como posso ajudar → Trajetória → Conte seu problema**. Evidências aparecem antes da oferta comercial e do contato.
- O protótipo usa competências já aprovadas para representar essa entrada; nomes e organização final dos módulos permanecem sob responsabilidade de **Definir arquitetura curricular e governança de atualização**.

### Consolidação e verificação — 2026-08-31

- A entrada C passou a ser o padrão. Seu cabeçalho contém a navegação pública aprovada; os links públicos e privados, incluindo **Voltar ao portfólio**, não são mais ocultados no celular.
- Primeiro acesso e retomada foram separados no simulador: conta nova mostra a primeira missão não iniciada e nenhum registro; aluno existente mostra a missão em andamento e seu ponto de retomada. “Ainda sem evidência” descreve a ausência de avaliação inicial, não um novo Nível de Apoio.
- Verificados em navegador local os quatro estados (entrada, formação pública, aluno novo e aluno retornando) em **1440 × 900** e **390 × 844**, sem rolagem horizontal nem erros JavaScript observados nesses carregamentos.
- Percorridos os fluxos de Prévia Pública → feedback → conta nova → Minha jornada e de entrada de aluno existente; também conferidos a saída para o portfólio, o histórico do navegador e verificações pontuais de teclado nos diálogos.
- O contato preparou uma mensagem fictícia somente na tela, sem envio. Login, progresso, Conta e abertura da missão permanecem demonstrações; não foram integrados fornecedores nem escolhida uma stack.
- As capturas técnicas permanecem locais, fora do versionamento. As verificações foram pontuais e não representam uma auditoria completa de acessibilidade, segurança ou eficácia pedagógica.
- **Aprovação final em 2026-08-31:** o responsável confirmou que somente **MANSK** ficou melhor e autorizou seguir para o próximo passo.

## Answer

Adotar a **Orientação guiada** da variação C para a entrada e a apresentação editorial dos casos da variação B. A marca visual é **MANSK**, com **Alexandre Blank Lopes** como assinatura profissional. A navegação foi aprovada pelo responsável; domínio, disponibilidade da marca e identidade visual final ainda não estão validados.

### Jornada Profissional

A raiz permanece pública e apresenta as intenções **“Tenho um problema ou projeto.”** e **“Quero aprender a resolver problemas de tecnologia.”** A jornada comercial continua na mesma página, nesta ordem:

`Entrada Orientada → Casos de Projeto → Como posso ajudar → Trajetória → Conte seu problema`

**Conte seu problema** é o CTA comercial principal; **Ver projetos** leva aos casos na própria página. O contato prepara uma mensagem para o WhatsApp sem persistência no site; número e integração continuam pendentes. Não usar o nome da marca para sugerir uma empresa ou equipe inexistente.

### Jornada de Aprendizagem

A área pública de formação apresenta objetivo, competências e visão dos módulos, oferece a Prévia Pública e depois convida a **Iniciar formação**. **Entrar e continuar** atende quem já possui conta.

Ambos os acessos levam a **Minha jornada**, nunca diretamente ao meio de uma atividade:

- Conta nova: apresentação breve e primeira missão não iniciada, sem progresso ou registros ficticiamente atribuídos ao iniciante.
- Aluno retornando: missão atual, ponto de retomada, estados de missões e competências, Nível de Apoio e ação de continuar.
- Ao voltar à raiz, manter a entrada pública; personalizar somente a rota de aprendizagem com **Continuar minha jornada** e seu contexto. Não redirecionar automaticamente.

### Navegação e limites

- Pública: **Projetos, Formação, Trajetória e Entrar**.
- Privada: **Minha jornada, Referências e Conta**, com **Voltar ao portfólio** visível também no celular. Não inserir CTAs comerciais durante a missão.
- Preservar navegação pelo teclado e histórico do navegador; navegação privada não pode desaparecer no layout móvel.
- Nomes finais de módulos dependem de [Definir arquitetura curricular e governança de atualização](16-definir-arquitetura-curricular-e-governanca.md).
- Esta resolução fixa arquitetura de informação e textos de entrada, não stack, autenticação real, eficácia pedagógica ou conformidade completa de acessibilidade. O código descartável não é base de produção.
