# Backup externo criptografado para o MVP MANSK

Pesquisa complementar do [ticket 14](../../.scratch/portfolio-guia-ti/issues/14-escolher-arquitetura-conteudo-e-publicacao.md), realizada em **1º de setembro de 2026** somente em fontes oficiais. Escopo: comparar Cloudflare R2 e Backblaze B2 como destino fora da VPS para backups lógicos do PostgreSQL e cópias pequenas das mídias locais do Payload. Nenhuma conta foi criada, nenhum cartão foi cadastrado e nenhuma rotina, credencial, bucket ou integração foi configurada.

## Síntese

**Recomendação condicionada: manter Backblaze B2 como candidato principal do MVP e Cloudflare R2 Standard como alternativa.** Nos volumes esperados, a diferença de preço é pequena; B2 vence como destino de backup por combinar versionamento nativo, Object Lock em modo compliance e limites financeiros diários. R2 tem a vantagem de saída gratuita e criptografia automática de todo objeto, mas não implementa versionamento nem S3 Object Lock; seu Bucket Lock pode ser removido por um administrador. Nenhum dos dois tem região brasileira estrita.

A escolha não comprova recuperabilidade, durabilidade do nosso processo nem conformidade com a LGPD. Ela só deve avançar depois de validar contrato/DPA e transferência internacional, guardar a chave de criptografia fora da VPS e restaurar banco e mídias em ambiente descartável.

## Três camadas que não se substituem

1. **Software e rotina de backup:** `pg_dump` produz o backup lógico consistente do banco; um empacotador/cliente de backup inclui as mídias e cifra os dados antes do envio. O formato custom do `pg_dump` é restaurado por `pg_restore` e permite restauração seletiva. [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html), [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html).
2. **Armazenamento externo:** B2 ou R2 recebe objetos. O provedor não agenda `pg_dump`, não sabe se o arquivo é restaurável e não substitui alerta de falha da rotina. Payload grava uploads no diretório definido por `staticDir` quando o armazenamento local não é desabilitado; portanto banco e diretório de mídia são conjuntos diferentes a recuperar. [Uploads do Payload](https://payloadcms.com/docs/upload/overview).
3. **Backup/snapshot da Hostinger:** é uma camada de recuperação do servidor inteiro no mesmo fornecedor, não uma exportação lógica portátil. A Hostinger informa até dois backups semanais, um snapshot manual que expira em um dia, restauração irreversível que substitui a VPS e indisponibilidade de download direto pelo painel. Isso continua útil para rollback amplo, mas não elimina a cópia criptografada fora da VPS. [Backups e restauração da VPS](https://www.hostinger.com/br/support/1583232-como-fazer-backup-ou-restaurar-um-servidor-vps-hostinger/).

## Custo e cobrança atuais

### Cloudflare R2

R2 Standard inclui por mês **10 GB-mês**, 1 milhão de operações Classe A e 10 milhões Classe B. Acima disso, cobra **US$0,015/GB-mês**, US$4,50 por milhão de Classe A e US$0,36 por milhão de Classe B; exclusões e saída direta pela API S3 são gratuitas. Standard não tem duração mínima, mas as unidades faturáveis são arredondadas para cima. R2 Infrequent Access custa US$0,01/GB-mês, não recebe a faixa gratuita, cobra US$0,01/GB recuperado e impõe 30 dias mínimos; por isso não é a escolha inicial para um conjunto pequeno com restaurações de teste. [Preços R2](https://developers.cloudflare.com/r2/pricing/).

R2 é consumo medido e exige ativar/comprar o produto antes de gerar credenciais S3. A Cloudflare cobra o consumo excedente no ciclo seguinte e pode pré-autorizar o meio de pagamento. Alertas de orçamento enviam e-mail, mas **não pausam nem limitam uso**; portanto não são um hard cap. [Cobrança por uso](https://developers.cloudflare.com/billing/understand/usage-based-billing/), [política de cobrança](https://developers.cloudflare.com/billing/understand/billing-policy/), [alertas de orçamento](https://developers.cloudflare.com/billing/manage/budget-alerts/).

### Backblaze B2

B2 Pay-As-You-Go publica os primeiros **10 GB gratuitos**, armazenamento a partir de **US$6,95/TB-mês**, sem tamanho mínimo de arquivo nem duração mínima. A saída é gratuita até três vezes o armazenamento médio mensal; acima disso custa US$0,01/GB. Classes A, B e C são gratuitas; Classe D, atualmente usada por chamadas de Event Notifications, inclui 2.500 por dia e depois custa US$0,004 por 10 mil. [Preços B2](https://www.backblaze.com/cloud-storage/pricing), [preços das transações](https://www.backblaze.com/cloud-storage/transaction-pricing).

O plano é faturado mensalmente e a página publica cartão ou fatura como meios de pagamento. B2 permite caps diários em dólares para armazenamento, downloads e algumas classes de transação, com alertas em 75% e 100%; sem caps, a documentação alerta que cobranças ilimitadas podem acumular. Classe D não aceita cap. As fontes públicas consultadas não esclarecem com precisão o que ocorre em uma conta individual sem meio de pagamento ao ultrapassar 10 GB; isso deve ser confirmado antes de qualquer cadastro de cobrança. [Caps e alertas](https://www.backblaze.com/docs/cloud-storage-data-caps-and-alerts).

### Efeito no teto de R$100

Como conta ilustrativa, não previsão de uso, **50 GB-mês retidos** custariam aproximadamente US$0,60 no R2 Standard depois dos 10 GB incluídos; no B2 seriam aproximadamente US$0,28 pela tarifa publicada por TB depois dos 10 GB gratuitos. As operações normais de uma rotina pequena permaneceriam dentro das franquias atuais. Uma restauração completa isolada não acrescentaria egress no R2 e, em condições normais, caberia na franquia de três vezes o armazenamento médio do B2; restaurações repetidas ou uma média mensal ainda baixa podem gerar saída paga no B2.

Esse custo direto é pequeno diante do KVM 1, mas continua em USD, sujeito a câmbio, tributos, arredondamentos e crescimento da retenção. O [levantamento da VPS](14-vps-hostinger.md) registra renovação equivalente a R$59,99/mês, deixando R$40,01 do teto antes de domínio, monitoramento e demais excedentes. Confirmar valor cobrado em reais e reservar margem antes de ativar consumo; faixa gratuita não é garantia de custo zero em produção.

## APIs, criptografia e portabilidade

Ambos expõem API compatível com S3. R2 usa endpoint por conta; B2 recomenda S3 para novas integrações e também oferece API nativa. Isso permite trocar endpoint em ferramentas compatíveis e exportar os objetos sem formato proprietário do provedor. A compatibilidade não é identidade completa com AWS S3: cada cliente e operação usados devem ser testados. [S3 no R2](https://developers.cloudflare.com/r2/api/s3/api/), [APIs do B2](https://www.backblaze.com/docs/cloud-storage-get-started-with-a-backblaze-integration).

Criptografia do lado do cliente deve ocorrer **antes** do upload, fazendo o provedor armazenar apenas objetos cifrados. Restic é um exemplo, não uma decisão de implementação: suporta endpoints S3 compatíveis, recomenda S3 em vez do backend B2 nativo e usa uma senha para abrir o repositório; perder essa senha torna os dados irrecuperáveis. [Repositórios S3/restic](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html). A senha/chave, a versão da ferramenta e instruções de recuperação precisam existir fora da VPS e fora do próprio bucket.

R2 cifra automaticamente objetos e metadados em repouso com AES-256 e usa TLS em trânsito. B2 oferece SSE-B2 e SSE-C com AES-256, mas SSE-B2 precisa ser habilitado e não retroage para arquivos existentes; nomes e metadados não recebem a mesma proteção do conteúdo. Assim, mesmo com criptografia cliente, usar nomes de bucket, prefixos e objetos opacos, sem e-mail, nome de aluno ou outra informação pessoal. [Segurança de dados do R2](https://developers.cloudflare.com/r2/reference/data-security/), [criptografia no B2](https://www.backblaze.com/docs/cloud-storage-server-side-encryption).

Portabilidade depende também do software: copiar um repositório restic preserva seus objetos cifrados, mas a restauração ainda exige restic e sua chave. Exportar do R2 não cobra egress direto; exportar do B2 usa a franquia de três vezes a média e depois a tarifa de saída. A migração deve ser ensaiada antes de cancelar o provedor de origem.

## Versões, retenção e exclusão

B2 conserva por padrão as versões anteriores e permite Lifecycle Rules para ocultar e depois excluir versões antigas. A exclusão definitiva de uma versão é irreversível. Object Lock pode operar em governance, que uma credencial com permissão especial consegue contornar, ou em **compliance**, cuja retenção não pode ser removida por nenhum usuário e apenas pode ser estendida. O recurso, uma vez habilitado no bucket, não pode ser desabilitado; Lifecycle não exclui um objeto ainda bloqueado. [Versões e Lifecycle](https://www.backblaze.com/docs/cloud-storage-lifecycle-rules), [Object Lock](https://www.backblaze.com/docs/cloud-storage-object-lock).

R2 não implementa `Get/PutBucketVersioning` nem as operações S3 Object Lock. Seu Bucket Lock impede sobrescrita e exclusão por prazo, data ou indefinidamente, inclusive acima de Lifecycle, mas a configuração pode ser removida pelo painel/API; depois disso, excluir um objeto é irreversível. Portanto, ele protege de erro operacional durante o prazo, mas é uma barreira mais fraca contra comprometimento administrativo. [Compatibilidade S3 do R2](https://developers.cloudflare.com/r2/api/s3/api/), [Bucket Locks](https://developers.cloudflare.com/r2/buckets/bucket-locks/), [exclusão de objetos](https://developers.cloudflare.com/r2/objects/delete-objects/).

Imutabilidade e descarte precisam ser projetados juntos. Não usar bloqueio indefinido: ele pode impedir a eliminação prevista na retenção e aumentar custo. Repositórios mutáveis, como restic, também precisam sobrescrever ou excluir índices durante manutenção; Object Lock/Lifecycle aplicados sem teste podem quebrar `forget`/`prune`, que exigem permissão de exclusão para liberar espaço. [Remoção e modo append-only no restic](https://restic.readthedocs.io/en/stable/060_forget.html). Uma alternativa a avaliar na implementação é guardar arquivos cifrados com chaves de objeto únicas por execução e aplicar retenção curta aprovada. A cadência e o prazo finais pertencem ao ticket 15.

## Região, DPA, LGPD e transferência internacional

R2 Automatic escolhe localização próxima como melhor esforço; Location Hints também não garantem local. As restrições jurisdicionais garantidas publicadas são União Europeia e Estados Unidos, além de FedRAMP empresarial; a jurisdição não pode ser alterada depois da criação. [Localização no R2](https://developers.cloudflare.com/r2/reference/data-location/).

B2 exige escolher no cadastro da conta US East, US West, EU Central ou Canada East. Todos os dados da conta ficam nessa região, que não pode ser alterada; mover exige outra conta e cópia, com armazenamento duplicado durante a transição. [Regiões B2](https://www.backblaze.com/docs/cloud-storage-data-regions).

Logo, nenhum candidato oferece residência estrita no Brasil e os backups podem conter dados pessoais, inclusive dentro do dump. Cloudflare publica DPA no qual cliente atua como controlador e Cloudflare como operador; Backblaze informa que seu DPA integra os termos e trata os arquivos do cliente sob a função de operador. Esses documentos não constituem, por si só, parecer de conformidade brasileira. [DPA Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), [DPA Backblaze](https://help.backblaze.com/hc/en-us/articles/360004146953-Data-Processing-Addendum).

A Resolução CD/ANPD nº 19 exige que o controlador identifique a transferência internacional, a base legal e um mecanismo válido, além de transparência e medidas de segurança. Antes da produção, revisar DPA/termos/suboperadores, definir região, verificar o mecanismo aplicável e documentar categorias, finalidade e prazo. Criptografia reduz risco, mas não autoriza declarar automaticamente que a LGPD foi atendida. [Resolução CD/ANPD nº 19](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024).

## Credenciais, monitoramento e restauração

B2 permite Application Key padrão restrita a bucket, prefixo, prazo e tipo Read/Write, Read Only ou Write Only. R2 permite token Object Read & Write ou Object Read Only restrito a buckets, mas não publica um perfil somente de escrita equivalente. Não usar chave mestra/administrativa no job. Manter credenciais distintas para produção, leitura de restauração e manutenção com exclusão; a chave de manutenção não deve ficar na VPS. [Application Keys B2](https://www.backblaze.com/docs/cloud-storage-application-keys), [tokens R2](https://developers.cloudflare.com/r2/api/tokens/).

R2 mostra operações, erros, tamanho e contagem de objetos por 31 dias e disponibiliza consulta por GraphQL. B2 oferece caps/alertas financeiros; Event Notifications para mudanças em objetos atualmente exige pedir acesso ao suporte. Esses sinais do provedor não detectam dump vazio, criptografia com chave errada ou backup incompatível. [Métricas R2](https://developers.cloudflare.com/r2/platform/metrics-analytics/), [Event Notifications B2](https://www.backblaze.com/docs/cloud-storage-event-notifications-reference-guide).

A rotina futura deve falhar de forma visível se `pg_dump`, empacotamento, criptografia ou upload falhar; registrar horário, tamanho, checksum e objeto esperado; alertar quando não houver backup dentro da janela; e verificar o objeto por credencial separada. O teste de restauração deve partir de PostgreSQL vazio, recuperar mídias, validar referências e confirmar que o procedimento posterior não reintroduz silenciosamente contas já excluídas.

## Condições de aceite

Manter **Backblaze B2 como candidato** se: a análise do DPA e da transferência internacional for aceitável; a região for escolhida conscientemente; o comportamento de pagamento for confirmado; o bucket for privado; houver criptografia cliente com chave externa à VPS; credencial mínima e caps estiverem ativos; e Object Lock compliance for validado com um prazo curto compatível com exclusão e manutenção.

Escolher **R2 Standard como alternativa** se saída ilimitada gratuita ou consolidação operacional na Cloudflare pesar mais, aceitando explicitamente a ausência de versionamento/S3 Object Lock e compensando-a com objetos imutáveis por nome, Bucket Lock testado e credenciais isoladas. Não usar R2 Infrequent Access no início.

Em ambos os casos, a decisão final depende de um ensaio completo `gerar → cifrar → enviar → listar → baixar → decifrar → restaurar`, medição de tempo e custo, e runbook humano. Sem esse ensaio, existe armazenamento contratado, não um backup comprovadamente recuperável.
