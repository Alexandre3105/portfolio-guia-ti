# VPS Hostinger como destino candidato

Pesquisa complementar do [ticket 14](../../.scratch/portfolio-guia-ti/issues/14-escolher-arquitetura-conteudo-e-publicacao.md), realizada em **01/09/2026** somente em fontes oficiais. Escopo: verificar se uma VPS Hostinger pode executar a composição candidata Next.js + TypeScript + Payload + PostgreSQL, mantendo Firebase Authentication externo e respeitando o teto total de **R$100/mês**. Nenhum serviço foi contratado, instalado, acessado ou testado.

## Síntese

**Conclusão condicionada:** a VPS Hostinger é uma candidata tecnicamente viável e previsível em reais, mas troca a conveniência de uma plataforma gerenciada por administração própria do servidor. KVM 1 e KVM 2 cabem nominalmente no teto mesmo na renovação; nenhuma delas, porém, está comprovada como suficiente sem um benchmark do aplicativo e do banco. KVM 2 oferece mais margem técnica, mas deixa apenas R$22,01/mês do teto para todos os demais custos após a renovação. A decisão só é responsável se o projeto aceitar manutenção Linux/Docker/PostgreSQL, pagamento antecipado do ciclo e testes de restauração e capacidade.

## Preço, compromisso e recursos

**Fatos verificados:** a página brasileira consultada anuncia o KVM 1 por **R$29,99/mês** e renovação por **R$59,99/mês a cada dois anos**, com 1 vCPU, 4 GB de RAM, 50 GB NVMe e 4 TB de banda. O KVM 2 aparece por **R$43,99/mês**, renovando por **R$77,99/mês a cada dois anos**, com 2 vCPU, 8 GB de RAM, 100 GB NVMe e 8 TB. O KVM 4 renova por R$149,99/mês e, portanto, excede sozinho o teto do MVP. [Planos VPS e preços](https://www.hostinger.com/br/servidor-vps).

O preço exibido é uma média: a Hostinger informa que os planos são pagos integralmente e que o valor mensal resulta da divisão pelo número de meses contratados; há parcelamento em até 12 vezes. No ciclo de 24 meses mostrado, isso corresponde a R$719,76 promocionais e R$1.439,76 na renovação do KVM 1; no KVM 2, R$1.055,76 e R$1.871,76. Essas multiplicações são contas, não novas cotações. “Cancele quando quiser” não deve ser interpretado como mensalidade avulsa ou devolução proporcional; a página oferece 30 dias para pedir reembolso, sujeito à política aplicável. [Política de reembolso](https://www.hostinger.com/br/legal/refund-policy).

Os valores estão em reais, reduzindo a exposição direta ao câmbio existente nos candidatos em USD. A página capturada não detalha tributos adicionais; o preço final e a forma de parcelamento precisam ser revistos no checkout antes de qualquer autorização.

## Capacidade técnica

**Fatos verificados:** a Hostinger fornece acesso root/SSH e IP dedicado. Existe template Ubuntu 24.04 com Docker Engine e Docker Compose pré-instalados, além de opções de Linux e implantação de aplicações pelo hPanel. Isso permite, em princípio, executar contêineres próprios para proxy reverso, aplicação Next.js/Payload e PostgreSQL. [Template Docker](https://www.hostinger.com/support/8306612-how-to-use-the-docker-vps-template-at-hostinger/), [contrato de hospedagem](https://www.hostinger.com/br/legal/contrato-de-hospedagem).

Firebase Authentication permaneceria um serviço externo; a VPS executaria a aplicação e, se escolhido, o banco. Payload continua sendo o painel editorial, enquanto hPanel/Docker administram infraestrutura: um painel não substitui o outro.

**Inferência:** uma implantação em Docker Compose é compatível com a arquitetura candidata e evita cobrança separada de computação e PostgreSQL. Isso não comprova desempenho. RAM e CPU também serão consumidas por sistema operacional, proxy, banco, aplicação, logs e tarefas de manutenção; builds feitos no próprio servidor aumentariam os picos. KVM 1 é o menor plano comercial a testar, não o “mínimo adequado” comprovado. KVM 2 é a candidata mais folgada para validação, não uma garantia.

## Responsabilidade operacional e segurança

**Fato decisivo:** apesar do marketing “gerenciado por IA”, a documentação classifica a VPS como **autogerenciada**. O responsável pelo projeto deve configurar e manter sistema operacional, atualizações de segurança, Docker, TLS, proxy, PostgreSQL, deploys, segredos, monitoramento e recuperação. O agente de IA e o hPanel auxiliam, mas não transferem essa responsabilidade à Hostinger. [Natureza autogerenciada da VPS](https://www.hostinger.com/br/support/1583582-como-e-por-que-comprar-um-plano-vps-na-hostinger/).

O hPanel apresenta histórico de CPU, RAM, processos, disco e tráfego em períodos de até um ano. A pesquisa não confirmou alerta proativo de indisponibilidade incluído, então health checks e notificações externas continuam pendentes. Uso de CPU a 100% por mais de 180 minutos pode levar a redução automática para 10% por hora. [Métricas do VPS](https://www.hostinger.com/br/support/4725768-como-verificar-o-historico-de-utilizacao-do-vps-na-hostinger/), [limite de CPU](https://www.hostinger.com/br/support/6899741-o-que-e-o-limite-de-uso-da-cpu-na-vps-na-hostinger/).

Há firewall em nuvem administrável pelo hPanel e filtragem DDoS anunciada. A própria documentação alerta que o firewall do VPS não basta para grandes volumes de DDoS e recomenda combiná-lo, quando necessário, com o firewall do sistema operacional. Portanto, são camadas úteis, não garantia de imunidade. [Firewall VPS](https://www.hostinger.com/br/support/8172641-como-usar-um-firewall-gerenciado-no-vps-hostinger/), [recursos VPS](https://www.hostinger.com/br/servidor-vps).

## Backup e recuperação

Backups semanais automáticos estão incluídos. A documentação atual informa armazenamento separado e retenção de até dois backups semanais; ao habilitar a opção diária, podem existir dois diários e dois semanais. Há apenas um snapshot manual por vez, que expira em um dia. Restaurar substitui todo o servidor, é irreversível, bloqueia a VPS durante o processo e não permite baixar o backup/snapshot diretamente pelo painel. [Backup e restauração](https://www.hostinger.com/br/support/1583232-como-fazer-backup-ou-restaurar-um-servidor-vps-hostinger/).

**Inferência:** backup semanal do servidor, sozinho, é insuficiente para tratar PostgreSQL como banco gerenciado. O projeto ainda precisa definir exportações lógicas externas, frequência compatível com a perda aceitável, criptografia, teste de restauração e como impedir que uma restauração reintroduza contas excluídas após o prazo de retenção. Backup diário é adicional pago; o preço brasileiro não foi confirmado nesta consulta e não deve ser presumido dentro do teto.

## Compatibilidade com o teto de R$100

Na renovação, KVM 1 reserva R$59,99 e deixa **R$40,01/mês**; KVM 2 reserva R$77,99 e deixa **R$22,01/mês**. Essa sobra precisa cobrir domínio provisionado, avisos por e-mail, armazenamento/backup externo, eventual monitoramento e excedentes. Firebase e outros serviços podem começar em faixas gratuitas, mas isso não os transforma em custo garantidamente zero.

Há localização de VPS no Brasil, em São Paulo, sujeita à disponibilidade apresentada na configuração. A proximidade é favorável ao público brasileiro, mas nenhuma medição de latência deste aplicativo foi feita. [VPS no Brasil](https://www.hostinger.com/br/blog/novos-servidores-vps-no-brasil/), [localizações de servidor](https://www.hostinger.com/support/1583267-where-are-hostinger-servers-located/).

## Condições para manter a candidatura

Antes de escolher ou contratar: criar imagem de produção e medir aplicação + PostgreSQL com uma Missão de Suporte representativa; medir RAM/CPU em publicação, login, retomada e concorrência; simular restore em ambiente descartável; orçar domínio, e-mail, backup externo e monitoramento; confirmar preço final e ciclo no checkout; e atribuir explicitamente quem fará patches e resposta a incidentes.

**Resultado:** Hostinger VPS permanece candidata para o ticket 14, preferencialmente comparando KVM 1 e KVM 2 por benchmark. Ela pode caber em R$100, especialmente ao concentrar aplicação e banco, mas somente se o custo de operação humana e o risco de banco autogerenciado forem aceitos. Se a prioridade for reduzir manutenção, uma plataforma gerenciada continua mais apropriada mesmo que a conta de infraestrutura pareça menos previsível.
