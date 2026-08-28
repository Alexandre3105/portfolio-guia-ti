# Fundamentos de redes para uma trilha iniciante de suporte

Pesquisa do ticket Wayfinder 06, realizada em 2026-08-28.

## Pergunta investigada

Quais definições, relações, comandos e limites sobre IP, máscara de rede, gateway, DNS e diagnóstico básico devem fundamentar a trilha, segundo padrões e documentação técnica primária confiável?

## Conclusão executiva

A trilha deve ensinar um modelo de decisão, não uma lista de comandos: identificar a configuração da interface, decidir se o destino está no enlace local ou exige roteamento, entender qual próximo salto será usado, separar resolução de nomes de conectividade IP e, por fim, testar o serviço que o usuário realmente precisa acessar.

Os conceitos abaixo são duráveis porque vêm dos protocolos. A sintaxe de diagnóstico é dependente do sistema operacional e deve aparecer como aplicação do conceito. Uma resposta de uma ferramenta é evidência limitada; isoladamente, ela raramente prova a causa do problema.

## Fundamentos duráveis

### 1. IP: endereço não é nome nem rota

O IP transporta datagramas entre origem e destino em redes interconectadas. Ele usa endereços para encaminhar os datagramas, mas não oferece por si só garantias de entrega, retransmissão ou controle de fluxo. A própria especificação distingue **nome** (o que se procura), **endereço** (onde está) e **rota** (como chegar). Essa separação é um bom eixo para toda a trilha ([RFC 791, seções 1.2, 1.4 e 2.3](https://www.rfc-editor.org/rfc/rfc791.html#section-2.3)).

No IPv4, o endereço tem 32 bits; no IPv6, tem 128 bits. IPv6 não é apenas uma escrita diferente de IPv4: possui arquitetura e tipos de endereço próprios. Nos dois casos, um equipamento pode ter várias interfaces e uma interface pode ter mais de um endereço; por isso, “IP é o RG do computador” é uma analogia inadequada ([RFC 791, seção 2.3](https://www.rfc-editor.org/rfc/rfc791.html#section-2.3); [RFC 4291, seções 2 e 2.1](https://www.rfc-editor.org/rfc/rfc4291.html#section-2)).

Para a primeira progressão didática, IPv4 pode fornecer os exemplos de máscara em decimal pontuado, mas a linguagem deve usar **prefixo** desde o início e avisar que redes atuais também usam IPv6.

### 2. Máscara e prefixo: a fronteira entre rede e host

Em IPv4, a notação CIDR escreve um prefixo como `endereco/tamanho`, em que o número após `/` informa quantos bits mais à esquerda formam o prefixo. Assim, `/24` equivale à máscara `255.255.255.0`, enquanto `/16` equivale a `255.255.0.0` ([RFC 4632, seção 3.1](https://www.rfc-editor.org/rfc/rfc4632.html#section-3.1)). Não se deve ensinar classes A, B e C como regra de funcionamento atual: com roteamento sem classes, o tamanho do prefixo precisa ser explícito ([RFC 4632, seção 5](https://www.rfc-editor.org/rfc/rfc4632.html#section-5)).

A máscara permite comparar o prefixo do endereço local com o do destino. Se os bits selecionados pela máscara forem iguais, o destino é tratado como conectado e o envio é direto; caso contrário, o pacote precisa ser encaminhado a um roteador alcançável pela rede conectada ([RFC 1122, seção 3.3.1](https://www.rfc-editor.org/rfc/rfc1122.html#section-3.3.1)).

Exemplo didático seguro:

- interface: `192.168.10.34/24`;
- prefixo da rede: `192.168.10.0/24`;
- `192.168.10.80` está no mesmo `/24`;
- `192.168.20.80` não está no mesmo `/24` e exige uma rota.

O cálculo `2^(32 - prefixo)` informa o tamanho total do bloco IPv4, mas a fórmula informal “endereços utilizáveis = total menos 2” não é universal. Prefixos `/31`, por exemplo, usam os dois endereços como endpoints em enlaces ponto a ponto ([RFC 3021, seção 2.1](https://www.rfc-editor.org/rfc/rfc3021.html#section-2.1)). Para iniciantes, convém separar “entender a fronteira do prefixo” de “planejar sub-redes e exceções operacionais”.

### 3. Gateway padrão e tabela de rotas

O gateway padrão é um **próximo salto**, não “a Internet”. Para um destino não conectado, o host consulta suas rotas e pode enviar o pacote a um gateway na rede local. Quando não há informação mais específica, uma rota padrão pode ser escolhida ([RFC 1122, seção 3.3.1.2](https://www.rfc-editor.org/rfc/rfc1122.html#section-3.3.1.2)).

O encaminhamento usa a rota de prefixo mais específico (*longest match*). A rota IPv4 `0.0.0.0/0` representa o caso padrão, mas só vence quando nenhuma rota mais específica corresponde ao destino ([RFC 4632, seções 5.1 e 5.2](https://www.rfc-editor.org/rfc/rfc4632.html#section-5.1)). Consequentemente:

- ter um gateway configurado não prova que ele está alcançável;
- alcançar o gateway não prova que existe rota funcional até a Internet ou até o serviço final;
- VPNs, múltiplas interfaces e rotas mais específicas podem fazer o tráfego ignorar o gateway que parece “principal”.

### 4. DNS: nomes, registros, resolvedores e cache

DNS é uma base distribuída e hierárquica. Nomes apontam para conjuntos de informações chamados registros de recurso; servidores de nomes mantêm dados e delegações, enquanto resolvedores consultam esses servidores e podem responder a partir de cache ([RFC 1034, seções 2.3 e 2.4](https://www.rfc-editor.org/rfc/rfc1034.html#section-2.4)).

Um registro `A` contém um endereço IPv4 de 32 bits; um registro `AAAA` contém um endereço IPv6 de 128 bits. Um mesmo nome pode retornar vários endereços ([RFC 1035, seção 3.4.1](https://www.rfc-editor.org/rfc/rfc1035.html#section-3.4.1); [RFC 3596, seção 2](https://www.rfc-editor.org/rfc/rfc3596.html#section-2)). O TTL limita por quanto tempo um registro pode permanecer em cache, portanto uma resposta observada pode não ter vindo naquele momento do servidor autoritativo ([RFC 1034, seções 3.6 e 5.3](https://www.rfc-editor.org/rfc/rfc1034.html#section-3.6)).

DNS não transporta a conexão da aplicação. Se `ping 192.0.2.10` funciona e `ping exemplo.test` falha, há uma **hipótese forte** de resolução de nome, desde que ambos representem o mesmo destino e a mesma família IP; ainda não é prova de que “o DNS caiu”. Arquivo `hosts`, cache, sufixo de pesquisa, LLMNR/NetBIOS no Windows, múltiplos registros e diferenças entre IPv4/IPv6 podem alterar o resultado. Para testar DNS especificamente no Windows, `Resolve-DnsName -DnsOnly` evita os mecanismos alternativos mencionados pela própria ferramenta ([documentação do `Resolve-DnsName`](https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname?view=windowsserver2025-ps)).

### 5. Configuração automática, endereços privados e link-local

Uma configuração IPv4 pode ser manual ou recebida dinamicamente. O DHCP possui opções separadas para máscara de sub-rede, roteador e servidores DNS; isso explica por que uma máquina pode receber endereço, mas ficar com gateway ou DNS ausente/incorreto ([RFC 2132, seções 3.3, 3.5 e 3.8](https://www.rfc-editor.org/rfc/rfc2132.html#section-3.3)).

Os blocos privados IPv4 reservados são `10.0.0.0/8`, `172.16.0.0/12` e `192.168.0.0/16`. Eles não são endereços públicos globalmente roteáveis ([RFC 1918, seção 3](https://www.rfc-editor.org/rfc/rfc1918.html#section-3)). “Privado”, porém, não significa automaticamente “seguro”, “sem Internet” ou “sempre atrás de NAT”; essas propriedades dependem da arquitetura e das políticas da rede.

Um endereço em `169.254.0.0/16` é IPv4 link-local e não deve ser encaminhado por roteadores. Ele indica que a interface está usando endereçamento de escopo local; em uma rede que esperava DHCP e acesso roteado, é uma pista relevante de falha de configuração, mas não comprova sozinho que o servidor DHCP é a causa ([RFC 3927, seções 1.6, 2.6 e 2.7](https://www.rfc-editor.org/rfc/rfc3927.html#section-2.7)).

## Diagnóstico básico orientado por hipóteses

Esta sequência é deliberadamente somente leitura. O aluno deve preservar a evidência antes de renovar DHCP, limpar cache, alterar DNS ou editar rotas.

1. **Definir o sintoma e o escopo.** Registrar qual aplicação, destino, porta, horário, interface e usuários foram afetados. “Sem Internet” ainda não é um diagnóstico.
2. **Inspecionar a interface.** Identificar endereço IPv4/IPv6, prefixo/máscara, gateway, DNS, origem dinâmica/estática e interfaces concorrentes. Procurar ausência de valores esperados e endereços link-local.
3. **Classificar o destino.** Aplicar o prefixo para decidir se deveria ser local ou roteado; depois conferir a tabela de rotas e o próximo salto efetivamente escolhido.
4. **Testar por etapas.** Quando ICMP for permitido, testar o gateway esperado e então um endereço remoto autorizado. Comparar um endereço IP com o nome correspondente ajuda a separar conectividade IP de resolução, sem transformar essa comparação em prova absoluta.
5. **Consultar DNS explicitamente.** Registrar servidor consultado, tipo (`A`/`AAAA`), resposta, TTL e erro. Se necessário, comparar o resolvedor configurado com outro servidor autorizado, sem trocar a configuração da estação.
6. **Testar o serviço real.** Uma aplicação usa protocolo e porta; confirmar uma conexão TCP na porta esperada produz evidência diferente de ICMP.
7. **Observar o caminho somente quando necessário.** Traçar saltos pode localizar onde deixam de existir respostas, mas não determina sozinho qual equipamento está com defeito.
8. **Concluir com evidências.** Separar fatos observados, hipótese mais provável, hipóteses ainda possíveis e próximo teste seguro.

### Comandos dependentes do sistema

No Windows, a documentação oficial oferece uma base coerente para a trilha:

| Pergunta | Comando somente leitura | O que ele realmente informa |
| --- | --- | --- |
| Qual é a configuração atual? | `ipconfig /all` | Endereços, máscara, gateway, DNS e detalhes dos adaptadores. [`ipconfig`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig) |
| Que rota será considerada? | `route print` | Entradas da tabela local; `0.0.0.0` representa a rota padrão IPv4. [`route`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route_ws2008) |
| Há resposta ICMP? | `ping <ip-ou-nome>` | Solicitações e respostas ICMP Echo e tempo de ida e volta; testa conectividade no nível IP, não a aplicação. [`ping`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping) |
| O DNS retorna o registro esperado? | `Resolve-DnsName -Name <nome> -DnsOnly` | Consulta DNS explícita; `-Type A` ou `-Type AAAA` separa famílias e `-Server` escolhe um servidor para comparação autorizada. [`Resolve-DnsName`](https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname?view=windowsserver2025-ps) |
| A porta TCP do serviço aceita conexão? | `Test-NetConnection -ComputerName <destino> -Port <porta>` | Resultado de resolução, rota/interface escolhida e tentativa TCP, conforme os parâmetros. [`Test-NetConnection`](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps) |
| Que saltos respondem no caminho? | `tracert /d <ip>` | Respostas ICMP obtidas com TTL crescente, sem resolução reversa. Alguns roteadores não respondem e aparecem como `*`. [`tracert`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert) |

`nslookup` também consulta DNS e está disponível em versões atuais do Windows, mas `Resolve-DnsName` permite separar DNS de outros mecanismos e produz objetos no PowerShell. Se a trilha usar `nslookup`, deve explicar servidor padrão, modo interativo e tipo de registro, conforme a [documentação oficial do `nslookup`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup).

No Linux, os mesmos conceitos aparecem com outra sintaxe e pacotes que podem variar por distribuição:

| Objetivo | Exemplos comuns no Linux | Fonte primária do utilitário |
| --- | --- | --- |
| Ver endereços e prefixos | `ip address show` | [manual `ip-address(8)` do iproute2](https://man7.org/linux/man-pages/man8/ip-address.8.html) |
| Ver rotas e próximo salto | `ip route show` e `ip route get <ip>` | [manual `ip-route(8)` do iproute2](https://man7.org/linux/man-pages/man8/ip-route.8.html) |
| Testar ICMP com quantidade limitada | `ping -c 4 <ip-ou-nome>` | [manual `ping(8)` do iputils](https://man7.org/linux/man-pages/man8/ping.8.html) |
| Consultar DNS | `dig <nome> A` ou `dig @<servidor> <nome> AAAA` | [manual oficial do BIND 9](https://bind9.readthedocs.io/en/stable/manpages.html#dig-dns-lookup-utility) |
| Observar saltos | `traceroute <destino>` | [manual `traceroute(8)`](https://man7.org/linux/man-pages/man8/traceroute.8.html) |

Esses nomes não devem ser apresentados como universais: versão, distribuição, pacote instalado, permissões e política de segurança podem mudar disponibilidade e saída. A competência transferível é saber **qual pergunta fazer e como interpretar a evidência**, não memorizar a tela de um sistema.

## Limites que precisam aparecer no ensino

- **`ping` positivo não valida o serviço.** Ele confirma uma troca ICMP com aquele destino; HTTP, banco de dados ou outro serviço ainda pode estar indisponível. Para TCP, o teste precisa incluir a porta ([RFC 792, Echo/Echo Reply](https://www.rfc-editor.org/rfc/rfc792.html); [`Test-NetConnection -Port`](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps)).
- **`ping` negativo não prova que o host está desligado.** ICMP não garante que todo erro gere resposta, e filtros podem impedir mensagens. Trate *timeout* como ausência de resposta àquela sondagem ([RFC 792, introdução](https://www.rfc-editor.org/rfc/rfc792.html)).
- **`tracert` com asteriscos não localiza automaticamente uma falha.** Alguns roteadores encaminham tráfego, mas não devolvem ICMP Time Exceeded; saltos invisíveis são comportamento documentado ([documentação do `tracert`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert)).
- **Perda em um salto intermediário não basta para acusar esse roteador.** Se saltos posteriores respondem sem a mesma perda, o equipamento pode apenas limitar respostas destinadas a ele; a própria documentação do `pathping` diferencia perda no nó e no enlace ([documentação do `pathping`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/pathping)).
- **Consulta por nome mistura variáveis.** Ela pode envolver cache, família IPv4/IPv6, lista de pesquisa e mecanismos locais. Registre nome completo, tipo de registro e servidor consultado.
- **Alterar configuração cedo destrói evidência.** `ipconfig /release`, `/renew` e `/flushdns`, `route add/delete`, troca manual de DNS e reinicialização não pertencem à primeira coleta. Devem ser ensinados depois, com autorização, impacto e plano de reversão.
- **Ferramentas devem ser usadas em alvos autorizados.** Mesmo testes simples de porta ou repetição agressiva de pacotes podem acionar controles ou causar carga. Exercícios devem usar laboratório e limites explícitos.

## Sugestões didáticas, sem definir o produto

Estas são possibilidades para os tickets de desenho pedagógico, não decisões de UX ou de stack:

- Usar a metáfora “nome, endereço, caminho”: DNS funciona como diretório; IP identifica onde entregar; a tabela de rotas decide o próximo passo. Explicitar onde a metáfora quebra: DNS não carrega tráfego e um equipamento pode possuir vários endereços.
- Apresentar cada conceito com quatro movimentos: observação, hipótese, teste seguro e conclusão limitada. O feedback deve corrigir principalmente inferências exageradas, não apenas erros de sintaxe.
- Começar prefixos com comparações visuais de `/24` e `/16`; introduzir binário somente quando ele ajudar o aluno a justificar a fronteira, evitando depender de “classes”.
- Usar saídas fictícias e sanitizadas de `ipconfig /all`, `route print`, `Resolve-DnsName` e `Test-NetConnection`, pedindo ao aluno que destaque endereço, prefixo, gateway, DNS, rota e evidências conflitantes.
- Exercitar cenários distintos: endereço `169.254/16`, gateway ausente, DNS incorreto, nome resolvendo para família inesperada, ICMP bloqueado com porta TCP disponível e rota mais específica de VPN.
- Pedir sempre uma conclusão no formato: “observei X; isso sustenta Y; ainda não exclui Z; meu próximo teste é W”.

## Implicações para os tickets 05 e 08

### Ticket 05 — competências da trilha

A pesquisa sustenta competências observáveis: explicar a diferença entre nome/endereço/rota; interpretar IPv4, IPv6 e prefixo; decidir local versus remoto; identificar rota padrão e próximo salto; distinguir DNS de conectividade; coletar configuração sem alterá-la; testar ICMP, DNS e uma porta; e redigir uma hipótese sem transformar correlação em certeza. Não é necessário assumir domínio prévio de binário, subnetting avançado, protocolos de roteamento dinâmico ou administração de DNS autoritativo.

### Ticket 08 — formato de lições, exercícios e feedback

O formato deve favorecer pequenas investigações com evidência controlada. Cada exercício pode declarar o sintoma, fornecer uma saída de sistema, pedir a hipótese e o próximo teste, e então explicar tanto a resposta correta quanto as conclusões que os dados **não** autorizam. Vale separar o bloco conceitual durável do bloco de comandos por sistema operacional; a escolha final do formato continua pertencendo ao ticket 08.

## Fontes primárias principais

- IETF/RFC Editor: [RFC 791 — Internet Protocol](https://www.rfc-editor.org/rfc/rfc791.html), [RFC 1122 — Requirements for Internet Hosts](https://www.rfc-editor.org/rfc/rfc1122.html), [RFC 4632 — CIDR](https://www.rfc-editor.org/rfc/rfc4632.html), [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html) e [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035.html) — DNS.
- IETF/RFC Editor: [RFC 2132 — DHCP Options](https://www.rfc-editor.org/rfc/rfc2132.html), [RFC 1918 — Private Address Space](https://www.rfc-editor.org/rfc/rfc1918.html), [RFC 3927 — IPv4 Link-Local](https://www.rfc-editor.org/rfc/rfc3927.html), [RFC 4291 — IPv6 Addressing Architecture](https://www.rfc-editor.org/rfc/rfc4291.html) e [RFC 792 — ICMP](https://www.rfc-editor.org/rfc/rfc792.html).
- Microsoft Learn: documentação oficial de [`ipconfig`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig), [`route`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route_ws2008), [`ping`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping), [`tracert`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert), [`Resolve-DnsName`](https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname?view=windowsserver2025-ps) e [`Test-NetConnection`](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection?view=windowsserver2025-ps).
- Documentação dos utilitários Linux: [`ip-address(8)`](https://man7.org/linux/man-pages/man8/ip-address.8.html), [`ip-route(8)`](https://man7.org/linux/man-pages/man8/ip-route.8.html), [`ping(8)`](https://man7.org/linux/man-pages/man8/ping.8.html), [`traceroute(8)`](https://man7.org/linux/man-pages/man8/traceroute.8.html) e [`dig` no BIND 9](https://bind9.readthedocs.io/en/stable/manpages.html#dig-dns-lookup-utility).
