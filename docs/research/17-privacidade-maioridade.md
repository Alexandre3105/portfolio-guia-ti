# Privacidade, maioridade e direitos do aluno no MVP MANSK

Pesquisa do [ticket 17](../../.scratch/portfolio-guia-ti/issues/17-pesquisar-privacidade-e-maioridade.md), realizada em **1º de setembro de 2026**. Foram consideradas a Conta do Aluno definida no [ticket 09](../../.scratch/portfolio-guia-ti/issues/09-decidir-progresso-identidade-e-dados.md), a arquitetura selecionada no [ticket 14](../../.scratch/portfolio-guia-ti/issues/14-escolher-arquitetura-conteudo-e-publicacao.md), os critérios ainda abertos no [ticket 15](../../.scratch/portfolio-guia-ti/issues/15-definir-qualidade-privacidade-metricas-e-aceite.md) e o vocabulário de [`CONTEXT.md`](../../CONTEXT.md).

As fontes são legislação e páginas oficiais brasileiras, atos e orientações da ANPD e documentos de primeira parte dos provedores já selecionados: Firebase/Google, Cloudflare, Resend, Backblaze B2, UptimeRobot e Hostinger. Nenhuma conta foi criada, nenhum serviço foi configurado e nenhum dado foi enviado.

Este relatório organiza requisitos e decisões de produto; **não é parecer jurídico, não conclui que o produto está em conformidade e não substitui revisão profissional antes da publicação**.

## Como ler as conclusões

- **Requisito confirmado:** obrigação expressa nas normas consultadas, ainda dependente dos fatos concretos para sua aplicação.
- **Recomendação prudencial:** desenho de produto ou controle operacional coerente com os princípios e riscos, mas não apresentado como única solução legal possível.
- **Revisão jurídica:** decisão cuja resposta depende do responsável legal, do modelo econômico, dos contratos efetivamente aceitos, do público provável ou de interpretação profissional.

## Resposta curta

O responsável que define por que e como a Conta do Aluno trata e-mail, identificador, progresso, registros e métricas tende a ser o **controlador**; os fornecedores que processam esses dados por suas instruções tendem a ser **operadores**. Alguns fornecedores também atuam como controladores independentes sobre cadastro, cobrança, segurança ou telemetria própria. Os papéis decorrem da atividade real, não apenas do nome usado no contrato. A [LGPD, arts. 5º, 37 e 39](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) exige que a cadeia seja identificada e que o operador siga as instruções do controlador.

A autodeclaração “tenho 18 anos ou mais” comunica a regra de acesso e registra uma afirmação do visitante, mas **não comprova identidade nem idade e é fácil de contornar**. A própria orientação preliminar da ANPD classifica soluções exclusivamente autodeclaratórias como de baixa confiabilidade. Ao mesmo tempo, coletar nascimento, documento ou biometria “por garantia” contrariaria a necessidade e criaria riscos novos sem uma conclusão jurídica de proporcionalidade. [Orientações preliminares da ANPD sobre aferição de idade](https://www.gov.br/anpd/pt-br/assuntos/eca-digital/mecanismos-confiaveis-de-afericao-de-idade-orientacoes-preliminares.pdf/@@display-file/file).

Desde **17 de março de 2026**, o ECA Digital alcança também produtos ou serviços “de acesso provável” por crianças ou adolescentes, não apenas os dirigidos a eles. Portanto, manter conteúdo público e um gate 18+ não autoriza presumir que menores nunca chegarão à página nem encerra a análise. A proibição expressa de usar mera autodeclaração no art. 9º é dirigida a conteúdo impróprio, inadequado ou proibido para menores; não há evidência de que o portfólio educacional pertença a essa categoria. A suficiência do gate para este produto e a incidência das demais medidas de aferição precisam de revisão jurídica baseada no público e na experiência reais. [Lei nº 15.211/2025, arts. 1º, 3º a 15 e 41-A](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm), [página oficial da ANPD sobre o ECA Digital](https://www.gov.br/anpd/pt-br/assuntos/eca-digital).

Antes de publicar contas, o ticket 15 deve aprovar: inventário e bases por finalidade; aviso e termos; cookies necessários e métricas opcionais; contratos, suboperadores e transferências; prazos de retenção; exclusão coordenada e restauração sem ressuscitar contas; canal de direitos; resposta a incidentes; e o resultado da revisão jurídica sobre maioridade, logs obrigatórios, enquadramento do controlador e transferências internacionais.

## 1. Papéis e responsabilidade verificável

### Projeto e fornecedores

| Tratamento | Papel provável no recorte atual | O que precisa ser registrado antes da produção | Classificação |
| --- | --- | --- | --- |
| Conta, jornada, registros finais e eventual métrica pedagógica | O responsável pelo produto decide finalidade, dados, retenção e acesso; portanto tende a ser controlador | Nome e contato do controlador, eventual pessoa jurídica, responsáveis internos e mapa de operações | **Revisão jurídica**, porque o responsável legal ainda não está identificado nos tickets |
| Firebase Authentication | Google processa e-mail, senha/credencial, IP e dados técnicos para autenticação por instrução do cliente; dados próprios de conta/segurança podem ter finalidade independente | Contrato exato aplicável ao Firebase, projeto/região, suboperadores, acesso administrativo e fluxo de exclusão | **Requisito confirmado** identificar o papel; **revisão jurídica** do contrato concreto |
| Cloudflare | Operador para conteúdo em trânsito e “Customer Logs” segundo sua política; controlador independente para dados de conta e determinadas informações de rede | Produtos realmente habilitados, logs, retenção, países e suboperadores | **Requisito confirmado** inventariar os dois papéis |
| Resend | Operador para destinatário, conteúdo e eventos do e-mail transacional por instrução do cliente; controlador de dados próprios de conta | Remetente, metadados mantidos localmente, conteúdo dos modelos, webhooks e suboperadores | **Requisito confirmado** identificar finalidade, acesso e retenção |
| Backblaze B2 | A documentação distingue arquivos em conta de organização, em que Backblaze atua como operador, e conta individual, em que declara relação de controladores conjuntos; dados de conta têm papel próprio | Tipo de conta contratante, região, DPA, bucket, versões, Lifecycle e Object Lock | **Revisão jurídica** do tipo de conta e dos papéis reais |
| UptimeRobot | Operador dos dados do monitor por instrução do cliente; controlador de conta/serviço próprio | Monitorar somente endpoint sem dados pessoais; registrar contatos, região, retenção e suboperadores | **Requisito confirmado** mapear; **recomendação prudencial** limitar o endpoint |
| Hostinger | DPA brasileiro descreve cliente como controlador e Hostinger como operador no serviço; cadastro, cobrança e segurança podem ter finalidades próprias | Titular da conta, VPS São Paulo, suporte, backups, logs, suboperadores e acessos | **Requisito confirmado** mapear; **revisão jurídica** do contrato efetivo |

Fontes contratuais: [privacidade e DPA do Firebase](https://firebase.google.com/support/privacy), [termos de processamento do Firebase](https://firebase.google.com/terms/data-processing-terms), [política da Cloudflare](https://www.cloudflare.com/privacypolicy/), [DPA da Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), [DPA da Resend](https://resend.com/legal/dpa), [suboperadores da Backblaze](https://www.backblaze.com/company/policy/subprocessors), [DPA da UptimeRobot](https://uptimerobot.com/dpa/) e [DPA brasileiro da Hostinger](https://www.hostinger.com/br/legal/dpa).

**Requisito confirmado.** O controlador e o operador devem manter registros das operações, especialmente quando a base for legítimo interesse; o operador deve tratar segundo instruções. Contratos e rotinas devem também definir apoio a direitos, exclusão, segurança, incidentes e auditoria. [LGPD, arts. 37 a 39](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

## 2. Bases legais, finalidade e transparência

**Requisito confirmado.** Cada finalidade precisa de uma base dos arts. 7º ou 11, observando finalidade, adequação, necessidade, livre acesso, qualidade, transparência, segurança, prevenção, não discriminação e responsabilização. Consentimento não deve ser usado como rótulo genérico para toda a conta: quando escolhido, precisa ser livre, informado, inequívoco, específico, demonstrável e revogável por procedimento gratuito e facilitado. [LGPD, arts. 6º a 10](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

**Revisão jurídica.** Confirmar a base de cada operação, sem misturar finalidades:

- criação e manutenção da conta, autenticação, sincronização e entrega da jornada: avaliar execução de contrato/procedimentos preliminares, consentimento ou outra base adequada aos fatos;
- segurança, prevenção de abuso e registros técnicos: avaliar legítimo interesse, obrigação legal ou outra base, documentando necessidade, balanceamento e salvaguardas;
- aviso de inatividade, recuperação e mensagens estritamente transacionais: vincular à operação da conta, sem transformá-las em marketing;
- métrica pedagógica opcional: a solução mais coerente com a promessa de opcionalidade é consentimento separado, mas a base final deve ser validada;
- eventual retenção após exclusão: apontar a obrigação ou defesa concreta, limitar campos, acesso e prazo; “podemos precisar” não é justificativa suficiente.

**Requisito confirmado.** O aluno precisa receber, de forma clara e acessível, finalidade, forma e duração do tratamento, identidade e contato do controlador, compartilhamentos e suas finalidades, responsabilidades e direitos. Se um dado for indispensável ao serviço, essa condição e as consequências de não fornecê-lo precisam aparecer em destaque. [LGPD, art. 9º](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

**Recomendação prudencial.** Manter uma tabela interna `finalidade → dado → origem → base → destinatário/país → retenção → exclusão → responsável` e refletir a versão compreensível no aviso. Mudança incompatível de finalidade deve acionar nova avaliação e, quando aplicável, nova informação ou consentimento.

## 3. O gate 18+ e o acesso de menores

No direito civil, a menoridade termina aos 18 anos completos, com hipóteses legais de emancipação; no ECA, criança é a pessoa com menos de 12 anos e adolescente aquela entre 12 e 18. Uma política de produto “somente 18+” pode continuar mais simples do que tratar exceções de capacidade, mas precisa dizer claramente quem pode criar conta. [Código Civil, art. 5º](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm), [ECA, art. 2º](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm).

### O que a autodeclaração faz

- **Recomendação prudencial:** exibir antes do cadastro uma afirmação clara “Declaro ter 18 anos ou mais”, sem caixa pré-marcada, registrar apenas versão do texto, resultado e instante estritamente necessários e oferecer saída para a parte pública sem conta.
- **Limite confirmado:** a afirmação não autentica pessoa, não verifica documento e não impede que alguém minta. Não descrevê-la no aviso, nos termos ou no aceite como “idade verificada”.
- **Requisito confirmado:** não reutilizar esse registro para publicidade, perfil ou inferência e não coletar nascimento, documento, foto ou biometria sem finalidade, necessidade, base e segurança próprias.
- **Revisão jurídica:** decidir se o registro do clique é realmente necessário, por quanto tempo e se o nível de confiança é proporcional ao risco deste produto.

### Se um menor acessar a parte pública ou contornar o gate

**Requisito confirmado.** A LGPD determina que o tratamento de dados de crianças e adolescentes observe seu melhor interesse. O Enunciado CD/ANPD nº 1/2023 esclarece que podem ser usadas as bases legais dos arts. 7º ou 11, desde que o melhor interesse seja avaliado e prevaleça no caso concreto; portanto, não é correto dizer que todo tratamento de adolescente exige sempre consentimento parental. Para crianças, o art. 14 traz regras específicas, inclusive consentimento específico e destacado de ao menos um responsável quando essa for a hipótese aplicável, esforços razoáveis de verificação e informações simples, claras e acessíveis. [LGPD, art. 14](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), [Enunciado CD/ANPD nº 1/2023](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-divulga-enunciado-sobre-o-tratamento-de-dados-pessoais-de-criancas-e-adolescentes).

**Requisito confirmado.** O ECA Digital considera direção ou acesso provável segundo atratividade, facilidade de acesso e risco relevante à privacidade, segurança ou desenvolvimento. Ele exige melhor interesse, proteção por padrão e medidas proporcionais; dizer “18+” não altera sozinho a probabilidade real. IP, logs, cookies e eventos da página pública ainda podem ser dados pessoais mesmo sem conta.

**Recomendação prudencial.** Enquanto a revisão estiver aberta:

- preservar a prévia pública sem progresso persistente e sem métricas opcionais por padrão;
- evitar linguagem, divulgação ou mecânicas deliberadamente dirigidas a crianças;
- manter cenários fictícios e avisos para não inserir dados reais;
- oferecer rota clara de saída e canal para responsável relatar conta de menor;
- suspender a conta denunciada sem divulgar sua existência a terceiros e aplicar procedimento documentado de análise/exclusão;
- testar se conteúdo, SEO, anúncios futuros ou divulgação tornam o acesso de menores significativamente provável.

**Revisão jurídica antes da publicação.** Avaliar se o serviço é de “acesso provável”, qual mecanismo de idade é proporcional e quais obrigações do ECA Digital incidem. Se a conclusão exigir garantia mais forte, a coleta adicional só deve nascer depois dessa decisão, com alternativa menos invasiva considerada. O art. 9º proíbe autodeclaração como única aferição para conteúdo impróprio/proibido; aplicar essa proibição específica automaticamente a uma plataforma educacional seria extrapolar a fonte.

## 4. Minimização: o inventário máximo já aprovado

**Requisito confirmado.** Tratar somente dados adequados, pertinentes e não excessivos para a finalidade. A descoberta de uma obrigação não autoriza antecipadamente coleta “para o futuro”. [LGPD, art. 6º, III](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

O ticket 09 já limita a conta a e-mail obrigatório, identificador interno aleatório, nome de exibição opcional, vínculo técnico com o `uid` do Firebase, posição na missão/bloco, estados de missão/competência/apoio, registros finais revisados e datas mínimas de sincronização/segurança. Não foram aprovados CPF, telefone, nascimento, endereço, empresa, cargo, foto, nome completo obrigatório, upload, histórico completo de cliques, conteúdo descartado, respostas brutas, tempo detalhado ou replay de sessão.

**Recomendação prudencial.** Dados técnicos inevitáveis — IP, user-agent, identificador de sessão, erro, mensagem de entrega — entram no inventário apenas se efetivamente observados. O inventário deve ser confirmado por configuração e logs antes da publicação; não se deve acrescentá-los à coleta só para completar uma planilha.

## 5. Cookies e métrica pedagógica opcional

Cookies e tecnologias equivalentes podem identificar ou tornar uma pessoa identificável. O [Guia orientativo da ANPD sobre cookies](https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file) aplica os princípios da LGPD e recomenda transparência, controle efetivo e desenho compatível com a base escolhida.

### Necessários

**Revisão jurídica.** Classificar individualmente os cookies/tokens realmente usados para sessão, autenticação, CSRF, balanceamento ou preferência indispensável e definir a base. O guia admite que legítimo interesse pode ser avaliado para cookies estritamente necessários, mas não concede uma isenção automática a qualquer item chamado “essencial”.

**Recomendação prudencial.** Manter o mínimo, limitar duração, usar `Secure`, `HttpOnly` e `SameSite` quando tecnicamente aplicável, informar nome/categoria/finalidade/duração e não oferecer um botão falso de desligar o que torna a conta impossível. Se existirem apenas itens necessários, ainda deve haver transparência; a forma exata do primeiro aviso deve ser validada no contexto.

### Opcionais e métricas

**Requisito confirmado quando a base for consentimento.** Métricas opcionais ficam desligadas até ação afirmativa; aceitar e recusar devem ter destaque equivalente; não usar caixa pré-marcada, consentimento forçado ou categoria genérica; guardar prova mínima da escolha; permitir revogação gratuita e tão fácil quanto aceitar; cessar coleta futura após revogação; e informar o efeito sobre dados já tratados. O [aviso de privacidade da própria ANPD](https://www.gov.br/anpd/pt-br/acesso-a-informacao/aviso-de-privacidade) exemplifica cookies opcionais desabilitados por padrão e ajustáveis depois.

**Recomendação prudencial.** Criar uma preferência separada “Ajudar a melhorar o aprendizado” e limitar os eventos aos já admitidos no ticket 09: missão iniciada/concluída, etapa de abandono, dica por etapa, erro técnico e conclusão de transferência. Não enviar respostas, registros, e-mail, texto digitado, sequência integral de cliques nem `uid`; usar identificador efêmero/agregado e controlar tamanho mínimo de relatório para reduzir reidentificação.

**Revisão jurídica.** Confirmar se a separação técnica realmente torna a métrica anônima. Pseudonimização ou retirar o e-mail não produz anonimização automaticamente. Definir prazo curto, limiar de agregação, acesso, descarte, prova/revogação e se algum fornecedor recebe os eventos. Se não houver objetivo pedagógico mensurável e responsável, não coletar.

## 6. Firebase Authentication

Firebase Authentication processa, conforme o método, senha, e-mail, IP e user-agent. A página oficial informa que IPs são retidos por algumas semanas; os demais dados de autenticação são mantidos até o cliente excluir o usuário e, depois, removidos dos sistemas ativos e de backup em até 180 dias. O serviço Authentication opera exclusivamente nos Estados Unidos. [Privacidade e segurança no Firebase](https://firebase.google.com/support/privacy).

**Requisito confirmado.** Informar o compartilhamento e a transferência; restringir console e Admin SDK; proteger credenciais; verificar e-mail quando isso for requisito de acesso; oferecer recuperação; registrar acessos administrativos; e coordenar exclusão. Excluir o usuário no Firebase **não exclui** a jornada no PostgreSQL, os e-mails na Resend, logs, cache ou backups. [Administração e exclusão de usuários](https://firebase.google.com/docs/auth/admin/manage-users).

**Recomendação prudencial.** Usar o identificador interno aleatório da aplicação como chave de domínio e manter o `uid` apenas como vínculo técnico; nunca usar e-mail como chave imutável. A portabilidade entregue ao aluno inclui seus dados e jornada em formato legível/reutilizável, não senha, hash, token, segredo ou log administrativo. Exportação administrativa de identidade para troca de fornecedor é um procedimento separado e restrito.

**Revisão jurídica.** Confirmar qual DPA rege o produto Firebase utilizado e qual mecanismo brasileiro cobre a transferência. O [adendo Google Cloud](https://cloud.google.com/terms/data-processing-addendum) contém disposições brasileiras, mas não se deve presumir sem validação contratual que todo Firebase Authentication adquirido sob qualquer termo esteja abrangido por elas.

## 7. Operadores, suboperadores e transferências internacionais

**Requisito confirmado.** Uma base do art. 7º ou 11 não substitui o mecanismo do art. 33. O controlador precisa identificar a transferência, aplicar a LGPD, ter base para o tratamento e usar adequação, cláusulas-padrão contratuais da ANPD, cláusulas específicas aprovadas, normas corporativas globais ou outro mecanismo legal. Finalidade, países, agentes, compartilhamento e mecanismo precisam ser transparentes. O operador deve prestar as informações e o auxílio previstos na cadeia. [LGPD, arts. 33 a 36](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), [Resolução CD/ANPD nº 19/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024).

Contratos que já existiam na publicação da Resolução nº 19 tiveram doze meses para incorporar as cláusulas-padrão quando esse fosse o mecanismo. Cláusulas europeias, referência genérica à LGPD ou criptografia são salvaguardas úteis, mas não demonstram sozinhas um mecanismo brasileiro válido.

| Provedor selecionado | Localização/transferência pública relevante | Verificação obrigatória para o ticket 15 | Classificação |
| --- | --- | --- | --- |
| Firebase Authentication | Serviço exclusivamente nos EUA; suboperadores e suporte conforme termos | DPA aplicável, mecanismo do art. 33, cláusulas brasileiras, suboperadores e canal de direitos | **Revisão jurídica** |
| Cloudflare Free | Rede global; política informa armazenamento principalmente nos EUA e EEE e transferências globais | Produtos habilitados, Customer Logs, países, suboperadores e mecanismo Res. 19 | **Revisão jurídica** |
| Resend Free | DPA e [lista de suboperadores](https://resend.com/legal/subprocessors) mostram cadeia internacional, majoritariamente nos EUA | Se DPA/termos incorporam mecanismo brasileiro; conteúdo mínimo e webhooks | **Revisão jurídica** |
| Backblaze B2 | Regiões publicadas EUA, Canadá e União Europeia; nenhuma região Brasil | Tipo de conta, região, DPA, mecanismo, suboperadores e criptografia antes do envio | **Revisão jurídica** |
| UptimeRobot Free | DPA informa processamento principal na UE e secundário nos EUA/outros locais | Monitor sem dados pessoais, contatos, suboperadores e mecanismo | **Revisão jurídica** |
| Hostinger KVM 1 São Paulo | A VPS pode ficar em São Paulo, mas conta, suporte e suboperadores não ficam necessariamente só no Brasil | Contrato/DPA, suporte, backup, acessos, países e mecanismo para cada transferência | **Revisão jurídica** |

**Recomendação prudencial.** Manter um anexo vivo de fornecedores com serviço, papel, categorias, país, suboperadores, mecanismo, data de revisão e aviso prévio de mudança. Bloquear ativação de novo produto do mesmo fornecedor até avaliar sua cadeia; “já usamos Cloudflare” não aprova automaticamente analytics, R2 ou outro módulo.

## 8. Direitos do aluno e prazos

**Requisito confirmado.** Por canal gratuito e autenticado na medida necessária, o titular pode pedir confirmação, acesso, correção, anonimização/bloqueio/eliminação de dados desnecessários, excessivos ou ilícitos, portabilidade conforme regulamentação, eliminação dos dados tratados com consentimento ressalvadas retenções legais, informação sobre compartilhamentos, informação sobre a possibilidade e consequências de negar consentimento, revogação e oposição quando houver descumprimento em tratamento sem consentimento. [LGPD, art. 18](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), [página da ANPD sobre direitos](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares).

Prazos confirmados nas fontes consultadas:

- confirmação e acesso em formato simplificado: imediatamente;
- declaração completa com origem, inexistência de registro, critérios e finalidade: até 15 dias do requerimento;
- agente de pequeno porte efetivamente elegível: prazo em dobro — até 15 dias para a resposta simplificada e 30 dias para a declaração completa;
- a LGPD não fixa na mesma regra um número universal para todos os demais pedidos do art. 18; o produto deve adotar SLA interno célere e registrar pedido, identidade mínima, decisão e resposta, sem anunciar como “prazo legal” um número não confirmado.

O benefício de pequeno porte não é automático: depende do enquadramento, não pode ser usado por agente de alto risco ou fora dos limites da resolução e não dispensa princípios, bases nem direitos. [Resolução CD/ANPD nº 2/2022, arts. 3º a 5º, 11 e 14](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).

**Requisito confirmado.** Correção, eliminação, anonimização ou bloqueio precisa ser comunicado imediatamente aos agentes com quem os dados foram compartilhados, para repetirem o procedimento, salvo impossibilidade ou esforço desproporcional demonstrado. A resposta não pode afirmar “excluído” se uma parte continua em retenção legítima sem explicar categoria, fundamento, acesso e prazo.

**Recomendação prudencial.** Implementar uma central simples com: dados da conta; nome de exibição corrigível; exportação da jornada em formato documentado; exclusão de registro individual; revogação de métricas; exclusão da conta e jornada; e recibo final. Pedidos excepcionais passam pelo mesmo canal humano, sem obrigar o titular a contatar cada fornecedor.

## 9. Exclusão, retenção e backups

O fim da finalidade normalmente encerra o tratamento. A LGPD permite conservação, entre outras hipóteses, para obrigação legal/regulatória, pesquisa com anonimização quando possível, transferência regular ou uso exclusivo do controlador com anonimização e sem acesso de terceiro. [LGPD, arts. 15 e 16](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm). Isso não cria autorização para guardar tudo indefinidamente.

### Matriz de retenção para decidir no ticket 15

| Conjunto já previsto | Regra acionável proposta | Limite externo conhecido | Classificação |
| --- | --- | --- | --- |
| Conta e progresso | Manter enquanto ativa; aplicar política aprovada de 6 meses sem login, aviso e mais 30 dias; em exclusão voluntária, remover da base ativa sem esperar a inatividade | Firebase pode levar até 180 dias após exclusão para eliminar de sistemas ativos/backups | Política **prudencial**; base e prazo final em **revisão jurídica** |
| Registros finais da aprendizagem | Mostrar e permitir excluir individualmente; eliminar com a jornada, salvo retenção específica demonstrada | Nenhum prazo externo geral identificado | **Requisito confirmado** limitar à finalidade; prazo é decisão de produto/revisão |
| Autodeclaração 18+ | Se mantida, guardar somente versão, resultado e instante pelo período aprovado; nunca data de nascimento inferida | Não prova idade | Necessidade e prazo em **revisão jurídica** |
| Preferência e prova de métrica opcional | Manter versão/estado/data mínimos; revogação interrompe novos eventos; definir destino dos anteriores conforme aviso/base | Consentimento precisa ser demonstrável e revogável | **Requisito confirmado**; prazo exato em **revisão jurídica** |
| Métrica pedagógica | Separar da conta, agregar e descartar eventos brutos em prazo curto aprovado | Nenhum fornecedor de analytics foi aprovado | **Recomendação prudencial**; não coletar antes da decisão |
| Log de acesso à aplicação | Se o art. 15 do Marco Civil alcançar o provedor deste projeto, conservar sob sigilo e segurança por 6 meses | A incidência depende de operação organizada, profissional e com fins econômicos; campos e efeitos de mudanças de 2026 exigem validação | **Revisão jurídica**; [Marco Civil, arts. 13 a 16](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm) |
| Auditoria e segurança | Registrar somente evento, ator técnico, alvo opaco, instante e resultado necessários; acesso restrito; prazo por risco/finalidade | Registros de incidentes, inclusive não comunicados, por no mínimo 5 anos | Desenho **prudencial**; mínimo de incidentes é **requisito confirmado** |
| E-mail transacional | Localmente, guardar só ID, tipo, instante, estado e erro/bounce necessários; sem corpo da jornada | Resend documenta dados do e-mail no painel por 30 dias e DPA prevê exclusão até 90 dias após término da conta | **Recomendação prudencial**; base/prazo local em **revisão jurídica** |
| Monitoramento | Endpoint `/health` com estado constante, sem conta, e-mail, segredo, consulta ou erro detalhado | UptimeRobot Free anuncia histórico de 3 meses; DPA prevê resíduos de backup por até 180 dias após término | **Recomendação prudencial** |
| Backup Hostinger/B2 | Definir janela curta coerente com RPO, defesa e exclusão; cifrar antes do B2; testar expiração e restauração | B2 mantém todas as versões para sempre por padrão; Lifecycle exclui depois; Object Lock pode impedir exclusão. Hostinger publica backups semanais/snapshot conforme plano | Configuração e prazo em **revisão jurídica**; não usar retenção indefinida |

Fontes dos limites: [retenção de e-mail na Resend](https://resend.com/docs/dashboard/webhooks/how-to-store-webhooks-data), [preços/retenção do UptimeRobot](https://uptimerobot.com/pricing/), [Lifecycle do Backblaze B2](https://www.backblaze.com/docs/cloud-storage-lifecycle-rules), [Object Lock do B2](https://www.backblaze.com/docs/cloud-storage/object-lock) e [backup/restauração de VPS na Hostinger](https://www.hostinger.com/br/support/1583232-como-fazer-backup-ou-restaurar-um-servidor-vps-hostinger/).

### Propagação da exclusão

**Recomendação prudencial.** A exclusão deve ser uma operação orquestrada e repetível:

1. autenticar o pedido e bloquear novas gravações;
2. eliminar ou dissociar jornada e registros na base ativa;
3. excluir a identidade no Firebase e dados nos demais sistemas aplicáveis;
4. invalidar sessões, cache e links ativos;
5. registrar apenas recibo técnico mínimo e retenções justificadas, sem copiar conteúdo eliminado;
6. enfileirar nova tentativa se um fornecedor falhar e só confirmar conclusão com o estado real;
7. deixar dados desaparecerem dos backups no prazo documentado;
8. após qualquer restauração, reaplicar a lista mínima de exclusões antes de expor o ambiente, impedindo que contas eliminadas retornem.

Uma marca de supressão também pode ser dado pessoal. Deve usar identificador opaco, acesso restrito, finalidade exclusiva de impedir ressurreição e prazo não maior que a última cópia recuperável. Se a retenção imutável impedir exclusão imediata no backup, o aviso deve distinguir base ativa de cópia isolada, impedir uso normal e informar prazo de expiração. Criptografia não elimina por si só a obrigação de retenção limitada.

## 10. Aviso de privacidade e termos

**Requisito confirmado.** O aviso precisa estar disponível antes da coleta, em PT-BR claro, com versão e data, controlador e contato, dados/finalidades/bases, obrigatoriedade e consequências, fontes, cookies, métricas, fornecedores, países/mecanismos, retenções, direitos/canal, segurança e incidentes. Para possível acesso de menores, a linguagem deve permanecer simples e acessível. Mudanças materiais precisam ser comunicadas conforme seu impacto.

**Recomendação prudencial.** Separar camadas: resumo junto ao cadastro; detalhes no aviso; preferências de cookies/métricas; e termos de uso. Os termos devem explicar 18+, prévia pública, conta individual, conteúdo educacional, conduta, disponibilidade, exclusão e contato. Não esconder tratamento nos termos nem usar o aceite dos termos como consentimento único para todas as finalidades.

**Revisão jurídica.** Validar identidade do fornecedor do serviço, capacidade para contratar, cláusulas de responsabilidade, lei/foro, propriedade intelectual, moderação e consequência de falsa declaração. O gate precisa apontar para termos e aviso efetivamente publicados, não documentos futuros.

## 11. Segurança e incidentes

**Requisito confirmado.** Agentes devem adotar medidas técnicas e administrativas desde a concepção para proteger dados contra acesso não autorizado, destruição, perda, alteração, comunicação ou tratamento inadequado. Sistemas devem atender segurança, boas práticas, governança e princípios. [LGPD, arts. 46 a 50](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

Pela Resolução CD/ANPD nº 15/2024, o controlador comunica à ANPD e aos titulares incidente que possa causar risco ou dano relevante em **3 dias úteis** a partir do conhecimento. Se não houver todas as informações, pode haver comunicação preliminar e complementação fundamentada em até **20 dias úteis**. Agente de pequeno porte elegível tem prazo em dobro. O controlador conserva o registro do incidente por ao menos **5 anos**; o operador deve fornecer sem demora as informações necessárias. [Página e regulamento oficial de comunicação de incidentes](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis).

**Recomendação prudencial.** Antes de produção: MFA para administração; menor privilégio; segredos fora do repositório; criptografia em trânsito e backup; patches; inventário de acesso; alertas sem dados; testes de recuperação e exclusão; plano com contatos do controlador/operadores; classificação de risco; modelo de comunicação; preservação de evidência; e simulação. O contrato deve obrigar fornecedor/operador a avisar rapidamente, porque seu prazo contratual não pode tornar impossível o prazo do controlador.

## 12. Decisões automatizadas e perfil

O recorte aprovado não inclui publicidade, perfil comercial, score, decisão de acesso baseada em perfil nem decisão unicamente automatizada que produza efeitos sobre interesses do aluno. Dicas e estados pedagógicos ainda devem ser explicáveis e não discriminatórios.

**Requisito confirmado se o desenho mudar.** O titular tem direito à revisão de decisão tomada unicamente com base em tratamento automatizado que afete seus interesses, inclusive decisões destinadas a definir perfil pessoal, profissional, de consumo, crédito ou personalidade. O controlador deve fornecer informações claras sobre critérios e procedimentos, ressalvados segredos comercial e industrial, e a ANPD pode auditar aspectos discriminatórios. [LGPD, art. 20](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).

**Recomendação prudencial.** Documentar no ticket 15 que métricas não alteram acesso, nota, certificado, ordem de atendimento ou visibilidade. Qualquer personalização futura deve voltar à análise de base, transparência, risco, explicação e melhor interesse caso menores possam acessar.

## 13. Encarregado, canal, registros e RIPD

**Requisito confirmado.** A LGPD prevê indicação de encarregado e divulgação pública, clara e objetiva de sua identidade e contato. A Resolução nº 2 dispensa agente de pequeno porte elegível de indicar encarregado, mas exige canal para comunicações do titular e considera a indicação boa prática. A dispensa não vale por mera autodeclaração de “projeto pequeno”. [LGPD, art. 41](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), [Resolução CD/ANPD nº 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).

**Revisão jurídica.** Confirmar se o controlador é pessoa natural ou jurídica, se atua com fins econômicos, se se enquadra como pequeno agente e se realiza tratamento de alto risco. A Resolução nº 2 combina ao menos um critério geral — larga escala ou impacto significativo — com um específico, como tecnologia emergente, vigilância pública, decisão unicamente automatizada ou dados sensíveis/de crianças/adolescentes. Acesso real de menores pode alterar essa análise.

**Requisito confirmado.** Mesmo com dispensa de encarregado, publicar canal funcional e manter registros simplificados ou completos conforme o enquadramento. O [modelo simplificado da ANPD](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-publica-modelo-de-registro-simplificado-de-operacoes-de-tratamento-para-agentes-de-tratamento-de-pequeno-porte) pode apoiar pequenos agentes, sem dispensar o inventário.

O RIPD descreve dados, metodologia, segurança, riscos e salvaguardas. A ANPD pode exigi-lo, e sua orientação recomenda elaborá-lo em operações de alto risco e atualizá-lo quando o tratamento mudar. [Orientação oficial sobre RIPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd).

**Recomendação prudencial.** Fazer agora triagem documentada de risco. Elaborar RIPD antes de produção se a conta aceitar de fato menores, usar aferição de idade mais invasiva, tratar dados não essenciais de menores, adotar perfil/decisão automatizada ou se a combinação de escala e impacto se tornar alta. O ECA Digital também torna especialmente relevante mapear riscos de tratamento de dados de menores, aplicar mitigação e manter avaliação disponível à autoridade quando cabível.

## 14. Matriz de decisão para encerrar o ticket 15

| Decisão | Aceite objetivo antes da publicação | Categoria |
| --- | --- | --- |
| Controlador e canal | Nome legal, contato público, responsável por pedidos e incidente definidos; enquadramento de pequeno porte documentado, não presumido | **Revisão jurídica** + **requisito confirmado** |
| Inventário e bases | Cada dado já aprovado ligado a finalidade, base, origem, destinatário, país, retenção e exclusão; nenhum campo novo “preventivo” | **Requisito confirmado** |
| Público e maioridade | Regra 18+ nos termos e cadastro; gate descrito como autodeclaração, não verificação; análise registrada de acesso provável e mecanismo proporcional | **Revisão jurídica** |
| Menor identificado | Fluxo testado de denúncia, bloqueio, análise, contato apropriado e exclusão; página pública continua sem progresso persistente | **Recomendação prudencial** apoiada em requisitos de melhor interesse |
| Cookies necessários | Inventário real obtido da aplicação; finalidade/base/duração documentadas; segurança e informação testadas | **Requisito confirmado**; base em **revisão jurídica** |
| Métrica opcional | Desligada por padrão; aceitar/recusar equivalentes; granular, separada da conta, sem conteúdo/e-mail/`uid`; revogação e descarte testados | **Requisito confirmado** se consentimento + **recomendação prudencial** |
| Firebase | E-mail/senha, verificação/recuperação, acesso administrativo, exportação técnica e exclusão coordenada validados com contas fictícias | **Recomendação prudencial**; contrato/transferência em **revisão jurídica** |
| Fornecedores | DPA/termos salvos por versão; papéis, suboperadores, países, avisos de mudança, apoio a direitos e incidentes registrados | **Requisito confirmado** |
| Transferência internacional | Para cada fluxo, base dos arts. 7º/11 e mecanismo do art. 33 demonstrados; cláusulas da Res. 19 incorporadas quando esse for o mecanismo | **Requisito confirmado** e **revisão jurídica** |
| Direitos | Confirmação, acesso, correção, exportação, revogação, oposição e exclusão testados de ponta a ponta; resposta simplificada/completa respeita prazo aplicável | **Requisito confirmado** |
| Retenção | Tabela aprovada para conta/progresso, registros, gate, preferências, logs, e-mail, monitor e backups; dono e rotina de descarte definidos | **Requisito confirmado** limitar; prazos em **revisão jurídica** |
| Exclusão/restauração | Pedido orquestra PostgreSQL, Firebase e demais sistemas; falha gera nova tentativa; backup expira; restauração reaplica exclusões antes de servir tráfego | **Recomendação prudencial** necessária à promessa do produto |
| Aviso e termos | Documentos PT-BR publicados, versionados e coerentes com configuração real; resumo disponível antes do cadastro | **Requisito confirmado** + **revisão jurídica** dos termos |
| Segurança/incidente | Controles mínimos implantados; contatos e runbook; operador avisa sem demora; relógio de 3 dias úteis, complementação e registro de 5 anos testados | **Requisito confirmado** |
| Perfil/automação | Registro explícito de que não há decisão automatizada que afete interesses nem perfil comercial; mudança futura reabre avaliação | **Recomendação prudencial**; art. 20 se aplicável |
| RIPD e registros | Registro de operações preenchido; triagem de alto risco assinada; RIPD produzido se risco, autoridade ou revisão jurídica indicar | **Requisito confirmado** para registros; RIPD conforme risco/exigência |

## Conclusão condicionada

É possível preservar o desenho de baixa coleta do ticket 09 e a arquitetura do ticket 14 sem introduzir nascimento, documento ou biometria agora. O gate 18+ permanece uma regra de produto de baixa garantia, não prova de idade. A publicação da Conta do Aluno deve continuar bloqueada até o ticket 15 converter a matriz acima em decisões verificáveis e uma revisão jurídica brasileira resolver, no mínimo: responsável/controlador e pequeno porte; incidência e aferição proporcional sob o ECA Digital; bases por finalidade; aplicação do Marco Civil aos logs; contratos e mecanismo da Resolução nº 19 para cada transferência; e prazos finais de retenção.

Isso reduz risco e torna as promessas testáveis, mas **não autoriza declarar conformidade com a LGPD, o ECA Digital ou qualquer contrato de fornecedor**.
