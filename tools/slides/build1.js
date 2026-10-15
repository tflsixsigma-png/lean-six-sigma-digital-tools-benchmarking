const L = require('./lib.js');
const { newDeck, cover, closing, content, divider, card, bullets, para, table, equation, figure, callout, stat, projectTerms, agenda, C, CX, CW } = L;

const pres = newDeck({ title: 'Lean Six Sigma & Continuous Improvement', footer: 'Lean Six Sigma & Continuous Improvement · Module 3, Session 4 · 17 October 2026 · Prof. Dr. Thiago Lima' });
const S = (t) => pres.addSection({ title: t });

// ------------------------------------------------------------ opening
S('Opening');
cover(pres, 'Lean Six Sigma & Continuous Improvement',
  'International Certificate in Project Management and Organizational Performance',
  'Module 3 — Methods, Tools and Operational Efficiency · Session 4, morning\n17 October 2026 · 09:00–12:00 (Brasília time) · Online\nProf. Dr. Thiago Lima');

let s = content(pres, 'SUMMARY', 'Opening');
agenda(s, pres, ['The puzzle — Fremont, 1984', 'Value, seen from the customer backwards', 'The anatomy of waste', 'The efficiency paradox — and variation', 'The Toyota Production System, as a system', 'Lean in the language of capital', 'DMAIC — conducting improvement, analysing problems', 'The third equation: V = C × (A + P)', 'Group activity — the Value Case', 'Where the morning ends']);
card(s, pres, 8.6, 1.3, 4.2, 2.6, 'One claim, three hours', 'Operational efficiency is a consequence of what the customer values and of how work flows — not of how busy the resources are. The returns to everything an organisation buys are scaled by a capability it cannot buy.', { fill: C.SOFT, size: 13 });
card(s, pres, 8.6, 4.1, 4.2, 2.6, 'Reading notes', 'Every definition, figure and source in this deck is in the reading notes, which stand on their own and are the reference for the module assessment. Nothing needed reading in advance.', { size: 13 });
s.addNotes('Agenda. State the claim once; the morning earns it. Point to the reading notes as the reference text for the written assessment.');

s = content(pres, 'WHAT THE SESSION ASKS OF YOU', 'Opening');
para(s, 'Nothing to prepare — three things to have in mind, all about your own organisation, all answerable from what you already know.', CX, 1.1, CW, 0.6, { size: 16 });
const asks = [['1', 'One recurring process', 'That you own or depend on, and that takes longer than it should. Contract approval, project initiation, monthly close, incident resolution.'],
  ['2', 'Two rough figures', 'How many projects are in flight in your unit, and how many closed in the last twelve months. Approximations are fine.'],
  ['3', 'One authorised project', 'That you know well enough to defend. It closes the session as the group activity. A project you have private doubts about is better material than one you are proud of.']];
asks.forEach((a, i) => { const x = CX + i * 4.2; stat(s, pres, x, 1.9, 3.9, 1.3, a[0], a[1], { bigSize: 40, bigColor: C.GOLD, size: 15 }); card(s, pres, x, 3.35, 3.9, 2.5, null, a[2], { size: 14 }); });
callout(s, pres, CX, 6.1, CW, 0.75, 'A note on framing: the examples run through factories because that is where the ideas were tested. Queues are queues and variability is variability — every block ends with a bridge to project management.', { size: 13 });

// ------------------------------------------------------------ ONE
S('Part One — The puzzle');
divider(pres, 'Part One', 'The puzzle', 'Fremont, California. Same building, same equipment, substantially the same people — and the opposite result. Hold your answer: everything that follows is a way of making it precise.', 'Part One — The puzzle');

s = content(pres, 'FREMONT, CALIFORNIA', 'Part One — The puzzle');
card(s, pres, CX, 1.1, 6.05, 3.1, '1982 — General Motors closes the plant', ['Absenteeism near 20%', 'The most combative union local in the GM system, by GM\'s own description', 'Quality: the worst in General Motors'], { bullets: true, size: 15, headSize: 18 });
card(s, pres, 6.8, 1.1, 6.05, 3.1, '1984 — reopens as NUMMI, with Toyota', ['Substantially the same workforce rehired, including the union leadership', 'Same building. Same equipment.', 'Within roughly two years: quality and productivity approach Toyota\'s Japanese levels and lead the entire GM system'], { bullets: true, size: 15, headSize: 18, fill: C.SOFT });
callout(s, pres, CX, 4.45, CW, 1.05, 'Same assets. Same people. What changed — and where would that change appear on a balance sheet?', { size: 18, bold: true, color: C.NAVY });
callout(s, pres, CX, 5.65, CW, 1.05, 'Harder: GM had access to NUMMI from the inside for two decades. Why was it never replicated across the rest of the network?', { size: 16, fill: C.SOFT, line: C.BLUE });
s.addNotes('Pose both questions. Ask the room to write a one-line hypothesis now (chat or paper). We return to it in Part Eight with the identity built during the morning.');

s = content(pres, 'WRITE YOUR HYPOTHESIS DOWN', 'Part One — The puzzle');
para(s, 'Before the argument starts. One line each, in the chat or on paper. We test it against the framework at the end of the morning — a hypothesis nobody wrote down cannot be wrong, and it is the error that teaches.', CX, 1.1, CW, 0.9, { size: 16 });
card(s, pres, CX, 2.2, 6.05, 3.6, 'What changed at Fremont?', '“What changed was ______________, and it would appear on the balance sheet as ______________.”', { size: 17, headSize: 18 });
card(s, pres, 6.8, 2.2, 6.05, 3.6, 'Why could GM not copy it?', '“GM could see ______________ but could not transfer ______________.”', { size: 17, headSize: 18, fill: C.SOFT });
callout(s, pres, CX, 6.0, CW, 0.8, 'Keep the line. Part Eight asks you to grade it yourself.', { size: 14, italic: true });

// ------------------------------------------------------------ TWO
S('Part Two — Value');
divider(pres, 'Part Two', 'Value, seen from the customer backwards', '“All we are doing is looking at the timeline — from the moment the customer gives us an order to the point when we collect the cash — and we are reducing that timeline by removing the non-value-added wastes.”  — Taiichi Ohno', 'Part Two — Value');

s = content(pres, 'THREE KINDS OF ACTIVITY', 'Part Two — Value');
para(s, 'Ohno\'s sentence does two things: it makes elapsed time from order to cash the unit of analysis, and it makes the customer — not the accounting system — the judge of what counts as work.', CX, 1.1, CW, 0.8, { size: 15 });
table(s, [['Type', 'Test', 'Typical share of elapsed time'],
  ['Value-adding', 'Transforms the product or service in a way the customer would knowingly pay for', 'Under 5%'],
  ['Necessary non-value-adding', 'The customer would not pay for it, but law, technology or contract requires it', '10–30%'],
  ['Waste (muda)', 'Neither', 'The remainder']], CX, 2.1, CW, { colW: [3.2, 6.6, 2.53], size: 14, headSize: 13 });
callout(s, pres, CX, 4.6, CW, 1.1, 'In value streams that have never been deliberately improved, value-adding time is a low single-digit percentage of elapsed time. Everything else is queue. This is the single most consequential number in operations — and almost no organisation measures it.', { size: 15, bold: true, color: C.NAVY });

s = content(pres, 'WHAT THE CUSTOMER IS ACTUALLY CHOOSING', 'Part Two — Value');
card(s, pres, CX, 1.1, 4.0, 2.6, 'Competitive priorities', 'Cost · quality · delivery speed · flexibility — the operational determinants of willingness to pay. “What the customer would pay for” decomposes into these four.', { size: 13.5 });
card(s, pres, 4.67, 1.1, 4.0, 2.6, 'Order winners and qualifiers (Hill)', 'A qualifier is a threshold: its presence attracts nobody, its absence eliminates you. A winner is what makes the customer choose you once you are in the set. Nobody picks a restaurant for its bathroom; plenty never return because it was dirty.', { size: 13.5, fill: C.SOFT });
card(s, pres, 8.83, 1.1, 4.0, 2.6, 'Eight dimensions of quality (Garvin)', 'Quality is not one variable. Conformance lowers cost; reliability, durability and serviceability raise willingness to pay. The same quality effort pays twice, on two edges of value.', { size: 13.5 });
callout(s, pres, CX, 3.9, CW, 0.95, 'The uncomfortable consequence: effort poured into qualifiers above the threshold consumes capacity and produces no preference. A firm that is mid-table on every attribute has made no choice at all.', { size: 14 });
projectTerms(s, pres, CX, 5.0, CW, 1.9, 'A qualifier buys nothing above the threshold; only a winner creates preference.',
  'Most portfolio scoring models add strategic fit, NPV, risk and resource availability on one scale — which assumes every criterion is a winner. Compliance projects are qualifiers: they buy no advantage, and not doing them ends the business.',
  'Split the list before scoring: if we do not do this, do we lose a deal or do we lose the licence? Fund the second kind to the threshold and no further.');

s = content(pres, 'THE VALUE STICK', 'Part Two — Value');
equation(s, pres, CX, 1.1, 6.0, 1.5, 'Value created = WTP − SOC', 'willingness to pay, minus supplier opportunity cost — Brandenburger & Stuart (1996)');
// value stick drawn as stacked bars
const vx = 7.2, vw = 1.4, top = 1.1, bot = 6.6;
const segs = [['Customer surplus', 'WTP − price', 1.5, C.SOFT, C.NAVY], ['Firm margin', 'price − cost', 2.0, C.NAVY, C.WHITE], ['Supplier surplus', 'cost − SOC', 1.2, C.GOLDSOFT, C.NAVY]];
let yy = top + 0.5;
s.addText('WTP', { x: vx - 0.1, y: top, w: 1.6, h: 0.4, fontFace: L.FONT, fontSize: 13, bold: true, color: C.NAVY, align: 'center', margin: 0, isTextBox: true });
segs.forEach(g => { s.addShape(pres.shapes.RECTANGLE, { x: vx, y: yy, w: vw, h: g[2], fill: { color: g[3] }, line: { color: C.NAVY, width: 1 } }); s.addText([{ text: g[0], options: { bold: true, breakLine: true } }, { text: g[1], options: { fontSize: 11 } }], { x: vx + vw + 0.25, y: yy, w: 3.8, h: g[2], fontFace: L.FONT, fontSize: 13, color: C.INK, valign: 'middle', margin: 0, isTextBox: true }); yy += g[2]; });
s.addText('SOC', { x: vx - 0.1, y: yy + 0.05, w: 1.6, h: 0.4, fontFace: L.FONT, fontSize: 13, bold: true, color: C.NAVY, align: 'center', margin: 0, isTextBox: true });
bullets(s, ['Negotiating over price or supplier terms moves value between parties. Only two moves create it: push WTP up, or push SOC down.', 'Lean is unusual because it does both at once: removing waste lowers cost; the same work raises reliability and speed, which raise what the customer will pay.', 'That is the whole strategic claim of the method. The rest of the morning is the mechanism.'], CX, 2.9, 6.0, 3.8, { size: 14.5, gap: 10 });

s = content(pres, 'FROM VALUE CREATED TO ADVANTAGE', 'Part Two — Value');
equation(s, pres, CX, 1.1, CW, 1.5, 'VC = (WTPA − CostA) − (WTPB − CostB)', 'the value firm A creates, minus the value created by its relevant rival B');
para(s, 'Creating value and having an advantage are different things. A firm that raises WTP and lowers cost in a market where every competitor does the same has created value and captured none of the difference. Advantage is a comparison, so it has to be written as one.', CX, 2.8, CW, 0.9, { size: 14.5 });
card(s, pres, CX, 3.85, 4.0, 2.2, 'The benchmark is a rival, not last year', 'Cutting your own cost by 8% while the reference competitor cuts theirs by 12% makes the firm better and its position worse. Only the comparison detects it.', { size: 13 });
card(s, pres, 4.67, 3.85, 4.0, 2.2, 'Both terms can be attacked', 'VC rises when A improves — and equally when B\'s advantage is made harder to sustain. That is why capability that resists imitation matters more than capability that does not.', { size: 13, fill: C.SOFT });
card(s, pres, 8.83, 3.85, 4.0, 2.2, 'Operational effectiveness erodes by construction', 'If the improvement is visible and copyable, B makes the same move, the brackets converge and VC tends to zero. Porter\'s objection, as arithmetic.', { size: 13 });
callout(s, pres, CX, 6.2, CW, 0.7, 'One test for any improvement project: when the competitor does this too, what is left? If nothing — fund it to the threshold and no further. If something — name it. That residue is the advantage.', { size: 13.5, bold: true, color: C.NAVY });

s = content(pres, 'WHERE THE RESIDUE CAN LIVE', 'Part Two — Value');
equation(s, pres, CX, 1.1, CW, 1.5, 'V = C × (A + P)', 'Lima (2026), Ch. 1 — after Van Mieghem & Allon (2015)');
card(s, pres, CX, 2.85, 4.0, 2.1, 'A — Assets', 'What the organisation owns: plants, machines, systems. Visible and purchasable.', { size: 14 });
card(s, pres, 4.67, 2.85, 4.0, 2.1, 'P — Processes', 'How work flows across the assets. Partly visible, imitable with effort.', { size: 14 });
card(s, pres, 8.83, 2.85, 4.0, 2.1, 'C — Capability', 'The organisation\'s repeated ability to improve P. Barely visible, rarely imitable — and a coefficient, not a term.', { size: 14, fill: C.NAVY, line: C.NAVY, headColor: C.GOLD, color: C.WHITE });
callout(s, pres, CX, 5.15, CW, 1.6, 'The form of the expression is the claim: assets and processes are additive and purchasable; capability multiplies them. Anything in the bracket is available to a competitor at roughly the same price, so improvements that live there move both parentheses of VC and the difference returns towards zero. Only the coefficient resists — it is the one term nobody can invoice you for. Part Eight returns to this once there is material to test it.', { size: 14 });

s = content(pres, 'THE FIVE PRINCIPLES — AND WHERE EACH ONE IS TREATED', 'Part Two — Value');
para(s, 'Womack and Jones reduced the method to five principles in sequence. The sequence is the argument: every principle after the first is meaningless until the first has been answered.', CX, 1.1, CW, 0.7, { size: 14.5 });
table(s, [['', 'Principle', 'What it asks', 'Where'],
  ['1', 'Value', 'What is the customer actually paying for? Defined from the customer backwards, never from the process forwards.', 'This part'],
  ['2', 'Value stream', 'Which activities deliver that value, which merely enable it, and which do neither? The map is the instrument.', 'Part Three'],
  ['3', 'Flow', 'Can the work move without stopping? Stoppage, not slowness, is what makes lead time long.', 'Part Four'],
  ['4', 'Pull', 'Is work released by downstream demand, or pushed by upstream capacity and a plan?', 'Part Five'],
  ['5', 'Perfection', 'Does the cycle repeat, with the standard rewritten each time? This decides whether the first four survive.', 'Parts Seven and Eleven']], CX, 1.95, CW, { colW: [0.5, 2.0, 7.63, 2.2], size: 13 });

// ------------------------------------------------------------ THREE
S('Part Three — Waste');
divider(pres, 'Part Three', 'The anatomy of waste', 'Ohno catalogued seven wastes; modern practice adds an eighth. The list matters less than its structure: one of them is the root, and the others are symptoms.', 'Part Three — Waste');

s = content(pres, 'THE EIGHT WASTES — FACTORY AND PROJECT', 'Part Three — Waste');
table(s, [['Waste', 'In a factory', 'In project and knowledge work'],
  ['Overproduction — the root', 'Making more than demand', 'Reports nobody reads, features nobody uses, gold-plating'],
  ['Waiting', 'Idle machines and people', 'Approval queues, decision latency, blocked dependencies'],
  ['Transport', 'Moving materials', 'Handoffs between departments and systems'],
  ['Over-processing', 'Machining beyond specification', 'Sign-off chains, redundant status meetings, precision beyond need'],
  ['Inventory', 'Stockpiles and work in process (WIP)', 'Half-finished work packages, open tickets, projects started but unstaffed'],
  ['Motion', 'Unnecessary movement of people', 'Searching for information, tool switching, duplicated data entry'],
  ['Defects', 'Scrap and rework', 'Rework loops, failed deliverables, change requests from unclear requirements'],
  ['Unused talent', 'Ignored operator ideas', 'Experts doing administration; front-line insight never reaching decisions']], CX, 1.05, CW, { colW: [2.7, 3.6, 6.03], size: 12.5, headSize: 12 });
callout(s, pres, CX, 6.05, CW, 0.8, 'Overproduction generates the other six: it creates inventory, which needs transport and motion, which hides defects, which forces waiting. Attack it and the others shrink; attack the others individually and overproduction regenerates them.', { size: 12.5 });

s = content(pres, 'MUDA IS THE SYMPTOM; MURA AND MURI ARE THE DISEASE', 'Part Three — Waste');
card(s, pres, CX, 1.1, 4.0, 2.5, 'Muda — waste', 'The eight items on the previous slide. The one executives usually learn, and the only one most programmes attack.', { size: 14 });
card(s, pres, 4.67, 1.1, 4.0, 2.5, 'Mura — unevenness', 'Irregular flow of work. Unevenness creates queues, and queues create the safety buffers that look like prudent management and are in fact inventory.', { size: 14, fill: C.SOFT });
card(s, pres, 8.83, 1.1, 4.0, 2.5, 'Muri — overburden', 'People and equipment pushed beyond reasonable limits. Overburden creates defects, breakdowns and absence — which create more unevenness.', { size: 14 });
callout(s, pres, CX, 3.8, CW, 0.95, 'This is why improvement programmes plateau after year one: the first wave removes visible muda and produces real gains. Then the gains stop, because the unevenness and overburden that generate muda were never touched.', { size: 14 });
projectTerms(s, pres, CX, 4.9, CW, 2.0, 'Mura and muri are not wastes; they are what manufactures the wastes.',
  'A specialist at 120% across four projects produces the entire symptom set at once: defects (divided attention), waiting (each project queues behind three others), unused talent (the expert spends the day reconciling status). The quarter-end delivery peak nobody levels is mura.',
  'List everyone allocated above 100% and count projects per person. Two is a working limit; four is a queue with a name.');

s = content(pres, 'MAKING IT VISIBLE — THE VALUE STREAM MAP', 'Part Three — Waste');
figure(s, 's1-fig1.png', CX, 1.0, 8.2, 3.15, 'Figure 1. A change request from arrival to implementation: four hours of work across fifteen working days, almost all of it in two approval queues.');
card(s, pres, 9.0, 1.0, 3.83, 3.6, 'Three layers, one number', ['The work — each step, in sequence, with who performs it. Reveals handoffs.', 'The information — what triggers each step. Reveals whether the stream is pulled or pushed.', 'The timeline — time worked and time elapsed per step. Produces flow efficiency, the number the map exists for.'], { bullets: true, size: 12 });
stat(s, pres, CX, 4.75, 2.6, 1.95, '4 h', 'process time — the time anyone is actually working on it', { bigSize: 34 });
stat(s, pres, 3.3, 4.75, 2.6, 1.95, '15 days', 'lead time — elapsed, first step to last', { bigSize: 34 });
stat(s, pres, 6.1, 4.75, 2.6, 1.95, '3.3%', 'flow efficiency — typically 2–10% in administrative processes', { bigSize: 34, bigColor: C.GOLD });
card(s, pres, 9.0, 4.75, 3.83, 1.95, 'Current state, then future state', 'Every difference between the two maps must be attributable to a named change with an owner. A future state nobody can trace to interventions is a wish drawn in boxes.', { size: 11.5, fill: C.SOFT });

s = content(pres, 'MAP THE STREAM, NOT THE DELIVERABLE', 'Part Three — Waste');
projectTerms(s, pres, CX, 1.1, CW, 3.3, 'The elapsed time lives in the handoffs around the work, not in the work.',
  'The streams worth mapping are the administrative ones: change request to approved change, invoice to payment, defect reported to defect closed. They repeat, they can be timed, and they are where lead time accumulates. The characteristic finding is Figure 1 — four hours across fifteen days, the days sitting in two approval queues that exist because of an authority limit nobody has revisited since it was set.',
  'Pick one of the three. Walk it with the people who perform each step, not from the procedure. Write two numbers on one line: hours worked, days elapsed. The ratio is the conversation.');
callout(s, pres, CX, 4.65, CW, 1.0, 'A map is drawn by walking the process, not by assembling it from what people say in a meeting — which is why the first draft almost always contradicts the official procedure.', { size: 14.5, bold: true, color: C.NAVY });
callout(s, pres, CX, 5.85, CW, 1.0, 'One more figure per step: the share of items arriving complete and accurate. A chain of steps each at 90% does not deliver 90% — the arithmetic is in Part Four.', { size: 14, fill: C.SOFT, line: C.BLUE });

// ------------------------------------------------------------ FOUR
S('Part Four — Efficiency and variation');
divider(pres, 'Part Four', 'The efficiency paradox', 'Lean is routinely introduced as “doing more with less”. Taken literally, that is the definition of the thing lean exists to correct.', 'Part Four — Efficiency and variation');

s = content(pres, 'RESOURCE EFFICIENCY VERSUS FLOW EFFICIENCY', 'Part Four — Efficiency and variation');
card(s, pres, CX, 1.1, 6.05, 2.6, 'Resource efficiency', ['Keep every person and every machine busy', 'Optimises what cost accounting measures — which is why organisations default to it', 'Generates queues, rework and expediting; destroys performance globally while every local unit looks efficient'], { bullets: true, size: 14, headSize: 18 });
card(s, pres, 6.8, 1.1, 6.05, 2.6, 'Flow efficiency', ['Optimise the unit\'s journey through the system — it measures the order, not the resource', 'Process time over lead time: the ratio the value stream map was built to produce', 'Usually improves both once queues collapse — and almost nobody reports it'], { bullets: true, size: 14, headSize: 18, fill: C.SOFT });
card(s, pres, CX, 3.9, 6.05, 2.95, 'The physics of lead time', ['As utilisation rises toward 100%, queue time rises towards infinity. The curve is flat until roughly 80% and then climbs violently.', 'Raising utilisation does not raise the system\'s output. It raises the queue in front of the system.', 'The instinct to keep every resource busy is the direct mechanical cause of the inventory it was meant to avoid.'], { bullets: true, size: 13 });
callout(s, pres, 6.8, 3.9, 6.05, 2.95, 'The sentence worth memorising\n\nVariability must be absorbed by inventory, by capacity, or by time. Every organisation chooses one — usually without deciding to. Only one of the three is invisible in the P&L, which is why it is the one most organisations choose by default.', { size: 15, color: C.NAVY });

s = content(pres, 'THE EFFICIENCY MATRIX', 'Part Four — Efficiency and variation');
figure(s, 's1-fig2.png', CX, 1.0, 7.4, 5.5, 'Figure 2. After Modig & Åhlström (2012).');
card(s, pres, 8.2, 1.0, 4.63, 5.6, 'How to read it', ['Resource efficiency and flow efficiency are not two names for the same thing.', 'The curve is the reason they trade off: with variation at its current level, the combinations beyond the frontier cannot be bought with effort.', 'Removing variation is what moves the frontier towards the corner where both are high.', 'The figure is usually a shock the first time it is computed for a real process — and the shock is the point.'], { bullets: true, size: 13.5 });

s = content(pres, 'THE OTHER HALF OF THE METHOD — VARIATION', 'Part Four — Efficiency and variation');
para(s, 'Lean attacks the time the work spends not being worked on. Six Sigma attacks the dispersion of the process — and dispersion is what makes lead time unpredictable. Two attacks on the same quantity, which is why the integration is more than a brand.', CX, 1.05, CW, 0.75, { size: 14 });
figure(s, 's1-fig3.png', CX, 1.9, 7.6, 3.0, 'Figure 3. Twenty-four measurements; limits calculated from the process, not from the target. Two signals — everything else is noise.');
card(s, pres, 8.4, 1.9, 4.43, 1.7, 'Common cause', 'Inherent in the process as designed. Investigating individual cases will not reduce it: every case has a different story and none of the stories is the cause.', { size: 11.5 });
card(s, pres, 8.4, 3.75, 4.43, 1.7, 'Special cause', 'Comes from something that was not there before. It can be found and removed. Shewhart\'s distinction governs everything that follows.', { size: 11.5, fill: C.SOFT });
callout(s, pres, CX, 5.65, CW, 1.2, 'Reacting to common-cause variation as though it were special cause makes the process worse: each reaction is an unplanned adjustment to a stable system. The monthly meeting that demands an explanation for every variance against target is this error institutionalised — and the single most common misuse of a performance dashboard.', { size: 13 });

s = content(pres, 'CAPABILITY — THE PROMISE IS THE SPREAD, NOT THE AVERAGE', 'Part Four — Efficiency and variation');
equation(s, pres, CX, 1.05, 5.0, 1.35, 'Cp = (USL − LSL) / 6σ', 'the width the customer allows, over the width the process produces');
bullets(s, ['Cp assumes the process is centred. Cpk removes that assumption and is the one that matters: a process can be admirably narrow and reliably in the wrong place. Conventional threshold: Cpk ≥ 1.33.', 'In services and projects the tolerance is a promise: a response committed at 48 hours with an average of 30 and a spread reaching 90 breaks its promise regularly while reporting comfortable averages.'], CX, 2.6, 5.0, 4.2, { size: 13.5, gap: 10 });
figure(s, 's1-fig4.png', 5.8, 1.05, 7.03, 3.3, 'Figure 4. Identical spread, opposite fates: only the centring changed. Cp is unmoved, Cpk halves, and the shaded tail is what the customer rejects.');
callout(s, pres, 5.8, 4.9, 7.03, 1.9, 'The average tells you almost nothing about what the customer will experience; the spread, relative to the tolerance, tells you everything.', { size: 15, bold: true, color: C.NAVY });

s = content(pres, 'WHAT A SIGMA LEVEL ACTUALLY SAYS', 'Part Four — Efficiency and variation');
table(s, [['Sigma level', 'Defects per million', 'Right first time', 'What it means in practice'],
  ['3σ', '66,807', '93.3%', 'Typical of a process nobody has studied. Feels acceptable in isolation.'],
  ['4σ', '6,210', '99.38%', 'A well-run process with active controls.'],
  ['5σ', '233', '99.977%', 'Requires design changes, not vigilance.'],
  ['6σ', '3.4', '99.99966%', 'The benchmark the method is named after.']], CX, 1.05, 7.4, { colW: [1.3, 1.7, 1.5, 2.9], size: 12.5 });
para(s, 'Figures follow the convention of allowing a 1.5σ long-term drift in the mean — which is why 6σ is 3.4 per million rather than two per billion. A convention, not a law.', CX, 4.0, 7.4, 0.9, { size: 12, italic: true, color: C.MUT });
s.addText('A twenty-step process, every step right first time at…', { x: 8.3, y: 1.05, w: 4.53, h: 0.5, fontFace: L.FONT, fontSize: 13, bold: true, color: C.NAVY, margin: 0, isTextBox: true });
s.addChart(pres.charts.BAR, [{ name: 'Correct outcome across 20 steps', labels: ['99% per step', '99.38% (4σ)', '99.9% per step'], values: [81.8, 88.3, 98.0] }], {
  x: 8.3, y: 1.55, w: 4.53, h: 3.3, barDir: 'col', chartColors: [C.NAVY], showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0"%"', dataLabelFontSize: 11, dataLabelFontFace: '+mn-lt', dataLabelColor: C.INK,
  valAxisMinVal: 0, valAxisMaxVal: 100, valAxisLabelFontSize: 10, valAxisLabelFontFace: '+mn-lt', valAxisLabelColor: C.MUT, catAxisLabelFontSize: 11, catAxisLabelFontFace: '+mn-lt', catAxisLabelColor: C.INK, valGridLine: { color: 'E1E7EE', size: 0.5 }, catGridLine: { style: 'none' }, showLegend: false, showTitle: false,
});
callout(s, pres, CX, 5.1, CW, 1.75, 'Quality is argued at the step and experienced across the chain. “Our quality is already good” is usually true at the step and false at the outcome. It also explains why removing steps is a quality intervention and not only a cost one: every handoff you delete is a term removed from that product.', { size: 13.5 });

s = content(pres, 'WHY THE TWO HALVES NEED EACH OTHER', 'Part Four — Efficiency and variation');
card(s, pres, CX, 1.1, 6.05, 1.9, 'Lean without Six Sigma', 'Removes steps and queues and then cannot hold the gain, because the variation that generated the queues is still there and rebuilds them as buffers.', { size: 14, headSize: 17 });
card(s, pres, 6.8, 1.1, 6.05, 1.9, 'Six Sigma without Lean', 'Produces beautifully capable steps inside a process whose elapsed time is still ninety per cent waiting — a stable process delivering slowly and predictably.', { size: 14, headSize: 17, fill: C.SOFT });
callout(s, pres, CX, 3.15, CW, 0.85, 'Reducing variation lowers cost through less rework (the SOC edge) and raises reliability and conformance (the WTP edge) — the double movement the value stick predicted, now with a measurable instrument attached.', { size: 13.5 });
projectTerms(s, pres, CX, 4.15, CW, 2.75, 'Variability must be absorbed somewhere — inventory, capacity, or time. An organisation that has not chosen has chosen time.',
  'The three buffers have exact equivalents: WIP and half-finished deliverables; overtime, contractors and reserve; schedule contingency. A plan that allocates people at 100% has decided that every illness, late approval and changed requirement will be absorbed by the schedule. The resulting delay is the planning assumption working as specified.',
  'Open the resource plan and find the allocation assumption. If it is 100%, the schedule is the buffer. Then find where contingency lives: if it is in every task, nobody will ever see it spent.');

// ------------------------------------------------------------ FIVE
S('Part Five — The Toyota system');
divider(pres, 'Part Five', 'The Toyota Production System, as a system', 'The TPS is conventionally drawn as a house, and the drawing is an argument: a roof needs pillars, pillars need a foundation, and removing any element collapses the rest.', 'Part Five — The Toyota system');

s = content(pres, 'THE HOUSE', 'Part Five — The Toyota system');
// native house
const hx = CX, hw = 8.0;
s.addShape(pres.shapes.RECTANGLE, { x: hx, y: 1.05, w: hw, h: 0.75, fill: { color: C.NAVY }, line: { color: C.NAVY } });
s.addText('Goals — highest quality · lowest cost · shortest lead time · best safety · high morale', { x: hx, y: 1.05, w: hw, h: 0.75, fontFace: L.FONT, fontSize: 14, bold: true, color: C.WHITE, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
const pil = [['Just-In-Time', 'Takt time · continuous flow · pull and WIP limits · SMED', C.WHITE], ['People and teamwork', 'Kaizen · genchi genbutsu · structured problem solving.\nThe centre of the house, and the multiplier.', C.GOLDSOFT], ['Jidoka', 'Autonomation · stop-and-fix · andon · poka-yoke', C.WHITE]];
pil.forEach((p, i) => { const px = hx + i * (hw / 3); s.addShape(pres.shapes.RECTANGLE, { x: px, y: 1.8, w: hw / 3, h: 2.7, fill: { color: p[2] }, line: { color: C.BLUE, width: 1 } }); s.addText([{ text: p[0], options: { bold: true, fontSize: 15, color: C.NAVY, breakLine: true } }, { text: p[1], options: { fontSize: 12.5, color: C.INK } }], { x: px + 0.15, y: 1.95, w: hw / 3 - 0.3, h: 2.4, fontFace: L.FONT, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.15 }); });
s.addShape(pres.shapes.RECTANGLE, { x: hx, y: 4.5, w: hw, h: 0.75, fill: { color: C.SOFT }, line: { color: C.BLUE, width: 1 } });
s.addText('Stability — heijunka (levelling) · standardised work · 4M stability', { x: hx, y: 4.5, w: hw, h: 0.75, fontFace: L.FONT, fontSize: 13.5, color: C.NAVY, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
callout(s, pres, hx, 5.45, hw, 1.4, 'The sequence is physics, not preference. Pull cannot function on an unstable, unlevelled base: it either starves or floods. Organisations that install kanban boards onto chaotic processes get chaos with better visualisation.', { size: 13 });
card(s, pres, 8.8, 1.05, 4.03, 5.8, 'The terms, one line each', ['Takt time — the pace of customer demand', 'SMED — changeovers fast enough that small batches become economical', 'Genchi genbutsu — go and see, where the work happens', 'Autonomation — a machine that stops itself when something goes wrong', 'Andon — the signal by which anyone halts the line on a problem', 'Poka-yoke — a device that makes the error physically impossible', 'Heijunka — levelling volume and mix', '4M — man, machine, material, method: the four sources of variation to stabilise first'], { bullets: true, size: 11.5 });

s = content(pres, 'THE TWO PILLARS', 'Part Five — The Toyota system');
card(s, pres, CX, 1.1, 6.05, 3.4, 'Left pillar — Just-In-Time', ['Continuous flow — remove the interruptions, batching and breakdowns that convert value-adding time into elapsed time', 'Pull — produce nothing until a downstream signal indicates demand. The signal is what stops overproduction', 'SMED — kill the changeover and the economic batch size collapses towards one', 'Underneath all three sits heijunka: a schedule level enough for the pull signal to be worth following'], { bullets: true, size: 13, headSize: 17 });
card(s, pres, 6.8, 1.1, 6.05, 3.4, 'Right pillar — Jidoka', ['Quality built in at the source, through three mechanisms of increasing cost and decreasing frequency:', 'Poka-yoke — design the process so the mistake cannot be made', 'Andon — signal the abnormality the instant it occurs, not at the end of the shift', 'Stop-and-fix — halt the line so the defect never travels downstream'], { bullets: true, size: 13, headSize: 17, fill: C.SOFT });
callout(s, pres, CX, 4.7, 6.05, 2.15, 'Pull is not JIT, and neither is kanban. A pull system is a system that explicitly limits work in process — that is the definition. Kanban is one mechanism for limiting WIP; CONWIP is another. Treating the cards as the essence of the system is the most common conceptual error in the boardroom (Hopp & Spearman, 2004).', { size: 13 });
callout(s, pres, 6.8, 4.7, 6.05, 2.15, 'Stopping the line looks like the most expensive thing a factory can do, and that reading misses the trade. A problem that stops the line gets solved; a problem that is worked around does not. The cost of stopping is visible and immediate; the cost of working around is invisible and permanent.', { size: 13, fill: C.SOFT, line: C.BLUE });

s = content(pres, 'WHY THE SYSTEM BEATS THE TOOLS', 'Part Five — The Toyota system');
para(s, 'The best-evidenced claim in the field, and the reason the house is drawn as a house rather than as a menu.', CX, 1.1, CW, 0.5, { size: 14.5 });
table(s, [['Source', 'Finding'],
  ['Milgrom & Roberts (1990)', 'Modern manufacturing is a system of complementarities: the return to any one practice rises with the adoption of the others. Partial adoption yields near-zero or negative returns.'],
  ['MacDuffie (1995)', 'Bundles of mutually reinforcing practices explain performance — not individual practices.'],
  ['Shah & Ward (2007)', 'Built the field\'s measurement instruments for lean exclusively on bundle logic.']], CX, 1.7, CW, { colW: [3.0, 9.33], size: 13.5 });
callout(s, pres, CX, 4.6, CW, 1.1, 'A partial implementation can leave an organisation worse off than no implementation: a practice adopted without its complements imposes its costs without delivering its returns. This is the strongest available explanation for the failure rate of tool-led lean programmes.', { size: 14, bold: true, color: C.NAVY });
projectTerms(s, pres, CX, 5.85, CW, 1.05, null, null, 'Measure one lag: from the moment a problem is first known to someone on the team to the moment it reaches someone who can act. Then ask what happened, last time, to the person who reported red early. That is your andon policy, whatever the governance document says.');

s = content(pres, 'THE HOUSE, IN A PROJECT ORGANISATION', 'Part Five — The Toyota system');
table(s, [['Toyota element', 'Project equivalent', 'Comment'],
  ['Heijunka', 'Resource levelling', 'Exists — rarely done to the pull signal'],
  ['Standardised work', 'Methodology, templates, checklists the PMO maintains', 'Exists'],
  ['Poka-yoke', 'The mandatory field that will not let the form be submitted incomplete', 'Exists'],
  ['Andon cord', 'No comfortable equivalent', 'Monthly status reporting is its opposite: it aggregates upward on a cycle, and a red status costs the reporter more than it costs the organisation']], CX, 1.1, CW, { colW: [2.4, 4.6, 5.33], size: 13 });
callout(s, pres, CX, 4.4, CW, 1.1, 'Most of the Toyota house already exists in a project organisation under other names. One element does not, and it is the one that matters most: a system designed to signal abnormalities early and loudly.', { size: 14.5, bold: true, color: C.NAVY });

// ------------------------------------------------------------ SIX
S('Part Six — Capital');
divider(pres, 'Part Six', 'Lean in the language of capital', 'Operational improvement that cannot be stated in financial terms does not survive the budget cycle. Fortunately, the translation is an identity rather than an argument.', 'Part Six — Capital');

s = content(pres, "LITTLE'S LAW", 'Part Six — Capital');
equation(s, pres, CX, 1.05, 5.3, 1.35, 'WIP = Throughput × Lead Time', 'Little (1961) — an identity, not a model', 24);
s.addText('lead time ↓ → WIP ↓ → inventory ↓ → invested capital ↓ → ROIC ↑', { x: CX, y: 2.55, w: 5.3, h: 0.55, fontFace: L.FONT, fontSize: 13, bold: true, color: C.NAVY, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
para(s, 'Hold throughput constant and the identity says something immediate: cutting lead time cuts work in process proportionally. And work in process is inventory, and inventory is invested capital. Flow improvement is a balance-sheet intervention that merely happens to take place on a shop floor.', CX, 3.2, 5.3, 1.6, { size: 13.5 });
equation(s, pres, CX, 4.95, 5.3, 1.3, 'lead time = in flight ÷ completed per year', 'the portfolio form', 17);
figure(s, 's1-fig5.png', 6.1, 1.05, 6.73, 3.3, 'Figure 5. For a given rate of completion, the time a project stays open grows in a straight line with the number in flight. The dot is your organisation.');
card(s, pres, 6.1, 4.65, 6.73, 2.2, 'Starting less finishes more', 'Twenty projects in flight, ten finished a year: a two-year average lead time, whatever the schedules say. Halve the number in flight and the lead time halves, with the same people and the same budget — and throughput usually rises, because the context switching that consumed the difference disappears.', { size: 13 });

s = content(pres, 'WE DO THIS CALCULATION LIVE', 'Part Six — Capital');
stat(s, pres, CX, 1.1, 3.9, 2.4, 'A', 'Projects currently in flight in your unit — everything authorised and not yet closed, including the ones nobody touched this month. Those count: they are WIP.', { bigSize: 44, size: 12.5 });
stat(s, pres, 4.72, 1.1, 3.9, 2.4, 'B', 'Projects completed and closed in the last twelve months.', { bigSize: 44, size: 12.5 });
stat(s, pres, 8.93, 1.1, 3.9, 2.4, 'A ÷ B', 'your real average project lead time, in years', { bigSize: 40, bigColor: C.GOLD, size: 13 });
callout(s, pres, CX, 3.75, CW, 1.2, 'Approximate figures are enough. The interesting number is not the result — it is the gap between that result and the lead time your organisation believes it has.', { size: 15, bold: true, color: C.NAVY });
card(s, pres, CX, 5.15, 6.05, 1.7, 'Two levers, one that works', 'Start less (36 → 22 in flight: 18 months → 11) or finish more (+20% capacity: 18 → 14.9). The second is the one everybody reaches for and the first is the one that works — because the first is a decision and the second is a budget.', { size: 12.5 });
card(s, pres, 6.8, 5.15, 6.05, 1.7, 'Reading it honestly', 'The law holds on averages, for a stable system in which what starts eventually finishes. A portfolio that quietly abandons a third of what it begins is not described by the line — and the first useful thing it can do is count the abandonments.', { size: 12.5, fill: C.SOFT });
s.addNotes('Run the Little\'s Law simulator from the reading notes with two or three figures volunteered by participants. The simulator shows the arithmetic strip and the comparison of the two levers.');

s = content(pres, 'WHERE LEAN SHOWS UP IN RETURN ON INVESTED CAPITAL', 'Part Six — Capital');
figure(s, 's1-fig6.png', CX, 1.0, 8.1, 3.3, 'Figure 6. ROIC decomposed. Removing defects and expediting lifts the left branch; removing lead time lifts the right one by taking capital out of the denominator.');
card(s, pres, 8.9, 1.0, 3.93, 1.9, 'Margin — the numerator', 'NOPAT ÷ revenue. Lean moves it through scrap, rework, yield and equipment effectiveness. Where every standard lean business case is written.', { size: 11.5 });
card(s, pres, 8.9, 3.05, 3.93, 1.9, 'Capital turnover — the denominator', 'Revenue ÷ invested capital. Lean moves it through inventory, footprint, capacity buffers and the cash cycle. Where nobody in the operations meeting is looking.', { size: 11.5, fill: C.SOFT });
callout(s, pres, CX, 5.15, CW, 1.7, 'A programme argued only as cost saving is claiming half of what it does.', { size: 20, bold: true, color: C.NAVY });

s = content(pres, 'A WORKED SCENARIO — THE DENOMINATOR DOES MORE WORK', 'Part Six — Capital');
para(s, 'Revenue 1,000 a year; fixed assets 500; each day of lead time ties up 15 of inventory; WACC 10%. Lead time is cut from 20 days to 8, and defect reduction lifts the margin from 8% to 10%.', CX, 1.05, CW, 0.7, { size: 13.5 });
table(s, [['Scenario', 'Lead time', 'Margin', 'Invested capital', 'ROIC', 'Economic profit'],
  ['Baseline', '20 days', '8%', '800', '10.0%', '0'],
  ['Flow only', '8 days', '8%', '620', '12.9%', '+18'],
  ['Cost only', '20 days', '10%', '800', '12.5%', '+20'],
  ['Both', '8 days', '10%', '620', '16.1%', '+38']], CX, 1.85, 6.6, { colW: [1.4, 1.1, 0.9, 1.3, 0.9, 1.0], size: 12.5 });
s.addChart(pres.charts.BAR, [{ name: 'ROIC', labels: ['Baseline', 'Flow only', 'Cost only', 'Both'], values: [10.0, 12.9, 12.5, 16.1] }], {
  x: 7.4, y: 1.0, w: 5.43, h: 3.9, barDir: 'col', chartColors: [C.NAVY], showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0"%"', dataLabelFontSize: 11, dataLabelFontFace: '+mn-lt', dataLabelColor: C.INK,
  valAxisMinVal: 0, valAxisMaxVal: 20, valAxisLabelFontSize: 10, valAxisLabelFontFace: '+mn-lt', valAxisLabelColor: C.MUT, catAxisLabelFontSize: 11, catAxisLabelFontFace: '+mn-lt', catAxisLabelColor: C.INK, valGridLine: { color: 'E1E7EE', size: 0.5 }, catGridLine: { style: 'none' }, showLegend: false, showTitle: true, title: 'ROIC by scenario — WACC 10%', titleFontSize: 12, titleFontFace: '+mn-lt', titleColor: C.NAVY,
});
callout(s, pres, CX, 4.15, 6.6, 2.7, 'Margin improved by 25%. Capital turnover improved by 29%. The denominator did more work than the numerator — and the denominator is the half of the equation that operational business cases almost never mention. A firm exactly earning its cost of capital is now creating economic profit, without one additional unit of revenue. Note that the two levers together add more than the two gains added together: the higher margin is earned on a smaller base.', { size: 12.5 });
card(s, pres, 7.4, 5.1, 5.43, 1.75, 'Try it with an unhelpful setting', 'Raise the margin as far as it goes and leave lead time at thirty days — and watch how much of the improvement the denominator eats. That is the shape of a cost-reduction programme that never touched flow.', { size: 11.5, fill: C.SOFT });
s.addNotes('Run the ROIC simulator from the notes. Presets: baseline, flow only, cost only, both. In your own numbers, inventory per day of lead time is roughly annual cost of sales divided by working days.');

s = content(pres, 'BOTH PILLARS MOVE BOTH EDGES OF VALUE', 'Part Six — Capital');
table(s, [['Mechanism', 'Effect'],
  ['Jidoka → cost', 'Defects removed at source; the cost of poor quality collapses. The classic business case.'],
  ['Jidoka → WTP', 'Zero-defect delivery lets a B2B customer eliminate incoming inspection and cut safety stock. A willingness-to-pay argument with a hard number attached.'],
  ['JIT → cost', 'Less inventory, handling, expediting and obsolescence; a smaller footprint.'],
  ['JIT → WTP', 'Customers pay for speed and predictability, because short lead times cut their own forecasting risk.']], CX, 1.1, CW, { colW: [2.4, 9.93], size: 14 });
callout(s, pres, CX, 4.6, CW, 1.0, 'The value stick said there are two ways to create value. The house delivers both at once — which is why a lean business case written only on cost is undersold twice: once on the WTP edge, once on the denominator.', { size: 14, bold: true, color: C.NAVY });

// ------------------------------------------------------------ SEVEN
S('Part Seven — DMAIC');
divider(pres, 'Part Seven', 'DMAIC — conducting improvement, analysing problems', 'Everything so far describes what good looks like. DMAIC is the method for getting there from where you are — above all, for analysing a problem before paying to solve it.', 'Part Seven — DMAIC');

s = content(pres, 'THE FAILURE MODE IT EXISTS TO PREVENT', 'Part Seven — DMAIC');
card(s, pres, CX, 1.1, 6.05, 3.0, 'What everyone remembers', 'Six Sigma, Motorola, the 1980s; a process so consistent that specification limits sit six standard deviations from the mean — 3.4 defects per million opportunities. The statistical ambition is the part everyone remembers. It is not the part that matters most to a senior manager.', { size: 13.5 });
card(s, pres, 6.8, 1.1, 6.05, 3.0, 'What matters', 'An experienced manager recognises a problem in seconds and already knows what to do. That recognition is pattern-matching: fast, frequently right, and entirely unverified. When it is wrong, the organisation finds out after it has paid — and because the supposed cause was never written down, the error teaches nothing.', { size: 13.5, fill: C.SOFT });
callout(s, pres, CX, 4.35, CW, 1.3, 'DMAIC does not exist to distrust experience. It exists so that the experienced manager\'s hypothesis is written down before it is funded — and can therefore be refuted while refutation is still cheap.', { size: 16, bold: true, color: C.NAVY });
callout(s, pres, CX, 5.85, CW, 1.0, 'Bridge from Part Two: C is the repeated ability to improve P. DMAIC is how that improvement is conducted.', { size: 14, fill: C.SOFT, line: C.BLUE, italic: true });

s = content(pres, 'THE FIVE PHASES', 'Part Seven — DMAIC');
table(s, [['Phase', 'The question it answers', 'Representative tools'],
  ['Define', 'What is the problem, whose is it, what does it cost, and where does the scope end?', 'Project charter · SIPOC · voice of the customer'],
  ['Measure', 'What is today\'s performance, measured in a way anyone would trust?', 'Operational definitions · measurement system analysis'],
  ['Analyze', 'What is the cause — verified, not assumed?', 'Five whys · Ishikawa · Pareto · hypothesis testing'],
  ['Improve', 'Does the solution work in a pilot, before it is scaled?', 'Controlled pilot · poka-yoke · design of experiments'],
  ['Control', 'Does the gain survive the dissolution of the project team?', 'Control charts · control plan · standardised work']], CX, 1.05, CW, { colW: [1.5, 6.6, 4.23], size: 13 });
card(s, pres, CX, 4.75, 6.05, 2.1, 'Define and Measure are half the work', 'They look like bureaucracy. A badly defined problem has no verifiable solution, and a measure nobody trusts ends every discussion in opinion. A phase is complete when its question has an answer somebody would stake a decision on.', { size: 12.5 });
card(s, pres, 6.8, 4.75, 6.05, 2.1, 'Not rival systems', 'Poka-yoke appears here and in the Jidoka pillar. Lean and Six Sigma share mechanisms and attack different enemies — flow and waste on one side, variation and defects on the other. The tools are named, not examined.', { size: 12.5, fill: C.SOFT });

s = content(pres, 'ANALYZE, IN PRACTICE — AND WHERE INITIATIVES DIE', 'Part Seven — DMAIC');
card(s, pres, CX, 1.1, 6.05, 3.15, 'Five whys — two rules', ['A cause attributed to a person is not a process cause. “Because he did not deliver on time” restates the symptom. The next question is always: what in the process allows that to happen without anyone noticing?', 'Stop when you reach something somebody controls. “Because the market is volatile” has gone one step too far; a chain that stops at the second link has not gone far enough.'], { bullets: true, size: 13 });
callout(s, pres, 6.8, 1.1, 6.05, 3.15, 'What the technique reliably demonstrates: the cause people name first is usually the third or fourth link in the chain — still a symptom. Pareto then answers a different question: of the many verified causes, which few account for most of the effect.\n\nWe do this live, on the queue your value stream sketch reveals in the group activity.', { size: 13 });
card(s, pres, CX, 4.45, 4.0, 2.4, 'In Analyze', 'The team arrives with its preferred solution and uses the phase to justify it. Symptom: the root cause turns out to be whatever someone already wanted to buy.', { size: 12.5 });
card(s, pres, 4.67, 4.45, 4.0, 2.4, 'In Control', 'The gain exists for as long as the team exists. Once it disperses the process regresses within months, because nobody inherited the standard.', { size: 12.5 });
card(s, pres, 8.83, 4.45, 4.0, 2.4, 'The cheapest safeguard', 'A tollgate at the end of each phase, chaired by the executive sponsor who owns the business result — not by the specialist running the project. Whoever conducts the work is not whoever approves it.', { size: 12.5, fill: C.SOFT });

s = content(pres, 'DMAIC AS A PROJECT — AND WHERE IT DOES NOT APPLY', 'Part Seven — DMAIC');
projectTerms(s, pres, CX, 1.1, CW, 3.4, 'DMAIC is a project with the weight in a different place: a conventional plan commits to a solution at authorisation; DMAIC forbids naming one until a cause has been verified.',
  'The vocabulary overlaps almost exactly — charter, tollgates as stage gates, sponsor. The gate between Analyze and Improve is the one with no equivalent in most governance frameworks, and it is the one that does the work. Control maps onto benefits realisation and handover to operations — the phase every methodology describes and few organisations perform.',
  'At the next approval, ask what the verified cause is. If the answer is a solution — “we need a new system”, “we need more people” — the project is at Define, whatever the gate it is passing through says.');
callout(s, pres, CX, 4.75, CW, 2.1, 'Where the method does not apply. DMAIC assumes a repeatable process with a definable defect. Applied to the exploratory front end — research, invention, early-stage product discovery — it suppresses precisely the variation that discovery depends on. The organisation needs two regimes, one for exploring and one for exploiting, and clarity about which process is in which. The afternoon returns to this with Cynefin.', { size: 13.5 });

// ------------------------------------------------------------ EIGHT
S('Part Eight — The third equation');
divider(pres, 'Part Eight', 'The third equation', 'The identity was stated in Part Two before there was anything to test it against. Everything since has been that test. This part puts the three terms back together — and answers the puzzle.', 'Part Eight — The third equation');

s = content(pres, 'V = C × (A + P)', 'Part Eight — The third equation');
table(s, [['Term', 'What it is', 'Visibility'],
  ['A — Assets', 'Plants, machines, systems. What the pillars stand on.', 'Visible and purchasable'],
  ['P — Processes', 'How work flows across the assets. The pillars and the foundation.', 'Partly visible, imitable with effort'],
  ['C — Capability', 'The repeated ability to improve P. The centre of the house.', 'Barely visible, rarely imitable']], CX, 1.1, CW, { colW: [2.4, 6.4, 3.53], size: 14 });
callout(s, pres, CX, 3.5, CW, 1.0, 'You can buy a plant, license a platform, hire a consultant to redraw a process. You cannot buy the organisation\'s repeated ability to improve. And if C approaches zero, V approaches zero regardless of what A and P are worth.', { size: 14.5, bold: true, color: C.NAVY });
projectTerms(s, pres, CX, 4.65, CW, 2.25, 'Sort what a PMO owns by the three terms, and most of it lands in the bracket.',
  'Scheduling tool, portfolio platform, dashboards: A. Methodology, templates, gate model, certified staff: P. Both purchasable by every competitor at roughly the same price. C is what is left — whether this organisation reliably gets better at delivering, and whether that survives the people who drove it.',
  'Three questions for the PMO: what do we deliver better this year than last, and how do we know? Which improvement survived its author leaving? What would remain if the tool were replaced tomorrow?');

s = content(pres, 'THE PUZZLE, ANSWERED', 'Part Eight — The third equation');
card(s, pres, CX, 1.1, 6.05, 3.6, 'What changed at Fremont — and where does it appear?', 'Not A: same building, same equipment. Not only P: the processes changed, but GM photographed and copied those for twenty years without the result. What changed was C — the organisation\'s repeated ability to find and fix its own problems, with the same people who had been unable to the year before. On the balance sheet it appears nowhere, which is the point. It shows up only in its consequences: quality, the inventory no longer needed, a return on capital no line item explains.', { size: 13 });
card(s, pres, 6.8, 1.1, 6.05, 3.6, 'Why was it never replicated across GM?', 'Because what GM could observe was the bracket, and what produced the result was the coefficient. Kanban boards, andon cords, standardised work sheets were visible and copied. The rules-in-use that made them work — how problems are surfaced, who may stop the line, how an improvement is run as an experiment — were not written down anywhere, because at Toyota nobody needed to write them down.', { size: 13, fill: C.SOFT });
callout(s, pres, CX, 4.9, CW, 1.0, 'Now grade the line you wrote at 09:10. Did it name the bracket, or the coefficient?', { size: 16, bold: true, color: C.NAVY });
callout(s, pres, CX, 6.05, CW, 0.8, 'That is the whole of the afternoon\'s argument about benchmarking — and why the day ends on how C is built rather than on where it can be bought.', { size: 13, italic: true, fill: C.SOFT, line: C.BLUE });

s = content(pres, 'THE EQUATIONS, IN ONE PLACE', 'Part Eight — The third equation');
table(s, [['Equation', 'What it establishes'],
  ['Value stick — WTP − SOC', 'Lean pushes both edges outward at once: Jidoka and JIT each lower cost and raise willingness to pay.'],
  ['Competitive advantage — VC = (WTPA − CA) − (WTPB − CB)', 'Creating value is necessary; creating more of it than the rival is what the firm is paid for. When an improvement is copyable, the two brackets converge and VC returns to zero.'],
  ['Economic profit — ROIC vs. WACC', 'Lean lifts the numerator and cuts the denominator, moving return above the cost of capital.'],
  ['VCAP — V = C × (A + P)', 'It does so only for organisations that build the multiplier rather than buying the bracket.']], CX, 1.1, CW, { colW: [4.6, 7.73], size: 13.5 });
card(s, pres, CX, 4.75, 6.05, 2.1, 'Porter\'s objection', 'Operational effectiveness is imitable, so its gains compete away; strategy-grade advantage must live somewhere harder to copy. Where, exactly — and what does that imply for a programme whose entire output is better processes?', { size: 12.5 });
card(s, pres, 6.8, 4.75, 6.05, 2.1, 'Spear & Bowen\'s finding', 'What distinguishes Toyota is not its tools but its rules-in-use: tacit rules governing how flow paths are specified and how every improvement is run as a controlled experiment. Tacit rules can be observed and still not transferred.', { size: 12.5, fill: C.SOFT });

// ------------------------------------------------------------ NINE
S('Part Nine — Group activity');
divider(pres, 'Part Nine', 'Group activity — the Value Case', 'One real project, appraised through the three lenses built this morning: where it moves willingness to pay, where it removes waste, and what it actually builds. Groups of three or four; one scribe on the fillable canvas; one spokesperson.', 'Part Nine — Group activity');

s = content(pres, 'WHY THIS APPRAISAL DIFFERS FROM A BUSINESS CASE', 'Part Nine — Group activity');
para(s, 'A conventional business case answers one question — does the return exceed the cost? Necessary, and silent on the three things that decide whether the return survives.', CX, 1.1, CW, 0.7, { size: 14.5 });
card(s, pres, CX, 1.95, 4.0, 2.6, 'Which edge of value does this move?', 'A project that only lowers cost competes on the edge where every rival is also working. Raising willingness to pay is harder, rarer, and usually under-argued because the number is harder to produce.', { size: 13 });
card(s, pres, 4.67, 1.95, 4.0, 2.6, 'Is the saving a named waste, or an aspiration?', '“Improves efficiency by 15%” is a target. “Eliminates the three re-approvals caused by incomplete submissions” is a waste with a name — and only the second can be verified afterwards.', { size: 13, fill: C.SOFT });
card(s, pres, 8.83, 1.95, 4.0, 2.6, 'More capable, or only better equipped?', 'Assets and processes can be replicated by any competitor willing to spend the same money. A project that leaves the organisation better at improving cannot.', { size: 13 });
callout(s, pres, CX, 4.75, CW, 1.0, 'Those three questions are one question in disguise, and VC states it: a project is worth defending to the extent that it widens the gap between (WTP − cost) for your firm and the same quantity for the competitor you are actually losing deals to.', { size: 13.5 });
callout(s, pres, CX, 5.9, CW, 0.95, 'The raw material: one authorised project a member knows well enough to defend. Ninety seconds to choose — pick the one the group disagrees about, not the one with the best business case.', { size: 13, fill: C.SOFT, line: C.BLUE });

s = content(pres, 'THE VALUE CASE CANVAS — SIX STEPS', 'Part Nine — Group activity');
const steps = [['1', 'The project', 'What it is, who sponsors it, what it was approved to achieve.'],
  ['2', 'The WTP edge', 'Competitive priority moved; quality dimension; order winner or qualifier; who is the customer — and would they notice?'],
  ['3', 'Map the stream', 'Three to six steps with who performs them; process time; lead time; where the gap sits.'],
  ['4', 'The cost edge', 'Name the waste from the eight — not a benefit. Where it occurs today; order of magnitude.'],
  ['5', 'What it builds', 'Decompose into A, P and C. The test for C is strict: training people on the new system is delivering the asset.'],
  ['6', 'The verdict', 'How long before a competitor could replicate this? Fund · fund with conditions · do not fund — and what would have to be added to build C.']];
steps.forEach((st, i) => { const col = i % 3, row = Math.floor(i / 3); const x = CX + col * 4.17, y = 1.05 + row * 2.55; s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.95, h: 2.35, fill: { color: row ? C.SOFT : C.WHITE }, line: { color: C.BLUE, width: 1.25 }, rectRadius: 0.12 }); s.addText(st[0], { x: x + 0.2, y: y + 0.15, w: 0.6, h: 0.6, fontFace: 'Cambria', fontSize: 30, bold: true, color: C.GOLD, margin: 0, isTextBox: true }); s.addText(st[1], { x: x + 0.85, y: y + 0.22, w: 3.0, h: 0.5, fontFace: L.FONT, fontSize: 16, bold: true, color: C.NAVY, margin: 0, isTextBox: true }); s.addText(st[2], { x: x + 0.2, y: y + 0.85, w: 3.55, h: 1.4, fontFace: L.FONT, fontSize: 12, color: C.INK, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.1 }); });
para(s, 'The group presents step 1 and step 6, with the reasoning that connects them. One spokesperson. The canvas is fillable online, saved in the browser as you type, and exportable — download before closing the tab.', CX, 6.25, CW, 0.65, { size: 12.5, italic: true, color: C.MUT });

s = content(pres, 'WHAT TO EXPECT', 'Part Nine — Group activity');
card(s, pres, CX, 1.1, 6.05, 3.3, 'Only one edge moves', 'Most project portfolios are built almost entirely of cost-edge projects. That is not wrong, but it is a choice, and usually an unexamined one. The question it raises: what would it take for this same project to also move willingness to pay — and would that cost much more?', { size: 14, headSize: 18 });
card(s, pres, 6.8, 1.1, 6.05, 3.3, 'C is empty', 'Projects deliver assets and processes because those are what can be specified, scheduled and signed off. Capability resists all three. The question it raises: if A and P are purchasable by any competitor, what in this portfolio is actually building advantage?', { size: 14, headSize: 18, fill: C.SOFT });
callout(s, pres, CX, 4.6, CW, 1.0, 'Neither result is a failure of the project you chose. Both are findings worth reporting.', { size: 15, bold: true, color: C.NAVY });
callout(s, pres, CX, 5.75, CW, 1.1, 'Keep the export and bring it to the afternoon: Session 2 examines the digital tooling that project depends on. Module 3 closes with a group Execution Optimization Challenge, and an appraised project of your own is the kind of material it draws on.', { size: 13, fill: C.SOFT, line: C.BLUE });

// ------------------------------------------------------------ TEN
S('Part Ten — Conclusion');
divider(pres, 'Part Ten', 'Where the morning ends', 'One claim, five moves, four equations — and three things that should survive six months.', 'Part Ten — Conclusion');

s = content(pres, 'THE ARGUMENT, IN FIVE MOVES', 'Part Ten — Conclusion');
const moves = ['Value is defined from the customer backwards. Order winners create preference, qualifiers only avoid elimination, and the value stick says there are exactly two ways to create value.',
  'Waste is the gap between those two edges, and the value stream map makes it visible: a few hours of work inside weeks of elapsed time, almost all of it waiting.',
  'The waiting is produced by utilisation, not cured by it. Flow efficiency, not resource efficiency, is what the customer experiences.',
  'Variation is the other half of the method. Lean removes the time the work is not being worked on; Six Sigma narrows the spread that makes that time unpredictable. Neither holds its gain without the other.',
  'All of it shows up in return on capital — in the margin through less rework, and in the denominator through less inventory. The denominator is the half that business cases forget.'];
moves.forEach((m, i) => { const y = 1.05 + i * 1.15; s.addShape(pres.shapes.OVAL, { x: CX, y: y + 0.1, w: 0.7, h: 0.7, fill: { color: C.NAVY }, line: { color: C.NAVY } }); s.addText(String(i + 1), { x: CX, y: y + 0.1, w: 0.7, h: 0.7, fontFace: 'Cambria', fontSize: 20, bold: true, color: C.WHITE, align: 'center', valign: 'middle', margin: 0, isTextBox: true }); s.addText(m, { x: CX + 0.95, y, w: CW - 0.95, h: 1.05, fontFace: L.FONT, fontSize: 13.5, color: C.INK, valign: 'middle', margin: 0, isTextBox: true, lineSpacingMultiple: 1.12 }); });

s = content(pres, 'FOUR EQUATIONS, ONE STAIRCASE', 'Part Ten — Conclusion');
const eqs = [['Value created = WTP − SOC', 'Where value comes from, and the only two moves that create it.'], ['VC = (WTPA − CA) − (WTPB − CB)', 'Creating value is not having an advantage. Advantage is the difference — and a copyable improvement returns it to zero.'], ['ROIC = margin × capital turnover', 'How the improvement reaches the people who fund it, through both levers at once.'], ['V = C × (A + P)', 'Why two organisations with the same assets and processes get different results — and where the residue of advantage can live.']];
eqs.forEach((e, i) => { const y = 1.05 + i * 1.45, x = CX + i * 0.45; s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.2, h: 1.25, fill: { color: C.NAVY }, line: { color: C.NAVY }, rectRadius: 0.1 }); s.addText(e[0], { x: x + 0.15, y, w: 4.9, h: 1.25, fontFace: 'Cambria', fontSize: 18, bold: true, color: C.WHITE, align: 'center', valign: 'middle', margin: 0, isTextBox: true }); s.addText(e[1], { x: x + 5.4, y, w: CW - 5.4 - i * 0.45, h: 1.25, fontFace: L.FONT, fontSize: 13.5, color: C.INK, valign: 'middle', margin: 0, isTextBox: true, lineSpacingMultiple: 1.12 }); });

s = content(pres, 'WHAT SHOULD SURVIVE SIX MONTHS', 'Part Ten — Conclusion');
card(s, pres, CX, 1.1, 4.0, 2.6, 'Count elapsed time, not effort', 'The question is never “how long does this take to do” but “how long does it wait” — and the answer is usually ninety per cent of the lead time.', { size: 13.5 });
card(s, pres, 4.67, 1.1, 4.0, 2.6, 'Starting less finishes more', 'Projects in flight divided by projects finished a year is your real lead time, whatever the schedules say — the one number on the slide nobody can argue with.', { size: 13.5, fill: C.SOFT });
card(s, pres, 8.83, 1.1, 4.0, 2.6, 'Buy the bracket, build the coefficient', 'Every tool and every method is available to a competitor at the same price. What is not is the repeated ability to find and fix your own problems — what Fremont changed, and what GM could not copy.', { size: 13.5 });
projectTerms(s, pres, CX, 3.9, CW, 3.0, null,
  'ONE PROCESS — take the recurring process you brought, walk it with the people who do it, and write two numbers on one line: hours of work, days of elapsed time. TWO COUNTS — projects in flight; projects closed in the last twelve months. Divide.',
  'ONE QUESTION — at the next approval you sit in, ask which edge of value the project moves and what is left when the competitor does the same. If the answer is nothing, fund it to the threshold and not beyond.');

s = content(pres, 'WHAT THE AFTERNOON TESTS', 'Part Ten — Conclusion');
para(s, 'The morning ended on a claim: value is not the sum of what an organisation owns and how it works, but that sum scaled by its capacity to improve. The afternoon tests the claim against the two things organisations buy when they want that capacity and cannot build it.', CX, 1.1, CW, 0.9, { size: 15 });
card(s, pres, CX, 2.2, 6.05, 2.4, 'Technology', 'Digital platforms — the most expensive thing on the list and the easiest to mistake for capability. Artificial intelligence as the extreme case of the same error.', { size: 14, headSize: 18 });
card(s, pres, 6.8, 2.2, 6.05, 2.4, "Other people's practices", 'Benchmarking — the only one that looks like it should work. Why GM toured NUMMI for twenty years and copied everything that could be photographed.', { size: 14, headSize: 18, fill: C.SOFT });
callout(s, pres, CX, 4.85, CW, 1.0, 'Bring two things: your Value Case canvas, and your NUMMI hypothesis with the resolution we reached. 14:00.', { size: 15, bold: true, color: C.NAVY });

closing(pres, 'Prof. Dr. Thiago Lima\ntflsixsigma@gmail.com\n\nReading notes, simulators and the Value Case Canvas:\ntflsixsigma-png.github.io/lean-six-sigma-digital-tools-benchmarking\n\nInternational Certificate in Project Management and Organizational Performance · Module 3, Session 4');

pres.writeFile({ fileName: 'Session_1_Lean_Six_Sigma_Continuous_Improvement.pptx' }).then(f => console.log('wrote', f));
