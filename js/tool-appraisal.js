/* Digital Tool Appraisal (sections 1–5) — configuration and readout, English and Portuguese.
   Both pages use the same field ids and the same option values (flag-…, A/AP/APC, yes/unsure/no). */
(function (global) {
  'use strict';

  var S = {
    en: {
      title: 'Digital Tool Appraisal',
      subtitle: 'Digital Tools & Benchmarking — what one tool actually changes, and what it leaves undone',
      context: 'Module 3, Session 4 · 17 October 2026 · Sorbonne Business School / IDGP Academy',
      eyebrow: 'IAE Paris — Sorbonne Business School · IDGP Academy · Module 3',
      whoLabel: 'Appraised by', footer: 'Digital Tool Appraisal · Sorbonne Business School / IDGP Academy · Prof. Dr. Thiago Lima',
      filePrefix: 'tool-appraisal',
      readoutEmpty: 'Fill the instrument in and this will summarise what you have just told it — it restates your own answers; it does not score them.',
      closing: 'There is no score, deliberately. The appraisal restates the group’s answers and locates the gap; the follow-up — a benchmarking reference and the six-month roadmap — is the Benchmarking Study.',
      hl: ['Tool', 'Term it moves', 'Chain first breaks at', 'Decision'],
      philo: ['Teleology', 'Epistemology', 'Ontology'],
      headings: { 'The tool': '1 · The tool', 'VCAP triage': '2 · VCAP triage', 'The six conditions': '3 · The six conditions',
                  'Teleology': '4 · Philosophical debt — Teleology', 'Epistemology': '4 · Philosophical debt — Epistemology',
                  'Ontology': '4 · Philosophical debt — Ontology', 'The verdict': '5 · The verdict' },
      names: ['evidence base', 'technical capability in operation', 'workflow integration', 'translation into action', 'organisational outcome', 'net value'],
      clear: 'no break recorded',
      cBlank: 'You claimed this moves <b>C</b> and left the defence blank. That is the one combination worth revisiting before the appraisal goes anywhere: name what the organisation will be able to do afterwards without the system, or drop the claim to A and P.',
      cOk: 'You claimed <b>C</b> and defended it. Hold that sentence — it is what the business case should be arguing, and it is usually the part that goes unwritten.',
      ap: function (t) { return 'You placed this in <b>' + t + '</b>. That is a correctly identified purchase, not a weakness — but it means any competitor with the same budget can hold the same position, and the business case should be argued on that basis rather than on advantage.'; },
      aAndP: 'A and P',
      none: 'You could not place it in any term. Worth resolving before money moves.',
      wip: 'It makes work easier to start and does not cap what is in progress. By Little’s Law that lengthens lead time rather than shortening it — expect more in flight, not faster delivery.',
      truth: 'It adds another home for the same fact. That is a standing reconciliation cost, and it is the mechanism by which dashboards become negotiations.',
      rep: 'A competitor buys the same thing in months. Whatever advantage this produces has to come from something other than the tool.',
      pillars: function (p) { return 'Unarticulated pillars: <b>' + p + '</b>. Not a judgement on the system — a statement that the assumption was never written down, and therefore cannot be audited or improved. This is debt in C arriving dressed as a purchase of A.'; },
      pnames: ['teleology', 'epistemology', 'ontology'],
      unsure: 'You cannot say what the AI in this tool does. Before anything else, that is the question to put to the vendor in writing.',
      invalid: 'You have not named what would invalidate its training data. Every model learns the conditions that produced its data; naming the event that ends those conditions is the cheapest safeguard available.',
      missing: 'You have not named a variable the system cannot see. Either the representation is unusually complete, or nobody has looked — and the second is far more common.',
      brk: function (n, name) { return 'The chain first stops being a clear yes at <b>condition ' + n + ' · ' + name + '</b>. Conditions after it cannot compensate, so this is the one to resolve before anything downstream is argued.'; },
      brkOrg: function (n, name) { return 'The chain first stops being a clear yes at <b>condition ' + n + ' · ' + name + '</b> — one of the two organisational conditions. This is not a fault in the tool and no vendor can fix it: it is the capability the tool was supposed to be buying. It is also where the reviewed evidence says value is most often lost.'; },
      unmeasured: function (l) { return 'Not measured at: <b>' + l + '</b>. An unobserved implementation is a more tractable problem than a failing one — the next step is to measure, not to spend.'; },
      allClear: 'No break and no missing measure across all six conditions. That is rare; it is worth checking the answers against evidence somebody outside the project would accept.',
      evidence: 'Your evidence fails at least one of the three conditions on evidence quality. That does not make the tool wrong — it makes every answer above provisional, and it should be said in the business case rather than discovered later.',
      action: 'You have not written the action sentence: when the output says X, who does what, using what. Until that sentence exists, the project has identified a capability rather than a benefit.',
      next: 'Next: the <b>Benchmarking Study</b> — one reference that already does this well, and the six-month roadmap across the three capability gaps.'
    },
    pt: {
      title: 'Avaliação de Ferramenta Digital',
      subtitle: 'Ferramentas Digitais e Benchmarking — o que uma ferramenta realmente muda, e o que deixa sem fazer',
      context: 'Módulo 3, Sessão 4 · 17 de outubro de 2026 · Sorbonne Business School / IDGP Academy',
      eyebrow: 'IAE Paris — Sorbonne Business School · IDGP Academy · Módulo 3',
      whoLabel: 'Avaliado por', footer: 'Avaliação de Ferramenta Digital · Sorbonne Business School / IDGP Academy · Prof. Dr. Thiago Lima',
      filePrefix: 'avaliacao-ferramenta',
      readoutEmpty: 'Preencha o instrumento e este quadro resume o que vocês acabaram de dizer — ele devolve as próprias respostas; não dá nota.',
      closing: 'Não há nota, de propósito. A avaliação devolve as respostas do grupo e localiza a lacuna; o desdobramento — uma referência de benchmarking e o roteiro de seis meses — é o Estudo de Benchmarking.',
      hl: ['Ferramenta', 'Termo que move', 'A cadeia quebra em', 'Decisão'],
      philo: ['Teleologia', 'Epistemologia', 'Ontologia'],
      headings: { 'A ferramenta': '1 · A ferramenta', 'Triagem VCAP': '2 · Triagem VCAP', 'As seis condições': '3 · As seis condições',
                  'Teleologia': '4 · Dívida filosófica — Teleologia', 'Epistemologia': '4 · Dívida filosófica — Epistemologia',
                  'Ontologia': '4 · Dívida filosófica — Ontologia', 'O veredito': '5 · O veredito' },
      names: ['base de evidência', 'capacidade técnica em operação', 'integração ao fluxo de trabalho', 'tradução em ação', 'resultado organizacional', 'valor líquido'],
      clear: 'nenhuma quebra registrada',
      cBlank: 'Vocês afirmaram que isto move <b>C</b> e deixaram a defesa em branco. É a combinação que vale revisar antes de a avaliação seguir adiante: digam o que a organização será capaz de fazer depois, sem o sistema — ou rebaixem a afirmação para A e P.',
      cOk: 'Vocês afirmaram <b>C</b> e defenderam. Guardem essa frase — é ela que o business case deveria estar argumentando, e costuma ser a parte que fica sem escrever.',
      ap: function (t) { return 'Vocês classificaram isto em <b>' + t + '</b>. É uma compra corretamente identificada, não uma fraqueza — mas significa que qualquer concorrente com o mesmo orçamento pode ocupar a mesma posição, e o business case deve ser argumentado nessa base, não como vantagem.'; },
      aAndP: 'A e P',
      none: 'Vocês não conseguiram classificar em nenhum termo. Vale resolver isso antes de o dinheiro sair.',
      wip: 'A ferramenta facilita iniciar trabalho e não limita o que está em andamento. Pela Lei de Little, isso aumenta o lead time em vez de reduzi-lo — esperem mais coisas em andamento, não entregas mais rápidas.',
      truth: 'Ela cria mais um lugar para o mesmo dado. Isso é um custo permanente de conciliação, e é o mecanismo pelo qual dashboards viram negociações.',
      rep: 'Um concorrente compra a mesma coisa em meses. Qualquer vantagem que isto produza tem de vir de algo que não seja a ferramenta.',
      pillars: function (p) { return 'Pilares não articulados: <b>' + p + '</b>. Não é um julgamento sobre o sistema — é a constatação de que a premissa nunca foi escrita e, portanto, não pode ser auditada nem melhorada. É dívida em C chegando vestida de compra de A.'; },
      pnames: ['teleologia', 'epistemologia', 'ontologia'],
      unsure: 'Vocês não sabem dizer o que a IA desta ferramenta faz. Antes de qualquer coisa, essa é a pergunta a fazer ao fornecedor, por escrito.',
      invalid: 'Vocês não nomearam o que invalidaria os dados de treinamento. Todo modelo aprende as condições que geraram seus dados; nomear o evento que encerra essas condições é a salvaguarda mais barata que existe.',
      missing: 'Vocês não nomearam uma variável que o sistema não enxerga. Ou a representação é incomumente completa, ou ninguém olhou — e a segunda hipótese é muito mais comum.',
      brk: function (n, name) { return 'A cadeia deixa de ser um sim claro na <b>condição ' + n + ' · ' + name + '</b>. As condições seguintes não compensam, então é esta que precisa ser resolvida antes de qualquer argumento sobre o que vem depois.'; },
      brkOrg: function (n, name) { return 'A cadeia deixa de ser um sim claro na <b>condição ' + n + ' · ' + name + '</b> — uma das duas condições organizacionais. Não é defeito da ferramenta e nenhum fornecedor resolve: é a capacidade que a ferramenta deveria estar comprando. É também onde a evidência revisada diz que o valor mais se perde.'; },
      unmeasured: function (l) { return 'Não medido em: <b>' + l + '</b>. Uma implementação não observada é um problema mais tratável do que uma que fracassa — o próximo passo é medir, não gastar.'; },
      allClear: 'Nenhuma quebra e nenhuma medida ausente nas seis condições. Isso é raro; vale conferir as respostas contra uma evidência que alguém de fora do projeto aceitaria.',
      evidence: 'A evidência de vocês falha em pelo menos um dos três critérios de qualidade. Isso não torna a ferramenta errada — torna provisórias todas as respostas acima, e isso deve ser dito no business case em vez de descoberto depois.',
      action: 'Vocês não escreveram a frase da ação: quando o resultado disser X, quem faz o quê, usando o quê. Enquanto essa frase não existir, o projeto identificou uma capacidade, não um benefício.',
      next: 'Próximo passo: o <b>Estudo de Benchmarking</b> — uma referência que já faz isto bem, e o roteiro de seis meses para as três lacunas de capacidade.'
    }
  };

  function firstBreak(api) {
    for (var i = 0; i < 6; i++) { if (api.val('k-' + i).indexOf('flag-') === 0) return i; }
    return -1;
  }

  function readout(L, api) {
    var out = [];
    var term = api.val('t-term'), cClaim = api.val('t-c').trim();
    if (term === 'APC' && !cClaim) out.push(L.cBlank);
    else if (term === 'APC') out.push(L.cOk);
    else if (term === 'A' || term === 'AP') out.push(L.ap(term === 'A' ? 'A' : L.aAndP));
    else if (term === 'none') out.push(L.none);
    if (api.flagged('t-wip')) out.push(L.wip);
    if (api.flagged('t-truth')) out.push(L.truth);
    if (api.flagged('t-replicate')) out.push(L.rep);

    var ai = api.val('t-ai');
    if (ai === 'yes' || ai === 'unsure') {
      var p = [];
      if (api.flagged('p-hierarchy')) p.push(L.pnames[0]);
      if (api.flagged('p-uncertainty')) p.push(L.pnames[1]);
      if (api.flagged('p-review')) p.push(L.pnames[2]);
      if (p.length) out.push(L.pillars(p.join(', ')));
      if (ai === 'unsure') out.push(L.unsure);
      if (api.blank('p-invalidate')) out.push(L.invalid);
      if (api.blank('p-missing')) out.push(L.missing);
    }

    var fb = -1, unm = [], answered = 0;
    for (var i = 0; i < 6; i++) {
      var v = api.val('k-' + i);
      if (!v) continue;
      answered++;
      if (v === 'flag-ku') unm.push(i + ' · ' + L.names[i]);
      if (v.indexOf('flag-') === 0 && fb === -1) fb = i;
    }
    if (fb === 2 || fb === 3) out.push(L.brkOrg(fb, L.names[fb]));
    else if (fb !== -1) out.push(L.brk(fb, L.names[fb]));
    if (unm.length) out.push(L.unmeasured(unm.join('; ')));
    if (answered === 6 && fb === -1 && !unm.length) out.push(L.allClear);
    if (api.flagged('k-valid')) out.push(L.evidence);
    if (api.blank('k-3b') && answered) out.push(L.action);
    if (out.length) out.push(L.next);
    return out;
  }

  function init(lang) {
    var L = S[lang];
    var aiQ = document.getElementById('t-ai'), layer = document.getElementById('ai-layer'), gate = document.getElementById('ai-gate');
    Instrument.init({
      lang: lang, key: lang === 'pt' ? 'sorbonne-tool-appraisal-pt-v1' : 'sorbonne-tool-appraisal-v1',
      rootId: 'canvas', whoId: 't-who', slugFrom: 't-name',
      title: L.title, subtitle: L.subtitle, context: L.context, eyebrow: L.eyebrow,
      whoLabel: L.whoLabel, footer: L.footer, filePrefix: L.filePrefix, closingNote: L.closing,
      readoutId: 'readout-body', readoutEmpty: L.readoutEmpty, headings: L.headings,
      skipSection: function (sec, api) { var v = api.val('t-ai'); return L.philo.indexOf(sec) !== -1 && v !== 'yes' && v !== 'unsure'; },
      onChange: function () { var on = aiQ.value === 'yes' || aiQ.value === 'unsure'; layer.hidden = !on; gate.hidden = on; },
      highlights: [
        { label: L.hl[0], id: 't-name' },
        { label: L.hl[1], compute: function (api) { return api.txt('t-term').split(' — ')[0]; } },
        { label: L.hl[2], compute: function (api) { var f = firstBreak(api); if (f === -1) { var any = false; for (var i = 0; i < 6; i++) if (api.val('k-' + i)) any = true; return any ? L.clear : ''; } return f + ' · ' + L.names[f]; } },
        { label: L.hl[3], compute: function (api) { return api.txt('t-decision').split(' — ')[0]; } }
      ],
      readout: function (api) { return readout(L, api); },
      buttons: { download: 't-download', copy: 't-copy', clear: 't-clear', paste: 't-paste' }, pasteBoxId: 'pastebox'
    });
  }

  global.ToolAppraisal = { init: init };
})(window);
