# E-mail transacional para avisos da aplicação

Pesquisa delimitada do ticket Wayfinder 14. Fontes oficiais consultadas em **1º de setembro de 2026**; preços em USD e sujeitos a mudança. Nenhuma conta, domínio, integração, contratação ou entrega real foi testada.

## Escopo e separação de responsabilidades

O Firebase Authentication continuará enviando apenas mensagens de identidade, como verificação de endereço e recuperação de senha. O provedor analisado aqui enviará avisos originados pelo MANSK: correções críticas que comprometam evidências, inatividade após seis meses, prazo de 30 dias antes da exclusão e confirmação da exclusão solicitada.

Essas mensagens não devem conter respostas, progresso detalhado ou dados de cenário. O estado apresentado em **Minha Jornada** continua sendo a fonte dentro do produto. E-mail é um canal complementar: a aceitação da API, ou mesmo a entrega ao servidor do destinatário, não comprova leitura nem chegada à caixa de entrada.

## Resend: candidato principal

### Custo, domínio e API

O plano Free publica **3.000 e-mails por mês, até 100 por dia e retenção de 30 dias**. Ao alcançar uma cota gratuita, a API responde `429`; não há excedente pago automático no Free. O Pro parte de **US$ 20/mês por 50.000 mensagens**, sem limite diário, e permite excedentes de US$ 0,90 por bloco de mil. Nos planos pagos, o limite padrão de excedente pode chegar a cinco vezes a cota antes de pausar o envio. Isso exige aprovação e controle financeiro próprios se houver upgrade; sob o teto total de R$100, o Pro não deve ser presumido viável. Cada destinatário em `To`, `CC` ou `BCC` conta separadamente, e o limite inicial da API é cinco requisições por segundo por equipe. [Preços](https://resend.com/pricing), [cotas e limites](https://resend.com/docs/knowledge-base/account-quotas-and-limits), [limites da API](https://resend.com/docs/api-reference/rate-limit).

O envio usa `POST /emails` por HTTP e possui SDK para Node.js. Para destinatários reais, o domínio próprio precisa ser verificado por DNS; a documentação exige SPF e DKIM e recomenda DMARC, preferencialmente em subdomínio separado, como `avisos.mansk...`. O domínio de teste `resend.dev` só envia para o endereço da própria conta. Contas gratuitas têm acesso de produção sem aprovação prévia, mas isso não elimina verificação DNS, política de uso nem testes de entregabilidade. [API de envio](https://resend.com/docs/api-reference/emails/send-email), [domínios](https://resend.com/docs/dashboard/domains/introduction), [restrição do domínio de teste](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain), [acesso de produção](https://resend.com/docs/knowledge-base/does-resend-require-production-approval).

### Falhas, repetição e auditoria

O Resend oferece eventos para `sent`, `delivered`, `delivery_delayed`, `failed`, `bounced`, `complained` e `suppressed`. Hard bounce ou reclamação coloca o endereço na lista de supressão; novas tentativas são interrompidas para proteger a reputação. Nem todo provedor de caixa postal retorna reclamações, portanto ausência desse evento não comprova aceitação do usuário. A política atual exige taxa de reclamação abaixo de 0,08% e de bounce abaixo de 4%; ultrapassá-las pode encerrar a conta. [Eventos](https://resend.com/docs/webhooks/event-types), [supressões](https://resend.com/docs/dashboard/emails/email-suppressions), [uso aceitável](https://resend.com/legal/acceptable-use).

Webhooks são HTTPS assinados, têm entrega **pelo menos uma vez**, podem chegar repetidos ou fora de ordem e são repetidos em intervalos progressivos quando o endpoint não responde `200`. O consumidor deve verificar a assinatura, deduplicar pelo `svix-id` e usar o horário do evento sem presumir ordem. O plano Free publica um endpoint de webhook, suficiente para reunir todos os eventos do MVP. [Webhooks e garantias](https://resend.com/docs/webhooks/introduction), [preços detalhados](https://resend.com/pricing?contacts=100000&product=marketing).

Para o envio, `Idempotency-Key` evita duplicação durante 24 horas. Isso ajuda em falhas de rede, mas não substitui uma **caixa de saída transacional** no PostgreSQL: cada aviso deve ter chave única de negócio, destinatário, tipo, versão, tentativas, horário, ID do provedor e estado final. O corpo completo não precisa ser mantido nesse registro. Repetições após 24 horas continuam protegidas pela unicidade da aplicação. [Idempotência de envio](https://resend.com/docs/dashboard/emails/idempotency-keys).

### Retenção, portabilidade e privacidade

O painel retém dados por 30 dias nos planos Free, Pro e Scale. Administradores podem exportar em CSV e a documentação lista e-mails, domínios e logs entre os recursos exportáveis; exportações maiores ficam disponíveis por link durante sete dias. Para auditoria além de 30 dias, o aplicativo deve guardar apenas os metadados mínimos dos eventos no próprio PostgreSQL, respeitando a retenção que será decidida no ticket 15. [Retenção](https://resend.com/pricing), [exportação](https://resend.com/docs/dashboard/domains/introduction).

O Resend publica DPA e lista atual de subprocessadores, majoritariamente nos Estados Unidos. É possível escolher São Paulo para **roteamento e envio**, mas a própria documentação informa que os dados da conta permanecem nos EUA. O DPA consultado trata GDPR, UK GDPR, CCPA e outras leis aplicáveis, porém não foi encontrada menção explícita à LGPD. Logo, escolher a região brasileira não comprova residência nacional nem conformidade automática; base legal, transparência, transferência internacional e minimização ainda dependem da análise do ticket 15. [Regiões](https://resend.com/docs/dashboard/domains/regions), [DPA](https://resend.com/legal/dpa), [subprocessadores](https://resend.com/legal/subprocessors).

## Contraponto: Postmark

O Postmark possui API REST, SMTP, domínio autenticado, webhooks, supressões e retenção padrão de 45 dias. Contudo, o Free Developer permite somente **100 e-mails por mês**, sem excedentes; o Basic custa **US$ 15/mês por 10.000 mensagens**, com excedente. O salto entre as faixas é grande para um MVP com teto total de R$100 e VPS cuja renovação já consome parte relevante do orçamento. É um candidato técnico válido se a entrega do Resend falhar nos testes, mas não é o padrão econômico inicial. [Preços](https://postmarkapp.com/pricing/), [retenção](https://postmarkapp.com/support/article/how-does-the-retention-add-on-work), [webhooks](https://postmarkapp.com/developer/webhooks/webhooks-overview), [DPA](https://postmarkapp.com/dpa).

## Recomendação condicionada e pendências

**Adotar Resend Free como candidato do MVP**, separado do Firebase, condicionado a volume real abaixo de 100 avisos/dia e 3.000/mês. Implementar fila persistente, idempotência, webhook único, supressão e aviso in-app; não prometer entrega nem ocultar falhas.

Antes da produção: revalidar preço e limites; verificar domínio/subdomínio, SPF, DKIM e DMARC; testar mensagens PT-BR em provedores comuns; simular `429`, atraso, hard bounce, reclamação e webhook duplicado; definir retenção e conteúdo mínimo; revisar DPA, transferência internacional e LGPD; monitorar cotas com alerta antecipado. Se o volume ou os testes exigirem plano pago, reabrir a comparação financeira antes de inserir cartão ou habilitar excedentes.
