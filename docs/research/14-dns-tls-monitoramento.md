# DNS, TLS e monitoramento externo do MVP MANSK

Pesquisa complementar do [ticket 14](../../.scratch/portfolio-guia-ti/issues/14-escolher-arquitetura-conteudo-e-publicacao.md), realizada em **1º de setembro de 2026** somente em fontes oficiais. Escopo: avaliar Cloudflare Free como DNS/borda, Caddy como proxy reverso e terminador TLS na VPS Hostinger autogerenciada e UptimeRobot Free versus Better Stack Free como monitor externo. Nenhuma conta, cobrança, zona DNS, certificado, firewall, monitor ou implantação foi criado ou alterado.

## Síntese

**Recomendação condicionada:** manter **Cloudflare Free + Caddy + UptimeRobot Free** como composição candidata do MVP. A aplicação pública pode usar o proxy da Cloudflare se permanecer dentro dos limites documentados; Caddy deve manter no servidor de origem um certificado de CA pública e a Cloudflare deve validar esse certificado com **Full (strict)**. UptimeRobot vence para este caso por declarar uso comercial permitido, dispensar cartão no Free e oferecer 50 monitores, embora verifique apenas a cada cinco minutos e não ofereça monitoramento preventivo do certificado no plano gratuito.

Better Stack Free é tecnicamente mais forte em intervalo de três minutos, verificação de TLS durante o check e confirmação distribuída, mas a página o destina a **projetos pessoais**. Expiração de certificado exige plano pago, e as fontes públicas consultadas não documentam retenção do histórico de uptime, exigência de cartão ou comportamento financeiro ao ultrapassar a franquia. Ele permanece a única alternativa desta comparação, condicionada à confirmação contratual de que o MANSK ainda se enquadra como projeto pessoal.

A camada acrescenta **R$0/mês nominal** enquanto os três componentes permanecerem nas faixas gratuitas e nenhum complemento pago for habilitado. Isso ajuda a preservar o teto total de R$100, mas não transforma a infraestrutura em custo garantidamente zero nem em produção pronta: plano gratuito não tem SLA na Cloudflare, limites e termos podem mudar, e a VPS, o domínio e os demais serviços continuam consumindo o orçamento. [Planos Cloudflare](https://www.cloudflare.com/plans/), [preços UptimeRobot](https://uptimerobot.com/pricing/), [preços Better Stack](https://betterstack.com/pricing).

## Onde cada camada atua

Com DNS **Proxied**, o caminho é `visitante → Cloudflare → Caddy na VPS → Next.js/Payload`. A Cloudflare encerra a conexão TLS pública na borda; Caddy encerra uma segunda conexão TLS no servidor e encaminha a requisição somente ao contêiner da aplicação. Com DNS **DNS-only**, o caminho passa a ser `visitante → Caddy → aplicação`. Portanto, Cloudflare e Caddy não se substituem: um protege a borda; o outro impede expor diretamente o processo Node e centraliza TLS e roteamento locais. O próprio Next.js recomenda um proxy reverso na frente de uma implantação autogerenciada. [Autohospedagem do Next.js](https://nextjs.org/docs/app/guides/self-hosting).

| Fluxo | Estado inicial candidato | Motivo e ressalva |
| --- | --- | --- |
| Site, painel Payload, API e endpoint de saúde | Proxied | Ganha proteção de borda e oculta o IP no DNS; precisa respeitar tamanho e timeout e não pode depender de cache em rotas autenticadas. |
| Validação de domínio, DKIM, SPF, MX e outros registros não HTTP | DNS-only | A Cloudflare orienta não proxyar verificações e protocolos incompatíveis. |
| SSH e PostgreSQL | Sem proxy HTTP; preferencialmente sem hostname público | O proxy gratuito não protege essas portas. SSH deve ser restrito e PostgreSQL não deve ser publicado na internet. |
| Página de status | Domínio fornecido pelo monitor | Mantém a comunicação fora da VPS e do DNS do próprio projeto. Para domínio customizado da Better Stack, a documentação manda usar CNAME DNS-only. |
| Upload ou processo acima dos limites da borda | Redesenhar para partes ou trabalho assíncrono | Um subdomínio DNS-only contorna o limite, mas expõe a origem e cria um caminho sem a proteção da Cloudflare; não deve ser atalho automático. |

Cloudflare recomenda iniciar uma nova migração com registros DNS-only, validar origem e certificado e só então ligar o proxy. Essa transição e a volta emergencial precisam ser ensaiadas; desligar o proxy expõe o IP e remove DDoS, WAF, cache e análise HTTP. [Status do proxy](https://developers.cloudflare.com/dns/proxy-status/), [redução de indisponibilidade na ativação](https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/).

## Cloudflare Free: benefícios e limites

O plano Free publica DNS autoritativo, CDN, proteção DDoS, certificado Universal e conjunto WAF gratuito por US$0, mas sem SLA. Zonas Free novas aceitam até 200 registros DNS, muito acima da necessidade prevista. A zona pode ser exportada no formato BIND, reduzindo o aprisionamento do DNS; regras de proxy, WAF e cache continuam específicas do fornecedor e teriam de ser reconstruídas em uma migração. [Cotas DNS](https://developers.cloudflare.com/dns/manage-dns-records/), [importação e exportação](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/).

### TLS correto entre borda e origem

Os modos controlam duas conexões. **Flexible** cifra visitante–Cloudflare, mas usa HTTP até a origem e não é adequado para login ou dados pessoais. **Full** usa HTTPS na origem sem validar seu certificado. **Full (strict)** exige certificado válido e com nome compatível; é a escolha candidata. `Off`, Flexible e Full simples não devem ser usados para mascarar erro de certificado. [Modos de criptografia](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/), [limites do Flexible](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/).

A Cloudflare emite e renova automaticamente o certificado Universal da borda, mas ele só é apresentado para hostnames **Proxied** e, em uma zona completa, cobre o domínio raiz e subdomínios de primeiro nível. Na origem, usar o certificado público automatizado pelo Caddy preserva a possibilidade de DNS-only e de saída da Cloudflare. Um certificado Cloudflare Origin CA também funciona com Full (strict), porém só é confiável para a Cloudflare: navegador direto o rejeita, e a Cloudflare não envia aviso de expiração desse certificado. [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), [Origin CA e seu risco de acesso direto](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/).

### Limites relevantes para Next.js e Payload

- Uploads em requisições Proxied no Free têm máximo de **100 MB**. Payload permite definir `limits.fileSize`, `uploadTimeout` e uso de arquivos temporários; o limite da aplicação deve ser explicitamente menor que o da borda, com erro `413` controlado e teste no painel. [Limite de upload Cloudflare](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/), [opções de upload do Payload](https://payloadcms.com/docs/upload/overview).
- A Cloudflare retorna `524` se a origem não iniciar resposta em **125 segundos** e documenta timeout de escrita de **30 segundos**, não ajustável no plano candidato. Publicação, exportação e processamento de mídia longos devem virar jobs assíncronos com consulta de estado, não uma requisição mantida aberta. [Erro 524](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/).
- WebSockets são suportados em todos os planos, mas uma atualização da rede Cloudflare pode encerrar conexões; cliente e aplicação precisam reconectar e usar keepalive. Streaming do App Router deve ser testado de ponta a ponta. [WebSockets](https://developers.cloudflare.com/network/websockets/), [streaming autogerenciado no Next.js](https://nextjs.org/docs/app/guides/self-hosting).
- O proxy cobre apenas portas HTTP/HTTPS publicadas; 80 e 443 são as escolhas simples. Portas como SSH 22 ou PostgreSQL 5432 não passam pelo proxy HTTP gratuito. [Portas compatíveis](https://developers.cloudflare.com/fundamentals/reference/network-ports/).

### IP real do visitante

Na origem, o par TCP vem de um IP Cloudflare. O IP do visitante chega em `CF-Connecting-IP`; a Cloudflare recomenda esse cabeçalho em vez de confiar cegamente em uma cadeia `X-Forwarded-For`. Caddy, por padrão, ignora valores `X-Forwarded-*` recebidos para evitar falsificação. Atrá de CDN, é preciso declarar somente os intervalos oficiais da Cloudflare como proxies confiáveis e usar análise estrita da cadeia; aceitar o cabeçalho de qualquer origem permite spoofing. O firewall deve aceitar 80/443 da borda conforme a estratégia escolhida e manter um procedimento separado para emissão ACME e bypass testado. [Cabeçalhos Cloudflare](https://developers.cloudflare.com/fundamentals/reference/http-headers/), [IP do visitante com Caddy](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/), [proxies confiáveis no Caddy](https://caddyserver.com/docs/caddyfile/options#trusted-proxies).

## Caddy na VPS

Caddy é software aberto sob Apache 2.0 e não acrescenta assinatura mensal. Com um hostname público na configuração, automatiza obtenção e renovação de certificados por ACME e redireciona HTTP para HTTPS. Isso depende de A/AAAA corretos, portas 80/443 alcançáveis ou desafio DNS configurado, permissão para escutar as portas e diretório de dados gravável e persistente. Caddy tenta HTTP-01 e TLS-ALPN-01 por padrão, alterna desafios/emissores em falhas e faz backoff; wildcard exige DNS-01 e plugin/credencial do provedor. [Licença](https://github.com/caddyserver/caddy/blob/master/LICENSE), [HTTPS automático e desafios ACME](https://caddyserver.com/docs/automatic-https).

O armazenamento de Caddy guarda certificados, chaves privadas e estado e **não é cache descartável**. Em Docker, `/data` deve estar em volume persistente; apagá-lo pode provocar reemissões e limites da CA. Backups precisam proteger esse volume e seus segredos, mas restauração de certificado não substitui emissão testada. [Imagem oficial do Caddy](https://hub.docker.com/_/caddy).

Caddy encaminha WebSockets e respostas em streaming e adiciona `X-Forwarded-For`, `X-Forwarded-Proto` e `X-Forwarded-Host`. Ele oferece health checks ativos/passivos para upstreams, mas em uma VPS com uma única instância da aplicação não existe outro destino para failover; também não envia sozinho um alerta externo. Limites de corpo e timeout da aplicação continuam sendo responsabilidade da configuração Next.js/Payload. [Proxy reverso do Caddy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy).

`caddy reload` aplica configuração sem indisponibilidade e mantém a anterior se a nova falhar. Isso **não** significa zero downtime total em uma VPS única: upgrade ou reinício do processo/contêiner interrompe o serviço; conexões WebSocket são fechadas por padrão em reload, salvo atraso configurado; falha da VPS não tem réplica. [API e rollback de configuração](https://caddyserver.com/docs/api), [reload e suas garantias](https://caddyserver.com/docs/getting-started#reloading-config), [streaming durante reload](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy#streaming).

Caddy não abre o firewall nem aplica patches do sistema operacional. A documentação trata acesso externo a 80/443 e ajuste do firewall como pré-requisitos; firewall Hostinger, firewall do Linux, atualização da imagem/binário, logs e resposta a incidentes permanecem operação do responsável. [Quick-start HTTPS](https://caddyserver.com/docs/quick-starts/https), [execução como serviço](https://caddyserver.com/docs/running).

## UptimeRobot Free versus Better Stack Free

| Critério | UptimeRobot Free | Better Stack Free |
| --- | --- | --- |
| Preço e uso | US$0, sem cartão; uso pessoal, comercial e por empresas é explicitamente permitido, sujeito a fair use. | US$0, descrito como **Free for personal projects**; uso comercial não foi confirmado nas fontes consultadas. |
| Franquia e intervalo | 50 monitores; checagem a cada 5 min. Durante indisponibilidade longa, os rechecks podem ser espaçados. | 10 monitores/heartbeats e 1 página; checagem Free a cada 3 min. |
| HTTP e rede | HTTP(S), keyword, ping, porta TCP e heartbeat estão no núcleo gratuito. | HTTP por status/keyword, ping, TCP/UDP e heartbeat existem; a API permite escolher regiões. |
| Confirmação geográfica | Verifica de uma localização por vez, alternando regiões. | Por padrão verifica de ao menos 4 locais e abre incidente após falha em pelo menos 3. |
| Alertas gratuitos | E-mail e push do app; integrações Free: Google Chat, Discord, Pushover, Pushbullet e Splunk. SMS/voz exigem créditos. | Slack e e-mail. Telefone/SMS fazem parte da licença paga de responder na tabela atual. |
| Página de status | 1 página básica; sem domínio próprio, white-label ou assinantes no Free. | 1 página incluída; a documentação de domínio customizado existe, mas a tabela não atribui com clareza todos os recursos ao Free. |
| Certificado HTTPS | A documentação específica diz que o Free não verifica erros nem expiração do certificado, apesar de a página de preços conter texto promocional contraditório. Não contar com o recurso. | Valida a cadeia TLS do check e pode abrir incidente por erro; alerta preventivo de expiração exige plano pago. |
| Retenção | 3 meses para logs e tempos de resposta. | Não documentada para uptime no Free; os 3 dias anunciados referem-se a logs/traces da Telemetry, não ao histórico do monitor. |
| Portabilidade | API em todos os planos, CLI oficial e exportação CSV de logs; o histórico continua limitado à retenção. | APIs listam monitores, incidentes e páginas; a oferta cita Terraform. Exportação CSV de relatórios é paga e não foi comprovada exportação integral do histórico Free. |

Fontes da comparação: [UptimeRobot Free e uso comercial](https://help.uptimerobot.com/en/articles/11604710-who-should-use-uptimerobot-s-free-plan), [intervalo e retenção UptimeRobot](https://uptimerobot.com/pricing/), [tipos de monitor UptimeRobot](https://help.uptimerobot.com/en/articles/11358364-how-to-create-your-first-monitor-on-uptimerobot-quick-setup-guide), [TLS no UptimeRobot](https://help.uptimerobot.com/en/articles/11358746-monitor-ssl-certificate-expiration-errors-with-uptimerobot), [API/CLI UptimeRobot](https://uptimerobot.com/cli/), [Better Stack Free](https://betterstack.com/pricing), [frequência Better Stack](https://betterstack.com/docs/uptime/check-frequency/), [monitores Better Stack](https://betterstack.com/docs/uptime/api/create-a-new-monitor/), [TLS Better Stack](https://betterstack.com/docs/uptime/ssl-certificate-monitor/), [localizações Better Stack](https://betterstack.com/docs/uptime/locations-and-regions/), [APIs Better Stack](https://betterstack.com/docs/uptime/api/list-all-existing-monitors/).

### Cartão e excedentes

UptimeRobot afirma que o Free não requer cartão. SMS/voz são compras avulsas a partir de US$3; a recarga automática só ocorre se o usuário com cartão a habilitar. Para manter hard cap operacional, não comprar créditos, não ativar recarga e não fazer upgrade. O Solo começa em US$13/mês ou US$12/mês anual; não cabe automaticamente na pequena margem restante do teto e exigiria nova decisão financeira. [Créditos e pagamentos](https://uptimerobot.com/pricing/).

Better Stack publica complementos de 50 monitores por US$25/mês e responder por US$34/mês, mas não esclarece, nas páginas oficiais consultadas, se o cadastro Free pede cartão, se a franquia é um bloqueio duro ou se algum excedente pode ser ativado automaticamente. Logo, eventual teste exige confirmar esses três pontos antes de inserir pagamento; a ausência de documentação não autoriza presumir custo travado em zero.

## Privacidade, DPA e localização

Com o proxy ativo, Cloudflare processa IP, rota, configuração e tráfego dos visitantes e atua como operador de logs/conteúdo do cliente em parte desses tratamentos. O Free usa a rede global; restringir região de descriptografia, chaves e metadados pertence ao Data Localization Suite empresarial pago. O DPA prevê processamento e transferências internacionais. [Política de privacidade Cloudflare](https://www.cloudflare.com/privacypolicy/), [DPA Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), [localização de dados](https://developers.cloudflare.com/data-localization/).

O DPA do UptimeRobot inclui URLs monitoradas, contatos, resultados e logs; indica processamento primário na União Europeia e secundário nos EUA, além de infraestrutura na Alemanha, EUA e Singapura. Better Stack informa armazenamento padrão na UE, mas seu DPA permite transferência/processamento nos EUA e em outras localizações de suboperadores. Nenhum dos dois documentos consultados oferece residência estrita no Brasil nem cita a LGPD como garantia automática. [DPA UptimeRobot](https://uptimerobot.com/dpa/), [segurança e região Better Stack](https://betterstack.com/security), [DPA Better Stack](https://betterstack.com/dpa).

O endpoint monitorado deve responder conteúdo constante e mínimo, sem nome, e-mail, progresso, diagnóstico de banco, segredo ou token em URL. Better Stack pode guardar corpo de resposta do incidente e captura de erro; UptimeRobot guarda logs e tempos. A página de status não deve publicar IP da origem nem URL administrativa. Base legal, transparência, subprocessadores e transferência internacional precisam ser revisados no ticket de privacidade conforme a regulamentação da ANPD. [Dados de incidente Better Stack](https://betterstack.com/docs/uptime/api/incidents-api-response-params/), [Resolução CD/ANPD nº 19](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024).

## Monitoramento candidato e lacuna de certificado

No UptimeRobot Free, o conjunto mínimo seria um monitor HTTP/keyword para uma rota pública de saúde passando por Cloudflare e Caddy, um monitor separado para a jornada pública mais simples e um heartbeat de rotina crítica quando ela existir. O e-mail de alerta deve estar fora do próprio domínio monitorado, e a página de status deve usar o hostname do UptimeRobot. Um monitor TCP em `443` do hostname Proxied testa principalmente a borda Cloudflare e acrescenta pouco ao HTTP; ele não comprova Caddy, Payload nem PostgreSQL. Nunca abrir 5432 apenas para monitoramento.

O monitor externo do hostname Proxied enxerga o certificado Universal da borda, não a data de expiração do certificado que Caddy apresenta à Cloudflare. Full (strict) fará uma origem com certificado inválido falhar e o monitor HTTP detectará a indisponibilidade, mas **somente depois do impacto**. Antes da produção, a lacuna deve ser fechada com uma verificação local diária da validade/renovação do certificado público do Caddy que deixe de enviar um heartbeat externo em caso de risco, ou com um plano de monitor que ofereça essa cobertura sem romper o teto. Isso ainda é desenho, não integração pronta.

## Condições de aceite antes de produção

1. Emitir certificado Caddy em ambiente descartável com ACME staging, persistir/restaurar `/data` e depois provar renovação com o hostname Proxied; não testar repetidamente na CA de produção.
2. Validar Cloudflare Full (strict) e confirmar falha visível para certificado de origem inválido; ensaiar DNS-only somente com certificado público, firewall e capacidade da origem preparados.
3. Testar 80/443, regras do firewall, cabeçalhos de IP real e tentativa de spoofing; confirmar que SSH é restrito e PostgreSQL não é público.
4. Testar homepage, saúde sem dados pessoais, login Firebase, painel Payload, upload normal e fronteira de tamanho, streaming e reconexão WebSocket.
5. Simular aplicação parada, Caddy parado, origem bloqueada, DNS errado, timeout `524` e indisponibilidade da Cloudflare; medir tempo real até alerta e recuperação.
6. Confirmar no cadastro, sem inserir pagamento, os limites vigentes, DPA, regiões e hard cap do monitor; exportar sua configuração e registrar runbook de migração.
7. Recalcular o teto total com renovação da VPS, domínio, backup e e-mail. Qualquer plano pago, recarga, add-on Cloudflare ou excedente reabre a aprovação financeira.

**Resultado:** a composição recomendada é economicamente compatível com o MVP e reduz lock-in ao manter certificado público no Caddy, DNS exportável e monitor com API. Ela permanece apenas uma candidata até os testes de emissão/renovação, falha, limites de upload/timeout, IP real, alertas e restauração demonstrarem o fluxo completo.
