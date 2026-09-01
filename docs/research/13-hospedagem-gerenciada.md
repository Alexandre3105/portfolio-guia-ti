# Hospedagem gerenciada: Railway e Render

Complemento do [ticket 13](../../.scratch/portfolio-guia-ti/issues/13-pesquisar-stack-autoria-e-hospedagem.md), pesquisado em **31/08/2026**. O responsável confirmou hospedagem compartilhada HostGator e descartou seu uso no projeto; isso não solicita cancelar seu contrato. Escopo: comparar execução Node.js/Docker e PostgreSQL para a composição candidata Next.js + Payload. Nenhum serviço foi contratado, instalado, acessado ou publicado. Valores em USD, sujeitos a alteração.

## Síntese para decisão

**Inferência:** Railway Hobby é um candidato econômico para testar o aplicativo, pela mensalidade mínima baixa, publicação por GitHub e controle de consumo. Não significa que aplicativo, banco e operação custem US$5. Para diminuir manutenção de banco, comparar Railway para o aplicativo com PostgreSQL gerenciado separado, tratado na [síntese de stack](13-stack-autoria-e-hospedagem.md). Render pago permanece alternativa com capacidade fixa e banco efetivamente gerenciado, mas soma recursos separados.

Hospedagem da aplicação e gestão editorial são diferentes: o painel Railway/Render configura implantação, variáveis e consumo; o painel Payload deverá editar e publicar Missões de Suporte. Nenhum provedor entrega automaticamente o motor investigativo, o isolamento das respostas ou a revisão editorial.

## Railway: mínimo mensal não é preço fechado

**Fatos:** Hobby custa no mínimo **US$5/mês**, incluindo os primeiros US$5 de consumo; Pro, **US$20/mês**, incluindo US$20. A conta recorrente de recursos é `máximo(mínimo do plano, consumo)`, não assinatura mais todo o consumo. Créditos não acumulam. Serviços ativos consomem recursos mesmo sem visitantes. [Como a conta funciona](https://docs.railway.com/pricing/understanding-your-bill).

Tarifas publicadas: RAM **US$10/GB/mês**, CPU **US$20/vCPU/mês**, volume persistente **US$0,15/GB/mês** e saída de rede **US$0,05/GB**. São equivalentes mensais; cobrança acompanha o tempo/uso. Hobby permite até 8 GB/8 vCPU por réplica e volume até 5 GB; esses limites não são recursos já pagos pelos US$5. Pro amplia limites e colaboração. [Planos e tarifas](https://docs.railway.com/pricing/plans), [tabela comercial](https://railway.com/pricing).

Os termos vigentes desde 20/04/2026 contemplam uso pessoal e/ou do próprio negócio. **Não foi encontrada nessa consulta uma proibição comercial específica do Hobby equivalente à Vercel Hobby.** A documentação posiciona Hobby para projetos individuais e atividades paralelas, e Pro para produção/equipes. Isto é leitura documental, não parecer jurídico nem promessa de SLA. Para hospedagem em nome de clientes, revisar separadamente a cláusula relativa a terceiros. [Termos Railway](https://railway.com/legal/terms), [resumo dos planos](https://docs.railway.com/pricing).

### Contas ilustrativas, sem benchmark

Hipóteses fictícias de consumo médio contínuo durante um mês equivalente; não representam requisitos mínimos, previsão de tráfego nem tamanho validado do aplicativo:

| Cenário | Cálculo de recursos | Hobby | Pro |
| --- | --- | --- | --- |
| App 1 GB + banco 0,25 GB; CPU total média 0,05; volume 1 GB; saída 5 GB | `1,25 × 10 + 0,05 × 20 + 1 × 0,15 + 5 × 0,05` | US$13,90 | US$20 |
| App 2 GB + banco 0,5 GB; CPU total média 0,1; volume 2 GB; saída 10 GB | `2,5 × 10 + 0,1 × 20 + 2 × 0,15 + 10 × 0,05` | US$27,80 | US$27,80 |

As contas aplicam as tarifas acima; diferenças de duração do ciclo e medição alteram o faturamento real. **Não incluem** backups, mídia, picos, ambientes extras, outros serviços, tributos ou câmbio. Se o banco ficar fora da Railway, retirar seu consumo dessa conta e somar a cobrança e os limites do outro fornecedor. Não transformar essas hipóteses em “US$14 para 100 alunos”.

### Implantação e proteção de custo

Railway oferece deploy por GitHub, imagens Docker e Dockerfile, além de configurações pelo painel. Isso sustenta uma candidatura Node.js; não comprova a integração específica de Next.js, Payload e autenticação nem dispensa testes. [Recursos da plataforma](https://railway.com/pricing).

Há alerta por e-mail e **hard limit** de consumo configuráveis: ao atingir o limite de compute, Railway desliga workloads. Isso protege contra uso adicional, mas **derruba o site**; não equivale a manter disponibilidade dentro de qualquer orçamento. Limites muito baixos de RAM/CPU também podem causar falhas. Rede privada evita saída desnecessária entre serviços Railway. Serverless pode reduzir ociosidade, mas retomada e conexões devem ser avaliadas. [Controles de custo](https://docs.railway.com/pricing/cost-control).

O Free fornece US$1 mensal de recursos após o trial e limita RAM a 512 MB/serviço; não é orçamento comprovado para aplicação e banco persistentes deste MVP. [Planos](https://docs.railway.com/pricing/plans).

### Banco e recuperação: responsabilidade explícita

O PostgreSQL Railway é criado como serviço de container. **O próprio fornecedor classifica seus templates de banco como unmanaged:** configuração e manutenção permanecem sob responsabilidade do projeto. “Tudo no painel” não equivale a PostgreSQL totalmente gerenciado. Usar conexão privada quando aplicativo e banco estiverem no mesmo projeto; exposição pública acrescenta risco e saída faturável. [PostgreSQL Railway](https://docs.railway.com/databases/postgresql).

Volumes preservam arquivos em runtime, não escritas de build. Backups de volume são incrementais: diário retido seis dias, semanal um mês, mensal três meses; custam pelo armazenamento incremental. Apagar o volume elimina seus backups; restauração limita-se ao mesmo projeto/ambiente. [Volumes](https://docs.railway.com/volumes), [backups](https://docs.railway.com/volumes/backups).

Railway também documenta PITR opt-in para PostgreSQL, com pgBackRest, WAL e bucket, aproximadamente quatro semanas de janela. Habilitação reimplanta o serviço e requer imagem compatível; não presumir recurso ativo ou custo incluído. [Recuperação pontual](https://docs.railway.com/volumes/point-in-time-recovery). Política de retenção do produto e teste de restauração continuam pendentes; backup não pode reintroduzir contas já excluídas.

## Render: separar workspace, aplicação e banco

**Fatos:** desde as alterações de 2026, workspace Hobby não tem mensalidade, inclui um membro, 25 serviços, 5 GB de saída e 500 minutos de build. Workspace Pro custa **US$25/mês**, além dos serviços, com membros ilimitados, 25 GB de saída e 1.000 minutos. Saída excedente custa US$0,15/GB. [Planos atuais](https://render.com/docs/new-workspace-plans).

A aplicação tem cobrança própria: o antigo Starter oferece 512 MB/0,5 CPU por US$7/mês; Standard, 2 GB/1 CPU por US$25. Os IDs atuais são `0.5c-512mb` e `1c-2g`; a renomeação não alterou preços anteriores. **512 MB não está validado para Next.js + Payload.** [Preços publicados pelo Render](https://render.com/articles/render-vs-railway), [planos de compute](https://render.com/docs/compute-plans).

Render documenta Next.js como aplicação Node ou site estático, com deploy ligado ao GitHub; somente a opção dinâmica corresponde à composição com backend/CMS. [Guia Next.js](https://render.com/docs/deploy-nextjs-app). Não foi encontrada nas páginas consultadas proibição comercial geral do workspace Hobby; não confundir workspace sem mensalidade com instância gratuita recomendada para produção. [Recursos por plano](https://render.com/docs/platform-features-by-plan).

PostgreSQL é **fully managed** e cobrado separadamente. Seu armazenamento custa US$0,30/GB/mês; discos persistentes da aplicação, US$0,25/GB/mês. O artigo oficial registra uma referência de julho/2026 de cerca de US$13 para Starter + Basic-256mb antes de crescimento/saída, não cotação vigente completa nem capacidade recomendada. A tabela dinâmica de preço atual do banco não foi recuperada nesta pesquisa; **valor do banco fica não orçado**. [Modelo de cobrança](https://render.com/articles/how-much-does-cloud-application-hosting-cost-for-small-businesses), [PostgreSQL gerenciado](https://render.com/docs/postgresql-creating-connecting).

Assim, a conta comparável é `workspace + instância web + instância PostgreSQL + armazenamento + excedentes`. Por exemplo, web 2 GB em workspace Hobby parte de **US$25 antes do banco**; no workspace Pro parte de **US$50 antes do banco**. Não anunciar US$7 como custo total.

Bancos pagos têm PITR automático: três dias no workspace Hobby, sete dias em Pro+. Exportações lógicas ficam disponíveis sete dias e podem ser baixadas. Excluir a instância elimina backups associados. [Recuperação](https://render.com/docs/postgresql-backups), [ciclo do banco](https://render.com/docs/postgresql-creating-connecting).

O limite de gasto documentado interrompe **novos builds**, não toda cobrança de produção; saída excedente continua faturável com cartão. Não foi confirmado hard cap global equivalente ao Railway. [Pipeline](https://render.com/docs/build-pipeline), [saída de rede](https://render.com/docs/outbound-bandwidth). Render desaconselha instâncias Free em produção: web dorme após ociosidade, disco é efêmero e PostgreSQL expira em 30 dias, sem recuperação oferecida nos planos pagos. [Limitações Free](https://render.com/docs/free).

## Pendências para o ticket 14

Definir teto mensal total antes de contratar; escolher onde ficará PostgreSQL e quem manterá o banco; dimensionar build/runtime com uma missão representativa; testar publicação, retomada e restauração. Orçar mídia, e-mails e ambientes adicionais separadamente. A recomendação é **avaliar Railway como entrada econômica para o aplicativo**, mantendo Render como contraponto de capacidade fixa/DB gerenciado. Nenhuma contratação ou escolha final decorre desta pesquisa.
