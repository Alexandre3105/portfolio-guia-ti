// PROTÓTIPO DESCARTÁVEL: três apresentações da mesma missão, via ?variant=.
// Todos os cenários e resultados são fictícios. Nenhuma chamada externa ou persistência.
const variants = [
  { key: 'A', name: 'Um passo por vez' },
  { key: 'B', name: 'Bancada de investigação' },
  { key: 'C', name: 'Conversa orientada' },
];
const steps = ['Entender', 'Ver um exemplo', 'Investigar', 'Aplicar sozinho', 'Registrar', 'Revisar'];
const params = new URLSearchParams(location.search);
let variant = variants.some(v => v.key === params.get('variant')) ? params.get('variant') : 'A';
let view = ['home', 'journey'].includes(params.get('view')) ? params.get('view') : 'mission';
const state = {
  step: 0, unlocked: 0, micro: null, guidedReady: false, guidedConclusion: '',
  guidedFacts: {}, transferFacts: {}, guidedLog: [], transferLog: [],
  guidedHint: 0, transferHint: 0, guidedRisk: false, transferRisk: false,
  paperLoaded: false, feedback: '', barrier: false, reviewed: false,
  record: { problem: '', tests: '', message: '', cause: '', outcome: '', evidence: [] },
};
const content = document.getElementById('content');
const escapeHtml = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const guidedActions = [
  ['message', 'Pedir a mensagem exata que aparece'],
  ['scope', 'Perguntar o que ainda funciona'],
  ['comparison', 'Comparar com o relato de outro usuário, sem pedir acesso à conta'],
  ['procedure', 'Consultar quem pode autorizar esse acesso'],
  ['status', 'Consultar o aviso geral de disponibilidade'],
  ['permission', 'Alterar o perfil de acesso por conta própria'],
];
const transferActions = [
  ['panel', 'Ler a mensagem no painel da impressora'],
  ['scope', 'Conferir se o computador responde a outras tarefas'],
  ['tray', 'Observar a bandeja sem desmontar o equipamento'],
  ['supply', 'Repor papel conforme o procedimento autorizado'],
  ['validate', 'Pedir uma página de teste sem dados e confirmar o resultado'],
  ['restart', 'Reabrir o aplicativo antes de investigar'],
  ['admin', 'Usar a conta de outra pessoa para reinstalar tudo'],
];
function fact(target, key, text, source) { target[key] = { text, source }; }
function notify(message, barrier = false) {
  state.feedback = message;
  state.barrier = barrier;
  render();
  document.getElementById('announcement').textContent = message;
  document.getElementById('current-feedback')?.focus();
}
function move(step) {
  state.step = step;
  state.unlocked = Math.max(step, state.unlocked);
  state.feedback = '';
  state.barrier = false;
  document.getElementById('announcement').textContent = '';
  render();
  content.focus();
  window.scrollTo({ top: 0 });
}
function support(phase) {
  const level = state[phase + 'Hint'];
  return level >= 3 ? 'Com demonstração' : level > 0 ? 'Com dicas' : 'Independente';
}
function stepNavigation() {
  return '<ol class="progress" aria-label="Blocos da missão">' + steps.map((name, index) =>
    '<li><button data-step="' + index + '" ' + (index > state.unlocked ? 'disabled ' : '') +
    (index === state.step ? 'aria-current="step"' : '') + '><span>0' + (index + 1) +
    '</span> ' + name + '</button></li>').join('') + '</ol>';
}
function notebook(open = false) {
  const transfer = state.step >= 3;
  const facts = Object.values(transfer ? state.transferFacts : state.guidedFacts);
  return '<details class="evidence" ' + (open ? 'open' : '') + '><summary>Caderno de evidências <small>(' +
    facts.length + ')</small></summary><p class="note">' + (transfer ? 'Caso de Transferência' : 'Investigação guiada') +
    ' · somente fatos coletados</p>' + (facts.length ? '<ul>' + facts.map(item =>
      '<li>' + item.text + '<small>FONTE: ' + item.source + '</small></li>').join('') + '</ul>' :
      '<p class="note">Suas perguntas e testes vão revelar pistas aqui.</p>') + '</details>';
}
function feedback() {
  if (!state.feedback) return '';
  return '<section id="current-feedback" tabindex="-1" class="feedback ' + (state.barrier ? 'barrier' : '') + '">' +
    (state.barrier ? '<h3>Barreira de Segurança</h3>' : '') + '<p>' + escapeHtml(state.feedback) + '</p></section>';
}
function primary(label, action, disabled = false) {
  return '<button class="primary" data-action="' + action + '" ' + (disabled ? 'disabled' : '') + '>' + label + '</button>';
}
function actionChoices(actions, phase) {
  const log = state[phase + 'Log'];
  return '<div class="choices">' + actions.map(([key, label], index) => {
    const repeatable = ['validate', 'supply', 'permission', 'admin'].includes(key);
    const done = log.some(item => item.key === key) && !repeatable;
    return '<button class="choice" data-investigate="' + phase + ':' + key + '" ' + (done ? 'disabled' : '') +
      '><span class="letter">' + (done ? '✓' : String(index + 1).padStart(2, '0')) + '</span><span>' + label + '</span></button>';
  }).join('') + '</div>';
}
function hintButton(phase) {
  const level = state[phase + 'Hint'];
  return '<button class="text-button" data-hint="' + phase + '">' +
    (level >= 3 ? 'Rever a demonstração' : level === 2 ? 'Ver próximo passo demonstrado' : level === 1 ? 'Pedir outra dica' : 'Quero uma dica') +
    '</button><p class="note">Apoio nesta ' + (phase === 'guided' ? 'prática' : 'tentativa') + ': ' +
    support(phase) + '. Pedir ajuda não tira pontos; não há pontuação.</p>';
}
function intro() {
  return '<p class="eyebrow">01 / Entender · cerca de 3 minutos</p><h2>O relato ainda não é o diagnóstico.</h2>' +
    '<div class="scenario"><p class="eyebrow">Chamado fictício · recepção</p><blockquote>“Não consigo abrir o painel de agendamentos. A internet caiu?”</blockquote>' +
    '<p class="note">O atendimento está parado. Você pode observar, perguntar e consultar procedimentos. Não pode alterar cadastros ou permissões.</p></div>' +
    '<p><strong>Seu objetivo:</strong> reunir evidências suficientes para indicar o próximo passo seguro e explicá-lo com clareza.</p>' +
    '<div class="concept"><p><strong>Fato</strong> é o que foi observado ou relatado. <strong>Hipótese</strong> é uma possível explicação que ainda precisa ser verificada.</p></div>' +
    '<h3>Qual informação já temos no relato?</h3><div class="choices">' +
    '<button class="choice" data-micro="fact"><span class="letter">A</span>A pessoa relata que o painel não abre.</button>' +
    '<button class="choice" data-micro="internet"><span class="letter">B</span>A conexão de toda a empresa caiu.</button>' +
    '<button class="choice" data-micro="restart"><span class="letter">C</span>Reiniciar o computador vai resolver.</button></div>' +
    feedback() + '<div class="actions">' + primary('Ver um exemplo →', 'next', state.micro === null) + '</div>';
}
function demonstration() {
  return '<p class="eyebrow">02 / Caso demonstrado</p><h2>Antes da solução, uma pergunta melhor.</h2>' +
    '<p>Em outro atendimento, alguém diz: “O relatório sumiu. O sistema deve ter apagado tudo.”</p>' +
    '<ol class="example"><li><strong>Delimitar:</strong> perguntar qual relatório e o que aparece. Resposta: “A lista abre vazia só neste período.”</li>' +
    '<li><strong>Verificar sem alterar dados:</strong> conferir o filtro. Ele mostra o mês seguinte.</li>' +
    '<li><strong>Agir dentro da autorização:</strong> ajustar somente o filtro de visualização para o mês informado.</li>' +
    '<li><strong>Validar:</strong> a pessoa confirma que encontrou o relatório esperado. Não houve alteração ou recuperação de registros.</li></ol>' +
    '<div class="feedback"><p>Uma lista vazia não comprovava perda de dados. A conferência do filtro transformou a hipótese em um teste simples.</p></div>' +
    '<details><summary>Ver um registro curto desse exemplo</summary><p>Relato: relatório não localizado. Filtro observado: mês seguinte. Ação: ajustar visualização autorizada. Resultado: relatório localizado e confirmado pelo solicitante.</p></details>' +
    '<div class="actions">' + primary('Investigar o chamado →', 'next') + '</div>';
}
function guided() {
  return '<p class="eyebrow">03 / Investigação guiada</p><h2>O que você precisa descobrir?</h2>' +
    '<p>Retome o painel de agendamentos. Escolha perguntas e verificações que ajudem a entender o problema. Não há uma ordem única.</p>' +
    actionChoices(guidedActions, 'guided') + feedback() + hintButton('guided') +
    '<label for="guided-conclusion">Qual conclusão as evidências sustentam?</label>' +
    '<select id="guided-conclusion" data-field="guidedConclusion">' + options([
      ['', 'Selecione depois de investigar'],
      ['network', 'A internet de toda a organização caiu.'],
      ['access', 'Há indicação de restrição de acesso; o responsável deve validar o perfil.'],
      ['bypass', 'O suporte deve liberar todas as permissões para resolver.'],
    ], state.guidedConclusion) + '</select><div class="actions">' + primary('Conferir meu encaminhamento', 'guided-conclude') + '</div>' +
    (state.guidedReady ? '<section class="example"><h3>Registro-base para você completar no próximo caso</h3>' +
      '<p><strong>Problema e impacto:</strong> painel de agendamentos não abre; atendimento bloqueado.</p>' +
      '<p><strong>Evidências:</strong> acesso negado no recurso; outras páginas abrem.</p>' +
      '<p><strong>Encaminhamento:</strong> responsável por acessos deve validar a necessidade e o perfil. Nenhuma permissão foi alterada.</p>' +
      '<p class="note">Aqui o registro veio parcialmente pronto. No caso seguinte, você monta o seu.</p><div class="actions">' +
      primary('Aplicar em outro problema →', 'next') + '</div></section>' : '');
}
function transfer() {
  return '<p class="eyebrow">04 / Caso de Transferência · nova situação</p><h2>“A impressora não imprime. O computador travou?”</h2>' +
    '<p>A emissão de uma página de conferência está parada. Use apenas uma página de teste sem dados. O procedimento autoriza observar o equipamento e repor papel na bandeja; não autoriza desmontar, instalar programas ou usar contas de terceiros.</p>' +
    '<p class="note">Agora você escolhe o caminho. O glossário continua disponível; dicas específicas aparecem só se você pedir.</p>' +
    actionChoices(transferActions, 'transfer') + feedback() + hintButton('transfer') +
    '<div class="actions">' + primary('Preparar meu registro →', 'next') + '</div>';
}
function options(items, value) {
  return items.map(([key, label]) => '<option value="' + key + '" ' + (value === key ? 'selected' : '') + '>' + label + '</option>').join('');
}
function recordForm() {
  return '<p class="eyebrow">05 / Registro de Atendimento</p><h2>Curto o suficiente para ler. Claro o suficiente para continuar.</h2>' +
    '<p class="note" id="record-warning">Use só o cenário fictício. Não informe dados reais. Cada campo tem limite curto; não precisamos de uma redação.</p>' +
    '<form id="record-form" aria-describedby="record-warning">' +
    '<label for="record-problem">Problema e impacto <small>até 180 caracteres</small></label>' +
    '<textarea id="record-problem" data-record="problem" maxlength="180" required placeholder="O que deixou de funcionar e o que ficou impedido?">' + escapeHtml(state.record.problem) + '</textarea>' +
    '<fieldset><legend>Evidências que sustentam sua conclusão</legend>' +
    (Object.keys(state.transferFacts).length ? Object.entries(state.transferFacts).map(([key, item]) =>
      '<label class="check"><input type="checkbox" data-evidence="' + key + '" ' +
      (state.record.evidence.includes(key) ? 'checked' : '') + ' />' + item.text + '</label>').join('') :
      '<p class="note">Nenhuma evidência coletada. Você pode voltar ao bloco anterior para investigar.</p>') + '</fieldset>' +
    '<label for="record-cause">Hipótese sustentada pelos testes</label><select id="record-cause" data-record="cause" required>' +
    options([['', 'Selecione uma conclusão'], ['paper', 'Falta de papel impedia a impressão neste cenário.'], ['computer', 'Todo o computador estava travado.'], ['unknown', 'Ainda não tenho evidência suficiente da causa.']], state.record.cause) + '</select>' +
    '<label for="record-tests">Testes, ação e resultado <small>até 220 caracteres</small></label>' +
    '<textarea id="record-tests" data-record="tests" maxlength="220" required placeholder="Qual verificação fez, o que mudou e como confirmou?">' + escapeHtml(state.record.tests) + '</textarea>' +
    '<label for="record-outcome">Situação e condução</label><select id="record-outcome" data-record="outcome" required>' +
    options([['', 'Selecione o encaminhamento'], ['resolved', 'Resolvido dentro da autorização e confirmado pelo usuário.'], ['escalate', 'Ainda não resolvido: encaminhar com contexto e evidências.'], ['assumed', 'Provavelmente resolvido, sem confirmar o resultado.']], state.record.outcome) + '</select>' +
    '<label for="record-message">Mensagem para quem pediu ajuda <small>até 180 caracteres</small></label>' +
    '<textarea id="record-message" data-record="message" maxlength="180" required placeholder="Explique a situação em linguagem simples e indique o próximo passo.">' + escapeHtml(state.record.message) + '</textarea>' +
    '<div class="actions"><button class="primary" type="submit">Revisar minha tentativa →</button></div></form>' +
    '<p class="note" style="margin-top:18px">A checagem automática verifica escolhas e evidências. Ela não interpreta a qualidade do texto livre; você vai compará-lo com critérios e exemplo.</p>';
}
function objectiveResult() {
  return {
    safety: !state.transferRisk,
    evidence: state.record.evidence.includes('paper') && state.record.evidence.includes('validated') &&
      Boolean(state.transferFacts.validated) && state.record.cause === 'paper',
    conduct: Boolean(state.transferFacts.validated) && state.record.outcome === 'resolved',
  };
}
function debrief() {
  const result = objectiveResult();
  const all = Object.values(result).every(Boolean);
  const log = state.transferLog.map(item => '<li>' + item.label + '<br><small>' + item.result + '</small></li>').join('');
  return '<p class="eyebrow">06 / Debriefing da Missão</p><h2>' + (all ? 'Você reuniu evidências. Agora, confira a comunicação.' : 'Seu próximo passo ficou mais claro.') + '</h2>' +
    '<p>Sem nota e sem ranking. Esta revisão aponta o que sua tentativa sustenta e o que ainda precisa melhorar.</p>' +
    '<div class="rubric">' +
    '<div><h3>Segurança</h3><p>' + (result.safety ? 'Nenhuma ação proibida foi escolhida no caso de transferência.' : 'A barreira impediu uma ação não autorizada. Revise esse limite e faça uma nova tentativa.') + '</p></div>' +
    '<div><h3>Evidência</h3><p>' + (result.evidence ? 'A conclusão está ligada à falta de papel e ao teste confirmado.' : 'Sua conclusão ainda precisa ligar a observação de falta de papel ao resultado do teste; cite essas evidências.') + '</p></div>' +
    '<div><h3>Condução</h3><p>' + (result.conduct ? 'A ação autorizada teve resultado confirmado pelo usuário.' : 'Ainda falta demonstrar a resolução autorizada com confirmação. Não prometa que resolveu sem testar.') + '</p></div>' +
    '<div><h3>Comunicação</h3><p>O texto não foi corrigido automaticamente. Compare seu registro com os critérios abaixo.</p></div></div>' +
    '<details><summary>Rever meu caminho de investigação</summary><ol class="example">' + (log || '<li>Nenhuma investigação realizada nesta tentativa.</li>') + '</ol></details>' +
    '<details><summary>Rever o registro que escrevi</summary><div class="review-record">' +
    escapeHtml('Problema e impacto: ' + state.record.problem + '\nTestes, ação e resultado: ' + state.record.tests + '\nMensagem ao usuário: ' + state.record.message) + '</div></details>' +
    '<details><summary>Comparar com um exemplo fundamentado</summary><p><strong>Problema:</strong> página de conferência não impressa, atrasando a rotina.</p>' +
    '<p><strong>Evidências e ação:</strong> bandeja sem papel. Papel reposto conforme procedimento autorizado. Página de teste sem dados impressa e confirmada pelo solicitante.</p>' +
    '<p><strong>Mensagem:</strong> “A impressora estava sem papel. Reabastecemos a bandeja e confirmamos a impressão de teste. Você já pode retomar; se falhar novamente, avise qual mensagem aparece.”</p>' +
    '<p class="note">Não é uma frase obrigatória. Outros registros são válidos se preservarem fatos, testes, resultado e próximo passo.</p></details>' +
    '<fieldset><legend>Autoavaliação do texto · não é correção automática</legend>' +
    '<label class="check"><input type="checkbox" data-review="facts" />Diferenciei o que observei do que imaginei.</label>' +
    '<label class="check"><input type="checkbox" data-review="tests" />Outra pessoa consegue entender o teste e seu resultado.</label>' +
    '<label class="check"><input type="checkbox" data-review="next" />Expliquei a situação e o próximo passo sem jargão desnecessário.</label></fieldset>' +
    '<div class="feedback"><p><strong>Próxima melhoria:</strong> ' + (!result.safety ? 'Antes de agir, confirme se a ação está dentro da sua autorização.' :
      !result.evidence ? 'Colete e selecione evidências que sustentem a causa e o resultado.' :
      !result.conduct ? 'Confirme o resultado com quem relatou o problema.' : 'Leia sua mensagem como se outra pessoa fosse continuar o atendimento.') + '</p></div>' +
    '<div class="state-row"><span>Missão: Percorrida</span><span>Competência: Não verificada no protótipo</span><span>Apoio na transferência: ' + support('transfer') + '</span></div>' +
    '<p class="note" style="margin-top:18px">Percorrer não comprova domínio. A eficácia e os critérios de demonstração ainda precisam de validação com iniciantes. Nenhum registro foi salvo.</p>' +
    '<div class="actions">' + primary('Tentar um novo caminho', 'retry') + '<button data-step="4">Revisar meu registro</button><button data-view="journey">Minha jornada</button></div>';
}
function stageContent() { return [intro, demonstration, guided, transfer, recordForm, debrief][state.step](); }
function caseSummary() {
  return '<div class="case-summary"><p class="eyebrow">Relato em foco</p><blockquote>' +
    (state.step >= 3 ? '“A impressora não imprime.”' : '“O painel de agendamentos não abre.”') +
    '</blockquote><p class="note">Observar e testar com autorização. Não alterar dados, contas ou permissões.</p></div>';
}
function layoutA(stage) {
  return '<div class="focus-layout">' + stepNavigation() + '<article class="paper">' + stage + '</article>' + notebook() + '</div>';
}
function layoutB(stage) {
  return '<div class="bench-layout"><aside aria-label="Contexto e blocos">' + caseSummary() + stepNavigation() +
    '</aside><article class="paper">' + stage + '</article><aside aria-label="Evidências à vista">' + notebook(true) + '</aside></div>';
}
function layoutC(stage) {
  const log = state.step >= 3 ? state.transferLog : state.guidedLog;
  const recent = log.slice(-2).map(item => '<div class="chat-entry"><b>VOCÊ · ' + item.label + '</b>' + item.result + '</div>').join('');
  return '<div class="conversation-layout"><aside aria-label="Blocos da conversa">' + stepNavigation() +
    '</aside><section aria-label="Conversa orientada por roteiro"><p class="speaker">MANSK / ORIENTAÇÃO ROTEIRIZADA · SEM IA</p>' +
    recent + '<article class="paper">' + stage + '</article>' + notebook() + '</section></div>';
}
function journey() {
  return '<section class="journey-shell"><p class="eyebrow">Minha jornada · conta simulada</p><h1>' +
    (state.unlocked === 0 ? 'Sua primeira missão está pronta.' : 'Continue com contexto.') + '</h1>' +
    '<article class="paper"><p class="eyebrow">Missão piloto · método diagnóstico</p><h2>O sistema não abre.<br><span class="accent">Por onde começar?</span></h2>' +
    '<p>' + (state.unlocked === 0 ? 'Comece pelo relato. Você não precisa conhecer redes ou terminal.' : 'Seu ponto nesta demonstração: ' + steps[state.step] + '.') + '</p>' +
    '<div class="actions"><button class="primary" data-view="mission">' + (state.unlocked === 0 ? 'Começar missão' : 'Continuar missão') + '</button></div>' +
    '<div class="state-row"><span>Missão: ' + (state.reviewed ? 'Percorrida' : state.unlocked === 0 ? 'Não iniciada' : 'Em andamento') +
    '</span><span>Competência: Não verificada</span><span>Apoio na transferência: ' + (state.step < 3 ? 'Ainda sem evidência' : support('transfer')) + '</span></div></article>' +
    '<p class="note" style="margin-top:18px">A pausa conserva a tentativa só nesta aba. Recarregar recomeça; o salvamento real pertence à implementação futura.</p></section>';
}
function home() {
  return '<section class="home-shell"><p class="eyebrow">MANSK · Alexandre Blank Lopes</p><h1>O que você precisa <span class="accent">resolver hoje?</span></h1>' +
    '<p class="note">Referência reduzida da entrada aprovada. Esta rodada testa somente a Missão de Suporte.</p>' +
    '<div class="home-cards"><article class="paper"><p class="eyebrow">Jornada Profissional</p><h2>Tenho um problema ou projeto.</h2>' +
    '<p>Casos de Projeto → Como posso ajudar → Trajetória → Conte seu problema.</p><p class="note">AcompanhaPET, análise de dados, implantação e formação. O contato comercial não é executado nesta demonstração.</p></article>' +
    '<article class="paper"><p class="eyebrow">Jornada de Aprendizagem</p><h2>Quero aprender a resolver problemas de tecnologia.</h2>' +
    '<p>Sua missão piloto está pronta para começar ou retomar.</p><button class="primary" data-view="journey">Continuar minha jornada</button></article></div></section>';
}
function updateUrl(mode = 'replace') {
  const url = new URL(location.href);
  url.search = '';
  url.searchParams.set('variant', variant);
  if (view !== 'mission') url.searchParams.set('view', view);
  history[mode === 'push' ? 'pushState' : 'replaceState']({}, '', url);
}
function render() {
  document.body.dataset.variant = variant;
  const selected = variants.find(v => v.key === variant);
  document.getElementById('variant-name').innerHTML = '<small>COMPARAR A APRESENTAÇÃO</small>' + selected.key + ' · ' + selected.name;
  document.querySelector('.prototype-switch').hidden = view !== 'mission';
  if (view === 'home') content.innerHTML = home();
  else if (view === 'journey') content.innerHTML = journey();
  else {
    const stage = stageContent();
    content.innerHTML = '<div class="mission-heading"><div><p class="eyebrow">Missão piloto / Método diagnóstico</p>' +
      '<h1>O sistema não abre.<br><span class="accent">Por onde começar?</span></h1></div>' +
      '<p class="note">Uma decisão por bloco.<br>Sem cronômetro. No seu ritmo.</p></div>' +
      ({ A: layoutA, B: layoutB, C: layoutC })[variant](stage);
  }
  updateUrl();
}
function investigate(phase, key) {
  const target = state[phase + 'Facts'];
  let result = '';
  let barrier = false;
  if (phase === 'guided') {
    if (key === 'message') {
      fact(target, 'restricted', 'O painel mostra “Você não tem permissão para acessar esta área”.', 'mensagem relatada');
      result = 'A pessoa lê a mensagem: “Você não tem permissão para acessar esta área”.';
    } else if (key === 'scope') {
      fact(target, 'scope', 'Página inicial do sistema e outros sites abrem; o painel de agendamentos não.', 'comparação do solicitante');
      result = '“A página inicial e os outros sites abrem. Só o painel de agendamentos não.”';
    } else if (key === 'comparison') {
      fact(target, 'restricted', 'Outro usuário com a mesma função relata acesso negado ao painel.', 'relato, sem acesso à conta');
      fact(target, 'scope', 'Os dois usuários abrem a página inicial; a falha está no painel.', 'relatos comparados');
      result = 'Outro usuário, na própria sessão, relata acesso negado ao mesmo painel. Ambos abrem a página inicial. Nenhuma credencial foi compartilhada.';
    } else if (key === 'procedure') {
      fact(target, 'procedure', 'O responsável por acessos valida a necessidade e o perfil; suporte não altera permissões.', 'procedimento fictício');
      result = 'O procedimento define: registrar mensagem e recurso afetado; solicitar ao responsável que valide necessidade e perfil.';
    } else if (key === 'status') {
      fact(target, 'status', 'O aviso geral não informa indisponibilidade no momento.', 'aviso geral fictício');
      result = 'O aviso geral não informa incidentes. Isso não confirma o acesso dessa pessoa. A consulta foi segura, mas não basta para concluir a causa.';
    } else if (key === 'permission') {
      state.guidedRisk = true; barrier = true;
      result = 'Nada foi alterado. Mudar permissões ultrapassa sua autorização e pode expor dados. Preserve a mensagem e encaminhe ao responsável por acessos.';
    }
  } else {
    if (key === 'panel' || key === 'tray') {
      if (state.paperLoaded) {
        result = key === 'panel' ? 'O painel agora mostra “Pronta”.' : 'A bandeja agora contém papel.';
        fact(target, 'ready', result, 'observação após reposição');
      } else {
        result = key === 'panel' ? 'O painel mostra “Sem papel”.' : 'A bandeja está vazia. Nenhuma desmontagem foi feita.';
        fact(target, 'paper', result, key === 'panel' ? 'painel da impressora' : 'observação da bandeja');
      }
    } else if (key === 'scope') {
      fact(target, 'workstation', 'O computador abre outras páginas e responde aos comandos.', 'verificação sem alteração');
      result = 'As outras tarefas respondem normalmente. A dificuldade observada continua sendo imprimir.';
    } else if (key === 'supply') {
      if (!target.paper) result = 'Antes de agir, confira o painel ou a bandeja para fundamentar a reposição. Nada foi alterado nesta simulação.';
      else {
        state.paperLoaded = true;
        fact(target, 'action', 'Papel reposto conforme o procedimento autorizado; painel mostra “Pronta”.', 'ação simulada autorizada');
        result = 'Papel reposto. O painel mostra “Pronta”. A pessoa ainda não confirmou se consegue imprimir.';
      }
    } else if (key === 'validate') {
      if (state.paperLoaded) {
        fact(target, 'validated', 'Página de teste sem dados impressa e resultado confirmado pelo solicitante.', 'teste e confirmação');
        result = 'A página de teste foi impressa. A pessoa confirma: “Agora consegui imprimir e posso continuar.”';
      } else {
        fact(target, 'paper', 'A tentativa não imprime e o painel indica “Sem papel”.', 'teste sem dados');
        result = 'A página não foi impressa. O painel indica “Sem papel”.';
      }
    } else if (key === 'restart') {
      fact(target, 'restart', 'Reabrir o aplicativo não mudou a falha de impressão.', 'tentativa segura sem hipótese');
      result = 'O aplicativo reabriu, mas ainda não imprime. Essa tentativa consumiu esforço sem esclarecer a condição da impressora.';
    } else if (key === 'admin') {
      state.transferRisk = true; barrier = true;
      result = 'Nada foi executado. Usar a conta de outra pessoa e instalar programas não está autorizado. Retome uma observação segura; essa escolha precisará ser revista nesta tentativa.';
    }
  }
  const actions = phase === 'guided' ? guidedActions : transferActions;
  state[phase + 'Log'].push({ key, label: actions.find(item => item[0] === key)[1], result });
  notify(result, barrier);
}
function hint(phase) {
  const key = phase + 'Hint';
  state[key] = Math.min(3, state[key] + 1);
  const hints = phase === 'guided' ? [
    'Relembre o objetivo: delimitar a falha antes de propor uma mudança.',
    'Compare o que abre com o que não abre. A mensagem exata pode indicar um limite de acesso.',
    'Um caminho possível: pedir a mensagem, perguntar o que funciona e consultar o responsável por acessos. A mensagem de permissão, com outras páginas funcionando, sustenta um encaminhamento sem alterar o perfil.',
  ] : [
    'Descubra o que está impedido e observe o equipamento antes de alterar qualquer coisa.',
    'O painel ou a bandeja podem revelar uma condição local. Depois de uma ação, falta confirmar o resultado.',
    'Um caminho possível: ler “Sem papel”, repor papel conforme autorização e pedir uma página de teste sem dados. A confirmação do solicitante sustenta a resolução.',
  ];
  notify(hints[state[key] - 1]);
}
function retry() {
  state.transferFacts = {}; state.transferLog = []; state.transferRisk = false;
  state.transferHint = 0; state.paperLoaded = false; state.reviewed = false;
  state.record = { problem: '', tests: '', message: '', cause: '', outcome: '', evidence: [] };
  state.unlocked = 3;
  move(3);
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.view) {
    if (view !== button.dataset.view) {
      view = button.dataset.view;
      updateUrl('push');
    }
    render(); content.focus(); window.scrollTo({ top: 0 }); return;
  }
  if (button.dataset.dialog) {
    document.getElementById(button.dataset.dialog === 'references' ? 'reference-dialog' : 'account-dialog').showModal();
    return;
  }
  if (button.dataset.variant) {
    const index = variants.findIndex(item => item.key === variant);
    variant = variants[(index + (button.dataset.variant === 'next' ? 1 : 2)) % 3].key;
    render(); content.focus(); return;
  }
  if (button.dataset.step !== undefined && Number(button.dataset.step) <= state.unlocked) {
    move(Number(button.dataset.step)); return;
  }
  if (button.dataset.micro) {
    state.micro = button.dataset.micro;
    notify(state.micro === 'fact' ? 'Isso é um relato observado, não uma causa confirmada. Agora precisamos entender o que acontece ao abrir o painel.' :
      'Essa afirmação ainda é uma hipótese. O fato disponível é que a pessoa relata que o painel não abre. Confirme o sintoma antes de concluir a causa.');
    return;
  }
  if (button.dataset.investigate) {
    const [phase, key] = button.dataset.investigate.split(':'); investigate(phase, key); return;
  }
  if (button.dataset.hint) { hint(button.dataset.hint); return; }
  if (button.dataset.action === 'guided-conclude') {
    if (!state.guidedFacts.restricted || !state.guidedFacts.scope)
      notify('Ainda falta delimitar o problema: obtenha evidência da mensagem e do que continua funcionando. Há mais de um caminho para isso.');
    else if (state.guidedConclusion !== 'access')
      notify('As evidências não sustentam uma falha geral nem autorizam ampliar permissões. Indique quem pode validar esse acesso.');
    else { state.guidedReady = true; notify('Encaminhamento fundamentado: a restrição precisa de validação pelo responsável. Confira abaixo o registro-base, sem prometer uma liberação.'); }
    return;
  }
  if (button.dataset.action === 'next') {
    if (state.step === 2 && !state.guidedReady) notify('Confira novamente o encaminhamento antes de seguir.');
    else move(Math.min(5, state.step + 1));
  }
  if (button.dataset.action === 'retry') retry();
});
document.addEventListener('input', event => {
  if (event.target.dataset.record) state.record[event.target.dataset.record] = event.target.value;
  if (event.target.dataset.field === 'guidedConclusion') {
    state.guidedConclusion = event.target.value;
    state.guidedReady = false;
  }
});
document.addEventListener('change', event => {
  if (event.target.dataset.evidence) {
    const key = event.target.dataset.evidence;
    state.record.evidence = state.record.evidence.filter(item => item !== key);
    if (event.target.checked) state.record.evidence.push(key);
  }
});
document.addEventListener('submit', event => {
  if (event.target.id !== 'record-form') return;
  event.preventDefault();
  const missing = ['problem', 'tests', 'message'].find(key => !state.record[key].trim());
  if (missing) {
    const field = document.getElementById('record-' + missing);
    field.setCustomValidity('Escreva uma informação curta do cenário, não apenas espaços.');
    field.reportValidity();
    field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
    return;
  }
  state.reviewed = true; move(5);
});
document.addEventListener('keydown', event => {
  if (view !== 'mission' || event.target.closest('input,textarea,select,[contenteditable]') ||
      document.querySelector('dialog[open]')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 'next' : 'previous';
    document.querySelector('[data-variant="' + direction + '"]').click();
  }
});
window.addEventListener('popstate', () => {
  const current = new URLSearchParams(location.search);
  view = ['home', 'journey'].includes(current.get('view')) ? current.get('view') : 'mission';
  variant = variants.some(item => item.key === current.get('variant')) ? current.get('variant') : 'A';
  render(); content.focus(); window.scrollTo({ top: 0 });
});
render();
