# Pesquisar fontes primárias para fundamentos de redes

Type: research
Status: resolved
Blocked by: none

## Question

Quais definições, relações, comandos e limites sobre IP, máscara de rede, gateway, DNS e diagnóstico básico devem fundamentar a trilha, segundo padrões e documentação técnica primária confiável?

## Answer

A pesquisa foi registrada em [`docs/research/06-fundamentos-redes.md`](../../../docs/research/06-fundamentos-redes.md), com base em RFCs e documentação oficial de ferramentas do Windows e Linux.

A trilha deve ensinar um modelo de decisão, não uma lista de comandos: separar nome, endereço e rota; interpretar prefixos; identificar o próximo salto; distinguir DNS de conectividade; preservar evidências; e testar progressivamente configuração, IP, resolução e serviço. Comandos e saídas devem ser tratados como aplicações dependentes do sistema operacional, sempre explicando os limites de cada evidência. Essas conclusões já podem orientar as competências do ticket 05 e o formato investigativo do ticket 08.
