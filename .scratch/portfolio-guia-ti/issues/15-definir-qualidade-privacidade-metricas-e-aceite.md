# Definir qualidade, privacidade, métricas e critérios de aceite

Type: grilling
Status: resolved
Blocked by: 12, 14, 17

## Question

Quais critérios objetivos de acessibilidade, responsividade, conteúdo, testes, privacidade, observabilidade, métricas, publicação e aprendizagem — incluindo segurança, evidência, condução, comunicação, exclusão, retenção, maioridade e revisão jurídica — determinarão que o MVP está pronto?

## Comments

- Gate editorial aprovado: a formação somente poderá ser lançada quando todas as competências obrigatórias dos oito módulos tiverem ensino, prática e demonstração, e o desafio final validar investigação e encaminhamento em caso novo. Cada missão publicada terá Ficha completa, fontes e data de revisão, cenário fictício, alternativas não indutivas, Barreira de Segurança, feedback curto/técnico/amigável e confirmação humana de conteúdo, acessibilidade e coerência. Rascunhos incompletos podem ser salvos, nunca publicados; informação confidencial de clientes ou empresas bloqueia publicação.
- Retenção de registros aprovada: logs operacionais comuns por **30 dias**; auditoria administrativa, exclusões e solicitações de privacidade por **seis meses**; registros específicos de incidentes de segurança pelo mínimo normativo de **cinco anos**. Se o checklist confirmar incidência do Marco Civil, conservar somente os campos legalmente necessários pelo prazo exigido. Logs não conterão respostas das missões, textos do aluno, senhas ou tokens; acesso será restrito e o descarte automatizado e testado.
- Benchmark do KVM 1 aprovado: no perfil limitado a 1 vCPU/4 GB, simular por pelo menos 15 minutos **20 visitantes públicos, 10 alunos ativos e uma publicação editorial**, com menos de 1% de erros, 95% das ações comuns respondendo em até dois segundos, CPU e memória abaixo de 85%, ausência de OOM/travamento e ao menos 30% de disco livre. Em falha, medir e otimizar antes de considerar KVM 2; qualquer upgrade continua sujeito ao teto de R$100. O cenário é gate inicial e não promessa pública de capacidade.
- Gate técnico aprovado: CI deve concluir lint, tipos, testes unitários, de integração e ponta a ponta; cadastro, login, retomada, missão, publicação editorial, exportação e exclusão precisam passar. Bloquear publicação por vulnerabilidade crítica ou grave explorável conhecida, migration incompatível, segredo no código/imagem, defeito crítico ou grave aberto, ou ausência de teste de restauração, rollback, renovação TLS e alertas. Não usar percentual arbitrário de cobertura como substituto: comportamentos críticos e barreiras de segurança precisam de teste direto.
- Gate de acessibilidade aprovado: conformidade alvo **WCAG 2.2 AA**, sem erro automático crítico ou grave e com verificação manual das jornadas por teclado e NVDA. Exigir foco visível, rótulos e erros compreensíveis, contraste, alternativas que não dependam apenas de cor, zoom de 200%, reflow equivalente a 320 px e testes representativos em celular, tablet e desktop. Falha que impeça cadastro, missão, feedback, retomada, exportação ou exclusão bloqueia publicação até correção e reteste; ferramenta automática não substitui inspeção manual nem piloto com iniciantes.
- Piloto de aprendizagem aprovado como gate: observar **cinco adultos iniciantes**, com cenários fictícios e registros sanitizados. No Caso de Transferência, ao menos quatro devem, sem ajuda direta, separar fato de hipótese, escolher uma verificação segura e produzir encaminhamento curto contendo problema, evidências, tentativas e próximo passo. Falha crítica de segurança ou acessibilidade bloqueia publicação até correção e novo teste do critério afetado. O piloto procura problemas e evidência inicial de transferência; não será apresentado como validação científica da eficácia para toda a população.
- Política de backup aprovada: gerar diariamente um backup lógico do PostgreSQL e uma cópia coerente das mídias, cifrar antes do envio ao Backblaze B2 e manter janela rotativa de **30 dias**, com descarte automático e sem retenção indefinida. Executar restauração mensal em ambiente isolado, incluindo banco, mídias e reaplicação das exclusões antes de considerar o teste bem-sucedido. Alertar falha, ausência de backup, crescimento fora do orçamento e expiração incorreta; a política será ajustada somente se requisito legal pontual exigir prazo diferente.
- Gate mínimo aprovado para a Conta do Aluno: não exigir revisão jurídica ampla como condição geral. Antes de ativar cadastro, a PJ preencherá checklist interno baseado em fontes oficiais, publicará aviso de privacidade e termos simples, manterá autodeclaração 18+ sem alegar idade verificada, testará exportação/exclusão e documentará fornecedores, contratos e transferências. Métricas pedagógicas opcionais permanecerão desligadas no lançamento. Cada item sem base, contrato ou comportamento comprovado fica desativado isoladamente; consulta jurídica pontual será usada somente para dúvida material que permaneça sem resposta segura. O gate reduz burocracia, mas não equivale a parecer nem autoriza declarar conformidade.
- Proposta rejeitada: o responsável não aceita condicionar todo cadastro público a uma revisão jurídica ampla antes do MVP, por considerar o processo burocrático demais. A rejeição remove esse formato de gate, mas não elimina as obrigações da PJ nem autoriza declarar conformidade. Deve-se definir uma alternativa proporcional que preserve coleta mínima, transparência, direitos, contratos e risco de acesso por menores, escalando para consulta jurídica pontual apenas as dúvidas materiais que permanecerem sem resposta documentada.
- Canal público aprovado: publicar `privacidade@<domínio-da-mansk>` para direitos dos titulares e incidentes, encaminhado a uma caixa monitorada da PJ. O endereço definitivo só será criado após a escolha do domínio; não expor e-mail pessoal. Testar recebimento, resposta, continuidade fora da VPS e recuperação de acesso antes da produção. Resend continua responsável apenas por mensagens transacionais de saída, não por receber solicitações.
- Controlador aprovado em princípio: a **pessoa jurídica do responsável** operará a MANSK, contratará os fornecedores e responderá pelos tratamentos da Conta do Aluno. Razão social, CNPJ, endereço e enquadramento não serão registrados no repositório de planejamento; devem ser confirmados por canal seguro e constar corretamente no aviso, nos termos, nos contratos e nos registros antes da produção. A escolha da PJ não comprova automaticamente enquadramento como agente de pequeno porte, dispensa de encarregado ou conformidade.
- A [pesquisa sobre privacidade, maioridade e direitos do aluno](../../../docs/research/17-privacidade-maioridade.md) foi concluída. Converter sua matriz final em gates de publicação sem declarar conformidade: autodeclaração 18+ não verifica idade; Conta do Aluno depende de revisão jurídica sobre ECA Digital e acesso provável; cada finalidade exige base e inventário; fornecedores internacionais exigem mecanismo validado conforme a Resolução ANPD nº 19; métricas opcionais ficam desligadas por padrão; direitos, exclusão/restauração, retenção, aviso, segurança, incidentes, registros e eventual RIPD precisam ser verificáveis. Não ampliar a coleta enquanto essas decisões estiverem abertas.
- A aprovação de [Prototipar uma Missão de Suporte interativa](12-prototipar-licao-interativa.md) encerrou a decisão de formato, não uma validação de aprendizagem. Não há piloto documentado com iniciantes.
- Incorporar o piloto como gate de publicação e definir aqui seus critérios, participantes, evidências mínimas e tratamento dos problemas encontrados. Não considerar o gate atendido somente pela aprovação do responsável, por cliques corretos ou pelo funcionamento técnico do protótipo.
- Observação do responsável: a linguagem foi considerada simples e agradável, mas algumas alternativas pareceram sugestivas. A revisão deve procurar pistas que entreguem a resposta, especialmente no Caso de Transferência, sem ocultar limites de segurança.
- Refinamento aprovado em conceito em [Definir arquitetura curricular e governança de atualização](16-definir-arquitetura-curricular-e-governanca.md): Conversa Investigativa roteirizada com perguntas escolhidas e Testes Simulados revelando evidências aos poucos. Validar compreensão, carga de leitura, coerência dos fatos, caminhos alternativos, acesso às evidências anteriores e justificativa dos testes. Interesse, “suspense” ou quantidade de cliques não comprovam maior aprendizagem; comparar a transferência para outro caso, mantendo apoio adequado ao iniciante e as barreiras de segurança. A aprovação do formato não representa piloto realizado.
- A [pesquisa complementar sobre diálogo investigativo](../../../docs/research/16-dialogo-investigativo.md) sugere comparar o novo formato com uma ficha orientada usando objetivos, conteúdo e apoio equivalentes, incluindo caso novo e verificação posterior. O desenho exato do piloto ainda será definido aqui; não é evidência de que ele ocorreu.
- O encerramento por decisão do aluno foi aprovado: verificar conclusão antecipada sem evidência suficiente, retorno à investigação após feedback e conclusões válidas por caminhos diferentes, sem exigir todos os cliques. Confirmar que apresentar uma conclusão não marca automaticamente competência demonstrada nem pula os demais blocos da missão.
- Incluir nos critérios futuros de teste as verificações de publicação aprovadas no ticket 16: rascunhos incompletos podem ser salvos, mas uma publicação deve ser bloqueada por falha estrutural impeditiva ou ausência de confirmação humana de revisão. Verificar também o percurso válido com ambas as conferências satisfeitas, preservando os demais gates de publicação. Esses testes ainda não foram implementados ou executados.
- Incluir nos testes futuros a retirada comum de missões aprovada no ticket 16: bloquear novas tentativas no material retirado, permitir terminar uma tentativa antiga segura, preservar resultados válidos e impedir a retirada da única cobertura de competência obrigatória sem substituta revisada e publicada. Conferir que a exceção de correção crítica interrompe também tentativas em andamento. Não tratar estes critérios como testes já realizados.

- Incluir nos testes futuros a complementação curricular aprovada no ticket 16: aproveitar apenas evidências válidas de critérios equivalentes, exigir demonstração dos requisitos novos ou alterados e distinguir a conclusão anterior do atendimento aos requisitos atuais. Verificar que uma mudança curricular não vira revalidação crítica indevida nem exige reiniciar toda a formação. Não confundir aprovação da política com execução dos testes.
- Verificar a cobertura curricular aprovada no ticket 16: competências obrigatórias relacionadas às missões em que são ensinadas, praticadas e demonstradas, além do desafio final. Oito módulos ou uma quantidade de lições, isoladamente, não comprovam formação completa; o dimensionamento editorial não substitui o piloto.

### Roteiro de piloto a concretizar

Usar cenários fictícios e registrar observações sanitizadas, sem nome, contato, dados de clientes ou respostas pessoais do participante. Pedir que uma pessoa iniciante percorra a missão sem explicar antecipadamente as escolhas e observar:

- Distinção entre relato, fato e hipótese após o Microdesafio.
- Capacidade de localizar evidências e justificar uma verificação, em vez de reconhecer uma alternativa pelo tom de sua redação.
- Entendimento da Barreira de Segurança e escolha de uma alternativa autorizada.
- Transferência do método para outro tipo de problema, sem dicas específicas abertas por padrão.
- Registro curto que outra pessoa consegue compreender e continuar.
- Distinção entre missão percorrida, ajuda recebida e competência demonstrada.
- Excesso de leitura, dúvidas de navegação e situações em que a ajuda revela a resposta cedo demais.

O protótipo original e seu roteiro são recuperáveis no commit `793720f`, em `.scratch/portfolio-guia-ti/prototypes/support-mission/`. O material do piloto deverá refletir as decisões editoriais e de acessibilidade vigentes quando ele ocorrer.

## Answer

O MVP estará pronto somente quando os gates abaixo estiverem atendidos com evidências registradas. Aprovação verbal, funcionamento local ou ausência de reclamações não substituem os testes.

### Conteúdo e aprendizagem

- Os oito módulos cobrem todas as competências obrigatórias em ensino, prática e demonstração; o desafio final exige investigação segura e encaminhamento completo em caso novo.
- Toda Missão publicada possui Ficha completa, fontes e revisão datada, cenário fictício, alternativas sem pistas indevidas, Barreira de Segurança, feedback curto e revisão humana. Conteúdo confidencial bloqueia publicação.
- O piloto usa cinco adultos iniciantes e dados sanitizados. Pelo menos quatro realizam o Caso de Transferência sem ajuda direta, distinguindo fato/hipótese, escolhendo verificação segura e produzindo registro com problema, evidências, tentativas e próximo passo. Falha crítica exige correção e reteste; o resultado não será apresentado como prova científica geral.
- Publicação, retirada, complementação e correção crítica respeitam as regras do ticket 16, preservando evidência válida sem reconhecer como atual uma competência comprometida.

### Experiência e acessibilidade

- Alvo WCAG 2.2 AA, sem erro automático crítico ou grave e com teste manual por teclado e NVDA; foco, rótulos, erros, contraste, uso sem depender de cor, zoom de 200% e reflow em 320 px são obrigatórios.
- Cadastro, missão, feedback, Minha Jornada, exportação e exclusão funcionam em celular, tablet e desktop. Bloqueio nesses fluxos impede publicação.
- Linguagem permanece simples e amigável; as respostas são objetivas, e suspense/interatividade não podem ocultar limites de segurança nem entregar a solução pelo tom.

### Privacidade e dados

- A PJ é a controladora e publicará `privacidade@<domínio-da-mansk>` como canal funcional. Razão social e dados legais serão preenchidos por meio seguro antes da produção, sem entrar no repositório público.
- O cadastro usa autodeclaração 18+ sem alegar idade verificada. O gate mínimo exige checklist oficial, aviso e termos em PT-BR, inventário de finalidades/bases/fornecedores/países, contratos e transferências documentados e exportação/exclusão testadas. Item sem comprovação fica desativado; dúvida jurídica material recebe consulta pontual, sem auditoria ampla obrigatória.
- Métricas pedagógicas opcionais ficam desligadas no lançamento. Não há publicidade, replay, mapa de calor ou perfil comercial.
- Conta e jornada seguem seis meses de inatividade, aviso e 30 dias para retorno/exportação. Backups cifrados são diários no B2, expiram em 30 dias e passam por restauração mensal com reaplicação de exclusões.
- Logs comuns expiram em 30 dias; auditoria administrativa, pedidos e exclusões em seis meses; registros específicos de incidentes em cinco anos. Eventual prazo obrigatório do Marco Civil limita-se aos campos confirmados. Nenhum log guarda respostas, textos, senhas ou tokens.

### Engenharia, segurança e operação

- CI aprova lint, tipos e testes unitários, integração e ponta a ponta dos fluxos críticos. Vulnerabilidade crítica/grave explorável, migration incompatível, segredo em código/imagem ou defeito crítico/grave bloqueia publicação.
- Restauração, rollback, renovação TLS, alertas e exclusão coordenada são ensaiados. UptimeRobot verifica rotas mínimas sem dados; CPU, memória, disco, jobs, backup e certificado geram alertas para contato fora da própria infraestrutura.
- O benchmark limitado a 1 vCPU/4 GB executa por 15 minutos 20 visitantes, 10 alunos e uma publicação editorial, com menos de 1% de erros, p95 de ações comuns em até dois segundos, CPU/RAM abaixo de 85%, sem OOM e com 30% de disco livre. Falha exige otimização antes de avaliar KVM 2 dentro do teto.
- Uma imagem imutável aprovada é promovida manualmente, seguida por migrations compatíveis e smoke tests. O custo recorrente completo permanece em até R$100; nenhum plano pago, excedente ou contratação é ativado por consequência deste aceite.

Cumprir esses gates permite publicar o MVP como evidência inicial e operável, não declarar eficácia científica, disponibilidade garantida ou conformidade jurídica certificada.
