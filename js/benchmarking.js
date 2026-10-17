/* Benchmarking Study — configuration and readout, English and Portuguese.
   Carries the tool name over from the Digital Tool Appraisal in the same browser, and migrates
   answers given in sections 6–7 of the earlier, single-page version of the appraisal. */
(function (global) {
  'use strict';

  var S = {
    en: {
      title: 'Benchmarking Study',
      subtitle: 'Digital Tools & Benchmarking — the reference, decoded, and the six-month roadmap',
      context: 'Module 3, Session 4 · 17 October 2026 · Sorbonne Business School / IDGP Academy',
      eyebrow: 'IAE Paris — Sorbonne Business School · IDGP Academy · Module 3',
      whoLabel: 'Prepared by', footer: 'Benchmarking Study · Sorbonne Business School / IDGP Academy · Prof. Dr. Thiago Lima',
      filePrefix: 'benchmarking-study',
      readoutEmpty: 'Fill the study in and this will restate what you have just told it — it does not score it.',
      closing: 'The study restates the group’s own answers. It does not score them; it says where the argument for transfer is still open.',
      hl: ['Reference', 'What would be copied', 'Decision', 'First gap'],
      appraisalKey: 'sorbonne-tool-appraisal-v1',
      winner: 'You placed the gap on an <b>order winner</b>. Imitation is the wrong instrument there: benchmarking moves you towards a frontier others already occupy, and on a winner the point is a difference, not parity. Use the reference to learn the routine — then ask what you would build that it does not have.',
      unsureKind: 'You are not sure whether the gap is on a qualifier or an order winner. Settle that first: it decides whether converging with the reference is the goal or the risk.',
      compet: 'Your reference is a <b>direct competitor</b> and the gap is on an order winner. Done well by both of you, this converges you on the same operating model — the endpoint is no advantage for either.',
      comp: 'The two sets of figures are not comparable. Until the boundaries, the definition and the conditions match, the size of the gap is not known — and a target set from it is arithmetic, not evidence.',
      compUnchecked: 'You have not checked whether the figures are comparable. Most benchmarking failures are arithmetic before they are strategic; it is the cheapest check in the study.',
      noPractice: 'You have named a reference but not what it does. Phase 3 of the method — the practice that produces the gap — is the one that matters, and the one most often skipped.',
      howlong: 'Nobody here knows how long the reference took. Until somebody does, you do not yet know what you are proposing to replicate — and a plan built on that gap is a budget problem disguised as a schedule.',
      adoptC: 'You are proposing to <b>adopt</b> something you classified as a <b>rule-in-use</b>. Rules-in-use are the part that does not transfer by observation — if the conditions really are already in place, say which ones; if not, this is an adapt, with time attached.',
      discard: '<b>Discard</b> is a finding, not a failure. Record why: the condition the practice depends on, and whether it is one you could accumulate if you decided to.',
      noBundle: 'You have not named what else the practice depends on at the reference. A practice adopted without its complements imposes its costs without its returns.',
      noAbsorb: 'The absorption condition is blank: what our people would need to know already. Practices fail to transfer for reasons of knowledge far more often than of motivation.',
      quick: function (l) { return 'High value and high feasibility: <b>' + l + '</b>. These belong in the first two months — not because they are easy, but because an early demonstrated result is what buys the patience the harder items will need.'; },
      hardEarly: function (l) { return '<b>' + l + '</b>: high value, low feasibility, scheduled in the first two months. That ordering is the commonest way a roadmap loses its sponsor. Either break it into a part that is feasible now, or move it later and say openly what has to change first.'; },
      hard: function (l) { return 'High value and low feasibility: <b>' + l + '</b>. Time compression diseconomies apply — this is accumulated, not purchased, so the honest plan states the condition that has to be built rather than the date it is wanted by.'; },
      filler: 'Your most feasible items are also your least valuable. A roadmap made of these delivers visible activity and no change in position, which is the failure mode that is hardest to detect from inside.',
      noFirst: 'The month-two checkpoint is blank. A roadmap whose first verifiable outcome cannot be written in one sentence is a list of intentions with dates attached.',
      gap: 'Gap'
    },
    pt: {
      title: 'Estudo de Benchmarking',
      subtitle: 'Ferramentas Digitais e Benchmarking — a referência, decodificada, e o roteiro de seis meses',
      context: 'Módulo 3, Sessão 4 · 17 de outubro de 2026 · Sorbonne Business School / IDGP Academy',
      eyebrow: 'IAE Paris — Sorbonne Business School · IDGP Academy · Módulo 3',
      whoLabel: 'Elaborado por', footer: 'Estudo de Benchmarking · Sorbonne Business School / IDGP Academy · Prof. Dr. Thiago Lima',
      filePrefix: 'estudo-benchmarking',
      readoutEmpty: 'Preencha o estudo e este quadro devolve o que vocês acabaram de dizer — ele não dá nota.',
      closing: 'O estudo devolve as respostas do próprio grupo. Não dá nota; mostra onde o argumento de transferência ainda está em aberto.',
      hl: ['Referência', 'O que seria copiado', 'Decisão', 'Primeira lacuna'],
      appraisalKey: 'sorbonne-tool-appraisal-pt-v1',
      winner: 'Vocês situaram a lacuna num <b>ganhador de pedido</b>. Imitação é o instrumento errado aí: o benchmarking leva vocês a uma fronteira que outros já ocupam, e num ganhador o objetivo é diferença, não paridade. Usem a referência para aprender a rotina — e depois perguntem o que vocês construiriam que ela não tem.',
      unsureKind: 'Vocês não sabem se a lacuna está num qualificador ou num ganhador de pedido. Resolvam isso primeiro: é o que decide se convergir com a referência é o objetivo ou o risco.',
      compet: 'A referência é um <b>concorrente direto</b> e a lacuna está num ganhador de pedido. Bem feito pelos dois lados, isto faz vocês convergirem para o mesmo modelo de operação — e o ponto final é nenhuma vantagem para ninguém.',
      comp: 'Os dois conjuntos de números não são comparáveis. Enquanto as fronteiras, a definição e as condições não coincidirem, o tamanho da lacuna não é conhecido — e uma meta tirada dele é aritmética, não evidência.',
      compUnchecked: 'Vocês não verificaram se os números são comparáveis. A maioria das falhas de benchmarking é aritmética antes de ser estratégica; é a checagem mais barata do estudo.',
      noPractice: 'Vocês nomearam uma referência, mas não o que ela faz. A fase 3 do método — a prática que produz a lacuna — é a que importa, e a mais pulada.',
      howlong: 'Ninguém aqui sabe quanto tempo a referência levou. Enquanto ninguém souber, vocês ainda não sabem o que estão propondo replicar — e um plano construído sobre essa lacuna é um problema de orçamento disfarçado de cronograma.',
      adoptC: 'Vocês propõem <b>adotar</b> algo que classificaram como <b>regra-em-uso</b>. Regras-em-uso são justamente a parte que não se transfere por observação — se as condições de fato já existem, digam quais; se não, isto é adaptar, com tempo associado.',
      discard: '<b>Descartar</b> é um achado, não um fracasso. Registrem por quê: a condição de que a prática depende, e se é uma que vocês poderiam acumular se decidissem.',
      noBundle: 'Vocês não nomearam do que mais a prática depende na referência. Uma prática adotada sem seus complementos impõe os custos sem entregar os retornos.',
      noAbsorb: 'A condição de absorção está em branco: o que nossas pessoas já precisariam saber. Práticas deixam de se transferir muito mais por razões de conhecimento do que de motivação.',
      quick: function (l) { return 'Alto valor e alta viabilidade: <b>' + l + '</b>. Estes vão nos dois primeiros meses — não por serem fáceis, mas porque um resultado demonstrado cedo é o que compra a paciência de que os itens difíceis vão precisar.'; },
      hardEarly: function (l) { return '<b>' + l + '</b>: alto valor, baixa viabilidade, programado para os dois primeiros meses. Essa ordem é a forma mais comum de um roteiro perder o patrocinador. Ou quebrem em uma parte viável agora, ou adiem e digam abertamente o que precisa mudar antes.'; },
      hard: function (l) { return 'Alto valor e baixa viabilidade: <b>' + l + '</b>. Valem as deseconomias de compressão de tempo — isto se acumula, não se compra; o plano honesto declara a condição a construir, não a data em que se quer o resultado.'; },
      filler: 'Os itens mais viáveis são também os de menor valor. Um roteiro feito deles entrega atividade visível e nenhuma mudança de posição — a falha mais difícil de enxergar de dentro.',
      noFirst: 'O marco do fim do segundo mês está em branco. Um roteiro cujo primeiro resultado verificável não cabe numa frase é uma lista de intenções com datas.',
      gap: 'Lacuna'
    }
  };

  function setByValueOrText(el, v) {
    if (!el || !v) return;
    if (el.options) {
      var o = [].slice.call(el.options).filter(function (o) { return o.value === v || o.text === v; })[0];
      if (o) el.value = o.value;
    } else el.value = v;
  }

  function readout(L, api) {
    var out = [];
    var kind = api.val('s-kind');
    if (kind === 'flag-winner') {
      out.push(L.winner);
      if (api.val('b-type') === 'flag-competitive') out.push(L.compet);
    } else if (kind === 'flag-unsure') out.push(L.unsureKind);
    var comp = api.val('b-comparable');
    if (comp === 'flag-comp') out.push(L.comp);
    else if (comp === 'flag-ku') out.push(L.compUnchecked);
    if (!api.blank('b-ref') && api.blank('b-what')) out.push(L.noPractice);
    if (api.flagged('b-howlong')) out.push(L.howlong);
    var term = api.val('b-term'), dec = api.val('b-decision');
    if (term === 'C' && dec === 'adopt') out.push(L.adoptC);
    if (dec === 'discard') out.push(L.discard);
    if (!api.blank('b-ref') && api.blank('b-bundle')) out.push(L.noBundle);
    if ((term === 'P' || term === 'C') && api.blank('b-condition')) out.push(L.noAbsorb);

    var seq = [];
    for (var g = 1; g <= 3; g++) {
      var n = api.val('r-g' + g).trim(), v = api.val('r-v' + g), f = api.val('r-f' + g), h = api.val('r-h' + g);
      if (n || v || f || h) seq.push({ n: n || (L.gap + ' ' + g), v: v, f: f, h: h });
    }
    if (seq.length) {
      var names = function (a) { return a.map(function (x) { return x.n; }).join('; '); };
      var quick = seq.filter(function (x) { return x.v === 'H' && x.f === 'H'; });
      var hard = seq.filter(function (x) { return x.v === 'H' && x.f === 'L'; });
      var filler = seq.filter(function (x) { return x.v === 'L' && x.f === 'H'; });
      if (quick.length) out.push(L.quick(names(quick)));
      if (hard.length) {
        var early = hard.filter(function (x) { return x.h === '0'; });
        out.push(early.length ? L.hardEarly(names(early)) : L.hard(names(hard)));
      }
      if (filler.length && !quick.length) out.push(L.filler);
      if (api.blank('r-first')) out.push(L.noFirst);
    }
    return out;
  }

  function init(lang) {
    var L = S[lang];
    Instrument.init({
      lang: lang, key: lang === 'pt' ? 'sorbonne-benchmarking-pt-v1' : 'sorbonne-benchmarking-v1',
      rootId: 'canvas', whoId: 's-who', slugFrom: 'b-ref',
      title: L.title, subtitle: L.subtitle, context: L.context, eyebrow: L.eyebrow,
      whoLabel: L.whoLabel, footer: L.footer, filePrefix: L.filePrefix, closingNote: L.closing,
      readoutId: 'readout-body', readoutEmpty: L.readoutEmpty,
      prefill: function (api) {
        var prev = {};
        try { prev = JSON.parse(localStorage.getItem(L.appraisalKey) || '{}'); } catch (e) {}
        if (api.blank('s-tool') && prev['t-name']) api.el('s-tool').value = prev['t-name'];
        if (api.blank('s-who') && prev['t-who']) api.el('s-who').value = prev['t-who'];
        // answers typed into sections 6–7 of the earlier single-page appraisal
        ['b-ref','b-what','b-term','b-condition','b-howlong','b-decision','r-g1','r-v1','r-f1','r-h1','r-g2','r-v2','r-f2','r-h2','r-g3','r-v3','r-f3','r-h3','r-first']
          .forEach(function (id) { if (api.blank(id) && prev[id]) setByValueOrText(api.el(id), prev[id]); });
      },
      highlights: [
        { label: L.hl[0], id: 'b-ref' },
        { label: L.hl[1], compute: function (api) { return api.txt('b-term').split(' — ')[0]; } },
        { label: L.hl[2], compute: function (api) { return api.txt('b-decision').split(' — ')[0]; } },
        { label: L.hl[3], id: 'r-g1' }
      ],
      readout: function (api) { return readout(L, api); },
      buttons: { download: 's-download', copy: 's-copy', clear: 's-clear' }
    });
  }

  global.Benchmarking = { init: init };
})(window);
