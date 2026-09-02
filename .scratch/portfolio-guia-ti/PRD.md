# Especificação do MVP MANSK

Triage: ready-for-agent

## Problem Statement

Alexandre Blank Lopes precisa apresentar sua experiência profissional de forma confiável para conquistar clientes e projetos freelancer e, no mesmo produto, oferecer uma Formação Inicial de Suporte de TI que prepare adultos iniciantes para resolver ocorrências comuns com autonomia responsável.

Hoje, experiências de suporte, implantação, dados, desenvolvimento e ensino estão dispersas entre currículo, LinkedIn, projetos e relatos autorais. Uma simples lista de tecnologias não demonstra como problemas reais foram entendidos, quais responsabilidades foram assumidas nem quais resultados podem ser publicados sem expor clientes ou exagerar evidências.

Também falta uma formação generalista que ensine o iniciante a pensar. Manuais de fabricantes e vídeos de terceiros explicam procedimentos específicos, mas não desenvolvem, por si só, a capacidade de delimitar um problema, separar fatos de hipóteses, coletar evidências, testar com segurança, comunicar-se com o usuário e realizar um Escalonamento Responsável. Um curso apenas expositivo ou baseado em respostas óbvias não comprova essa autonomia.

O produto precisa unir essas duas necessidades sem misturar seus contextos: a Jornada Profissional deve conduzir a evidências e ao Contato de Projeto; a Jornada de Aprendizagem deve permitir experimentar a proposta publicamente e, após decisão consciente, criar uma Conta do Aluno para salvar um Estado de Aprendizagem privado. O responsável também precisa manter e publicar a formação por uma interface editorial, sem depender de alterações de código para cada texto ou exercício.

O MVP deve caber em uma operação recorrente de até R$100 por mês, proteger dados pessoais, evitar conteúdo empresarial confidencial, funcionar com acessibilidade e possuir critérios verificáveis de conteúdo, aprendizagem, segurança, capacidade, restauração e publicação. O repositório permanecerá público, mas sem licença pública por enquanto.

## Solution

Construir o site público MANSK, assinado profissionalmente por Alexandre Blank Lopes, com uma Entrada Orientada que apresente duas intenções: **“Tenho um problema ou projeto.”** e **“Quero aprender a resolver problemas de tecnologia.”**

A Jornada Profissional será uma página pública contínua organizada por evidências: Entrada Orientada, Casos de Projeto, Como posso ajudar, Trajetória e Conte seu problema. Sua promessa será **“Transformo problemas técnicos em soluções compreensíveis, seguras e documentadas, conectando suporte, implantação, ensino e desenvolvimento.”**, apoiada pelo posicionamento **“Soluções digitais para operações, dados e aprendizagem.”** O CTA principal preparará no navegador uma mensagem organizada e abrirá o WhatsApp, sem persistir o contato no site.

A Jornada de Aprendizagem apresentará publicamente a proposta, as competências, os oito módulos e uma Prévia Pública com Microdesafio sem progresso persistido. Para iniciar uma Missão de Suporte completa, o adulto criará uma Conta do Aluno com e-mail, senha, identificador interno aleatório, nome de exibição opcional e autodeclaração de 18 anos ou mais. Em **Minha jornada**, acompanhará separadamente Missão Percorrida, Competência Demonstrada e Nível de Apoio.

A formação será composta por Missões de Suporte curtas, pausáveis e organizadas por situações profissionais. Cada missão combinará conceito essencial, Microdesafio, caso demonstrado, Conversa Investigativa roteirizada, Testes Simulados, Caso de Transferência, Registro de Atendimento e Debriefing da Missão. Evidências serão reveladas gradualmente; caminhos diferentes poderão ser válidos; ações proibidas serão interrompidas por Barreiras de Segurança; e o Feedback Acionável será curto, técnico, amigável e acompanhado de Aprofundamento Opcional.

O responsável administrará a formação no Payload CMS. A Ficha da Missão será a unidade editorial canônica. Rascunhos poderão ser salvos incompletos, mas a publicação dependerá de validação estrutural, Prévia Editorial e confirmação humana de revisão. Versões, retiradas, complementações e Correções Críticas preservarão evidências ainda válidas e solicitarão somente a revalidação afetada.

O MVP usará Next.js com TypeScript, Payload CMS, PostgreSQL e Firebase Authentication. A implantação candidata será uma VPS Hostinger KVM 1 autogerenciada, condicionada a benchmark, com Cloudflare, Caddy, UptimeRobot, Resend e backups cifrados no Backblaze B2. A publicação usará imagem imutável identificada pelo commit, migrations controladas, promoção manual, smoke tests e rollback ensaiado.

O principal seam de aceitação será o comportamento externo do produto pela interface web e seus limites públicos: navegador, aplicação, persistência e adaptadores de fornecedores vistos como uma única jornada observável. Esse seam cobre visitantes, alunos e responsáveis editoriais. Testes menores serão usados somente onde regras determinísticas, autorização, retenção ou falhas de integração precisarem de isolamento. Essa escolha consolida os critérios de aceite já aprovados no Wayfinder, sem criar uma nova decisão de produto.

## User Stories

1. Como visitante, quero entender na primeira tela o que a MANSK oferece, para decidir rapidamente qual jornada atende à minha intenção.
2. Como visitante com um problema ou projeto, quero entrar na Jornada Profissional, para conhecer trabalhos relevantes antes de iniciar contato.
3. Como visitante interessado em aprender, quero escolher “Quero aprender a resolver problemas de tecnologia.”, para conhecer a formação em linguagem acolhedora.
4. Como visitante, quero alternar entre portfólio e formação sem perder contexto, para explorar as duas propostas com clareza.
5. Como visitante em celular, quero ver a navegação pública completa, para não depender de uma tela maior.
6. Como visitante que usa teclado, quero percorrer links, diálogos e ações em ordem lógica, para navegar sem mouse.
7. Como possível cliente, quero compreender a promessa profissional antes de ver tecnologias, para avaliar o valor da atuação.
8. Como possível cliente, quero ver casos organizados por problema, participação, solução, resultado e limites, para avaliar evidências sem inferir contribuições inexistentes.
9. Como possível cliente, quero conhecer o AcompanhaPET como produto real em uso, para entender a capacidade de mapear necessidades e acompanhar uma implantação.
10. Como possível cliente, quero saber que o AcompanhaPET foi construído com colaboração do irmão e código produzido com agentes de IA, para receber uma descrição transparente da autoria.
11. Como possível cliente, quero entender os resultados publicáveis do AcompanhaPET sem acessar dados internos da NB Petshop, para avaliar o caso sem violar confidencialidade.
12. Como possível cliente de dados, quero conhecer o dashboard comercial anônimo, para avaliar experiência com Power BI, tratamento, modelagem, medidas e análise.
13. Como possível cliente de dados, quero compreender os resultados qualitativos do dashboard sem ver números ou telas identificáveis, para respeitar o sigilo da organização atendida.
14. Como possível cliente de implantação, quero conhecer um caso anônimo em academia, para avaliar capacidade de entender a operação, treinar pessoas e melhorar autonomia.
15. Como visitante, quero distinguir no caso do portfolio-guia-ti o que foi planejado, construído e validado, para não confundir intenção com resultado comprovado.
16. Como possível cliente, quero entender as frentes “operações” e “dados para decisões”, para saber em quais problemas posso solicitar ajuda.
17. Como possível cliente, quero ver machine learning descrito como conhecimento em desenvolvimento, para não receber uma promessa sem caso demonstrável.
18. Como possível cliente, quero clicar em “Conte seu problema”, para iniciar uma conversa de descoberta antes de receber escopo, prazo ou preço.
19. Como possível cliente, quero revisar a mensagem comercial antes de abrir o WhatsApp, para controlar o que será enviado.
20. Como possível cliente, quero que o site não persista minha mensagem de WhatsApp, para reduzir coleta desnecessária.
21. Como recrutador, quero acessar a Trajetória e o LinkedIn, para avaliar o histórico profissional por uma rota secundária clara.
22. Como visitante, quero reconhecer MANSK como marca autoral e Alexandre Blank Lopes como profissional responsável, para não presumir uma empresa ou equipe inexistente.
23. Como visitante da formação, quero conhecer objetivo, competências e módulos antes do cadastro, para decidir se a proposta é adequada.
24. Como visitante da formação, quero experimentar uma Prévia Pública sem criar conta, para entender o estilo de aprendizagem sem fornecer dados.
25. Como visitante da Prévia Pública, quero realizar um Microdesafio sem progresso persistido, para experimentar a proposta sem criar uma identidade oculta.
26. Como visitante da formação, quero iniciar a formação somente depois da prévia, para que o cadastro seja uma decisão consciente.
27. Como aluno existente, quero usar “Entrar e continuar”, para retomar minha jornada sem refazer a apresentação.
28. Como adulto iniciante, quero criar uma conta com e-mail e senha, para salvar minha evolução entre dispositivos.
29. Como adulto iniciante, quero informar somente um nome de exibição opcional além do e-mail, para não fornecer dados pessoais desnecessários.
30. Como adulto iniciante, quero receber uma explicação clara de que a conta é destinada a maiores de 18 anos, para compreender a regra de acesso.
31. Como titular da conta, quero que a autodeclaração de maioridade não seja apresentada como idade verificada, para receber informação precisa sobre o tratamento.
32. Como aluno novo, quero chegar a Minha jornada com uma introdução curta e a primeira missão pronta para começar, para iniciar sem teste de nível ou tutorial longo.
33. Como aluno retornando, quero chegar a Minha jornada antes de reabrir a atividade, para escolher conscientemente quando continuar.
34. Como aluno retornando, quero ver minha missão atual e o ponto de retomada, para continuar sem repetir blocos já percorridos.
35. Como aluno, quero ver os estados das missões separados dos estados das competências, para não confundir leitura com domínio.
36. Como aluno, quero ver o Nível de Apoio da evidência vigente, para compreender quanto suporte usei sem ser punido por pedir ajuda.
37. Como aluno, quero avançar após percorrer uma missão mesmo com competência em desenvolvimento, para continuar aprendendo sem bloqueio rígido.
38. Como aluno, quero que a Conclusão da Formação exija competências obrigatórias e desafio final demonstrados, para que a conclusão represente evidência real.
39. Como aluno, quero iniciar do uso básico de computador e internet, para não depender de conhecimento prévio de redes, terminal ou hardware.
40. Como aluno, quero aprender um método comum de diagnóstico, para transferir o raciocínio entre problemas e tecnologias.
41. Como aluno, quero aprender a reformular o relato e confirmar contexto, frequência e impacto, para entender o problema antes de agir.
42. Como aluno, quero distinguir fatos, hipóteses e soluções sugeridas, para não tratar suposições como diagnóstico.
43. Como aluno, quero ordenar hipóteses e escolher testes seguros, para investigar com lógica e preservar evidências.
44. Como aluno, quero interpretar resultados sem extrapolar o que eles provam, para produzir conclusões tecnicamente responsáveis.
45. Como aluno, quero resolver ações seguras, reversíveis e autorizadas, para ganhar autonomia sem ultrapassar meu escopo.
46. Como aluno, quero reconhecer quando uma ocorrência exige desenvolvimento ou permissão superior, para realizar um Escalonamento Responsável.
47. Como aluno, quero explicar a situação em linguagem simples ao usuário, para manter o atendimento compreensível.
48. Como aluno, quero registrar detalhes reproduzíveis para a equipe técnica, para permitir continuidade sem reiniciar a investigação.
49. Como aluno, quero estudar os oito módulos em sequência recomendada, para desenvolver competências do atendimento ao desafio final.
50. Como aluno, quero estudar redes como parte de uma formação ampla, para não reduzir suporte de TI a conectividade.
51. Como aluno, quero aplicar fundamentos a dispositivos conectados sem decorar marcas, para consultar procedimentos específicos quando necessário.
52. Como aluno, quero que cada Missão de Suporte apresente uma situação e um objetivo observável, para entender o propósito da atividade.
53. Como aluno, quero receber conceitos essenciais em blocos curtos, para reduzir carga de leitura e pausar entre decisões.
54. Como aluno, quero acessar artigos, manuais e vídeos como Aprofundamento Opcional, para aprofundar sem esconder pré-requisitos fora da missão.
55. Como aluno, quero respostas objetivas e amigáveis, para aprender sem ser sobrecarregado por explicações enormes.
56. Como aluno, quero escolher perguntas em uma Conversa Investigativa com cliente fictício, para descobrir informações gradualmente.
57. Como aluno, quero escolher Testes Simulados e interpretar seus resultados, para praticar investigação sem operar sistemas reais.
58. Como aluno, quero consultar as evidências já descobertas, para construir e revisar minhas hipóteses.
59. Como aluno, quero encontrar fatos consistentes em cada cenário, para que a dificuldade venha do raciocínio e não de pegadinhas.
60. Como aluno, quero percorrer diferentes Caminhos de Investigação válidos, para não depender de uma ordem única de cliques.
61. Como aluno, quero decidir quando apresentar minha Conclusão da Investigação, para avaliar se já possuo evidência suficiente.
62. Como aluno, quero retomar a investigação após uma conclusão prematura, para corrigir lacunas sem receber toda a resposta.
63. Como aluno, quero que perguntas ou testes pouco úteis gerem consequências coerentes sem serem automaticamente tratados como erro, para aprender a interpretar evidências.
64. Como aluno, quero que uma ação proibida acione uma Barreira de Segurança antes de ser executada, para aprender o limite sem simular dano.
65. Como aluno, quero dicas graduais sob demanda, para receber primeiro orientação leve e depois demonstração apenas quando necessário.
66. Como aluno, quero realizar um Caso de Transferência diferente do exemplo guiado, para demonstrar que consigo reaplicar o princípio.
67. Como aluno, quero usar uma Resposta Estruturada, para organizar fatos, hipóteses, testes, conclusão e próximo passo sem escrever uma redação longa.
68. Como aluno, quero comparar meu texto com critérios transparentes e um exemplo fundamentado, para revisá-lo sem julgamento opaco por IA.
69. Como aluno, quero produzir um Registro de Atendimento final curto e suficiente, para documentar ou encaminhar o caso com clareza.
70. Como aluno, quero receber um Debriefing da Missão por segurança, evidência, condução e comunicação, para entender uma melhoria concreta.
71. Como aluno, quero tentar novamente depois de um erro ou violação de segurança, para continuar aprendendo sem perder conquistas válidas.
72. Como aluno, quero que meus exercícios usem somente Dados de Cenário fictícios, para nunca depender de dados de clientes ou empresas.
73. Como aluno, quero ser avisado para não digitar credenciais ou dados reais, para evitar exposição acidental.
74. Como aluno, quero que o produto não aceite uploads, capturas ou logs, para reduzir o risco de compartilhar material sensível.
75. Como aluno, quero consultar meus Registros de Atendimento finalizados, para observar minha evolução e reutilizar meu próprio aprendizado.
76. Como aluno, quero excluir um Registro de Atendimento individual, para controlar o que permanece na minha jornada.
77. Como aluno, quero visualizar meus dados armazenados, para compreender o Estado de Aprendizagem mantido pelo produto.
78. Como aluno, quero corrigir meu nome de exibição, para manter meus dados mínimos atualizados.
79. Como aluno, quero exportar minha jornada em formato legível e reutilizável, para não ficar preso ao produto.
80. Como aluno, quero excluir minha conta e meus dados de aprendizagem, para exercer controle sobre meus dados.
81. Como aluno inativo, quero receber aviso após 6 meses e 30 dias para retornar ou exportar, para evitar exclusão inesperada.
82. Como aluno afetado por Correção Crítica, quero ser informado sem receber minhas respostas por e-mail, para compreender a mudança com privacidade.
83. Como aluno afetado por Correção Crítica, quero refazer somente a parte cuja evidência foi comprometida, para preservar resultados válidos.
84. Como aluno que concluiu anteriormente, quero ver “Concluída anteriormente — revisão pendente” quando necessário, para distinguir histórico de validade atual.
85. Como aluno, quero que uma nova demonstração válida remova a revisão pendente, para atualizar corretamente minha conclusão.
86. Como aluno, quero concluir uma tentativa iniciada em uma versão comum ainda segura, para não perder progresso por ajuste editorial.
87. Como aluno, quero que mudanças de critérios preservem evidências equivalentes e solicitem somente complementação, para não reiniciar toda a formação.
88. Como aluno, quero que a navegação privada tenha Minha jornada, Referências, Conta e Voltar ao portfólio, para acessar funções sem receber CTAs comerciais durante a missão.
89. Como responsável editorial, quero preparar Fichas da Missão com apoio do Codex, para acelerar a autoria sem conceder publicação automática à IA.
90. Como responsável editorial, quero editar textos, exercícios, perguntas, testes, dicas, feedback e ordem das missões em um painel, para atualizar a formação sem editar código.
91. Como responsável editorial, quero usar somente interações do catálogo aprovado, para publicar atividades previsíveis sem código arbitrário.
92. Como responsável editorial, quero salvar rascunhos incompletos, para desenvolver conteúdo de forma incremental.
93. Como responsável editorial, quero visualizar uma Prévia Editorial, para revisar a experiência antes da publicação.
94. Como responsável editorial, quero receber pendências estruturais claras, para corrigir campos, retornos, referências e critérios ausentes.
95. Como responsável editorial, quero confirmar manualmente a revisão, para impedir que geração ou validação automática seja confundida com aprovação humana.
96. Como responsável editorial, quero publicar uma Versão da Missão identificável, para preservar os critérios usados em tentativas iniciadas.
97. Como responsável editorial, quero retirar uma missão comum de novas tentativas sem apagar evidências válidas, para renovar o conteúdo com continuidade.
98. Como responsável editorial, quero publicar uma substituta antes de remover a única cobertura de uma competência obrigatória, para preservar um caminho de conclusão.
99. Como responsável editorial, quero suspender imediatamente uma missão com orientação insegura, para impedir novas tentativas e continuidade no material problemático.
100. Como responsável editorial, quero mapear equivalências quando objetivos ou critérios mudarem, para aproveitar somente evidências ainda válidas.
101. Como responsável editorial, quero registrar fontes, atribuição e data de revisão, para sustentar afirmações e respeitar materiais de terceiros.
102. Como responsável editorial, quero revisar manualmente cada missão a cada seis meses ou diante de problema relevante, para manter o conteúdo atual e seguro.
103. Como responsável editorial, quero administrar conteúdo sem acessar respostas individuais, para preservar a separação entre autoria e dados privados.
104. Como titular de dados, quero um aviso de privacidade e termos simples em PT-BR, para compreender finalidades, fornecedores, retenções e direitos.
105. Como titular de dados, quero um canal funcional de privacidade da MANSK, para solicitar confirmação, acesso, correção, exportação ou exclusão.
106. Como titular de dados, quero que recursos sem base, contrato ou comportamento comprovado permaneçam desativados, para evitar tratamento incerto.
107. Como aluno, quero que Métricas Pedagógicas opcionais estejam desligadas no lançamento, para usar a formação sem rastreamento opcional por padrão.
108. Como aluno, quero que respostas, textos, e-mail e sequência completa de cliques não sejam enviados a analytics, para preservar minha privacidade.
109. Como aluno, quero que o site não use publicidade, replay, mapa de calor, perfil comercial ou rastreamento entre sites, para evitar vigilância desnecessária.
110. Como operador, quero que o administrador veja somente o mínimo técnico e agregados permitidos, para atender a operação sem supervisionar alunos.
111. Como operador, quero processar avisos por uma fila idempotente, para evitar perdas ou duplicações em correções críticas e expiração de contas.
112. Como operador, quero tratar webhooks assinados, rejeições, denúncias e supressões de e-mail, para manter o canal transacional confiável.
113. Como operador, quero backups diários cifrados de banco e mídia fora da VPS, para recuperar o serviço após perda do servidor.
114. Como operador, quero testar mensalmente uma restauração isolada e reaplicar o registro de exclusões, para não reintroduzir dados apagados.
115. Como operador, quero receber alertas de disponibilidade, CPU, memória, disco, jobs, backup e TLS fora da própria infraestrutura, para detectar falhas relevantes.
116. Como operador, quero promover manualmente uma imagem imutável aprovada, para controlar migrations, smoke tests e rollback.
117. Como responsável financeiro, quero manter o custo recorrente total em até R$100 por mês, para operar o MVP dentro do orçamento definido.
118. Como responsável financeiro, quero impedir excedentes pagos automáticos, para que nenhum fornecedor consuma sozinho o teto do produto.
119. Como responsável pelo produto, quero validar a KVM 1 com a carga aprovada antes de contratar capacidade maior, para otimizar com evidência.
120. Como responsável pelo produto, quero publicar somente depois dos gates editoriais, pedagógicos, técnicos, operacionais, de acessibilidade e privacidade, para tratar o MVP como evidência inicial operável.

## Implementation Decisions

### Produto, marca e arquitetura de informação

- O produto se chama **MANSK** e é assinado por **Alexandre Blank Lopes**. A apresentação não deve sugerir empresa ou equipe distinta do autor.
- A raiz pública usa uma Entrada Orientada com as intenções **“Tenho um problema ou projeto.”** e **“Quero aprender a resolver problemas de tecnologia.”**
- A navegação pública contém Projetos, Formação, Trajetória e Entrar. A navegação privada contém Minha jornada, Referências e Conta, com Voltar ao portfólio visível também no celular.
- A Jornada Profissional segue a ordem Entrada Orientada, Casos de Projeto, Como posso ajudar, Trajetória e Conte seu problema, em uma página contínua.
- A Jornada de Aprendizagem possui uma apresentação pública própria, Prévia Pública, criação ou entrada na Conta do Aluno e área privada Minha jornada.
- Um aluno autenticado que volta à raiz não é redirecionado automaticamente. A rota de aprendizagem pode mostrar Continuar minha jornada e o contexto da missão atual.
- CTAs comerciais não aparecem dentro de uma missão.
- Disponibilidade do domínio, conflitos de marca e identidade visual final precisam ser verificados antes da publicação.

### Jornada Profissional e conteúdo autoral

- A promessa central, o posicionamento, os dois CTAs e os quatro Casos de Projeto seguirão os textos e a ordem definidos na Solution.
- Cada Caso de Projeto explicita problema, participação, solução, resultado e limites de publicação.
- AcompanhaPET pode citar NB Petshop, mas não valores, documentos, credenciais, telas identificáveis ou o nome pessoal da proprietária. A colaboração do irmão e o Desenvolvimento Assistido por IA devem ser explícitos.
- O dashboard comercial, a implantação em academia, a organização contratante e seus produtos permanecem anônimos no MVP.
- Resultados qualitativos não serão convertidos em causalidade ou métricas não comprovadas. Machine learning não será ofertado como caso comprovado.
- O caso do portfolio-guia-ti distingue planejado, construído e validado.
- O CTA Conte seu problema monta a mensagem no navegador e abre o WhatsApp. O site não armazena o conteúdo do contato. Número e texto final serão revisados na implementação.
- O LinkedIn será a evidência externa da Trajetória. O PDF bruto do currículo não será publicado no MVP.
- O LealFlow é apenas referência de princípios de clareza e evidência; textos, identidade, componentes e estrutura autoral não serão copiados.

### Currículo e modelo pedagógico

- A Formação Inicial de Suporte de TI aceita como único pré-requisito de conhecimento o uso básico de computador e internet.
- O método transversal é: entender o sintoma, delimitar o problema, coletar evidências, formular hipóteses, testar com segurança, resolver ou escalar e documentar.
- Os oito módulos são: Atender e investigar; Computadores e periféricos; Sistemas operacionais e ferramentas; Redes e conectividade; Sistemas web, contas e integrações; Segurança, privacidade e recuperação; Dispositivos conectados; Desafio final de atendimento.
- Segurança, raciocínio por evidências, comunicação, reversão, validação e escalonamento atravessam todos os módulos.
- O número de missões será definido pela cobertura de objetivos e competências, sem quantidade igual por módulo. Cada competência obrigatória precisa ser ensinada, praticada e demonstrada em Caso de Transferência.
- Procedimentos de fabricantes, produtos internos e sistemas empresariais são Procedimentos Específicos consultados em fontes próprias, não fundamentos ensinados como universais.
- Ações que exigem desenvolvimento, ampliam permissões, alteram dados sensíveis ou excedem autorização devem ser escaladas.
- A missão comum tem hipótese editorial de 15 a 25 minutos, com Blocos da Missão de 3 a 7 minutos, sem cronômetro obrigatório. Esses tempos dependem do piloto.
- Texto curto e interativo é a base. Diagrama, áudio e vídeo são complementares e exigem alternativa acessível. Conteúdo externo é Aprofundamento Opcional.
- Não haverá pontos, vidas, ranking, bônus por velocidade ou competição.

### Motor declarativo da Missão de Suporte

- A Ficha da Missão é a unidade editorial canônica e contém identificação, módulo, objetivo, competências, cenário, blocos, interações, verificação, debriefing, fontes, autoria, revisão e versão.
- O catálogo inicial permite: perguntar ao cliente fictício; realizar Testes Simulados; analisar evidências em Microdesafios; registrar e concluir em campos curtos.
- A Conversa Investigativa é roteirizada e revisada. Não há conversa generativa por IA durante a atividade, contato com cliente real, terminal livre, execução de comandos ou código arbitrário inserido pelo editor.
- Perguntas e testes revelam relatos e evidências consistentes conforme condições declarativas. O resultado não anuncia automaticamente se a escolha está certa ou errada.
- O aluno pode apresentar a Conclusão da Investigação quando quiser. Os critérios verificam suficiência de evidência, distinção entre fato e hipótese e condução segura.
- Uma conclusão prematura recebe Feedback Acionável e permite retomar. Uma conduta de alto risco aciona Barreira de Segurança antes da execução.
- Caminhos diferentes podem ser válidos. A avaliação não exige clicar em tudo, usar a ordem do autor nem encontrar o caminho mais curto.
- Dicas são graduais e solicitadas. O Nível de Apoio registra independente, com dicas ou com demonstração sem reduzir pontos.
- O Caso de Transferência remove as dicas específicas por padrão e apresenta situação diferente da prática guiada.
- Verificações determinísticas podem avaliar escolhas objetivas, omissões e segurança. Texto livre não será julgado semanticamente por IA; usa critérios transparentes, exemplo fundamentado e revisão pelo aluno.
- O Debriefing da Missão avalia segurança, evidência, condução e comunicação, com retorno curto e aprofundamento opcional.
- A redação das alternativas deve evitar indução. A prática guiada pode orientar, mas o Caso de Transferência não pode entregar a conclusão pelo tom.

### Conteúdo, autoria e governança

- O Payload CMS oferece Gestão de Conteúdo da Formação e Prévia Editorial. A autenticação administrativa é separada da Conta do Aluno.
- O responsável pode editar o conteúdo e as regras do catálogo aprovado, organizar missões, salvar rascunhos, visualizar a prévia e publicar. Mecânica inédita exige desenvolvimento e testes.
- A preparação com Codex não integra uma API de IA ao produto e não concede publicação automática.
- A publicação exige validação estrutural sem pendência impeditiva e confirmação humana de revisão técnica, pedagógica, autoral, de segurança e de sanitização.
- A validação estrutural detecta campos obrigatórios ausentes, referências internas inválidas, perguntas ou testes sem retorno e encerramentos sem critérios.
- Cada Versão da Missão publicada é identificável. Uma tentativa iniciada fica vinculada à versão aplicável.
- Atualização comum preserva a versão de uma tentativa em andamento e direciona novas tentativas à versão atual.
- Retirada comum impede novas tentativas, permite terminar uma tentativa segura em andamento e preserva resultados válidos. A única cobertura de competência obrigatória só pode ser retirada depois de substituta revisada.
- Mudança de objetivo ou critério publica nova versão, registra equivalências revisadas e solicita apenas a complementação do que mudou.
- Correção Crítica suspende imediatamente a versão afetada e interrompe tentativas ativas. A versão corrigida só volta após revisão humana.
- Evidência comprometida gera Revisão Necessária; conclusão anterior vira Concluída anteriormente — revisão pendente; nova demonstração válida remove a pendência.
- Fontes oficiais e primárias são preferidas. Materiais externos complementares exigem revisão, atribuição e respeito aos termos do titular. O conteúdo essencial permanece na missão.
- Cada missão registra data de revisão e passa por revisão manual a cada seis meses ou antes diante de erro ou mudança relevante.

### Conta do Aluno, progresso e autorização

- Firebase Authentication com e-mail e senha será a Autenticação Gerenciada do aluno. SMS e login social estão fora do MVP.
- A aplicação mantém identidade e Estado de Aprendizagem separados. Tokens são verificados no servidor antes de qualquer leitura ou escrita privada.
- A Conta do Aluno contém e-mail, identificador interno aleatório e nome de exibição opcional. Não coleta CPF, telefone, nascimento, endereço, empresa, cargo, foto ou nome completo obrigatório.
- O cadastro exige autodeclaração 18+, sem alegar verificação de idade. Inclusão de menores é esforço separado.
- O Estado de Aprendizagem persiste missão e bloco atuais, estados de missões e competências, Nível de Apoio da evidência vigente, Registros de Atendimento finalizados e datas técnicas mínimas.
- Não persistir histórico completo de cliques, respostas erradas, tempo em tela, rascunhos, sequência integral da conversa ou todas as tentativas.
- Missão possui Não iniciada, Em andamento e Percorrida. Competência possui Não verificada, Em desenvolvimento, Demonstrada e, quando aplicável, Revisão necessária. Nível de Apoio possui Independente, Com dicas e Com demonstração.
- Percorrer libera a próxima missão; Conclusão da Formação exige todas as competências obrigatórias e o desafio final demonstrados com segurança.
- Toda leitura, atualização, exportação ou exclusão privada é autorizada pelo identificador do próprio aluno. O administrador editorial não recebe interface para respostas ou Registros de Atendimento individuais.
- A área Conta permite visualizar dados, corrigir nome de exibição, exportar a jornada, excluir registros individuais e excluir conta e Estado de Aprendizagem.
- Exercícios usam apenas Dados de Cenário fictícios. Não aceitar uploads, capturas ou logs e não solicitar credenciais, tokens, CPF, clientes ou sistemas reais.

### Privacidade, retenção, métricas e notificações

- A PJ responsável será a controladora da operação MANSK. Razão social e dados legais serão preenchidos por canal seguro antes da produção e não versionados no repositório público.
- O canal público será `privacidade@<domínio-da-mansk>`, encaminhado para uma caixa da PJ efetivamente monitorada.
- Antes do lançamento de contas, publicar aviso de privacidade e termos simples em PT-BR e manter inventário de finalidade, dado, base, fornecedor, país, retenção e exclusão.
- Contratos, suboperadores e transferências internacionais aplicáveis precisam estar documentados. Recurso sem fundamento, contrato ou comportamento comprovado permanece desativado.
- A validação usa checklist de fontes oficiais e consulta jurídica pontual somente para dúvida material ainda não resolvida. O produto não alegará conformidade certificada com LGPD, ECA Digital ou contratos.
- Após **6 meses** sem login, enviar aviso e conceder **30 dias** para retorno ou exportação. Sem retorno, excluir identidade e Estado de Aprendizagem.
- Backups cifrados têm retenção móvel de 30 dias e restaurações reaplicam um registro mínimo de exclusões antes de qualquer exposição.
- Logs operacionais comuns duram 30 dias. Auditorias administrativas, pedidos de privacidade e exclusões duram seis meses. Registros específicos de incidentes duram cinco anos. Eventual obrigação confirmada do Marco Civil limita-se aos campos e prazo exigidos.
- Logs nunca contêm respostas de missão, texto do aluno, senhas ou tokens.
- Métricas Pedagógicas opcionais ficam desligadas no lançamento. Se ativadas futuramente, permanecem desvinculadas da Conta do Aluno e não recebem respostas, registros, e-mail, conteúdo digitado ou sequência completa de cliques.
- Não usar publicidade, perfil comercial, rastreamento entre sites, gravação de sessão, replay ou mapa de calor.
- Avisos críticos usam e-mail da conta verificada e estado dentro de Minha jornada. O corpo do e-mail não contém respostas nem progresso detalhado.
- Resend envia avisos da aplicação; Firebase envia somente mensagens de autenticação. WhatsApp e SMS não são canais operacionais do aluno.
- Avisos da aplicação usam outbox/fila, idempotência, retentativas, webhook assinado, deduplicação e tratamento de bounce, complaint e suppression.

### Arquitetura e publicação

- A aplicação usa Next.js e TypeScript. Payload CMS fornece autoria. PostgreSQL persiste conteúdo versionado e dados mínimos do aluno. Firebase Authentication fornece identidade do aluno.
- A aplicação, o Payload, o PostgreSQL, o Caddy e arquivos pequenos usam contêineres ou volumes separados na mesma VPS. O PostgreSQL permanece em rede privada, sem porta pública.
- Arquivos estáticos próprios permanecem no código. Mídias pequenas do Payload usam volume persistente. Vídeos não são hospedados no MVP.
- Desenvolvimento usa Docker local. O CI executa validações e constrói imagem imutável identificada pelo commit. A VPS não compila a aplicação e não depende de uma tag mutável `latest` como única referência.
- Produção usa uma única VPS; não há staging persistente. A Prévia Editorial cobre rascunhos, e testes de integração usam ambientes temporários ou locais equivalentes.
- A implantação é promoção manual de imagem aprovada, com migrations progressivas e compatíveis, verificação de saúde, smoke tests e rollback documentado.
- Cloudflare Free fornece DNS e camada pública. Caddy termina TLS com certificado público válido na origem e Cloudflare usa Full (strict).
- UptimeRobot Free verifica uma rota pública mínima sem dados pessoais. Alertas internos cobrem CPU, memória, disco, jobs, backup e certificado e chegam a contato externo à VPS.
- Backups lógicos diários de PostgreSQL e mídia são cifrados antes do envio ao Backblaze B2. O backup semanal da Hostinger é camada adicional e não substitui o backup externo.
- Uma restauração isolada é ensaiada mensalmente, incluindo integridade, mídia e reaplicação do registro de exclusões.
- Hostinger KVM 1 é candidata condicionada ao benchmark de 1 vCPU e 4 GB. KVM 2 é fallback apenas após otimização, evidência de insuficiência e confirmação do teto total.
- O responsável pela operação autogerenciada assume patches, firewall, segredos, backups, alertas, TLS e resposta a incidentes.
- O custo recorrente total, incluindo renovação, domínio, banco, autenticação, mídia, backup, e-mail, monitoramento, câmbio, tributos e excedentes, não pode ultrapassar R$100 por mês.
- Nenhum fornecedor recebe automaticamente todo o teto. Planos pagos, excedentes automáticos, contratos, compras, credenciais e implantação não são autorizados por esta especificação. Preços e limites precisam ser revalidados antes da contratação.

### Licenciamento

- Não criar licença pública, arquivo LICENSE, licença Creative Commons ou política de marca nesta versão.
- Código, formação, portfólio, casos, diagramas, fotografias, currículo e MANSK permanecem todos os direitos reservados.
- O repositório público não concede autorização geral de copiar, modificar, distribuir, hospedar ou explorar comercialmente o material fora das permissões da plataforma.
- Dependências e materiais de terceiros continuam sujeitos aos próprios termos. Dados de alunos, clientes e operação ficam fora de qualquer licenciamento público.
- Contribuição externa não será incorporada sem termos explícitos de autoria e uso. Uma licença futura poderá ser decidida por versão e escopo delimitado.

## Testing Decisions

- Testar comportamento externo e contratos observáveis, não estrutura interna, nomes de componentes ou detalhes de implementação.
- Usar como seam principal a aplicação web completa em ambiente equivalente à produção: navegador acessa rotas públicas e privadas, a aplicação valida identidade e autorização, persiste estado e aciona adaptadores controlados de e-mail, backup e publicação.
- Cobrir no seam principal: Entrada Orientada; navegação do portfólio; Prévia Pública; cadastro e login; primeiro acesso e retomada; Missão de Suporte com caminhos alternativos; Barreira de Segurança; dicas; Caso de Transferência; Registro de Atendimento; Minha jornada; exportação; exclusão; autoria; prévia; publicação; atualização; retirada e Correção Crítica.
- Usar unidades menores para o motor declarativo somente onde a matriz de caminhos, critérios determinísticos, níveis de ajuda, equivalência de evidências e Barreiras de Segurança ficaria lenta ou opaca no navegador.
- Usar testes de integração para autorização entre Firebase e dados privados, persistência PostgreSQL, versionamento de missão, outbox de e-mail, retenção/exclusão e adaptadores de backup.
- Os adaptadores externos devem ter contratos verificáveis e ambientes de teste ou doubles controlados; testes não devem enviar WhatsApp, e-mail real, excluir conta externa ou operar infraestrutura de produção sem gate explícito.
- O CI bloqueia promoção quando lint, tipos, testes unitários, integração ou fluxos ponta a ponta críticos falharem.
- O código-base ainda não possui suíte de produção. O prior art disponível são os protótipos descartáveis verificados com Playwright em desktop e 390 × 844; eles orientam cenários, mas não serão promovidos nem tratados como cobertura do MVP.
- Validar responsividade em celular, tablet e desktop, incluindo 320 px de reflow e zoom de 200%, sem rolagem horizontal indevida.
- Validar WCAG 2.2 AA com automação sem achados críticos ou graves e revisão manual por teclado e NVDA, incluindo foco visível, ordem, rótulos, erros, contraste, alternativas de mídia e conteúdo não dependente de cor.
- Realizar piloto com cinco adultos iniciantes usando Dados de Cenário. Pelo menos quatro devem, no Caso de Transferência e sem ajuda direta, distinguir fato de hipótese, escolher verificação segura e produzir encaminhamento conciso com problema, evidências, tentativas e próximo passo.
- Falha crítica de segurança, acessibilidade ou indução editorial exige correção e repetição do cenário afetado. Aprovação conceitual do responsável e pesquisa bibliográfica não substituem o piloto.
- Validar que uma missão pode ser percorrida sem demonstrar competência e que pedir dica altera somente o Nível de Apoio.
- Validar que conclusões prematuras permitem retomar, caminhos alternativos fundamentados são aceitos e não é necessário executar todos os testes.
- Validar que conduta proibida é interrompida antes do efeito e impede demonstração naquela tentativa sem bloquear tentativas futuras.
- Validar que atualização comum preserva tentativa segura em andamento, retirada comum bloqueia novos inícios e Correção Crítica interrompe imediatamente o conteúdo afetado.
- Validar que complementação e revalidação preservam evidências não afetadas, registram a conclusão histórica e não reconhecem automaticamente requisitos novos.
- Validar que o painel impede publicação de Ficha da Missão incompleta, sem retorno, sem critério ou sem confirmação de revisão humana.
- Validar que o administrador editorial não consegue consultar respostas nem Registros de Atendimento individuais.
- Validar ausência de upload e rejeição de dados fora dos limites nos contratos de entrada; confirmar que logs e analytics não recebem textos, respostas, credenciais ou tokens.
- Validar visualização, correção, exportação, exclusão individual e exclusão de conta em PostgreSQL, Firebase, Resend, logs aplicáveis e ciclo de backups.
- Ensaiar o ciclo de inatividade de 6 meses, aviso, janela de 30 dias, cancelamento por novo login e exclusão ao final.
- Ensaiar envio idempotente, retentativas, deduplicação, webhook assinado e supressão de e-mails, sem conteúdo pedagógico privado na mensagem.
- Executar análise de dependências, imagem, segredos e superfície pública. Vulnerabilidade crítica ou grave explorável, segredo em código/imagem, migration incompatível ou defeito crítico/grave bloqueia publicação.
- Ensaiar promotion, migrations, smoke tests, rollback, renovação TLS, alertas, backup e restauração isolada antes da publicação.
- Executar benchmark de pelo menos 15 minutos na KVM 1 com 20 visitantes públicos, 10 alunos ativos e uma publicação editorial simultânea. Exigir menos de 1% de erros, p95 de ações comuns em até 2 segundos, CPU e RAM abaixo de 85%, nenhum OOM ou travamento e pelo menos 30% de disco livre.
- Otimizar antes de considerar KVM 2. Qualquer alternativa precisa permanecer no teto mensal integral.
- Registrar evidências dos gates. Funcionamento local, árvore Git limpa ou ausência de reclamações não comprovam prontidão de produção.

## Out of Scope

- Tradução do MVP para inglês ou outros idiomas.
- Conteúdo empresarial confidencial, credenciais, dados de clientes, capturas identificáveis ou procedimentos internos.
- Treinamento operacional específico de fabricantes, empregadores, clientes ou sistemas particulares.
- Especializações avançadas além da Formação Inicial de Suporte de TI nível 1.
- Área de empresa, painel de gestor, supervisão de funcionários ou acesso administrativo às respostas individuais.
- Certificados, comunidade, ranking, gamificação competitiva, mensagens entre alunos ou recursos sociais.
- Inclusão de menores de 18 anos, verificação robusta de idade ou coleta de documentos e biometria.
- Login social, SMS, autenticação própria de senhas ou múltiplos provedores de identidade.
- Upload de arquivos, capturas, logs ou execução de comandos e dispositivos reais nos exercícios.
- Julgamento de texto livre por IA, conversa generativa durante a missão ou publicação automática de conteúdo gerado.
- Editor irrestrito de fluxos, código arbitrário no CMS ou criação configurável de mecânicas inéditas.
- Hospedagem de vídeo, staging persistente e build da aplicação na VPS.
- Envio operacional por WhatsApp ou SMS; WhatsApp permanece somente no Contato de Projeto.
- Métricas opcionais ativas no lançamento, publicidade, perfil comercial, replay, mapa de calor ou rastreamento entre sites.
- Contratação de fornecedores, compra de domínio, criação de credenciais, provisionamento da VPS ou publicação em produção como consequência desta especificação.
- Licença pública para código, conteúdo ou marca e aceitação automática de contribuições externas.
- Declaração de eficácia científica, SLA, idade verificada ou conformidade jurídica certificada.
- Publicação do currículo PDF bruto, números financeiros de clientes ou resultados não comprovados.

## Further Notes

- Esta especificação sintetiza as decisões aprovadas nos 18 tickets do Wayfinder e está pronta para decomposição por `to-tickets`.
- O inventário completo de missões e a redação de todo o conteúdo serão produzidos durante a autoria, mas cada ticket de implementação deve preservar a matriz de cobertura entre competências, missões, prática e evidência.
- Os protótipos anteriores foram descartáveis e serviram para decidir linguagem, navegação e formato. Não devem ser copiados diretamente para produção.
- As pesquisas de stack e preços são fotografias do momento em que foram realizadas. Revalidar disponibilidade, limites, tributos, câmbio e termos antes de qualquer contratação.
- A escolha da KVM 1 é condicional. Falha no benchmark não autoriza automaticamente KVM 2 nem ultrapassar R$100; primeiro corrigir consumo e repetir a medição.
- A autodeclaração 18+ é uma regra de entrada, não uma prova de idade. O gate jurídico adotado é mínimo e direcionado: checklist oficial, documentação clara e consulta pontual apenas para dúvida material sem resposta.
- O repositório público continuará sem licença pública. O README deve informar isso claramente antes da primeira versão publicada.
- Aprovação desta especificação autoriza criar tickets de implementação; não autoriza implantar, contratar serviços, publicar dados, divulgar clientes adicionais ou iniciar produção.
