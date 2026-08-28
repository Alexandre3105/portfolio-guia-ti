# Decidir progresso, identidade e dados do aluno

Type: grilling
Status: resolved
Blocked by: 08

## Question

Como representar conteúdo percorrido, Competência demonstrada, missões, Registros de Atendimento e Nível de Apoio, se o aluno precisa de identidade e quais dados podem ser armazenados sem criar complexidade, competição ou risco desnecessário?

## Answer

### Identidade e entrada na formação

O MVP terá **Conta do Aluno** obrigatória para iniciar a primeira Missão de Suporte completa. Permanecem públicos a apresentação da formação, seus módulos e competências e uma **Prévia Pública** com um Microdesafio demonstrativo sem progresso persistido.

A conta atende somente ao próprio aluno: salvar e sincronizar o Estado de Aprendizagem, retomar em outro dispositivo, consultar Registros de Atendimento e exercer controle sobre os próprios dados. O MVP não terá perfil público, ranking, painel empresarial, supervisão de funcionários ou mensagens entre usuários.

Os únicos dados de identidade serão:

- e-mail obrigatório;
- identificador interno aleatório;
- nome de exibição opcional.

CPF, telefone, data de nascimento, endereço, empresa, cargo, fotografia e nome completo obrigatório não serão solicitados.

### Autenticação e custo

A autenticação será gerenciada por um serviço especializado; o projeto não implementará armazenamento próprio de senhas. O fornecedor exato será decidido somente após a pesquisa de stack. **Clerk**, **Auth0** e **Firebase Authentication** foram registrados como candidatos, dos quais apenas um será escolhido.

São requisitos da escolha:

- custo recorrente de autenticação igual a R$ 0 no uso esperado do MVP;
- ausência de autenticação por SMS;
- limites e alertas de consumo compreensíveis;
- possibilidade de exportar ou migrar usuários;
- separação entre identidade e dados de aprendizagem;
- revalidação dos preços e limites antes da publicação.

### Representação do progresso

O progresso não será reduzido a uma porcentagem única. O produto mostrará três dimensões separadas:

| Dimensão | Estados |
| --- | --- |
| Missão | Não iniciada → Em andamento → Percorrida |
| Competência | Não verificada → Em desenvolvimento → Demonstrada |
| Nível de Apoio | Independente → Com dicas → Com demonstração |

Uma **Missão Percorrida** não equivale a uma **Competência Demonstrada**. O aluno pode acessar a próxima missão depois de percorrer a anterior, mesmo que a competência ainda esteja em desenvolvimento. A **Conclusão da Formação**, porém, exige todas as competências obrigatórias e o desafio final demonstrados com segurança.

### Estado de Aprendizagem armazenado

O MVP persistirá somente o necessário para retomada e evidência de evolução:

- missão e Bloco da Missão atuais;
- estados das missões;
- estados das competências;
- Nível de Apoio da evidência vigente;
- Registros de Atendimento finalizados e revisados;
- datas técnicas mínimas necessárias à sincronização e à segurança.

Não serão armazenados todos os cliques, respostas erradas, tempo em cada tela nem o histórico completo das tentativas. Registros guardam somente suas versões finais relevantes, e não cada rascunho.

### Dados dos exercícios

As missões usarão apenas **Dados de Cenário** fictícios e sanitizados. O MVP não aceitará upload de arquivos, capturas de tela ou logs. Campos escritos serão curtos e avisarão que dados reais de clientes ou empresas não devem ser informados. O produto nunca solicitará credenciais, tokens, CPF, nomes de clientes ou informações de sistemas reais.

### Controle, portabilidade e retenção

Na própria conta, o aluno poderá:

- visualizar os dados armazenados;
- corrigir o nome de exibição;
- exercer a **Portabilidade da Jornada** em formato legível e reutilizável;
- excluir Registros de Atendimento individuais;
- excluir a conta e seus dados de aprendizagem;
- receber confirmação clara sobre a exclusão.

Depois de **6 meses sem login**, o aluno receberá um aviso por e-mail e terá mais **30 dias** para acessar a conta ou exportar seus dados. Sem retorno, a identidade e o Estado de Aprendizagem serão excluídos. O prazo máximo de expiração em backups e retenção de logs técnicos será definido como critério de privacidade após a escolha da arquitetura.

### Métricas e acesso administrativo

As **Métricas Pedagógicas** serão mínimas, opcionais e separadas da Conta do Aluno. Poderão medir missão iniciada ou percorrida, etapa de abandono, uso de dicas por etapa, erro técnico e conclusão do Caso de Transferência. Respostas, Registros de Atendimento, e-mail, sequência completa de cliques e conteúdo digitado não serão enviados ao sistema de analytics.

Publicidade, rastreamento entre sites, gravação de sessão e mapas de calor ficam excluídos. Logs estritamente necessários a segurança e funcionamento serão tratados separadamente das métricas opcionais.

O MVP não oferecerá ao administrador uma interface para ler respostas ou Registros de Atendimento individuais. A administração verá somente estado técnico mínimo da conta, métricas agregadas e dados necessários para atender exportação ou exclusão. Uma futura visualização administrativa exigirá outro esforço de produto, com finalidade, transparência, permissões e auditoria próprias.

### Maioridade e gate de publicação

A criação de conta será destinada a pessoas com **18 anos ou mais**. O cadastro apresentará uma autodeclaração clara, sem coletar data de nascimento, documento ou biometria.

Antes da publicação, uma pesquisa de requisitos oficiais e uma revisão jurídica deverão avaliar se a autodeclaração é suficiente para o produto e seu público. Se for exigida aferição de idade mais robusta, o cadastro não será publicado até existir solução compatível. A inclusão futura de menores será um esforço separado.
