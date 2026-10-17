/* The Value Case Canvas — configuration and readout, English and Portuguese.
   Both pages use the same field ids; the readout matches option text in either language. */
(function (global) {
  'use strict';

  // "2 min", "15 minutes", "about 4 hours", "3 semanas", "1,5 dia" -> minutes (calendar), or null
  function toMinutes(s) {
    if (!s) return null;
    var m = String(s).toLowerCase().replace(',', '.').match(/(\d+(?:\.\d+)?)\s*([a-zçãéêíóú]+)/);
    if (!m) return null;
    var n = parseFloat(m[1]), u = m[2];
    if (/^(min|minute|minuto)/.test(u)) return n;
    if (/^(h|hr|hour|hora)/.test(u)) return n * 60;
    if (/^(d|day|dia)/.test(u)) return n * 1440;
    if (/^(w|wk|week|semana)/.test(u)) return n * 10080;
    if (/^(mo|month|m[eê]s|meses)/.test(u)) return n * 43200;
    return null;
  }

  function flowEfficiency(api) {
    var pt = toMinutes(api.val('c-pt')), lt = toMinutes(api.val('c-lt'));
    if (pt === null || lt === null || lt <= 0) return null;
    return Math.round(100 * pt / lt);
  }

  var S = {
    en: {
      title: 'The Value Case',
      subtitle: 'Lean Six Sigma & Continuous Improvement — group canvas',
      context: 'Module 3, Session 4 · 17 October 2026 · Sorbonne Business School / IDGP Academy',
      eyebrow: 'IAE Paris — Sorbonne Business School · IDGP Academy · Module 3',
      whoLabel: 'Group',
      footer: 'The Value Case Canvas · Sorbonne Business School / IDGP Academy · Prof. Dr. Thiago Lima',
      filePrefix: 'value-case',
      readoutEmpty: 'Fill the canvas in and this will restate what you have just told it — it does not score the project.',
      closing: 'The canvas restates the group’s own answers. It does not score the project; it says where the argument is still open.',
      hl: ['Project', 'Decision', 'Flow efficiency', 'Waste removed'],
      fe: function (x) { return 'Flow efficiency ≈ <b>' + x + '%</b> (process time ÷ lead time). ' + (x > 50 ? 'That is unusually high for an administrative process — check that lead time is calendar time from the first step to the last, including every queue.' : x > 15 ? 'Higher than the two-to-ten per cent typical of administrative processes, but most of the elapsed time is still queue rather than work — and that queue is where the project should be aimed.' : 'Most of the elapsed time is queue, not work. That gap is where the project should be aimed — and it is the number to report.'); },
      feMissing: 'Process time and lead time are not both written with a unit (minutes, hours, days, weeks), so flow efficiency cannot be computed. It is the single number a value stream map exists to produce.',
      noWTP: 'You said the project moves none of the four competitive priorities. Then it competes on the cost edge only — legitimate, but it is the edge every rival is also working on.',
      noWaste: 'You could not name the waste from the eight. Then the project does not yet move the cost edge in a way anyone can verify — say so in the verdict rather than claiming a saving.',
      neither: 'Neither edge moves: no competitive priority and no named waste. That is the one result that should stop the project until somebody can say what it is for.',
      overprod: 'The waste removed is <b>overproduction</b> — the root waste. Projects that remove it usually remove several others with it, and are worth more than their business case claims.',
      noMag: 'There is no order of magnitude for the waste yet. Write how and when it will be measured — that measurement is the first deliverable, and the basis for any later claim.',
      cEmpty: '<b>C is empty.</b> A legitimate and common answer — but it means a competitor willing to spend the same money can do the same. Fund to the threshold, and ask what would have to be added for the organisation to end the project better at improving.',
      cCheck: 'You wrote something under <b>C</b>. Test it once more: does it name something the organisation will be able to <i>do</i> afterwards — a routine that survives, a standard that is now owned, a team that can run the next improvement unaided? A result such as a shorter time or a higher score is the consequence of A and P, not C.',
      neverWhy: 'You answered that a competitor could not replicate this, and did not say why. That “why” is the whole claim to advantage — write it in the last field.',
      condBlank: 'You chose to fund with conditions and did not write the conditions. The verdict is not complete until the first one is named.',
      parity: 'Copyable in months, with nothing in C: this is operational effectiveness, not advantage. Funding it can be right — but argue it as parity, not as strategy.',
      noBuild: 'Nothing is written under A, P or C. Field 5 is where the business case usually goes quiet; it is worth the two minutes.'
    },
    pt: {
      title: 'O Caso de Valor',
      subtitle: 'Lean Six Sigma e Melhoria Contínua — canvas do grupo',
      context: 'Módulo 3, Sessão 4 · 17 de outubro de 2026 · Sorbonne Business School / IDGP Academy',
      eyebrow: 'IAE Paris — Sorbonne Business School · IDGP Academy · Módulo 3',
      whoLabel: 'Grupo',
      footer: 'Canvas do Caso de Valor · Sorbonne Business School / IDGP Academy · Prof. Dr. Thiago Lima',
      filePrefix: 'caso-de-valor',
      readoutEmpty: 'Preencha o canvas e este quadro devolve o que vocês acabaram de dizer — ele não dá nota ao projeto.',
      closing: 'O canvas devolve as respostas do próprio grupo. Não dá nota ao projeto; mostra onde o argumento ainda está em aberto.',
      hl: ['Projeto', 'Decisão', 'Eficiência de fluxo', 'Desperdício removido'],
      fe: function (x) { return 'Eficiência de fluxo ≈ <b>' + x + '%</b> (tempo de processo ÷ lead time). ' + (x > 50 ? 'É um valor raro em processos administrativos — confira se o lead time é tempo de calendário do primeiro ao último passo, incluindo todas as filas.' : x > 15 ? 'Acima dos dois a dez por cento típicos de processos administrativos, mas a maior parte do tempo decorrido ainda é fila, não trabalho — e é nessa fila que o projeto deve mirar.' : 'A maior parte do tempo decorrido é fila, não trabalho. É nessa diferença que o projeto deve mirar — e é esse o número a reportar.'); },
      feMissing: 'Tempo de processo e lead time não estão ambos escritos com unidade (minutos, horas, dias, semanas), então a eficiência de fluxo não pode ser calculada. É o número que um mapa do fluxo de valor existe para produzir.',
      noWTP: 'Vocês disseram que o projeto não mexe em nenhuma das quatro prioridades competitivas. Então ele compete só pela borda do custo — legítimo, mas é a borda em que todo concorrente também trabalha.',
      noWaste: 'Vocês não conseguiram nomear o desperdício entre os oito. Então o projeto ainda não mexe na borda do custo de um jeito verificável — digam isso no veredito em vez de prometer economia.',
      neither: 'Nenhuma das bordas se move: nenhuma prioridade competitiva e nenhum desperdício nomeado. É o único resultado que deveria parar o projeto até alguém dizer para que ele serve.',
      overprod: 'O desperdício removido é a <b>superprodução</b> — o desperdício-raiz. Projetos que a removem costumam remover vários outros junto, e valem mais do que o business case afirma.',
      noMag: 'Ainda não há ordem de grandeza para o desperdício. Escrevam como e quando ele será medido — essa medição é a primeira entrega, e a base de qualquer afirmação posterior.',
      cEmpty: '<b>C está vazio.</b> Resposta legítima e comum — mas significa que um concorrente disposto a gastar o mesmo dinheiro consegue fazer igual. Financiem até o patamar necessário e perguntem o que teria de ser acrescentado para a organização terminar o projeto melhor em melhorar.',
      cCheck: 'Vocês escreveram algo em <b>C</b>. Testem mais uma vez: isso nomeia algo que a organização será capaz de <i>fazer</i> depois — uma rotina que sobrevive, um padrão que agora tem dono, uma equipe que conduz a próxima melhoria sem ajuda externa? Um resultado, como um tempo menor ou uma nota maior, é consequência de A e P, não de C.',
      neverWhy: 'Vocês responderam que um concorrente não conseguiria replicar isto, e não disseram por quê. Esse “por quê” é toda a alegação de vantagem — escrevam no último campo.',
      condBlank: 'Vocês escolheram financiar com condições e não escreveram as condições. O veredito não está completo até a primeira ser nomeada.',
      parity: 'Copiável em meses e nada em C: isto é eficácia operacional, não vantagem. Financiar pode estar certo — mas argumentem como paridade, não como estratégia.',
      noBuild: 'Nada escrito em A, P ou C. O campo 5 é onde o business case costuma silenciar; vale os dois minutos.'
    }
  };

  function readout(L, api) {
    var out = [];
    var fe = flowEfficiency(api);
    if (fe !== null) out.push(L.fe(fe));
    else if (!api.blank('c-pt') || !api.blank('c-lt')) out.push(L.feMissing);

    var pri = api.txt('c-priority'), waste = api.txt('c-waste');
    var noW = /^(None|Nenhuma)/.test(pri), noC = /^(None of|Nenhum dos)/.test(waste);
    if (noW && noC) out.push(L.neither);
    else { if (noW) out.push(L.noWTP); if (noC) out.push(L.noWaste); }
    if (/^(Overproduction|Superprodução)/.test(waste)) out.push(L.overprod);
    if (waste && !noC && api.blank('c-magnitude')) out.push(L.noMag);

    var a = api.val('c-assets').trim(), p = api.val('c-processes').trim(), c = api.val('c-capability').trim();
    var NO = /^(no|não|nao|none|nenhum|nenhuma|—|-|n\/a)\.?$/i;
    if (!a && !p && !c) out.push(L.noBuild);
    else if (!c || NO.test(c)) out.push(L.cEmpty);
    else out.push(L.cCheck);

    var rep = api.txt('c-replicate'), dec = api.txt('c-verdict'), cond = api.val('c-conditions').trim();
    var condEmpty = !cond || /^[—-]$/.test(cond);
    if (/^(They could not|Não conseguiriam)/.test(rep) && condEmpty) out.push(L.neverWhy);
    if (/^(Fund with conditions|Financiar com condições)/.test(dec) && condEmpty) out.push(L.condBlank);
    if (/^(Months|Meses)/.test(rep) && (!c || NO.test(c))) out.push(L.parity);
    return out;
  }

  function init(lang) {
    var L = S[lang];
    Instrument.init({
      lang: lang, key: lang === 'pt' ? 'sorbonne-value-case-pt-v1' : 'sorbonne-value-case-v1',
      rootId: 'canvas', whoId: 'c-group', slugFrom: 'c-group',
      title: L.title, subtitle: L.subtitle, context: L.context, eyebrow: L.eyebrow,
      whoLabel: L.whoLabel, footer: L.footer, filePrefix: L.filePrefix, closingNote: L.closing,
      readoutId: 'readout-body', readoutEmpty: L.readoutEmpty,
      highlights: [
        { label: L.hl[0], id: 'c-project' },
        { label: L.hl[1], id: 'c-verdict' },
        { label: L.hl[2], compute: function (api) { var x = flowEfficiency(api); return x === null ? '' : x + '%'; } },
        { label: L.hl[3], compute: function (api) { return api.txt('c-waste').split(' — ')[0]; } }
      ],
      readout: function (api) { return readout(L, api); },
      buttons: { download: 'c-download', copy: 'c-copy', clear: 'c-clear' }
    });
  }

  global.ValueCase = { init: init, toMinutes: toMinutes };
})(window);
