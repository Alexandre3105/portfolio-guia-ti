# Pesquisar privacidade, maioridade e direitos do aluno

Type: research
Status: resolved
Blocked by: 09

## Question

Quais requisitos oficiais atuais de proteção de dados e serviços digitais no Brasil se aplicam à Conta do Aluno 18+, à autodeclaração de maioridade, à autenticação gerenciada, às métricas opcionais, aos cookies, à portabilidade, à exclusão e à retenção, e quais decisões precisam de validação jurídica profissional antes da publicação?

## Comments

- Priorizar legislação, regulamentação e orientações oficiais da ANPD; distinguir requisito confirmado, recomendação prudencial e ponto que exige avaliação jurídica.
- A pesquisa não substitui revisão jurídica e não deve ampliar a coleta de dados para resolver antecipadamente uma obrigação ainda não confirmada.
- Pesquisa concluída em [Privacidade, maioridade e direitos do aluno no MVP MANSK](../../../docs/research/17-privacidade-maioridade.md), com legislação, atos da ANPD e documentos oficiais dos fornecedores selecionados consultados em 01/09/2026.

## Answer

O desenho de baixa coleta do ticket 09 pode ser preservado sem solicitar nascimento, documento ou biometria antecipadamente. A autodeclaração 18+ continuará sendo uma regra de acesso e uma afirmação registrada, **não uma verificação de idade**. Como o ECA Digital também alcança serviços de acesso provável por menores, a Conta do Aluno não poderá ser publicada até revisão jurídica brasileira avaliar o público real, a incidência da norma e a proporcionalidade do mecanismo de idade; a parte pública deve permanecer sem progresso persistente e sem métricas opcionais por padrão.

Antes da produção, o ticket 15 deverá transformar em gates verificáveis: identificação do controlador e canal de direitos; inventário `finalidade → dado → base → fornecedor/país → retenção → exclusão`; cookies necessários reais; métricas opcionais desligadas por padrão e revogáveis; contratos, suboperadores e mecanismo válido para cada transferência internacional conforme a Resolução ANPD nº 19; confirmação, acesso, correção, exportação, oposição, revogação e exclusão; descarte coordenado em PostgreSQL, Firebase, Resend, logs e backups; aviso e termos em PT-BR; controles de segurança; resposta a incidentes; registro das operações e triagem de RIPD.

Os prazos finais de retenção, a base de cada finalidade, a incidência do Marco Civil nos logs, o enquadramento como agente de pequeno porte, o responsável legal e os mecanismos contratuais internacionais exigem validação jurídica profissional. A pesquisa oferece critérios para decisão, mas não comprova conformidade com LGPD, ECA Digital ou contratos dos fornecedores.
