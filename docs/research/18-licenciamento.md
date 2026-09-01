# Licenciamento de código, conteúdo e marca do MANSK

Pesquisa do [ticket 18](../../.scratch/portfolio-guia-ti/issues/18-definir-licenciamento-de-codigo-e-conteudo.md), realizada em **1º de setembro de 2026** somente com textos oficiais de licenças, OSI/SPDX, Creative Commons, GitHub e legislação brasileira. O objetivo é informar uma decisão de produto; este documento **não é aconselhamento jurídico**, não declara titularidade e não substitui a revisão dos contratos, contribuições e ativos concretos antes da publicação.

## Resultado executivo

O repositório continua público e **sem licença**. Isso permite visualização e fork no GitHub nos limites dos termos da plataforma, mas não concede uma autorização geral para usar, modificar ou redistribuir o código ou o conteúdo. O próprio [GitHub explica que, sem licença, aplicam-se os direitos autorais padrão](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository), e o [README atual](../../README.md) já registra essa reserva.

Não há uma licença única adequada a tudo que o projeto reunirá. A fronteira recomendada para a decisão é:

1. **Código-fonte:** `Apache-2.0`, condicionalmente, por permitir colaboração e uso comercial com uma concessão expressa de patentes, preservação de avisos e exclusão explícita de marcas.
2. **Artigos, Missões de Suporte e exercícios autorais:** `CC BY-NC-SA 4.0`, condicionalmente, para permitir estudo, cópia e adaptação não comercial com crédito e reciprocidade; usos comerciais dependeriam de autorização separada.
3. **Casos do portfólio, currículo, fotografias pessoais e relatos profissionais:** todos os direitos reservados, salvo autorização item a item.
4. **Nome MANSK, logotipo, identidade visual e demais sinais distintivos:** expressamente excluídos das licenças de código e conteúdo; nenhuma licença de marca é concedida.
5. **Conteúdo, marcas e mídias de terceiros:** permanecem sob seus próprios termos ou autorizações; uma referência na Ficha da Missão não transfere direitos.
6. **Dados de alunos, clientes e operação:** não são material licenciado ao público e não devem entrar em pacotes de código, conteúdo ou atribuições.

Essa combinação é uma recomendação técnica para a próxima decisão, não uma aplicação automática. Antes de adotá-la, é necessário confirmar quem detém os direitos, revisar contratos e contribuições e concluir o inventário de dependências e mídias.

Há um limite decisivo: **MIT, Apache-2.0 e AGPL-3.0 permitem uso comercial do software**. AGPL exige reciprocidade de código em certas distribuições e no uso de versão modificada pela rede, mas não proíbe cobrar, vender ou hospedar comercialmente. Impedir a revenda comercial das Missões e dos artigos depende da licença aplicada ao **conteúdo**, não da licença do código.

## 1. O que existe e precisa ser separado

O [inventário autoral](../content/inventario-autoral.md) e o [ticket de narrativa](../../.scratch/portfolio-guia-ti/issues/10-definir-narrativa-do-portfolio.md) distinguem material próprio, colaboração, alegações ainda não confirmadas, casos anônimos, nome comercial autorizado e informações que não podem ser publicadas. A [arquitetura aprovada](../../.scratch/portfolio-guia-ti/issues/14-escolher-arquitetura-conteudo-e-publicacao.md) reunirá aplicação Next.js/Payload, PostgreSQL e mídias editoriais, enquanto a [governança curricular](../../.scratch/portfolio-guia-ti/issues/16-definir-arquitetura-curricular-e-governanca.md) exige autoria, fontes, versões e revisão por Missão. A [pesquisa de privacidade](../../.scratch/portfolio-guia-ti/issues/17-pesquisar-privacidade-e-maioridade.md) trata separadamente os dados da Conta do Aluno.

Esses materiais pertencem a categorias jurídicas e operacionais diferentes:

| Categoria | Exemplos no MANSK | Regra de escopo necessária |
| --- | --- | --- |
| Software | aplicação, componentes, APIs, migrations, testes, scripts e configuração reproduzível | uma licença de software padrão |
| Conteúdo educacional | artigos, Fichas e blocos das Missões, exercícios, dicas, feedback, diagramas e materiais autorais | uma licença de conteúdo explícita por item/versão |
| Portfólio pessoal e comercial | trajetória, currículo, textos dos casos, fotografias e resultados narrados | reserva padrão; autorização específica quando desejada |
| Marca | nome MANSK, logotipo, assinatura visual, ícones ou composição distintiva próprios | exclusão expressa das licenças; política de marca separada |
| Terceiros | bibliotecas, fontes, ícones, imagens, vídeos incorporados, trechos, marcas e documentação citada | licença ou autorização do respectivo titular, inventariada |
| Dados e registros | Conta do Aluno, Estado de Aprendizagem, Registros de Atendimento, dados de clientes e operação | fora do licenciamento público; privacidade, contrato e segurança próprios |

Uma licença colocada na raiz sem mapa de escopo pode fazer um visitante concluir que ela cobre todos os arquivos. A solução não é modificar o texto de uma licença padrão, e sim manter o texto oficial intacto e publicar um aviso separado que diga precisamente **quais caminhos e tipos de material** cada licença cobre e quais estão excluídos.

## 2. Situação atual: público não significa licenciado

O [GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) informa que um repositório público precisa de licença para ser realmente open source. Sem ela, os direitos autorais padrão permanecem com o titular; usuários do GitHub podem visualizar e fazer fork conforme os termos da plataforma, mas isso não equivale a permissão ampla para reproduzir, adaptar ou distribuir a obra fora desse contexto.

A base brasileira aponta na mesma direção:

- a [Lei nº 9.610/1998](https://www.planalto.gov.br/ccivil_03/leis/l9610.htm), arts. 7º, 18, 28 e 29, protege textos, imagens, programas e compilações independentemente de registro e reserva ao titular a utilização, reprodução, adaptação e distribuição;
- a mesma lei, arts. 24 e 27, preserva direitos morais como autoria e integridade, que são inalienáveis e irrenunciáveis no Brasil;
- a [Lei nº 9.609/1998](https://www.planalto.gov.br/ccivil_03/leis/l9609.htm), arts. 2º e 9º, aplica proteção autoral específica ao software, também independentemente de registro, e prevê seu uso mediante licença.

“Todos os direitos reservados” descreve, na prática, a ausência de uma permissão pública adicional. Não é uma licença aberta padronizada. Oferecer acesso gratuito ao site, ao repositório ou a uma aula não autoriza por si só cópia, tradução, adaptação, redistribuição ou revenda.

As limitações legais continuam existindo. Por exemplo, o art. 46, III, da Lei nº 9.610/1998 admite citação de passagens para estudo, crítica ou polêmica na medida justificada, com autor e origem, e o inciso VIII trata de pequenos trechos em condições específicas. Isso não transforma uma fonte citada em conteúdo reutilizável nem autoriza importar uma aula, ilustração ou documentação inteira. O art. 33 também rejeita a reprodução de obra alheia sob o simples pretexto de anotá-la, comentá-la ou melhorá-la.

## 3. Comparação das opções para o código

MIT, Apache-2.0 e AGPL-3.0 são licenças aprovadas pela OSI e permitem executar, modificar e distribuir software, inclusive em atividade comercial. A [Definição de Open Source da OSI](https://opensource.org/osd) exige redistribuição livre e veda discriminação contra áreas de atividade, inclusive negócios; a [FAQ oficial da OSI](https://opensource.org/faq#commercial) confirma que todo software open source pode ser usado comercialmente. Por isso, acrescentar uma proibição de uso comercial ao código deixaria de corresponder a essas licenças padrão.

| Opção | Uso comercial e modificação | Obrigações centrais | Patentes e marca | Efeito no MANSK |
| --- | --- | --- | --- | --- |
| **Sem licença / todos os direitos reservados** | nenhum direito geral de uso, modificação ou distribuição é concedido; permanecem visualização e fork nos limites do GitHub | negociar cada reutilização | nenhum direito adicional concedido | preserva controle máximo, mas impede colaboração aberta confiável e deixa contribuintes e reutilizadores sem permissão clara |
| **MIT** | permite usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e vender | manter o aviso de copyright e o aviso de permissão em cópias ou porções substanciais; inclui exclusão de garantias | o texto não contém concessão expressa de patentes nem cláusula específica de marca | menor atrito e menor governança; aceita forks comerciais e proprietários sem obrigação de publicar mudanças |
| **Apache-2.0** | permite reproduzir, modificar, exibir, sublicenciar e distribuir, inclusive comercialmente | entregar cópia da licença; marcar arquivos alterados; preservar avisos pertinentes; reproduzir atribuições do `NOTICE`, se ele existir | concessão expressa de patentes dos contribuidores, com término em determinada litigância; seção 6 não concede nomes ou marcas | melhor equilíbrio permissivo para colaboração pública, atribuição e clareza de patentes; também aceita forks comerciais e proprietários |
| **AGPL-3.0** | permite executar, modificar, distribuir, cobrar e operar comercialmente | copyleft do trabalho coberto, código-fonte correspondente nas hipóteses de distribuição e avisos da licença; a seção 13 exige oferta destacada e gratuita do fonte correspondente aos usuários que interagem pela rede com uma versão modificada | contém regime próprio de patentes; não serve para reservar a marca | útil somente se a prioridade for reciprocidade de software em SaaS; aumenta compatibilidade e operação de compliance, sem impedir hosting comercial |

Fontes da comparação: [texto MIT na OSI](https://opensource.org/license/mit), [texto Apache-2.0 na Apache Software Foundation](https://www.apache.org/licenses/LICENSE-2.0.html), [texto AGPL-3.0 na OSI](https://opensource.org/license/agpl-3-0) e [explicação oficial da FSF sobre o uso em servidores](https://www.gnu.org/licenses/why-affero-gpl.html.en).

MIT, Apache-2.0 e AGPL-3.0 fornecem o software **sem garantia** e limitam responsabilidade nos termos de seus textos, sujeitos à lei aplicável. Manter todos os direitos reservados não acrescenta automaticamente uma cláusula padronizada equivalente: qualquer oferta pública, contrato, suporte ou comercialização ainda precisa de termos adequados ao caso.

### MIT

MIT é curta e permissiva. O único dever afirmativo central é conservar o aviso autoral e de permissão. Ela não obriga um fork modificado a publicar o código, não exige que contribuições retornem ao projeto e não impede que outra empresa ofereça comercialmente uma versão própria. O texto oficial não traz a concessão expressa de patentes presente em Apache-2.0.

É adequada quando a prioridade é facilitar adoção e exemplos de portfólio com o mínimo de obrigações. Para o MANSK, oferece menos mecanismos explícitos de governança do que Apache-2.0 e não acrescenta uma vantagem clara diante do possível crescimento do aplicativo e de contribuições externas.

### Apache-2.0

Apache-2.0 continua permissiva: terceiros podem operar, modificar e vender o software sem publicar o fonte das suas alterações. Sua diferença é documentar melhor a cadeia de avisos e a licença de patentes. O [texto oficial](https://www.apache.org/licenses/LICENSE-2.0.html) exige aviso destacado de alteração, preservação dos avisos pertinentes e reprodução do conteúdo de `NOTICE`, se fornecido, e exclui autorização para nomes e marcas além do uso descritivo razoável da origem.

A seção 5 considera uma contribuição intencionalmente submetida para inclusão como licenciada nos mesmos termos, salvo declaração explícita em contrário ou acordo separado. Isso ajuda, mas não substitui uma política de contribuição que exija de cada participante autoridade para enviar o material e registre autoria e origem.

Para este projeto, é a opção condicionalmente recomendada. Ela torna o código realmente open source, permite demonstrar o processo e receber colaboração e mantém a marca fora da concessão. O custo é aceitar concorrentes, forks privados e hosting comercial do código sem obrigação de compartilhar melhorias.

### AGPL-3.0

AGPL-3.0 é copyleft forte direcionado também a software de rede. A seção 13 exige que uma versão modificada que suporte interação remota ofereça aos usuários dessa interação acesso ao código-fonte correspondente, de forma destacada e sem cobrança, pelos meios previstos na licença. A [FAQ oficial da GNU](https://www.gnu.org/licenses/gpl-faq.en.html#UnreleasedModsAGPL) confirma essa aplicação a uma versão modificada executada em site.

Isso **não** proíbe uso comercial, assinatura, consultoria, venda ou hospedagem. Também não garante que mudanças sejam enviadas ao repositório original; garante acesso dos usuários ao fonte correspondente nas situações cobertas. O conteúdo editorial, a marca e os dados não se tornam AGPL apenas por estarem armazenados ou exibidos pelo aplicativo, desde que a separação seja real e esses materiais não sejam declarados parte do “Programa”. A fronteira concreta de um trabalho combinado pode exigir avaliação jurídica.

AGPL só deve substituir Apache-2.0 se o responsável afirmar que a reciprocidade de forks SaaS é mais importante que reduzir atrito de adoção, integração e contribuição. Se escolhida, a declaração precisa optar conscientemente entre os identificadores atuais [`AGPL-3.0-only` e `AGPL-3.0-or-later`](https://spdx.org/licenses/); o identificador histórico `AGPL-3.0` não deve ser usado em uma nova expressão SPDX ambígua.

### Contribuições e mudança futura da licença

MIT não define no próprio texto o que é uma contribuição nem estabelece uma regra expressa de submissão. Apache-2.0, seção 5, declara como Apache-2.0 a contribuição intencional enviada para inclusão, salvo indicação ou acordo em contrário, mas isso é licença, não cessão de copyright. AGPL-3.0 define contribuidores e concede licença expressa sobre reivindicações essenciais de patente na seção 11; uma contribuição incorporada ao programa precisa respeitar o copyleft, mas a licença também não transfere por si só a titularidade ao mantenedor.

Em qualquer opção aberta, aceitar trabalho de terceiros pode limitar um relicenciamento incompatível no futuro. A política de contribuição deve ser definida antes do primeiro pull request externo e revisada profissionalmente se o projeto quiser reservar poder de dual licensing ou mudança de licença sobre contribuições alheias.

### Compatibilidade e dependências

A licença do projeto não substitui a licença de Next.js, Payload, bibliotecas npm, imagens de contêiner, fontes, ícones ou ferramentas. Antes de fechar a opção:

1. gerar o inventário real a partir dos manifests e lockfiles;
2. separar dependência de desenvolvimento, execução e material efetivamente redistribuído;
3. guardar textos de licença e avisos exigidos no artefato de distribuição;
4. verificar copyleft, restrições de fontes/mídias e compatibilidade antes de incorporar código ou ativo;
5. repetir a verificação quando o lockfile mudar.

Apache-2.0 é compatível com GPLv3, mas não com GPLv2-only segundo a [lista oficial de licenças da GNU](https://www.gnu.org/licenses/license-list.en.html#apache2). Compatibilidade significa que determinado código pode ser combinado sob as condições resultantes; não permite apagar os avisos da licença de origem. Programas independentes apenas executados lado a lado não formam automaticamente um único trabalho combinado, mas linkagem, cópia ou incorporação exigem análise do caso.

Uma dependência AGPL incorporada ao mesmo programa pode impor AGPL ao trabalho combinado. Portanto, escolher Apache-2.0 para o código próprio não garante que qualquer pacote possa ser adicionado. A verificação deve ocorrer antes de aceitar a dependência, não somente no deploy.

## 4. Comparação das opções para conteúdo educacional

A Creative Commons recomenda suas licenças para conteúdo, documentação e artes separadas, mas [desaconselha aplicá-las ao software](https://creativecommons.org/faq/#can-i-apply-a-creative-commons-license-to-software), porque elas não tratam distribuição de fonte/objeto e patentes como as licenças próprias de código.

| Opção | Cópia e redistribuição | Adaptação | Uso comercial | Consequência para a formação |
| --- | --- | --- | --- | --- |
| **Todos os direitos reservados** | somente com autorização específica ou exceção legal | somente com autorização específica | controlado pelo titular | maior exclusividade e poder sobre revenda, mas nenhum caminho padrão para professores, alunos ou colaboradores reutilizarem |
| **CC BY 4.0** | sim, com atribuição | sim | sim | alcance máximo; terceiros podem traduzir, reempacotar e vender as Missões, desde que cumpram atribuição e demais termos |
| **CC BY-SA 4.0** | sim, com atribuição | sim; adaptação compartilhada sob a mesma licença ou compatível | sim | mantém derivações abertas, mas ainda permite curso comercial de terceiros e não obriga contribuição ao repositório original |
| **CC BY-NC-SA 4.0** | sim, para finalidade não comercial e com atribuição | sim, somente no campo não comercial e sob a mesma licença ou compatível | não pela licença pública; pode haver autorização comercial separada | compromisso entre colaboração educacional e reserva da exploração comercial; cria casos limítrofes sobre o que é “comercial” |
| **CC BY-NC-ND 4.0** | sim, intacto e para finalidade não comercial | pode ser produzida privadamente, mas material adaptado não pode ser compartilhado pela licença | não | maior controle entre as CC comparadas, porém bloqueia a circulação de traduções, customizações e outras adaptações; conflita com colaboração curricular |

Textos oficiais: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode), [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) e [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode). O [quadro oficial das seis licenças](https://creativecommons.org/cc-licenses/) resume permissões de compartilhamento, adaptação e uso comercial.

### Condições comuns das CC 4.0

Quando o material é compartilhado, as licenças comparadas exigem crédito apropriado, indicação da licença, link quando praticável e informação sobre mudanças. O crédito não pode sugerir endosso do autor. Elas também proíbem aplicar termos ou medidas tecnológicas que impeçam o exercício dos direitos concedidos.

Uma licença CC é não exclusiva e, para quem já recebeu a obra, irrevogável enquanto os termos forem cumpridos. O titular pode parar de distribuir uma versão ou oferecer versões futuras sob outros termos, mas não retirar a permissão já concedida sobre cópias existentes. A [orientação oficial da CC](https://creativecommons.org/cc-license-your-work/) recomenda decidir com cuidado e licenciar somente material cujo copyright o licenciante possua ou controle.

CC licencia direitos autorais e direitos semelhantes que estejam sob autoridade do licenciante. Não concede automaticamente marca, imagem, privacidade, patente ou direitos de terceiros. Os próprios códigos legais alertam que permissões adicionais podem ser necessárias.

### CC BY e CC BY-SA

As duas permitem uso comercial. CC BY exige atribuição, mas aceita que a adaptação seja fechada ou receba outra licença. CC BY-SA exige que uma adaptação compartilhada permaneça sob a mesma licença ou uma oficialmente compatível. Nenhuma impede que uma empresa empacote e venda o material.

São adequadas se o objetivo principal for máxima difusão e educação aberta, aceitando concorrência comercial. Não correspondem ao requisito atual de reservar a exploração comercial da formação como parte da oferta MANSK.

### CC BY-NC-SA

CC BY-NC-SA permite que estudantes, educadores e comunidades copiem e adaptem o material para fins não comerciais, mantendo atribuição e a mesma condição nas adaptações. Como a licença é não exclusiva, o titular pode oferecer uma autorização separada, inclusive paga, para escola, empresa ou produtor que queira usar o conteúdo comercialmente.

“Não comercial” não depende apenas de quem usa. A [FAQ oficial da CC](https://creativecommons.org/faq/#does-my-use-violate-the-noncommercial-clause-of-the-licenses) explica que o critério é a finalidade predominantemente dirigida a vantagem comercial ou compensação monetária: uma entidade sem fins lucrativos pode realizar uso comercial e uma empresa pode, em certas circunstâncias, realizar uso não comercial. Monetização, treinamento corporativo, plataforma paga, patrocínio e usos híbridos precisam de avaliação concreta ou autorização específica; não devem receber promessa genérica.

É a recomendação condicional para **artigos, Missões e exercícios próprios** porque preserva adaptação pedagógica não comercial e reserva a negociação comercial. Ela não impede cópia não comercial de toda a formação. Se a prioridade real for impedir qualquer redistribuição integral, controlar toda adaptação ou vender acesso exclusivo ao texto, “todos os direitos reservados” é mais coerente.

### CC BY-NC-ND

CC BY-NC-ND permite redistribuir o material intacto de forma não comercial. Mudança de formato meramente técnica não cria, por si só, derivação, mas tradução, remix e transformação normalmente são adaptações e não podem ser compartilhadas sob a licença. Exceções legais aplicáveis continuam existindo.

Para o MANSK, ND reduz o risco de versões públicas alteradas, mas impede justamente revisão comunitária, tradução, contextualização e criação de novas atividades que uma formação queira estimular. Não é a recomendação padrão. Uma edição fechada ou um material específico que não possa ser alterado pode ser reservado separadamente sem aplicar ND a toda a formação.

## 5. Marca MANSK e identidade visual

Nenhuma das licenças comparadas deve funcionar como autorização de uso da marca. Apache-2.0 já exclui nomes e marcas em sua seção 6, e a [Creative Commons desaconselha aplicar CC a logo ou marca](https://creativecommons.org/faq/#could-i-use-a-cc-license-to-share-my-logo-or-trademark), porque a reutilização indiscriminada pode enfraquecer a função de identificar origem.

No Brasil, a [Lei nº 9.279/1996](https://www.planalto.gov.br/ccivil_03/leis/l9279.htm), arts. 122, 129 e 130, vincula a propriedade e o uso exclusivo nacional da marca ao registro válido e assegura ao titular licenciar seu uso e zelar por integridade e reputação. O [INPI recomenda busca prévia](https://www.gov.br/inpi/pt-br/acesso-a-informacao/perguntas-frequentes/marcas) na classe de atividade, embora ela não seja obrigatória.

Logo, o aviso de licenciamento deve declarar expressamente:

- `MANSK`, o logotipo, a assinatura visual, trade dress e demais ativos indicados como marca não estão sob Apache-2.0 nem CC;
- uso descritivo para identificar o projeto não significa endosso;
- nenhuma pessoa pode apresentar fork, curso ou serviço como oficial ou afiliado;
- uma futura política de marca poderá autorizar usos delimitados sem alterar as licenças de código e conteúdo.

O aviso não prova que a marca está disponível nem registrada. Antes de investir em domínio, identidade final ou licenciamento de terceiros, realizar busca de anterioridade nas classes relevantes e obter avaliação profissional sobre depósito, titular — pessoa física ou PJ — e escopo territorial.

## 6. Casos profissionais, clientes e conteúdo de terceiros

O [ticket 10](../../.scratch/portfolio-guia-ti/issues/10-definir-narrativa-do-portfolio.md) aprovou casos anônimos, limites de identificação e autorizações pontuais. Uma licença do MANSK não pode ampliar essas autorizações. Em especial:

- autorização para citar **NB Petshop** não autoriza licenciar sua marca, telas, dados, números, documentos ou imagem de pessoas;
- casos de academia, dashboard e produtos Alfa continuam anônimos e fora da licença de conteúdo;
- fatos e ideias não recebem, por si sós, a mesma proteção da redação autoral: o art. 8º da Lei nº 9.610/1998 exclui ideias, métodos, conceitos e informações de uso comum, enquanto a expressão original do caso pode ser protegida;
- reservar o texto do caso não substitui sigilo, contrato, privacidade, direito de imagem ou marca.

A [Lei nº 9.279/1996](https://www.planalto.gov.br/ccivil_03/leis/l9279.htm), art. 195, XI e XII, trata da divulgação ou exploração não autorizada de conhecimentos, informações ou dados confidenciais obtidos por relação contratual/empregatícia ou por meios ilícitos. Portanto, somente sanitização e autorização verificadas permitem publicar; “atribuição” ou “uso educacional” não corrigem exposição indevida.

Para material externo, citar a fonte e registrar data de revisão são deveres editoriais, não licença. Antes de incorporar qualquer trecho, imagem, ícone, fonte, áudio, vídeo ou captura:

1. identificar obra, autor/titular, URL de origem, versão e data da coleta;
2. registrar licença exata, atribuição exigida, permissão comercial, adaptação permitida e obrigação de compartilhamento;
3. guardar evidência da licença ou autorização vigente no momento da incorporação;
4. marcar o ativo como terceiro e excluí-lo do aviso geral do MANSK;
5. substituir o ativo se a licença for incompatível ou a titularidade não puder ser confirmada.

Vídeo incorporado por link continua pertencendo ao respectivo titular; embed não relicencia seu conteúdo. O mesmo vale para documentação oficial usada como referência: preferir paráfrase própria e link, usando citações somente na extensão legalmente justificada.

## 7. Autoria assistida por IA e contribuições humanas

O projeto registra desenvolvimento assistido por IA e colaboração humana. A licença só pode conceder direitos que o licenciante efetivamente possui ou está autorizado a conceder. A Lei nº 9.610/1998, art. 11, define autor como a pessoa física criadora, e a [orientação da CC para licenciantes](https://creativecommons.org/cc-license-your-work/) exige possuir ou controlar o copyright do material. Esses textos não resolvem, por si, a titularidade de cada saída gerada por IA.

Antes de licenciar código ou conteúdo assistido por IA:

- manter revisão humana substantiva, histórico de origem e registro da ferramenta/termos aplicáveis;
- verificar se prompts, entradas ou referências continham material de cliente, empregador ou terceiro;
- pesquisar trechos suspeitos e não declarar exclusividade sobre material cuja origem não esteja clara;
- descrever publicamente a colaboração sem atribuir autoria manual individual que não ocorreu;
- levar a revisão jurídica qualquer material estratégico cujo direito de sublicenciar seja incerto.

Contribuições futuras também afetam relicenciamento. A Lei nº 9.610/1998, arts. 22, 23 e 49, distingue direitos de autores/coautores e determina interpretação restritiva das modalidades não especificadas; para software contratado ou desenvolvido no vínculo, o art. 4º da Lei nº 9.609/1998 possui regras próprias sobre titularidade do empregador ou contratante, salvo ajuste em contrário.

Uma política `CONTRIBUTING` deve, antes da primeira contribuição externa:

- declarar que a contribuição intencional será recebida sob a mesma licença do caminho afetado;
- exigir confirmação de autoria ou autorização e respeito às licenças de dependências;
- impedir inclusão de dados, segredos, código de empregador/cliente e material sem proveniência;
- registrar autoria e aceite sem presumir cessão integral de direitos.

Se o projeto quiser liberdade de relicenciar todo o código no futuro, a política de contribuição deve ser revisada juridicamente antes de aceitar terceiros. Sem cessão ou autorização adequada, o titular do projeto pode não controlar os direitos necessários sobre cada contribuição. Licenças já concedidas e direitos de terceiros não desaparecem por trocar o arquivo `LICENSE` em uma versão futura.

## 8. Banco, conteúdo publicado, mídias e dados

O PostgreSQL conterá objetos de naturezas diferentes. A licença deve acompanhar o **material**, não ser inferida apenas por estar no mesmo banco:

- migrations, schemas e seeds fictícios de demonstração pertencem ao escopo do código, salvo indicação contrária;
- cada artigo, Missão, exercício, imagem ou versão editorial precisa de metadados de titularidade e licença;
- conteúdo de terceiro precisa conservar sua licença e atribuição próprias;
- Estado de Aprendizagem, Registros de Atendimento, e-mail, logs, backups e dados de cenário submetidos pelo aluno não recebem licença pública;
- dados reais de cliente, empresa ou produção nunca devem entrar em seeds, exemplos ou cópias de demonstração.

A Lei nº 9.610/1998, art. 7º, XIII e § 2º, pode proteger a seleção ou organização original de uma base, sem transformar automaticamente cada dado nela contido em obra do organizador. Licenciar a estrutura autoral do banco não autoriza divulgar dados pessoais, confidenciais ou de terceiros.

Campos editoriais mínimos recomendados para cada ativo publicável:

`rights_holder`, `license`, `source_url`, `attribution`, `third_party`, `brand_excluded`, `version`, `reviewed_at` e `permission_evidence` quando houver autorização específica. A Prévia Editorial deve bloquear publicação quando titularidade, licença ou atribuição estiverem ausentes ou incompatíveis.

Backups preservam as mesmas restrições dos dados originais. Não devem ser publicados como “source” de uma versão AGPL nem empacotados em release. O código-fonte correspondente exigido por copyleft é diferente de banco operacional, credenciais, segredos e conteúdo privado.

## 9. Recomendação condicional aplicada ao repositório

### Matriz dos objetivos do projeto

| Objetivo aprovado | Efeito da combinação candidata | Limite que precisa ser aceito |
| --- | --- | --- |
| atrair clientes e projetos freelancer | código Apache-2.0 demonstra processo e reduz atrito para avaliar a capacidade técnica; casos comerciais continuam sob reserva | terceiros podem reutilizar comercialmente o código e isso não prova endosso nem experiência do autor |
| compartilhar aprendizagem publicamente | CC BY-NC-SA permite ler, copiar, ensinar, traduzir e adaptar para finalidade não comercial, com crédito e ShareAlike | também permite copiar a formação inteira para uso não comercial |
| permitir manutenção e colaboração | Apache-2.0 tem regra expressa para contribuições intencionais; CC BY-NC-SA permite derivações pedagógicas abertas | contribuintes mantêm direitos sobre suas partes; relicenciar depois pode exigir autorização adicional |
| impedir reempacotamento comercial do curso completo | o elemento `NC` não autoriza a exploração comercial dos artigos, Missões e exercícios | `NC` tem casos limítrofes e não limita usos cobertos por exceção legal; uma proibição mais ampla exige direitos reservados |
| impedir falsa afiliação ou personificação da MANSK | marca, logotipo e identidade visual ficam excluídos; Apache e CC não concedem endosso | o aviso não equivale a registro; busca e estratégia no INPI continuam pendentes |
| poder mudar a política de material futuro | novos arquivos e versões podem receber termos diferentes quando o titular controlar todos os direitos | licenças já concedidas permanecem para as versões existentes; contribuições podem impedir mudança incompatível |

Se o responsável confirmar o objetivo de colaboração pública sem exigir reciprocidade de SaaS, a composição recomendada é:

| Escopo | Tratamento recomendado |
| --- | --- |
| código da aplicação, migrations, testes, scripts e exemplos técnicos próprios | **Apache License 2.0** |
| artigos, Missões de Suporte, exercícios e diagramas pedagógicos próprios explicitamente marcados | **CC BY-NC-SA 4.0** |
| casos do portfólio, currículo, fotografias, depoimentos e narrativa profissional | **todos os direitos reservados** |
| MANSK, logotipo e identidade visual distintiva | **excluídos; nenhuma licença de marca** |
| bibliotecas, fontes, ícones, imagens, vídeos e trechos de terceiros | licença/autorização própria, registrada por ativo |
| respostas, progresso, registros, contas, logs, backups e dados de clientes | **fora do licenciamento público** |

Essa escolha produz dois efeitos que precisam de aceite consciente:

- qualquer pessoa poderá usar e hospedar comercialmente o **código Apache-2.0**, inclusive em fork fechado, mantendo as obrigações da licença;
- ninguém recebe pela CC BY-NC-SA autorização para revender comercialmente os **artigos e Missões**, mas continua autorizado a copiá-los e adaptá-los para finalidade não comercial, com atribuição e ShareAlike.

Se a prioridade mudar para exigir fonte de versões modificadas oferecidas como SaaS, reabrir a decisão de código e avaliar `AGPL-3.0-only` ou `AGPL-3.0-or-later`. Se a prioridade mudar para impedir cópia integral não comercial do curso, reabrir a decisão de conteúdo e manter os materiais sob todos os direitos reservados, oferecendo permissões caso a caso. Nenhuma dessas mudanças deve ser apresentada como simples detalhe técnico.

## 10. Forma segura de aplicar depois da decisão

Não criar agora uma licença híbrida nem adicionar cláusula “não comercial” ao texto de Apache, MIT ou AGPL. Isso deixaria de ser a licença padrão e exigiria análise jurídica própria. Depois da aprovação e da conferência de titularidade, a implementação deve:

1. adicionar o texto **integral e inalterado** de Apache-2.0 em `LICENSE`;
2. criar `LICENSING.md` com o mapa de caminhos, titulares, exceções e materiais reservados;
3. criar `CONTENT_LICENSE.md` com o aviso CC BY-NC-SA 4.0, link canônico, forma de atribuição e exclusões;
4. criar `TRADEMARKS.md` reservando MANSK e a identidade visual, sem alegar registro ainda inexistente;
5. criar `THIRD_PARTY_NOTICES.md` e um inventário por ativo/dependência;
6. resumir a separação no README e nas páginas públicas, sem esconder as exceções em rodapé genérico;
7. incluir metadados legíveis por máquina nas páginas CC e preservar licença/atribuição em exportações;
8. validar o artefato Docker, os assets servidos e a exportação do conteúdo para confirmar que todos os avisos acompanham o material correto;
9. revisar a política de contribuições e a titularidade da pessoa física/PJ antes de aceitar pull requests externos;
10. repetir auditoria de licenças em CI e bloquear dependência ou mídia sem origem, versão e termos compatíveis.

Um aviso ilustrativo de escopo, a ser revisado antes de uso, seria:

> O código-fonte indicado em `LICENSING.md` é licenciado sob Apache License 2.0. Os artigos, Missões de Suporte e exercícios autorais explicitamente marcados são licenciados sob CC BY-NC-SA 4.0. Casos do portfólio, fotografias, dados, conteúdo de terceiros, o nome MANSK, o logotipo e a identidade visual não estão incluídos nessas concessões, salvo indicação específica.

Esse aviso delimita as licenças; ele não deve alterar seus textos oficiais nem tentar criar uma licença nova.

## Pontos que exigem validação antes da publicação

- titular dos direitos patrimoniais do código e do conteúdo: Alexandre Blank Lopes, sua PJ ou outro contratante;
- efeitos de contratos de trabalho/PJ, colaboração do irmão e termos das ferramentas de IA;
- busca e eventual depósito da marca MANSK nas classes adequadas;
- compatibilidade real das dependências após existirem manifest e lockfile;
- permissões de cada fonte, ícone, imagem, vídeo, captura e material incorporado;
- redação da autorização comercial separada para conteúdo CC BY-NC-SA;
- política de contribuições e necessidade de instrumento adicional para relicenciamento futuro;
- qualquer exceção de uso de cliente, marca de terceiro, relato, imagem pessoal ou material confidencial.

Até esses pontos serem resolvidos e a decisão ser registrada, deve permanecer o estado atual: repositório público, mas sem autorização geral de reutilização.
