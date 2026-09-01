# Definir arquitetura curricular e governança de atualização

Type: grilling
Status: resolved
Blocked by: 05, 08

## Question

Como a Formação Inicial de Suporte de TI deve organizar módulos, pré-requisitos, Missões de Suporte, versões e referências externas, e qual esquema de autoria e processo permitirá incluir, revisar, atualizar ou retirar conteúdo sem acoplar a formação a uma empresa, marca ou tecnologia específica?

## Comments

- Iniciado após a aprovação do formato em **Prototipar uma Missão de Suporte interativa**. Competências, linguagem simples, limites da autonomia e marca MANSK continuam válidos; não reabrir essas decisões.
- Esta decisão é um bloqueador de **Pesquisar opções de stack, autoria e hospedagem**: o modo de criar, revisar e publicar conteúdo precisa orientar a comparação técnica.
- Entrevista com `grilling` e `domain-modeling`, uma pergunta de texto por vez. “Gerenciar o curso” deverá ser delimitado como gestão de conteúdo, sem presumir acesso às respostas individuais dos alunos, que continua fora do MVP.
- Direção de autoria indicada pelo responsável: usar o Codex para preparar o conteúdo e ter uma tela na qual ele próprio possa publicar e configurar a formação. O responsável aprovou o fluxo editorial e o escopo inicial de configuração apresentados, respondendo “Perfeito”.
- Consolidação encerrada após a aprovação do dimensionamento por competências. Os pré-requisitos e o avanço já estão respondidos nos tickets 05 e 09; não foram acrescentados bloqueios. O escopo de autoria está delimitado pela Ficha da Missão, catálogo de interações, revisão e políticas abaixo. CMS, stack, mecanismos técnicos e critérios finais de aceite permanecem nos tickets 13–15, não nesta decisão curricular.

### Autoria e gestão de conteúdo — escopo inicial aprovado

- A autoria terá apoio do Codex. Isso não decide incorporar IA ao site, contratar uma API, gerar conteúdo durante a navegação do aluno nem conceder publicação automática ao agente.
- O painel de gestão de conteúdo faz parte do escopo inicial aprovado. Deve permitir ao responsável editar textos, exercícios, dicas e feedback, organizar a ordem das missões e controlar o que está publicado. Registrar essas necessidades como critérios para a pesquisa técnica, sem presumir que será necessário desenvolver um editor ou CMS próprio.
- Gestão de Conteúdo da Formação é distinta de supervisão dos alunos. A tela editorial não autoriza consultar respostas individuais nem amplia o contrato de dados já aprovado.
- Fluxo aprovado: rascunho preparado com apoio do Codex → Prévia Editorial para revisão pelo responsável → publicação pelo responsável. A liberação para os alunos depende da revisão e da ação humana de publicar, não apenas da geração do material.
- Prévia Editorial é a visualização do conteúdo em preparação para revisão; não é a Prévia Pública oferecida a visitantes antes do cadastro. As etapas do fluxo não fixam ainda um modelo técnico de estados ou permissões.
- O escopo aprovado não implica editor visual de atividades arbitrárias, controle de usuários, integrações ou configurações técnicas de infraestrutura. As regras de atualizações comuns, correções críticas, apresentação da revalidação, retirada comum e mudanças nos objetivos ou critérios estão definidas abaixo.

### Organização curricular — aprovada

O responsável aprovou os oito módulos apresentados, respondendo “Gostei”. Eles agrupam as competências já aprovadas sem acrescentar especializações ou procedimentos de fabricante:

1. **Atender e investigar:** postura, comunicação, relato, fatos e hipóteses, limites de autorização e registro do atendimento.
2. **Computadores e periféricos:** componentes, energia e diagnóstico de dispositivos locais.
3. **Sistemas operacionais e ferramentas:** arquivos, processos, serviços, atualizações, terminal e leitura de logs com uso seguro e gradual.
4. **Redes e conectividade:** IP, Wi-Fi, DNS, gateway e acesso à internet.
5. **Sistemas web, contas e integrações:** aplicações SaaS, permissões e entendimento conceitual das dependências entre sistemas.
6. **Segurança, privacidade e recuperação:** proteção de dados, golpes, malware, backup e recuperação dentro da autonomia autorizada.
7. **Dispositivos conectados:** aplicação dos fundamentos a equipamentos e consulta de documentação externa, sem treinamento de marca.
8. **Desafio final de atendimento:** chamados fictícios variados, com resolução segura ou escalonamento fundamentado e comunicação para usuário e equipe técnica.

Segurança, raciocínio por evidências, comunicação, reversão, validação e escalonamento atravessam todos os módulos; não ficam restritos ao primeiro ou ao último. A lista fixa o agrupamento e a sequência recomendada aprovados. Não define duração, quantidade de missões, novos bloqueios de acesso ou pré-requisitos rígidos.

### Avanço — preservar a decisão existente

Conforme [Decidir progresso, identidade e dados do aluno](09-decidir-progresso-identidade-e-dados.md), percorrer uma missão permite acessar a próxima, mesmo que a competência ainda esteja em desenvolvimento. A Conclusão da Formação exige todas as competências obrigatórias e o desafio final demonstrados com segurança. Não reabrir essa distinção nem criar exigência de domínio completo como condição geral de avanço.

### Atualização comum de missões iniciadas — aprovada

- O responsável aprovou a regra para atualizações comuns, respondendo “Sim”. Em ajustes de texto, exemplos ou clareza, novas tentativas usam a versão recém-publicada e uma tentativa em andamento continua na versão em que foi iniciada, preservando seu progresso.
- A publicação de uma atualização comum não apaga os registros e as evidências já obtidos. Preservar significa manter o Estado de Aprendizagem já previsto, não criar histórico completo de tentativas, cliques ou rascunhos, nem ampliar os prazos de retenção e os direitos de acesso já aprovados.
- A Versão da Missão distingue o conteúdo e os critérios usados em cada edição. O vínculo com a tentativa deve permitir a continuidade aprovada, sem escolher agora um mecanismo técnico de armazenamento ou migração.
- Correções críticas de segurança e erros graves seguem a política aprovada abaixo, não a continuidade de ajustes comuns. A retirada comum de material e as mudanças nos objetivos ou critérios avaliados também têm regras próprias aprovadas abaixo. A continuidade aprovada não autoriza manter conteúdo inseguro disponível.

### Correções críticas — aprovadas

- O responsável aprovou a política de correções críticas, respondendo “Sim”. Suspender imediatamente a versão afetada quando houver orientação insegura ou erro grave que comprometa a aprendizagem, impedindo novas tentativas e a continuidade no material problemático.
- Explicar o motivo aos alunos afetados e publicar a versão corrigida somente após revisão pelo responsável. O canal de aviso ainda não está definido; não presumir novo serviço de mensagens.
- O aluno refaz somente a parte afetada, sem reiniciar toda a formação nem apagar resultados válidos das demais partes. Se a correção invalidar a evidência de uma competência já demonstrada, essa competência deverá ser revalidada; preservar o resultado anterior como histórico não significa considerá-lo prova atual válida.
- Não ampliar o armazenamento de respostas, o acesso administrativo ou a retenção para aplicar essa política. A representação da revalidação e o efeito sobre a conclusão da formação estão aprovados abaixo.
- Esta aprovação define uma regra de produto; nenhuma suspensão, comunicação ou alteração de dados de alunos reais foi executada.

### Apresentação da revalidação — aprovada

- O responsável aprovou essa apresentação, respondendo “Sim”. Na competência cuja evidência foi comprometida, mostrar **Revisão necessária**, acompanhada de explicação curta de que houve uma correção do material e da ação para revisar a parte afetada e demonstrar novamente a competência.
- Se a formação já havia sido concluída, mostrar **Concluída anteriormente — revisão pendente**: preservar a conclusão anterior como histórico, mas não apresentar a formação como plenamente atualizada enquanto houver revalidação obrigatória pendente.
- Uma nova demonstração válida da competência afetada elimina a pendência correspondente. Apenas ler o aviso ou publicar a correção não comprova a revalidação; resultados válidos das demais competências permanecem preservados.
- Essa indicação distingue o resultado anterior de sua validade atual e complementa os estados de progresso já aprovados. Não classificar a correção do material como falha cometida pelo aluno nem reiniciar seu progresso nas partes não afetadas; a representação técnica fica para a arquitetura.

### Estrutura de autoria das missões — aprovada

O responsável aprovou a **Ficha da Missão**, dizendo “Sim, podemos adotar a ficha”. Ela será padronizada, preparada com apoio do Codex e editável no painel, organizando o formato pedagógico já aprovado:

1. Identificação: título, módulo, objetivo observável e competências trabalhadas.
2. Cenário fictício e Blocos da Missão: contexto, conceito essencial, Microdesafio, caso demonstrado e investigação guiada.
3. Interações: ações possíveis, evidências, consequências, Barreiras de Segurança, dicas graduais e feedback curto. Os caminhos devem admitir conclusões válidas sustentadas por evidências, não um único roteiro obrigatório de cliques.
4. Verificação: Caso de Transferência, campos do Registro de Atendimento, critérios de segurança, evidência, condução e comunicação, e Debriefing da Missão. Distinguir verificações objetivas de texto livre, que não será julgado por IA.
5. Referências e gestão editorial: fontes, atribuição de autoria, revisão e Versão da Missão. Fontes externas não substituem os fundamentos necessários para realizar a atividade.

Novas missões serão composições dos tipos de bloco e atividade disponíveis; uma mecânica interativa inédita exigirá desenvolvimento e testes próprios. A ficha não incluirá código executável arbitrário inserido pelo editor. A aprovação não escolhe formato de arquivo, CMS, mecanismo de importação ou catálogo técnico definitivo de componentes.

### Conversa investigativa — formato aprovado

O responsável pediu mais dificuldade e “suspense” na investigação e aprovou, respondendo “Sim”, a conversa roteirizada como formato principal dessa parte da missão, com perguntas selecionáveis e testes simulados. Explicações, exercícios e debriefing permanecem ao redor da investigação. Ele considera que essa abordagem pode ser mais eficiente; isso é uma hipótese de produto, não evidência de aprendizagem já obtida.

A proposta aprofunda os casos inicialmente incompletos e os múltiplos Caminhos de Investigação definidos em **Definir formato de lições, exercícios e feedback**. Não revoga linguagem simples, apoio gradual, segurança, Caso de Transferência, registro ou debriefing, nem significa que toda a missão deva virar uma conversa longa.

Direção aprovada e limites preservados:

- Usar uma Conversa Investigativa roteirizada como interação principal da investigação, com perguntas selecionáveis ao cliente fictício e acesso a Testes Simulados. As respostas são preparadas na ficha e revisadas pelo responsável; não é contato com clientes reais nem um chat com IA improvisando durante a atividade.
- Cada pergunta revela um relato compatível com o que o cliente sabe; cada teste revela uma observação ou resultado. Manter distinguíveis relato, evidência e hipótese do aluno. A resposta do cliente ou do teste não deve ser uma indicação antecipada de “certo/errado”.
- Manter fatos consistentes dentro do caso. A dificuldade vem de hipóteses plausíveis, informações inicialmente incompletas e necessidade de interpretar resultados, não de mudar secretamente a causa, esconder instruções essenciais, impor cronômetro ou fabricar pegadinhas.
- Admitir caminhos diferentes capazes de reunir evidências suficientes. Um teste negativo ou uma pergunta que não resolve o caso não é automaticamente um erro; o debriefing deve considerar fundamento e interpretação, não premiar a menor sequência de cliques.
- Aumentar gradualmente a independência: começar com demonstração e apoio, mantendo dicas sob demanda e glossário; propor menos orientação antecipada no Caso de Transferência. Barreiras de Segurança continuam explícitas e imediatas.
- A ficha deve representar o roteiro do cliente, perguntas disponíveis, condições de apresentação, resultados dos testes, evidências reveladas e critérios de encerramento. O catálogo inicial e os limites dessas interações estão definidos adiante; não adotar editor irrestrito de fluxos ou código arbitrário.
- Preservar navegação e consulta ao que já foi descoberto durante a atividade, sem concluir daí que todo o diálogo ou sequência de cliques deva ser persistido. Qualquer necessidade nova de dados precisa respeitar o contrato do aluno.

A direção de interação foi aprovada, mas sua apresentação e dificuldade ainda precisam de avaliação específica; o protótipo anterior não comprova sua usabilidade ou eficácia. Essa aprovação não autoriza implementação do site nem escolha de stack nesta etapa.

Consulta complementar: [Diálogo investigativo, orientação e transferência](../../../docs/research/16-dialogo-investigativo.md). A pesquisa sustenta manter orientação gradual e observar raciocínio e transferência; não demonstra superioridade do formato de chat para esta formação.

### Encerramento da investigação — aprovado

- O responsável aprovou o encerramento por decisão do aluno, respondendo “Sim”. Depois de conhecer o contexto inicial, o aluno pode apresentar sua conclusão quando julgar ter evidências suficientes, sem precisar executar todas as perguntas e testes disponíveis ou encontrar uma ordem única.
- A conclusão deve indicar o que foi observado, o que ainda é hipótese e a condução proposta: resolução segura, escalonamento fundamentado ou necessidade de mais informação. Não exigir causa raiz confirmada para um escalonamento responsável.
- Apresentar a conclusão não significa acertar, demonstrar competência nem concluir automaticamente a missão. Os critérios da ficha verificam a suficiência das evidências e a segurança; o registro e os demais blocos continuam necessários. Texto livre mantém os limites de avaliação já aprovados.
- Se a conclusão vier cedo demais, apresentar feedback curto sobre a lacuna de evidência e permitir retomar a investigação. Não revelar toda a solução automaticamente nem punir uma hipótese ainda não demonstrada; distinguir isso de uma conduta insegura, que continua sujeita às barreiras e regras de avaliação existentes.
- Essa regra preserva os critérios de Missão Percorrida, Competência Demonstrada e Conclusão da Formação. Apresentar a Conclusão da Investigação não substitui o Registro de Atendimento, o Caso de Transferência ou o debriefing.

### Catálogo inicial de interações — aprovado

O responsável aprovou, respondendo “Sim”, os quatro grupos de interação configuráveis pela Ficha da Missão e pelo painel, usando o mesmo formato de investigação nos diferentes módulos:

1. **Perguntar ao cliente:** perguntas selecionáveis e respostas roteirizadas, reveladas de acordo com o contexto já descoberto.
2. **Realizar Testes Simulados:** ações escolhidas com resultados preparados, como uma mensagem, uma saída de diagnóstico fictícia ou um diagrama acessível. Não executar comandos, acessar equipamentos ou receber dados reais.
3. **Analisar evidências em Microdesafios:** escolher uma interpretação, classificar fato e hipótese ou ordenar verificações justificadas. Uma ordenação local do exercício não impõe um roteiro único para toda a investigação; controles devem funcionar por teclado, sem depender exclusivamente de arrastar.
4. **Registrar e concluir:** selecionar evidências e preencher campos curtos para hipótese, condução e comunicação, preservando os limites de avaliação de texto livre já definidos.

Explicações, casos demonstrados, dicas e debriefing continuam como partes da missão, não como novas mecânicas independentes. O painel permitirá editar o conteúdo e as regras previstas nesses tipos; criar uma mecânica inédita continuará sendo desenvolvimento, não configuração arbitrária. O catálogo não inclui terminal livre, execução de código nem conversa generativa.

O catálogo aprovado não fixa biblioteca de interface, estrutura de banco ou editor visual de fluxos.

### Verificações antes da publicação — aprovadas

O responsável aprovou, respondendo “Sim”, duas verificações complementares obrigatórias a cada publicação, detalhando o fluxo de revisão humana já aprovado:

- **Verificação estrutural automática:** identificar campos obrigatórios ausentes, referências internas inválidas, perguntas ou testes sem retorno definido e encerramentos sem critérios de avaliação. Exibir pendências corrigíveis sem tratar uma validação técnica como comprovação de precisão pedagógica ou segurança do conteúdo.
- **Revisão pelo responsável na Prévia Editorial:** conferir precisão técnica, linguagem simples, fontes e atribuição de autoria, cenários fictícios sem dados sensíveis, caminhos de investigação e feedback, além das barreiras de segurança. Conferir também o comportamento de uma conclusão inadequada, não somente um percurso bem-sucedido.

Permitir salvar rascunhos incompletos, mas impedir sua publicação enquanto houver pendência estrutural impeditiva ou faltar a confirmação humana de revisão. A geração pelo Codex, o preenchimento de campos ou uma checagem automática não substituirão essa confirmação.

Esta regra de bloqueio não substitui os critérios gerais de qualidade, acessibilidade e piloto com iniciantes do ticket de aceite. A aprovação é do requisito; não escolher ferramenta ou implementar o validador nesta etapa.

### Fontes e revisão editorial — aprovadas

O responsável aprovou, respondendo “Sim”, a política de fontes e revisão editorial:

- Priorizar documentação oficial e outras fontes primárias para fundamentos e afirmações técnicas. Artigos e vídeos de terceiros podem complementar, após revisão; o conteúdo essencial para realizar a missão deve estar nela, sem depender de um link externo funcionar.
- Distinguir experiência autoral de afirmações apoiadas em fontes externas, registrando referências, atribuição e data da última revisão na Ficha da Missão. Registrar uma referência não autoriza reproduzir conteúdo de terceiros; licenciamento continua sujeito à delimitação própria do projeto.
- Conferir as fontes antes de publicar uma versão e realizar uma revisão editorial manual a cada seis meses, antecipada quando houver relato de erro ou mudança relevante. Essa cadência editorial é independente da retenção de contas; não implica criar agendamento ou integração agora.
- Um link complementar indisponível deve ser corrigido, substituído ou retirado, sem apagar o progresso do aluno. Se o problema comprometer a segurança ou a validade técnica da missão, aplicar a política de Correção Crítica já aprovada.

Esta política não define retirada de missões, mudança de objetivos ou critérios, nem uma ferramenta automática de monitoramento de links. A aprovação registra o processo editorial; nenhuma revisão futura foi agendada nesta sessão.

### Retirada e substituição comuns de missões — aprovadas

O responsável aprovou, respondendo “Sim”, a regra para retirar ou substituir uma missão por reorganização ou renovação do conteúdo, sem erro grave nem mudança nos objetivos ou critérios:

- Retirar a missão da oferta de novas tentativas, sem apagar resultados válidos ou Registros de Atendimento já existentes. Preservar somente os dados previstos no contrato do aluno, respeitando exclusão e retenção; não criar um histórico ilimitado.
- Permitir que uma tentativa em andamento termine na versão original, desde que ela continue segura e tecnicamente válida. Novas tentativas devem usar a substituta publicada, quando houver, sem transferir automaticamente respostas ou marcar a nova missão como percorrida.
- Antes de retirar a única missão que atende a uma competência obrigatória, publicar e revisar uma substituta que preserve sua cobertura e critérios. Não deixar o aluno sem caminho para demonstrar a competência ou concluir a formação. A retirada comum, por si só, não exige refazer uma competência já demonstrada com evidência válida.
- Se houver orientação insegura ou erro grave, aplicar a suspensão imediata e a revalidação previstas na política de Correção Crítica, mesmo que a substituta ainda não esteja pronta; a continuidade acima não se aplica a esse caso.

Mudanças nos objetivos ou critérios seguem a política própria abaixo; não presumir equivalência entre competências diferentes, alterar a regra de avanço ou escolher mecanismo técnico de arquivamento. Esta aprovação registra a política; nenhuma missão ou dado de aluno foi retirado nesta sessão.

### Mudanças nos objetivos ou critérios — aprovadas

O responsável aprovou, respondendo “Sim”, a regra de complementação para quando mudar o que o aluno precisa demonstrar, sem se tratar de correção crítica:

- Publicar uma nova versão identificável, com revisão e explicação do que mudou. Não tratar objetivos ou critérios diferentes como mera atualização de redação nem sobrescrever os resultados anteriores com exigências que não foram avaliadas.
- Permitir concluir uma tentativa já iniciada na versão original, desde que segura e tecnicamente válida. Seu resultado comprova somente os critérios efetivamente avaliados nessa versão; novas tentativas usam a versão publicada atual.
- Aproveitar evidências válidas dos critérios que permaneceram equivalentes, com equivalência definida na revisão editorial, não pela leitura administrativa das respostas do aluno. Critérios novos ou alterados exigem demonstração própria; não presumir que uma conquista anterior cobre uma competência diferente.
- Para reconhecer a Conclusão da Formação com os novos requisitos obrigatórios, exigir apenas a complementação necessária, preservando as partes já demonstradas e ainda válidas. Quem já havia concluído mantém o registro da conclusão anterior, identificado pelos requisitos atendidos, e pode realizar a complementação para obter o reconhecimento atualizado. Não apresentar a conclusão anterior como reprovação nem como comprovação automática dos novos requisitos.
- Preservar a regra de avanço entre missões, os limites de dados, retenção e acesso administrativo. Não criar histórico completo de tentativas ou exigir reinício da formação. Se a mudança corrigir evidência comprometida por erro grave ou orientação insegura, aplicar a política de Correção Crítica em vez de tratá-la como complementação opcional.

Esta política aprovada não define um mecanismo de migração, formato técnico de versões ou novos rótulos de interface. Nenhuma migração ou mudança de critérios em dados de alunos foi executada.

### Distribuição e quantidade de missões — aprovadas

O responsável aprovou, respondendo “Sim”, o dimensionamento pela cobertura das competências já aprovadas, sem impor o mesmo número de missões a todos os módulos:

- Organizar cada missão em torno de uma situação principal e um objetivo observável delimitado, mantendo comunicação, raciocínio e segurança como competências transversais. Isso não elimina os diferentes casos e blocos previstos no formato pedagógico.
- Mapear as onze áreas de competência e as seis capacidades observáveis do ticket 05 aos oito módulos, identificando em quais missões serão ensinadas, praticadas e demonstradas em Caso de Transferência. Uma evidência pode atender a mais de um critério quando isso estiver explícito; citar um assunto não comprova cobertura nem domínio.
- Dividir o conteúdo em mais missões quando a combinação de objetivos comprometer o foco ou a carga de leitura. Manter 15 a 25 minutos por missão comum apenas como hipótese editorial já aprovada no ticket 08, a ser validada com iniciantes, nunca como cronômetro ou garantia de duração.
- Considerar a formação inicial completa somente com cobertura das competências obrigatórias e o desafio final de chamados variados. O número final de missões e a redação integral serão detalhados na autoria; a especificação deve deixar explícita a cobertura exigida, sem exigir escrever todas as lições antes da pesquisa de stack.

Esta aprovação não reduz a formação a redes, não acrescenta especializações, não fixa carga horária e não altera a regra de avanço. A cobertura planejada não substitui o piloto de aprendizagem.

## Answer

A arquitetura curricular e a governança foram definidas pelas aprovações registradas acima:

- **Currículo:** oito módulos, de Atender e investigar até o Desafio final de atendimento, abrangendo as competências da formação nível 1. Distribuir missões pela cobertura de objetivos observáveis, sem quantidade igual obrigatória por módulo; detalhar o inventário durante a autoria.
- **Entrada e avanço:** preservar o uso básico de computador e internet como único pré-requisito de conhecimento e as regras dos tickets 05 e 09. Percorrer uma missão permite avançar; concluir a formação exige demonstração válida das competências obrigatórias e do desafio final. Nenhum bloqueio adicional foi aprovado.
- **Autoria:** Codex auxilia a preparação de uma Ficha da Missão estruturada. O responsável edita conteúdo e regras dentro do catálogo aprovado por um painel editorial, revisa na Prévia Editorial e publica. Rascunhos incompletos podem ser salvos; publicação exige validação estrutural sem pendência impeditiva e confirmação humana de revisão.
- **Interações:** perguntas roteirizadas a um cliente fictício, Testes Simulados, análise de evidências em Microdesafios e registro/conclusão em campos curtos. A Conversa Investigativa revela evidências gradualmente e admite caminhos válidos diferentes; o aluno decide quando concluir, mas os critérios verificam a suficiência das evidências. Não há IA generativa durante a atividade, código arbitrário no editor nem operação de sistemas reais.
- **Manutenção:** atualizações comuns preservam a versão de tentativas iniciadas. Retiradas comuns impedem novas tentativas e exigem substituta antes de eliminar a única cobertura de uma competência obrigatória. Mudanças nos objetivos ou critérios exigem complementação somente do que mudou, sem apagar conquistas válidas. Correções críticas suspendem o conteúdo afetado e exigem revalidação quando a evidência foi comprometida, distinguindo resultado histórico de validade atual.
- **Fontes:** documentação oficial e fontes primárias como base, material externo revisado como complemento, atribuição e data de revisão por missão. Conteúdo essencial permanece na própria missão; conferir fontes antes da publicação e revisar manualmente a cada seis meses ou antes, diante de problema relevante.
- **Dados e limites:** o painel administra conteúdo, não respostas individuais. Todas as políticas preservam o contrato mínimo de dados, retenção e exclusão; não criam histórico completo de cliques, respostas ou tentativas.

### Encaminhamentos sem reabrir a decisão curricular

- O [ticket 13](13-pesquisar-stack-autoria-e-hospedagem.md) pode pesquisar soluções que atendam a esses requisitos; o [ticket 14](14-escolher-arquitetura-conteudo-e-publicacao.md) escolherá arquitetura e publicação. Representação técnica de versões e equivalências, formato de autoria e canal de avisos de correções críticas devem ser considerados nessa comparação e decisão, sem presumir fornecedor ou integração.
- A especificação e a autoria deverão explicitar a relação entre competências, missões e evidências. A redação integral e o número final de lições não bloqueiam a pesquisa técnica; a formação não poderá ser apresentada como completa sem cobrir os requisitos aprovados.
- O [ticket 15](15-definir-qualidade-privacidade-metricas-e-aceite.md) deve concretizar critérios de qualidade e piloto com iniciantes, incluindo a Conversa Investigativa. Aprovação conceitual, pesquisa bibliográfica e protótipo anterior não comprovam aprendizagem nem validação do novo formato.
- Licenciamento continua na névoa do mapa; privacidade e maioridade continuam no [ticket 17](17-pesquisar-privacidade-e-maioridade.md). A resolução deste ticket não conclui o Wayfinder, não escolhe stack e não autoriza implementar ou publicar o site nesta etapa.
