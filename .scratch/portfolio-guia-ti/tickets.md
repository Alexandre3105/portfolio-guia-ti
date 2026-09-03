# Tickets: MVP MANSK

Triage: ready-for-agent

Estes tickets constroem as Jornadas Profissional e de Aprendizagem do MVP MANSK a partir da [especificação aprovada](PRD.md).

Trabalhe sempre a **fronteira**: qualquer ticket cujos bloqueadores estejam concluídos. A fronteira inicial contém somente **Entregar a fundação executável da MANSK**. Cada ticket deve ser implementado com TDD e encerrado com evidência dos critérios abaixo.

## Regra de aprendizado e autorização das integrações

As plataformas serão explicadas e configuradas somente quando o ticket correspondente chegar à fronteira. Antes da primeira alteração em uma plataforma externa, o responsável deve receber uma explicação objetiva sobre:

1. o que a plataforma faz no MANSK e por que foi escolhida;
2. quais dados recebe, onde entra no fluxo e quais riscos introduz;
3. preço, franquias, limites e excedentes confirmados em fontes oficiais naquele momento;
4. qual conta, domínio, credencial ou ação humana será necessária;
5. como testar, monitorar, revogar acesso, exportar dados ou substituir o fornecedor;
6. quais partes podem ser desenvolvidas primeiro com emulador, ambiente local ou double controlado.

Pesquisa e preparação local não autorizam cadastro, compra, contratação, mudança de DNS, criação de credencial, envio real ou implantação. Nunca registrar segredos no chat, no repositório, nos tickets ou em capturas. Quando uma ação externa se tornar necessária, pausar o ticket, explicar o passo e solicitar autorização explícita.

## Mapa das plataformas externas

| Plataforma                                         | Papel no MANSK                                                             | Primeiro ticket | Dados ou acesso envolvidos                                                                                | Checkpoint do responsável                                                                                               |
| -------------------------------------------------- | -------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| GitHub, GitHub Actions e GitHub Container Registry | Repositório público, CI e armazenamento da imagem imutável                 | 01 e 22         | Código, histórico, resultados de testes, imagem e metadados de build; segredos somente quando necessários | Entender o workflow, permissões do pacote, proteção dos segredos e custos/limites antes de publicar a primeira imagem   |
| WhatsApp                                           | Destino do Contato de Projeto por link com mensagem preparada no navegador | 03              | Número público e texto que o próprio visitante decide enviar                                              | Revisar o número e a mensagem; não contratar API nem persistir o contato no site                                        |
| LinkedIn                                           | Link externo da Trajetória profissional                                    | 03              | Apenas a URL pública revisada                                                                             | Confirmar o perfil que será divulgado; não haverá integração por API                                                    |
| Firebase Authentication                            | Cadastro, login, verificação e recuperação da Conta do Aluno               | 05              | E-mail, identificador de autenticação e eventos técnicos de segurança                                     | Entender projeto, franquia, mensagens de autenticação, exportação e configuração antes de criar credenciais de produção |
| Resend                                             | E-mails transacionais da aplicação                                         | 10              | E-mail do destinatário e metadados mínimos de entrega                                                     | Entender verificação de domínio, limites, reputação, supressões e API key antes do primeiro envio real                  |
| Provedor de domínio                                | Registro do domínio público da MANSK                                       | 23 e 24         | Dados cadastrais do titular e delegação de DNS                                                            | Escolher o provedor e aprovar compra/renovação; nenhum registrador foi fixado ainda                                     |
| Hostinger VPS                                      | Servidor candidato para aplicação, banco, painel e mídia pequena           | 23 e 24         | Aplicação, conteúdo, Estado de Aprendizagem, registros mínimos e logs operacionais                        | Verificar a KVM 1 somente após a revalidação do orçamento; aprovar contratação e acesso antes do provisionamento        |
| Cloudflare                                         | DNS, proxy e camada pública TLS                                            | 24              | Zona DNS e metadados técnicos das requisições                                                             | Entender nameservers, modo Full (strict), certificado de origem e tokens antes de alterar DNS                           |
| Backblaze B2                                       | Cópia externa dos backups cifrados                                         | 24              | Objetos já cifrados e metadados mínimos de armazenamento                                                  | Entender bucket, chaves restritas, lifecycle, restauração e cobrança antes de criar o armazenamento                     |
| UptimeRobot                                        | Monitoramento externo da rota de saúde                                     | 24              | URL pública, disponibilidade, latência e contato de alerta                                                | Definir contato e limites do plano antes de ativar monitores reais                                                      |

Next.js, TypeScript, Payload CMS, PostgreSQL, Docker e Caddy são componentes executados pelo próprio projeto, não novas plataformas SaaS obrigatórias. Eles também serão explicados no ticket em que entrarem. Railway, Render, Vercel, Sanity, Clerk, Auth0, HostGator compartilhada, WhatsApp Business API, SMS e analytics opcionais não fazem parte da arquitetura aprovada do MVP.

## 01 — Entregar a fundação executável da MANSK

**What to build:** uma aplicação MANSK executável e verificável localmente, atravessando interface pública, aplicação, Payload CMS e PostgreSQL, com a base de qualidade necessária para que as próximas entregas permaneçam verdes.

**Blocked by:** None — can start immediately.

- [x] A aplicação Next.js com TypeScript abre uma página pública identificada como MANSK e possui uma rota de saúde sem dados pessoais.
- [x] Payload CMS e PostgreSQL iniciam com a aplicação em um ambiente Docker local documentado, sem expor o banco em porta pública na configuração equivalente à produção.
- [x] Segredos e configurações locais usam variáveis de ambiente e exemplos sem credenciais reais versionadas.
- [x] O projeto oferece comandos reproduzíveis para desenvolvimento, lint, tipos, testes e build.
- [x] O CI executa lint, tipos, testes automatizados iniciais e build, bloqueando uma mudança inválida.
- [x] Existe ao menos um teste pelo seam web principal que comprova a abertura da página e da rota de saúde.
- [x] O README reflete a fase de implementação, a stack escolhida e a ausência de licença pública, sem criar arquivo `LICENSE`.

## 02 — Entregar a Entrada Orientada e a navegação-base

**What to build:** a entrada pública que apresenta as duas intenções do visitante e permite navegar entre portfólio e formação com textos, marca e comportamento já aprovados.

**Blocked by:** Entregar a fundação executável da MANSK.

- [x] A raiz apresenta **“Tenho um problema ou projeto.”** e **“Quero aprender a resolver problemas de tecnologia.”** com contexto suficiente para diferenciá-las.
- [x] A marca visual é **MANSK**, acompanhada por **Alexandre Blank Lopes**, sem sugerir empresa ou equipe inexistente.
- [x] A navegação pública contém Projetos, Formação, Trajetória e Entrar e funciona com histórico e URLs compartilháveis.
- [x] Um usuário autenticado que visite a raiz continua vendo a Entrada Orientada e não é redirecionado automaticamente.
- [x] A experiência funciona por teclado, possui foco visível e não oculta a navegação em largura móvel.
- [x] Testes pelo navegador cobrem as duas escolhas em desktop e celular sem rolagem horizontal indevida.

## 03 — Publicar a Jornada Profissional e o Contato de Projeto

**What to build:** a Jornada Profissional pública completa, baseada em evidências e capaz de conduzir um possível cliente até uma mensagem revisável de descoberta no WhatsApp sem armazená-la no site.

**Blocked by:** Entregar a Entrada Orientada e a navegação-base.

- [x] A página segue Entrada Orientada → Casos de Projeto → Como posso ajudar → Trajetória → Conte seu problema.
- [x] A promessa, o posicionamento e as ofertas de operações e dados usam os textos e limites aprovados na especificação.
- [x] Os casos AcompanhaPET, dashboard comercial anônimo, implantação anônima em academia e portfolio-guia-ti apresentam problema, participação, solução, resultado e limites.
- [x] AcompanhaPET explicita NB Petshop, colaboração do irmão e Desenvolvimento Assistido por IA sem publicar valores, documentos, credenciais, nome pessoal da proprietária ou telas identificáveis.
- [x] Os casos relacionados a dashboard, academia, organização contratante e seus produtos permanecem anônimos; machine learning aparece somente como conhecimento em desenvolvimento.
- [x] **Conte seu problema** permite revisar a mensagem no navegador e só então abre o WhatsApp, sem enviar ou persistir o texto no site.
- [x] Trajetória aponta para o LinkedIn e não oferece o currículo PDF bruto.
- [x] Testes cobrem navegação dos casos, sanitização do conteúdo configurado e ausência de requisição de persistência ao preparar o contato.

## 04 — Publicar a primeira Ficha da Missão do painel à Prévia Pública

**What to build:** o primeiro tracer bullet editorial no qual o responsável salva uma Ficha da Missão, corrige pendências, confirma a revisão, publica uma versão e o visitante realiza um Microdesafio na Prévia Pública.

**Blocked by:** Entregar a fundação executável da MANSK; Entregar a Entrada Orientada e a navegação-base.

- [x] A autenticação administrativa do Payload é separada da futura Conta do Aluno.
- [x] A Ficha da Missão representa identificação, objetivo, competências, cenário, blocos, interações, verificação, fontes, autoria, revisão e versão.
- [x] Rascunhos incompletos podem ser salvos sem ficarem públicos.
- [x] A validação impede publicação com campo obrigatório ausente, referência inválida, interação sem retorno, encerramento sem critério ou falta de confirmação humana.
- [x] A Prévia Editorial permite revisar a experiência antes da publicação, sem ser confundida com a Prévia Pública.
- [x] Uma versão publicada aparece na apresentação pública da formação e alimenta um Microdesafio demonstrativo sem identidade ou progresso persistido.
- [x] O painel não oferece acesso a respostas ou Registros de Atendimento de alunos.
- [x] Testes cobrem rascunho, bloqueios de publicação, confirmação humana, publicação e consumo público da mesma versão.

## 05 — Criar a Conta do Aluno e o primeiro acesso

**What to build:** cadastro e entrada privados com Firebase Authentication, coleta mínima e chegada consciente a Minha jornada para alunos novos e retornando.

**Blocked by:** Publicar a primeira Ficha da Missão do painel à Prévia Pública.

- [ ] O visitante conhece a formação e a Prévia Pública antes de ser convidado a criar conta.
- [ ] O cadastro usa e-mail e senha do Firebase e exige autodeclaração clara de 18 anos ou mais sem alegar idade verificada.
- [ ] A aplicação verifica o token no servidor antes de qualquer leitura ou escrita privada e associa a identidade externa a um identificador interno aleatório.
- [ ] Somente e-mail e nome de exibição opcional compõem a identidade do produto; CPF, telefone, nascimento, endereço, empresa, cargo, foto e nome completo obrigatório não são solicitados.
- [ ] Conta nova chega a Minha jornada com apresentação breve e primeira missão não iniciada; conta existente vê sua rota de continuação.
- [ ] Acesso anônimo à missão completa e a dados de outra conta é negado sem vazar informações.
- [ ] SMS, login social e armazenamento próprio de senhas não são introduzidos.
- [ ] Testes usam emulador ou double controlado e cobrem cadastro, login, logout, sessão inválida, primeiro acesso e retorno.

## 06 — Percorrer uma Missão de Suporte completa

**What to build:** uma Missão de Suporte completa, publicada pelo painel e percorrida por um aluno autenticado do relato inicial ao Debriefing da Missão.

**Blocked by:** Publicar a primeira Ficha da Missão do painel à Prévia Pública; Criar a Conta do Aluno e o primeiro acesso.

- [ ] A missão apresenta objetivo, conceito essencial, Microdesafio, caso demonstrado, Conversa Investigativa, Caso de Transferência, Registro de Atendimento e debriefing em blocos pausáveis.
- [ ] Perguntas ao cliente fictício e Testes Simulados revelam evidências consistentes sem contato, comando, dispositivo ou dado real.
- [ ] Diferentes Caminhos de Investigação podem sustentar uma conclusão e não é necessário clicar em todas as opções.
- [ ] O aluno pode concluir cedo, receber Feedback Acionável sobre a lacuna e retomar sem ter toda a solução revelada.
- [ ] A Barreira de Segurança interrompe ação proibida antes do efeito, explica o limite e solicita alternativa segura.
- [ ] Dicas graduais são solicitadas sem pontos ou punição e atualizam somente o Nível de Apoio aplicável.
- [ ] O Caso de Transferência usa contexto diferente e mantém dicas específicas fechadas por padrão.
- [ ] O Registro de Atendimento e o debriefing distinguem segurança, evidência, condução e comunicação; texto livre não é julgado por IA.
- [ ] O estado persistido não inclui histórico completo de cliques, erros, tempo, conversa ou rascunhos.
- [ ] Testes pelo seam principal percorrem caminho válido alternativo, conclusão prematura, ajuda, barreira, transferência, registro e nova tentativa.

## 07 — Retomar a missão e demonstrar competência

**What to build:** Minha jornada como ponto de retomada e leitura multidimensional do progresso, distinguindo conteúdo percorrido de competência demonstrada.

**Blocked by:** Percorrer uma Missão de Suporte completa.

- [ ] Minha jornada mostra missão e bloco atuais, estados das missões e competências, Nível de Apoio e a próxima ação.
- [ ] Missão usa Não iniciada, Em andamento e Percorrida; competência usa Não verificada, Em desenvolvimento e Demonstrada.
- [ ] Percorrer uma missão libera a próxima sem declarar automaticamente a competência como demonstrada.
- [ ] Uma demonstração válida depende do Caso de Transferência e dos critérios de segurança, evidência, condução e comunicação.
- [ ] O aluno pode fechar, entrar em outro dispositivo e retomar pelo bloco correto sem abertura automática no meio da atividade.
- [ ] Referências e Conta são acessíveis na navegação privada, com Voltar ao portfólio visível e sem CTA comercial durante a missão.
- [ ] Registros de Atendimento armazenam somente versões finais revisadas relevantes.
- [ ] Testes cobrem aluno novo, aluno retornando, retomada entre sessões, ajuda usada e distinção entre missão e competência.

## 08 — Dar ao aluno controle dos próprios dados

**What to build:** uma área Conta que permita ao titular compreender, corrigir, exportar e excluir os dados mínimos de sua jornada sem depender de leitura administrativa de respostas.

**Blocked by:** Retomar a missão e demonstrar competência.

- [ ] O aluno visualiza identidade mínima, Estado de Aprendizagem e Registros de Atendimento armazenados.
- [ ] O nome de exibição opcional pode ser corrigido sem alterar o identificador interno ou exigir novos dados.
- [ ] A Portabilidade da Jornada produz formato legível e reutilizável com estados e registros finais do próprio titular.
- [ ] Um Registro de Atendimento pode ser excluído individualmente e deixa de aparecer em consultas e exportações posteriores.
- [ ] A exclusão da conta remove identidade e jornada em PostgreSQL e Firebase de forma idempotente, com confirmação clara do resultado.
- [ ] Falha parcial de fornecedor não produz confirmação falsa e permite retomada segura do pedido.
- [ ] Uma conta nunca consegue visualizar, exportar, modificar ou excluir dados de outra.
- [ ] Testes de autorização e integração cobrem os fluxos normais, incompletos, repetidos e entre contas.

## 09 — Versionar, retirar e corrigir Missões

**What to build:** o ciclo editorial completo que mantém tentativas seguras em versões estáveis, retira conteúdo comum e suspende Correções Críticas com revalidação apenas da evidência afetada.

**Blocked by:** Percorrer uma Missão de Suporte completa; Retomar a missão e demonstrar competência.

- [ ] Tentativa iniciada permanece vinculada à Versão da Missão usada no início.
- [ ] Atualização comum direciona novas tentativas à nova versão e permite concluir tentativa segura já iniciada sem apagar evidências válidas.
- [ ] Retirada comum impede novos inícios e permite finalizar tentativa ainda segura; a única cobertura de competência obrigatória exige substituta revisada.
- [ ] Mudança de objetivo ou critério publica versão identificável, registra equivalências revisadas e solicita somente a complementação necessária.
- [ ] Correção Crítica suspende imediatamente novos inícios e continuidade na versão insegura, antes da publicação da correção.
- [ ] Evidência comprometida recebe Revisão necessária; conclusão anterior aparece como Concluída anteriormente — revisão pendente.
- [ ] Nova demonstração válida remove somente a pendência correspondente e preserva as demais conquistas.
- [ ] O painel exige revisão humana para publicar equivalência, substituta ou correção e emite evento para avisar alunos afetados.
- [ ] Testes cobrem atualização, retirada, complementação, suspensão ativa e revalidação sem criar histórico completo de respostas.

## 10 — Enviar avisos críticos e expirar contas inativas

**What to build:** notificações transacionais confiáveis para Correções Críticas, confirmações e ciclo de inatividade, usando e-mail e o estado dentro de Minha jornada.

**Blocked by:** Dar ao aluno controle dos próprios dados; Versionar, retirar e corrigir Missões.

- [ ] Resend envia avisos da aplicação e Firebase permanece responsável somente por mensagens de autenticação.
- [ ] Uma outbox persistente processa mensagens com idempotência, retentativas e estado observável sem duplicar comunicações.
- [ ] Webhooks assinados são validados e eventos repetidos são deduplicados; bounce, complaint e suppression impedem novas tentativas indevidas.
- [ ] E-mails não contêm respostas, Registros de Atendimento ou progresso detalhado e apontam para o estado autenticado em Minha jornada.
- [ ] Após 6 meses sem login, o aluno recebe aviso e possui 30 dias para retornar ou exportar; novo login cancela a exclusão pendente.
- [ ] Sem retorno, a exclusão coordenada é iniciada e não produz falsa confirmação quando algum passo falha.
- [ ] WhatsApp e SMS não são usados para notificações operacionais do aluno.
- [ ] Testes controlam o relógio e cobrem aviso, retorno, expiração, duplicidade, falha transitória e supressão.

## 11 — Fechar privacidade, retenção e isolamento administrativo

**What to build:** o contrato público e técnico de privacidade do MVP, com tratamento mínimo, retenções executáveis e separação comprovada entre gestão editorial e respostas privadas.

**Blocked by:** Dar ao aluno controle dos próprios dados; Enviar avisos críticos e expirar contas inativas.

- [ ] Aviso de privacidade e termos simples em PT-BR descrevem a PJ controladora, autodeclaração 18+, finalidades, direitos, retenções e fornecedores sem alegar conformidade certificada.
- [ ] Dados legais são fornecidos por canal seguro antes da produção e o site publica um endereço funcional `privacidade@<domínio-da-mansk>` monitorado pela PJ.
- [ ] O inventário relaciona finalidade, dado, base, fornecedor, país, retenção e exclusão; recurso sem fundamento, contrato ou comportamento comprovado permanece desligado.
- [ ] O administrador editorial não possui rota, consulta ou interface para respostas e Registros de Atendimento individuais.
- [ ] Métricas Pedagógicas opcionais permanecem desligadas no lançamento e não existe publicidade, replay, mapa de calor, perfil comercial ou rastreamento entre sites.
- [ ] Logs comuns expiram em 30 dias; auditorias administrativas e pedidos em 6 meses; incidentes específicos em 5 anos; nenhum log recebe texto do aluno, resposta, senha ou token.
- [ ] Um registro mínimo de exclusões permite impedir reintrodução indevida de dados por restauração, sem armazenar conteúdo pedagógico apagado.
- [ ] Checklist de fontes oficiais e dúvidas jurídicas materiais ficam registrados; somente questões materiais sem resposta exigem consulta pontual.
- [ ] Testes comprovam isolamento administrativo, expiração, ausência de conteúdo proibido em logs e recursos opcionais desligados.

## 12 — Publicar o mapa curricular e a cobertura das competências

**What to build:** a visão pública dos oito módulos e uma matriz editorial que comprove onde cada competência é ensinada, praticada e demonstrada.

**Blocked by:** Publicar a primeira Ficha da Missão do painel à Prévia Pública; Percorrer uma Missão de Suporte completa.

- [ ] A apresentação pública exibe os oito módulos na sequência aprovada e explica o uso básico de computador e internet como único pré-requisito.
- [ ] O painel relaciona as áreas e capacidades obrigatórias a missões, objetivos observáveis e evidências de ensino, prática e Caso de Transferência.
- [ ] Uma mesma evidência só cobre mais de um critério quando a relação estiver explícita e revisada.
- [ ] Lacuna de competência obrigatória é visível ao responsável e impede declarar a formação completa.
- [ ] O modelo não exige quantidade igual de missões por módulo nem fixa carga horária arbitrária.
- [ ] Segurança, raciocínio, comunicação, reversão, validação e Escalonamento Responsável aparecem como competências transversais.
- [ ] Fontes, atribuição, data de revisão e próxima revisão editorial ficam rastreáveis por missão.
- [ ] Testes cobrem apresentação pública, matriz completa/incompleta e bloqueio da declaração de cobertura.

## 13 — Concluir Atender e investigar

**What to build:** o primeiro módulo completo, ensinando o aluno a receber um relato, investigar por evidências, respeitar autorização e produzir um Registro de Atendimento útil.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões publicadas cobrem postura, comunicação, contexto, frequência, impacto, fatos, hipóteses, autorização e documentação.
- [ ] Cada objetivo obrigatório é ensinado, praticado e demonstrado em situação diferente no Caso de Transferência.
- [ ] Cenários são fictícios, sanitizados e independentes de empresa, marca ou sistema específico.
- [ ] Caminhos e alternativas não entregam a conclusão pelo tom nem escondem limites de segurança.
- [ ] Fontes, autoria e revisão humana estão registradas; conteúdo essencial permanece dentro das missões.
- [ ] A matriz curricular não apresenta lacuna para o módulo e os testes percorrem ao menos um caminho alternativo e um escalonamento válido.

## 14 — Concluir Computadores e periféricos

**What to build:** o módulo completo de componentes, energia e diagnóstico seguro de dispositivos locais, transferindo o método de investigação para problemas físicos comuns.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões cobrem componentes, energia, conexões, periféricos, observações locais e validação com o usuário dentro da autonomia nível 1.
- [ ] Testes e ações simulados são seguros, reversíveis e autorizados e deixam claro quando preservar evidência ou escalar.
- [ ] Ensino, prática e Caso de Transferência cobrem todos os objetivos publicados na matriz.
- [ ] Cenários não pedem abertura perigosa de equipamento, acesso real ou alteração irreversível.
- [ ] Linguagem, fontes, autoria, acessibilidade e revisão humana atendem à Ficha da Missão.
- [ ] Testes percorrem resolução autorizada e caminho que exige Escalonamento Responsável.

## 15 — Concluir Sistemas operacionais e ferramentas

**What to build:** o módulo completo de arquivos, processos, serviços, atualizações, terminal e logs, ensinados como ferramentas de evidência e não como listas de comandos.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões cobrem arquivos, processos, serviços, atualizações e leitura gradual de logs em sistemas operacionais.
- [ ] Comandos e saídas são Testes Simulados explicados em contexto, com limites da evidência e variações de sistema operacional.
- [ ] O aluno pratica preservar evidências, evitar comandos destrutivos e reconhecer ações que exigem autorização superior.
- [ ] Ensino, prática e Caso de Transferência cobrem todos os objetivos publicados na matriz.
- [ ] Fontes oficiais, autoria, revisão humana, linguagem simples e alternativas acessíveis estão registradas.
- [ ] Testes cobrem interpretação correta, extrapolação indevida e Barreira de Segurança.

## 16 — Concluir Redes e conectividade

**What to build:** o módulo completo de IP, Wi-Fi, DNS, gateway e acesso à internet, organizado por hipóteses e evidências transferíveis.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões ensinam a separar nome, endereço e rota, interpretar prefixos, identificar próximo salto e distinguir DNS de conectividade.
- [ ] A investigação progride por configuração, endereço, resolução e serviço sem transformar uma sequência de comandos em gabarito universal.
- [ ] Resultados fictícios de Windows e Linux explicam o que cada evidência prova e o que não prova.
- [ ] Ensino, prática e Caso de Transferência cobrem todos os objetivos publicados na matriz.
- [ ] Cenários não acessam roteadores, credenciais, equipamentos ou redes reais e incluem limites de autorização.
- [ ] Fontes primárias, autoria, revisão humana e alternativas acessíveis estão registradas.
- [ ] Testes cobrem caminhos alternativos, diagnóstico incorreto de DNS e escalonamento fundamentado.

## 17 — Concluir Sistemas web, contas e integrações

**What to build:** o módulo completo que ensina a delimitar falhas em aplicações SaaS, contas, permissões e dependências conceituais entre sistemas.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões cobrem navegador, serviço, conta, permissão e integração como hipóteses distintas.
- [ ] O aluno pratica delimitar abrangência, validar o serviço e reconhecer quando a solução depende de outra equipe ou de desenvolvimento.
- [ ] Alterar permissões, cadastros, usuários ou dados sensíveis sem processo autorizado aciona Barreira de Segurança.
- [ ] Ensino, prática e Caso de Transferência cobrem todos os objetivos publicados na matriz.
- [ ] Cenários usam sistemas e identidades fictícios, sem reproduzir clientes ou produtos internos.
- [ ] Fontes, autoria, revisão humana e linguagem acessível estão registradas.
- [ ] Testes cobrem falha local, indisponibilidade ampla, restrição de acesso e integração escalada.

## 18 — Concluir Segurança, privacidade e recuperação

**What to build:** o módulo completo que prepara o aluno para reconhecer riscos, proteger dados e agir com segurança em golpes, malware, backup e recuperação.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões cobrem proteção de dados, engenharia social, malware, backup, recuperação e preservação de evidências dentro da autonomia autorizada.
- [ ] A dificuldade não solicita execução de conteúdo malicioso, coleta de credencial, exposição de dados ou simulação de dano real.
- [ ] Condutas de alto risco são interrompidas antes do efeito e encaminhadas com contexto suficiente.
- [ ] Ensino, prática e Caso de Transferência cobrem todos os objetivos publicados na matriz.
- [ ] Fontes oficiais, autoria, revisão humana, linguagem simples e alternativas acessíveis estão registradas.
- [ ] Testes cobrem identificação de risco, resposta segura, recuperação autorizada e escalonamento de incidente.

## 19 — Concluir Dispositivos conectados

**What to build:** o módulo completo que transfere fundamentos de energia, rede, conta e integração para equipamentos conectados sem ensinar procedimentos de uma marca.

**Blocked by:** Percorrer uma Missão de Suporte completa; Publicar o mapa curricular e a cobertura das competências.

- [ ] As missões ensinam a delimitar dispositivo, alimentação, conectividade, serviço e integração como camadas investigáveis.
- [ ] O aluno pratica consultar e avaliar documentação externa sem tratar manual de fabricante como fundamento universal.
- [ ] Fabricantes, empregadores, clientes e sistemas particulares não aparecem como treinamento operacional específico.
- [ ] Ensino, prática e Caso de Transferência cobrem todos os objetivos publicados na matriz.
- [ ] Cenários não acessam catracas, leitores, credenciais, dados ou ambientes reais.
- [ ] Fontes, autoria, revisão humana e alternativas acessíveis estão registradas.
- [ ] Testes cobrem resolução segura, documentação insuficiente e encaminhamento com evidências.

## 20 — Concluir o Desafio final de atendimento

**What to build:** um turno fictício de suporte que reúne as competências da formação e só reconhece a Conclusão da Formação quando todas as evidências obrigatórias permanecem válidas.

**Blocked by:** Concluir Atender e investigar; Concluir Computadores e periféricos; Concluir Sistemas operacionais e ferramentas; Concluir Redes e conectividade; Concluir Sistemas web, contas e integrações; Concluir Segurança, privacidade e recuperação; Concluir Dispositivos conectados.

- [ ] O desafio apresenta chamados variados com informação inicialmente incompleta e exige resolução segura ou Escalonamento Responsável.
- [ ] O aluno distingue relato, fato, hipótese, evidência, teste e conclusão e comunica para usuário e equipe técnica.
- [ ] A avaliação considera segurança, evidência, condução e comunicação, não velocidade ou caminho único.
- [ ] Exposição de dados, mudança não autorizada ou conclusão sem evidência impede a demonstração naquela tentativa sem impedir nova tentativa.
- [ ] A Conclusão da Formação exige todas as competências obrigatórias e o desafio final demonstrados e sem revalidação pendente.
- [ ] O produto não emite certificado nem apresenta a conclusão como habilitação profissional definitiva.
- [ ] A matriz confirma cobertura completa e revisão humana de todas as missões usadas.
- [ ] Testes cobrem conclusão válida, competência pendente, Correção Crítica pendente e nova tentativa.

## 21 — Validar acessibilidade e experiência multidispositivo

**What to build:** a experiência completa revisada e corrigida para funcionar com WCAG 2.2 AA nos fluxos públicos, privados e editoriais críticos.

**Blocked by:** Publicar a Jornada Profissional e o Contato de Projeto; Dar ao aluno controle dos próprios dados; Versionar, retirar e corrigir Missões; Enviar avisos críticos e expirar contas inativas; Concluir Atender e investigar; Concluir Computadores e periféricos; Concluir Sistemas operacionais e ferramentas; Concluir Redes e conectividade; Concluir Sistemas web, contas e integrações; Concluir Segurança, privacidade e recuperação; Concluir Dispositivos conectados; Concluir o Desafio final de atendimento.

- [ ] Automação não encontra problema crítico ou grave de acessibilidade nas rotas e estados selecionados.
- [ ] Teste manual por teclado e NVDA cobre entrada, cadastro, missão, feedback, Minha jornada, exportação, exclusão e publicação editorial.
- [ ] Foco, ordem, rótulos, instruções, erros e diálogos são compreensíveis e nenhum estado depende somente de cor.
- [ ] Contraste, zoom de 200% e reflow em 320 px atendem aos critérios aplicáveis sem perda de função ou rolagem horizontal indevida.
- [ ] Celular, tablet e desktop concluem os fluxos críticos; a navegação pública e Voltar ao portfólio permanecem disponíveis.
- [ ] Diagramas e mídias possuem alternativa textual; áudio e vídeo, se existirem, possuem legenda ou transcrição.
- [ ] Interações de ordenar evidências funcionam por teclado e não dependem exclusivamente de arrastar.
- [ ] Falha crítica é corrigida e o fluxo afetado é testado novamente com evidência registrada.

## 22 — Gerar o pacote imutável de produção

**What to build:** um pacote reproduzível da aplicação que possa ser promovido manualmente a uma VPS sem compilar no servidor e com rollback seguro.

**Blocked by:** Versionar, retirar e corrigir Missões; Enviar avisos críticos e expirar contas inativas; Fechar privacidade, retenção e isolamento administrativo.

- [ ] O CI gera imagem imutável identificada pelo commit e não depende de `latest` como única referência.
- [ ] A imagem aprovada é publicada no GitHub Container Registry com permissão mínima e referência imutável utilizável pela promoção manual.
- [ ] A imagem não contém credenciais, arquivos locais, dados de cenário não aprovados ou ferramentas desnecessárias de desenvolvimento.
- [ ] Configuração equivalente à produção separa aplicação, PostgreSQL, Caddy e volumes persistentes e não publica a porta do banco.
- [ ] Migrations são progressivas, compatíveis com a versão anterior durante a promoção e possuem estratégia de recuperação documentada.
- [ ] A promoção manual executa verificação prévia, migration, health check e smoke tests antes de concluir.
- [ ] O rollback da aplicação é reproduzível sem prometer reversão destrutiva de schema incompatível.
- [ ] A VPS não executa o build e não existe staging persistente como requisito do MVP.
- [ ] Testes constroem e executam o pacote localmente, incluindo promotion e rollback simulados.

## 23 — Revalidar fornecedores e orçamento integral

**What to build:** uma decisão de compra atualizada que confirme se a arquitetura candidata continua disponível e operável dentro do teto recorrente integral.

**Blocked by:** Gerar o pacote imutável de produção.

- [ ] Preços, renovações, quotas e termos atuais de Hostinger, Firebase, Resend, Backblaze B2, Cloudflare, UptimeRobot e domínio são verificados em fontes primárias.
- [ ] O orçamento inclui VPS, domínio amortizado, autenticação, mídia, backup, e-mail, monitoramento, câmbio, tributos e possíveis excedentes.
- [ ] O total esperado e um cenário de limite permanecem em até R$100 por mês e nenhum fornecedor recebe automaticamente todo o teto.
- [ ] Alertas e limites impedem excedentes pagos automáticos sempre que o fornecedor permitir.
- [ ] KVM 1 permanece a candidata; KVM 2 só aparece como fallback condicionado a benchmark, otimização e novo total aprovado.
- [ ] Divergência de preço, contrato, transferência ou limite é registrada antes de qualquer compra.
- [ ] Nenhum plano, domínio, crédito ou serviço é contratado por consequência deste ticket.

## 24 — Implantar uma KVM 1 candidata autorizada

**What to build:** depois de autorização explícita do responsável, uma candidata de produção autogerenciada com rede, TLS, persistência, e-mail, backup e observabilidade mínimos.

**Blocked by:** Fechar privacidade, retenção e isolamento administrativo; Revalidar fornecedores e orçamento integral.

- [ ] A execução só começa após autorização explícita para contratar ou usar a VPS, domínio e contas necessárias; credenciais não entram no repositório ou nos tickets.
- [ ] Aplicação, Payload, PostgreSQL, Caddy e mídias pequenas executam em contêineres ou volumes separados; banco não possui porta pública.
- [ ] Cloudflare usa Full (strict) e Caddy apresenta certificado público válido na origem.
- [ ] UptimeRobot verifica rota mínima sem dados pessoais e alertas internos cobrem CPU, memória, disco, jobs, backup e TLS em canal externo à VPS.
- [ ] Backups lógicos diários de banco e mídia são cifrados antes do envio ao B2 e possuem retenção móvel de 30 dias.
- [ ] Resend e Firebase usam credenciais mínimas e responsabilidades separadas; vídeos não são hospedados.
- [ ] Firewall, atualizações, contas administrativas, segredos e acesso remoto seguem procedimento documentado e testado.
- [ ] Uma promoção manual da imagem aprovada conclui migration e smoke tests sem build na VPS.

## 25 — Ensaiar operação e capacidade da KVM 1

**What to build:** evidências de que a candidata de produção pode ser operada, recuperada e medida dentro dos limites de segurança, custo e capacidade aprovados.

**Blocked by:** Concluir o Desafio final de atendimento; Validar acessibilidade e experiência multidispositivo; Implantar uma KVM 1 candidata autorizada.

- [ ] Uma restauração mensal é ensaiada em ambiente isolado, verifica banco e mídia e reaplica o registro de exclusões antes de qualquer exposição.
- [ ] Rollback, renovação TLS, alertas, falha de job e falha de backup são simulados e chegam ao contato externo esperado.
- [ ] Análise de dependências, imagem, segredos e superfície pública não encontra vulnerabilidade crítica ou grave explorável nem credencial exposta.
- [ ] O benchmark executa por pelo menos 15 minutos com 20 visitantes públicos, 10 alunos ativos e uma publicação editorial simultânea.
- [ ] O resultado possui menos de 1% de erros, p95 de ações comuns em até 2 segundos, CPU e RAM abaixo de 85%, nenhum OOM ou travamento e pelo menos 30% de disco livre.
- [ ] Falha no benchmark gera diagnóstico e otimização antes de qualquer avaliação de KVM 2.
- [ ] Consumo real e projeção continuam dentro de R$100, sem ativar excedentes pagos automaticamente.
- [ ] Evidências de restore, rollback, segurança, alertas e benchmark ficam registradas para o gate final.

## 26 — Validar a formação com cinco adultos iniciantes

**What to build:** um piloto documentado que avalie compreensão, investigação, segurança e comunicação da formação com o público real, sem apresentar o resultado como prova científica geral.

**Blocked by:** Concluir o Desafio final de atendimento; Validar acessibilidade e experiência multidispositivo.

- [ ] O protocolo usa cinco adultos iniciantes, Dados de Cenário e consentimento compatível com o tratamento mínimo aprovado.
- [ ] Cada participante percorre o cenário definido e realiza um Caso de Transferência sem ajuda direta do facilitador.
- [ ] Pelo menos quatro distinguem fato de hipótese, escolhem teste seguro e produzem registro com problema, evidências, tentativas e próximo passo.
- [ ] A observação registra dificuldade, indução pelas alternativas, compreensão do feedback e uso de ajuda sem coletar dados desnecessários.
- [ ] Falha crítica de segurança, acessibilidade ou compreensão bloqueia aprovação, gera correção delimitada e novo teste do cenário afetado.
- [ ] Tempos de bloco e missão são tratados como hipóteses editoriais e ajustados quando a evidência justificar.
- [ ] O relatório distingue resultado observado, limitação da amostra e decisões tomadas e não declara eficácia científica.

## 27 — Passar o gate final e publicar o MVP

**What to build:** uma revisão final das evidências seguida, somente quando todos os gates estiverem verdes, pela promoção manual do MVP MANSK.

**Blocked by:** Publicar a Jornada Profissional e o Contato de Projeto; Fechar privacidade, retenção e isolamento administrativo; Ensaiar operação e capacidade da KVM 1; Validar a formação com cinco adultos iniciantes.

- [ ] Os oito módulos, competências obrigatórias, desafio final, fontes, autoria e revisões estão completos e sem conteúdo confidencial.
- [ ] CI, testes críticos, acessibilidade, piloto, segurança, orçamento, benchmark, restauração, rollback, TLS e alertas possuem evidência aprovada.
- [ ] Razão social, canal de privacidade, termos, inventário de tratamento, contratos e transferências estão preenchidos por meio seguro; dúvida jurídica material está resolvida ou o recurso permanece desligado.
- [ ] Não existe vulnerabilidade crítica ou grave explorável, migration incompatível, segredo em código/imagem ou defeito crítico/grave aberto.
- [ ] O domínio, a disponibilidade da marca, o número do WhatsApp e todos os dados públicos foram revisados pelo responsável.
- [ ] A versão aprovada é promovida manualmente, executa migrations e smoke tests e mantém rollback disponível.
- [ ] Métricas opcionais continuam desligadas, não há `LICENSE` e o README informa claramente a ausência de autorização geral de reutilização.
- [ ] A comunicação de lançamento não promete eficácia científica, SLA, idade verificada ou conformidade jurídica certificada.
