const L = require('./lib.js');
const { newDeck, cover, closing, content, divider, card, bullets, para, table, equation, figure, callout, stat, projectTerms, agenda, C, CX, CW } = L;

const pres = newDeck({ title: 'Digital Tools & Benchmarking', footer: 'Digital Tools & Benchmarking · Module 3, Session 4 · 17 October 2026 · Prof. Dr. Thiago Lima' });
const S = (t) => pres.addSection({ title: t });

S('Opening');
cover(pres, 'Digital Tools & Benchmarking',
  'International Certificate in Project Management and Organizational Performance',
  'Module 3 — Methods, Tools and Operational Efficiency · Session 4, afternoon\n17 October 2026 · 14:00–17:00 (Brasília time) · Online\nProf. Dr. Thiago Lima');

let s = content(pres, 'SUMMARY', 'Opening');
agenda(s, pres, ['The digital puzzle — two firms, one platform', 'What a digital investment actually buys', 'Philosophy eats AI', 'From a working model to an organisational result', 'Benchmarking — decoding the rules-in-use', 'The transformation vector — Cynefin and Kata', 'Structured activity — the Digital Tool Appraisal', 'Building the multiplier']);
card(s, pres, 8.6, 1.3, 4.2, 2.75, 'The order is deliberate', 'Digital platforms come first because they are the most expensive thing on the list and the easiest to mistake for capability. AI comes next as the extreme case of the same error. Benchmarking comes last because it is the only one that looks like it should work.', { fill: C.SOFT, size: 12.5 });
card(s, pres, 8.6, 4.25, 4.2, 2.45, 'What to bring from the morning', ['Your Value Case canvas — this afternoon examines the tooling that project depends on', 'Your NUMMI hypothesis, and the resolution we reached'], { bullets: true, size: 12.5 });

s = content(pres, 'THE CLAIM THE AFTERNOON TESTS', 'Opening');
equation(s, pres, CX, 1.1, CW, 1.5, 'V = C × (A + P)', 'assets and processes are additive and purchasable — capability is a coefficient');
para(s, 'This morning ended on that claim: value is not the sum of what an organisation owns and how it works, but that sum scaled by its capacity to improve. The afternoon tests it against the two things organisations buy when they want that capacity and cannot build it.', CX, 2.85, CW, 1.0, { size: 15 });
card(s, pres, CX, 4.0, 6.05, 2.8, 'Technology', 'A platform enters the bracket. The coefficient is bought separately, or not at all. The assets are more expensive than Fremont\'s, the vendors more persuasive, and the arithmetic unchanged.', { size: 14, headSize: 18 });
card(s, pres, 6.8, 4.0, 6.05, 2.8, "Other people's practices", 'Benchmarking transfers P and purchases A, and neither moves the term that multiplies them. GM toured NUMMI for twenty years and copied everything that could be photographed.', { size: 14, headSize: 18, fill: C.SOFT });

// ONE
S('Part One — The digital puzzle');
divider(pres, 'Part One', 'The digital puzzle', 'If this sounds like Fremont with better software, that is the point.', 'Part One — The digital puzzle');
s = content(pres, 'TWO FIRMS, ONE PLATFORM', 'Part One — The digital puzzle');
card(s, pres, CX, 1.1, 6.05, 2.6, 'The setting', 'Two organisations in the same industry, of comparable size, buy the same enterprise platform from the same vendor in the same year. Same modules, same implementation partner, comparable budgets. One also deploys the same demand-forecasting model, trained on a similar history.', { size: 14 });
card(s, pres, 6.8, 1.1, 6.05, 2.6, 'Three years later', 'One has materially shorter lead times and a forecast its planners trust. The other has the platform, the licences, the dashboards — and a planning process that works around all three.', { size: 14, fill: C.SOFT });
callout(s, pres, CX, 3.95, CW, 1.2, 'Nothing in the purchase differed. Where did the difference come from — and why was it invisible in both business cases?', { size: 18, bold: true, color: C.NAVY });
callout(s, pres, CX, 5.35, CW, 1.4, 'Write your hypothesis in one line, as this morning. The morning established that assets and processes are additive and purchasable while capability is a coefficient. This afternoon the assets are more expensive, the vendors more persuasive, and the arithmetic unchanged.', { size: 13.5, fill: C.SOFT, line: C.BLUE });

// TWO
S('Part Two — What a digital investment buys');
divider(pres, 'Part Two', 'What a digital investment actually buys', 'Almost every platform is an A decision. Some are also a P decision. Very few are a C decision — and the error that destroys the business case is not buying A, it is booking the benefit as though C had moved.', 'Part Two — What a digital investment buys');

s = content(pres, 'THE LANDSCAPE, IN SIX CATEGORIES — EXAMPLES ONLY', 'Part Two — What a digital investment buys');
table(s, [['Category', 'Examples', 'What it typically changes', 'Usual term'],
  ['Collaboration and work management', 'Asana, Monday, Trello, Planner, Jira', 'Visibility of tasks and ownership', 'A — and P if the flow of work is genuinely redesigned'],
  ['Scheduling and portfolio', 'MS Project, Primavera P6, Planview, Clarity', 'Baselines, dependencies, resource and portfolio views', 'A, occasionally P'],
  ['Analytics and dashboards', 'Power BI, Tableau, Looker', 'What leadership can see, and how often', 'A — see the caution'],
  ['Integration and the data layer', 'APIs, integration platforms, a warehouse or lakehouse', 'Where the authoritative version of each fact lives', 'Frequently the only genuine P in a programme'],
  ['Automation and workflow', 'Workflow engines, robotic process automation', 'Steps performed without a person', 'P, and A'],
  ['AI and assistive', 'Assistants, forecasting models, document generation, agents', 'Predictions, drafts, and increasingly actions', 'A — Parts Three and Four say why']], CX, 1.05, CW, { colW: [2.7, 3.3, 3.3, 3.03], size: 12, headSize: 11.5 });
callout(s, pres, CX, 5.2, CW, 1.65, 'The market changes faster than any syllabus and nothing here is a recommendation. Two observations survive every change: the least visible category — the data layer — most often carries the real process change, and demonstrates nothing on a screen. The most visible — dashboards — changes what is seen without changing what is done, unless somebody also changes the decision the dashboard feeds.', { size: 12.5 });

s = content(pres, 'THE TRIAGE, APPLIED TO A TOOL', 'Part Two — What a digital investment buys');
table(s, [['Term', 'What a tool contributes', 'The test'],
  ['A — Assets', 'Licences, infrastructure, models, dashboards. The organisation owns something it did not own before.', 'Could a competitor with the same budget hold this position in six months? Usually yes.'],
  ['P — Processes', 'The flow of work changes: approvals route differently, handoffs disappear, a queue is capped.', 'Would the new flow survive if the tool were replaced by a different vendor\'s?'],
  ['C — Capability', 'The organisation ends up better at improving its processes than it was before.', 'What can it now do that it could not do before — that does not depend on the new system?']], CX, 1.1, CW, { colW: [1.9, 5.4, 5.03], size: 13.5 });
callout(s, pres, CX, 4.0, CW, 1.1, 'Training people to operate the new system is not capability. It is part of delivering the asset, and it ends when the people who were trained leave. The C test is deliberately hard to pass; recording an honest A, or A and P, is what makes the appraisal useful.', { size: 13.5 });
card(s, pres, CX, 5.3, CW, 1.55, 'A caution on dashboards, carried over from this morning', 'A dashboard reports variation; it does not distinguish the two kinds. A routine that demands an explanation for every movement against target treats common-cause variation as special cause — which makes the process worse. The instrument is not the problem. The routine attached to it is, and the routine is a P decision that almost never appears in the tooling business case.', { size: 12, fill: C.SOFT });

s = content(pres, 'THE PRODUCTIVITY PARADOX — AND THE TRAP THAT LOOKS LIKE SPEED', 'Part Two — What a digital investment buys');
card(s, pres, CX, 1.1, 6.05, 2.5, 'Returns appear where the complements exist', 'Research on IT investment has repeatedly found the same shape: returns to technology appear where complementary organisational practices exist, and are close to nil where they do not. The pattern survived decades of changing technology because it was never about the technology. A platform is a practice that arrives with an invoice attached.', { size: 12.5 });
card(s, pres, 6.8, 1.1, 6.05, 2.5, 'Little\'s Law does not stop at the screen', 'A platform that makes work easier to start, and does not cap what is in progress, lengthens lead time. With throughput fixed, more in flight is more time in flight. The tool is not underperforming: it is performing, and nobody capped the queue. The most common disappointment in enterprise tooling, almost never diagnosed correctly.', { size: 12.5, fill: C.SOFT });
projectTerms(s, pres, CX, 3.8, CW, 3.05, 'A platform\'s benefit is not proportional to its adoption, and every fact needs exactly one home.',
  'A tool used as the working record by 40% of the people it was bought for does not deliver 40% of a single-source benefit; it delivers close to none, because the other 60% means every figure still has to be reconciled. A date, a risk or a cost that lives in two systems imposes a permanent reconciliation tax and turns the dashboard into a negotiation.',
  'List the five facts leadership asks about most. For each, write where the authoritative version lives. If any has two homes, that is the first project — and it is not a software project. Then put change management on the same budget line as licences.');

// THREE
S('Part Three — Philosophy eats AI');
divider(pres, 'Part Three', 'Philosophy eats AI', 'AI is the extreme case of everything above: the most expensive asset an organisation can buy, and the one whose return depends most completely on a capability that cannot be bought alongside it.', 'Part Three — Philosophy eats AI');

s = content(pres, 'THE BINDING CONSTRAINT IS NOT TECHNICAL', 'Part Three — Philosophy eats AI');
para(s, 'Schrage and Kiron (MIT Sloan Management Review, 2025): organisations invest heavily in algorithms, data infrastructure and talent while never articulating what their systems should value, how they should know, and what they should represent about reality. Those assumptions do not stay harmless because they were never written down. They are executed, at scale, continuously.', CX, 1.1, CW, 1.1, { size: 14.5 });
card(s, pres, CX, 2.4, 4.0, 4.4, 'Teleology — what the system is told to want', ['The objectives and the hierarchy among them. The most critical pillar and the most frequently skipped: a single objective is easy to state; a ranking of conflicting objectives requires a decision nobody wants to put in writing.', 'A forecast optimised to minimise inventory systematically underestimates seasonal peaks.', 'Where you have met this: order winners and qualifiers — purposes never ranked.'], { bullets: true, size: 11.5, headSize: 14 });
card(s, pres, 4.67, 2.4, 4.0, 4.4, 'Epistemology — what it may count as knowing', ['How it acquires knowledge, validates it, and expresses certainty. Systems that treat historical patterns as permanent truths are fragile.', 'The pandemic invalidated the data behind practically every demand model simultaneously — and the models kept reporting confidence throughout.', 'Where you have met this: the andon. A system that knows when it does not know, and escalates, signals at the source.'], { bullets: true, size: 11.5, headSize: 14, fill: C.SOFT });
card(s, pres, 8.83, 2.4, 4.0, 4.4, 'Ontology — what it is able to see', ['Which entities it recognises, which relations it models, which variables exist for it at all.', 'A sourcing system that sees suppliers as price and quality alone — ignoring geopolitical exposure, sustainability, innovation — is locally optimal and systemically fragile.', 'Where you have met this: causal ambiguity — benchmarking the indicator instead of the practice that produces it.'], { bullets: true, size: 11.5, headSize: 14 });

s = content(pres, 'THE MAP IS NOT THE TERRITORY', 'Part Three — Philosophy eats AI');
card(s, pres, CX, 1.1, 6.05, 3.1, 'Schrage and Kiron\'s own example — loyalty', 'Companies say they want loyal customers and then hand the system recency, frequency, monetary value, churn and NPS — proxies that were never loyalty, only the parts of it that could be counted. The system optimises the proxies, faithfully, and the organisation forgets that it ever meant anything else.', { size: 13.5 });
callout(s, pres, 6.8, 1.1, 6.05, 3.1, '“The map is not the territory.”  — Korzybski, quoted by Schrage and Kiron\n\nThe question to ask of any system: what has it been given as a stand-in for the thing you actually care about?', { size: 16, color: C.NAVY });
card(s, pres, CX, 4.45, CW, 2.4, 'The failure the three pillars predict', 'A sourcing system optimised for cost and delivery which, two years on, has systematically excluded suppliers in the regions the firm\'s own strategy prioritised. The fault is not in the model. The correction is not technical either — adding a column does not resolve it. The hierarchy of objectives was never articulated, so the trade-off was decided by default; without articulating it, the technical fix creates a new debt in the opposite direction.', { size: 13, fill: C.SOFT });

s = content(pres, 'PHILOSOPHICAL DEBT', 'Part Three — Philosophy eats AI');
para(s, 'Schrage and Kiron\'s phrase for the condition is “tacit, unarticulated philosophical principles”; the Gemini episode they analyse is “teleological chaos”. The term used in this course for the accumulation is philosophical debt (Lima, 2026, Ch. 5): unarticulated assumptions about purpose, knowledge and reality, embedded in the models, compounding silently.', CX, 1.1, CW, 1.1, { size: 14 });
card(s, pres, CX, 2.4, 6.05, 2.1, 'Technical debt accumulates in A and P', 'A shortcut in the artefact. A compromise somebody made and could document.', { size: 14, headSize: 16 });
card(s, pres, 6.8, 2.4, 6.05, 2.1, 'Philosophical debt accumulates where C should be', 'An absence in the organisation. Nobody wrote down the hierarchy of purposes, so nobody can audit it, so nobody can improve it.', { size: 14, headSize: 16, fill: C.NAVY, line: C.NAVY, headColor: C.GOLD, color: C.WHITE });
callout(s, pres, CX, 4.7, CW, 1.0, 'An organisation that cannot say what its system is optimising for has no object on which to run an improvement routine. That is a deficit in capability, arriving dressed as a purchase of assets.', { size: 14.5, bold: true, color: C.NAVY });
card(s, pres, CX, 5.85, CW, 1.0, null, 'From predictive to agentic: when the system acts without a human in each step, the hierarchy of purposes stops being a statement of intent and becomes the place where the boundary of autonomy is actually set.', { size: 12.5, fill: C.SOFT });

s = content(pres, 'THE QUESTION FOR THE NEXT STEERING COMMITTEE', 'Part Three — Philosophy eats AI');
para(s, 'Technical safeguards — value limits, audit logs, anomaly alerts — are necessary and not sufficient. Before granting any system autonomy, three philosophical ones:', CX, 1.1, CW, 0.7, { size: 15 });
card(s, pres, CX, 2.0, 4.0, 3.2, 'Teleology', 'Is the hierarchy of purposes documented — including what the system should do when cost, quality and sustainability conflict?', { size: 14, headSize: 17 });
card(s, pres, 4.67, 2.0, 4.0, 3.2, 'Epistemology', 'Does it know when it does not know, and escalate below a confidence threshold?', { size: 14, headSize: 17, fill: C.SOFT });
card(s, pres, 8.83, 2.0, 4.0, 3.2, 'Ontology', 'Can it recognise a supplier or a context it has never seen, or does it only optimise inside the world it was trained on?', { size: 14, headSize: 17 });
callout(s, pres, CX, 5.45, CW, 1.3, 'Without those three, autonomy is risk wearing the costume of efficiency.', { size: 18, bold: true, color: C.NAVY });

// FOUR
S('Part Four — Six conditions');
divider(pres, 'Part Four', 'From a working model to an organisational result', 'Part Three was an argument. This is a structure for testing it on a specific implementation — from the studies that installed AI in a real organisation, changed something, and measured what happened.', 'Part Four — Six conditions');

s = content(pres, 'WHERE THE FRAMEWORK COMES FROM', 'Part Four — Six conditions');
stat(s, pres, CX, 1.1, 3.9, 2.3, '1,271 → 37', 'records screened → studies with both an implementation and a comparison. Roughly one for every eight that end at a model or a simulation.', { bigSize: 30, size: 12 });
stat(s, pres, 4.72, 1.1, 3.9, 2.3, 'Accuracy ≠ result', 'among studies that produced no effect, predictive performance stayed high wherever it was measured', { bigSize: 28, size: 12.5, bigColor: C.GOLD });
stat(s, pres, 8.93, 1.1, 3.9, 2.3, 'PRISMA 2020', 'systematic review of AI implementations (Lima, manuscript in preparation). Evidence base: hospitals.', { bigSize: 28, size: 12 });
callout(s, pres, CX, 3.65, CW, 1.1, 'Model accuracy does not separate success from failure. Something else does — and it is not a property of the tool.', { size: 16, bold: true, color: C.NAVY });
card(s, pres, CX, 4.95, CW, 1.9, 'How to use it', 'The conditions are stated here in general organisational terms — an extension of the framework, not a finding of the review. Use it as a structure for appraisal, not as a citable result. Before adoption it is a checklist of conditions the organisation itself controls; after, it locates the link where the implementation failed — a more useful question than whether the model was accurate.', { size: 12.5, fill: C.SOFT });

s = content(pres, 'SIX CONDITIONS — EACH NECESSARY, NONE SUFFICIENT', 'Part Four — Six conditions');
const chain = [['0', 'Evidence base', 'THE TOOL', C.NAVY], ['1', 'Technical capability in operation', 'THE TOOL', C.NAVY], ['2', 'Workflow integration', 'CAPABILITY 1', '04121F'], ['3', 'Translation into action', 'CAPABILITY 2', '04121F'], ['4', 'Organisational outcome', 'THE RESULT', C.NAVY], ['5', 'Net value', 'THE RESULT', C.NAVY]];
chain.forEach((c, i) => { const x = CX + i * 2.07, w = 1.95; s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.05, w, h: 1.55, fill: { color: c[3] }, line: { color: i === 2 || i === 3 ? C.GOLD : C.BLUE, width: i === 2 || i === 3 ? 3 : 1 }, rectRadius: 0.1 }); s.addText([{ text: c[0] + '  ', options: { color: C.GOLD, bold: true, fontSize: 14 } }, { text: c[1], options: { color: C.WHITE, bold: true, fontSize: 12.5, breakLine: true } }, { text: c[2], options: { color: 'A3B7CD', fontSize: 9, charSpacing: 2 } }], { x: x + 0.12, y: 1.12, w: w - 0.24, h: 1.4, fontFace: L.FONT, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 1.1 }); });
table(s, [['', 'The question to ask', 'What it looks like when it breaks'],
  ['0 Evidence base', 'Has this class of application produced a measured result in a real organisation — not a model, not a simulation?', 'Modelling studies and vendor material, with no measured implementation anywhere.'],
  ['1 Technical capability', 'Does the model still perform on our data, at the threshold actually in use?', 'Pre-deployment performance not reproduced in routine use.'],
  ['2 Workflow integration', 'Does the output reach whoever decides, while the decision is still open?', 'Two thirds of the staff never open it; or it arrives after the decision was taken.'],
  ['3 Translation into action', 'When it arrives, is there an owner able to act — with the resources that action requires?', 'Cases correctly identified and nobody able to act.'],
  ['4 Organisational outcome', 'Which management indicator should move, from which source, against which baseline?', 'Benefit stated in general terms, or confirmed only by what users say they felt.'],
  ['5 Net value', 'What does the gain cost, and who bears it?', 'Gains offset by work displaced to other people or other hours.']], CX, 2.75, CW, { colW: [2.3, 5.6, 4.43], size: 11, headSize: 11 });

s = content(pres, 'THE TWO MIDDLE CONDITIONS ARE THE ORGANISATION\'S', 'Part Four — Six conditions');
callout(s, pres, CX, 1.1, CW, 1.2, 'Conditions 2 and 3 are not properties of the tool at all: they are capabilities of the organisation that bought it. This is C, made measurable — and it is where the reviewed evidence says value is most often lost. Neither is something a vendor can fix.', { size: 15, bold: true, color: C.NAVY });
card(s, pres, CX, 2.5, 6.05, 2.4, 'Bridge to Part Three', 'The pillars ask what nobody articulated; the chain asks what nobody measured. Teleology surfaces at conditions 4 and 5, epistemology at condition 2, ontology at 1 and 3.', { size: 13.5 });
card(s, pres, 6.8, 2.5, 6.05, 2.4, 'Bridge to project practice', 'Condition 4 is benefits realisation management, which Serra and Kunc (2015) associate with project success and the execution of strategy rather than the delivery of outputs. Conditions 2 and 3 are almost never in a digital project\'s scope: the system is delivered, and the decision it enters and the capacity to act on it are left to change management after go-live.', { size: 12.5, fill: C.SOFT });
equation(s, pres, CX, 5.15, CW, 1.7, 'Adopting AI is a process-design decision, not a technology purchase', 'conditions 2 and 3 are the organisation\'s, not the vendor\'s', 22);

// FIVE
S('Part Five — Benchmarking');
divider(pres, 'Part Five', 'Benchmarking: decoding the rules-in-use', 'Benchmarking is conventionally practised as corporate tourism: visiting high-performing firms, photographing their tools, buying their software, pasting their org charts. That is why it fails — and the method itself is not the reason.', 'Part Five — Benchmarking');

s = content(pres, 'THE METHOD, BEFORE THE CRITIQUE — CAMP\'S FOUR PHASES', 'Part Five — Benchmarking');
table(s, [['', 'Phase', 'What it requires', 'Where it is usually skipped'],
  ['1', 'Plan', 'Decide what to benchmark — a process, not a department — identify a comparator, and settle how the measure will be defined before anybody goes looking.', 'The comparator is chosen for prestige rather than for comparability.'],
  ['2', 'Collect', 'Gather data on both sides using the same definition, and record the conditions under which each figure was produced.', 'Their figure is taken from a published source; ours is calculated differently.'],
  ['3', 'Analyse', 'Establish the size of the gap and, far more importantly, the practice that produces it.', 'The gap is quantified and the practice is never identified. This is the fatal one.'],
  ['4', 'Adapt', 'Set targets, change the practice, embed it, and re-measure.', 'Targets are set from the gap with no change to the practice that would close it.']], CX, 1.1, CW, { colW: [0.5, 1.3, 6.2, 4.33], size: 12.5 });
callout(s, pres, CX, 5.0, CW, 1.85, 'Most benchmarking failures are arithmetic before they are strategic. Define the process boundaries identically on both sides — most on-time-delivery disputes are about when the clock starts. Normalise for scale and mix. Record the conditions: a figure achieved under different regulation, labour markets or demand variability is not a target, it is a datum.', { size: 13 });

s = content(pres, 'CHOOSING THE COMPARATOR', 'Part Five — Benchmarking');
const cmp = [['Internal', 'Another unit, plant or region of the same organisation. Easiest access, most comparable conditions, smallest ceiling: it can only take you to the best you already are.'], ['Competitive', 'A direct rival. The most wanted and the least available — and the one most likely to converge the industry.'], ['Functional', 'An organisation that performs the same function in a different industry.'], ['Generic', 'A structurally analogous process in a wholly unrelated setting. Xerox fixed its warehouse by studying a catalogue retailer; the distance is what made the practice visible.']];
cmp.forEach((c, i) => card(s, pres, CX + i * 3.1, 1.1, 2.95, 3.3, c[0], c[1], { size: 12.5, headSize: 16, fill: i % 2 ? C.SOFT : C.WHITE }));
para(s, 'In increasing order of difficulty and of payoff.', CX, 4.5, CW, 0.4, { size: 12.5, italic: true, color: C.MUT });
callout(s, pres, CX, 5.0, CW, 1.85, 'International comparators — standards bodies, professional-association surveys, published maturity studies — are useful for exactly one thing: establishing whether a gap exists at all, and roughly how large. They cannot tell you what produces it, because they report distributions rather than practices. Treating a percentile from a survey as an improvement objective is the phase-3 error, formalised and given a chart.', { size: 13 });

s = content(pres, 'WHY THE COPY-PASTE APPROACH GUARANTEES MEDIOCRITY', 'Part Five — Benchmarking');
card(s, pres, CX, 1.1, 6.05, 2.9, 'NUMMI, again', 'General Motors took tours of NUMMI for twenty years. They photographed the kanban boards, copied the andon lights, and replicated the physical workstations in their other plants. The other plants remained unproductive and combative.', { size: 14 });
card(s, pres, 6.8, 1.1, 6.05, 2.9, 'Why', 'GM copied Assets (A) and documented Processes (P). They could not observe, let alone import, the tacit Capabilities (C) and the rules-in-use. GM\'s visitors were not looking at the wrong things. They were looking at the only things that could be looked at.', { size: 14, fill: C.SOFT });
equation(s, pres, CX, 4.25, CW, 1.5, 'Vrival = Cweak × (Abought + Pcopied) ≈ 0', 'the mathematical explanation of failed benchmarking', 26);
callout(s, pres, CX, 5.95, CW, 0.9, 'Hold this against the hypothesis you wrote at 14:05.', { size: 14, italic: true });

s = content(pres, 'WHY BEST PRACTICE RESISTS TRANSFER — THE EVIDENCE', 'Part Five — Benchmarking');
table(s, [['Mechanism', 'What it predicts', 'What it changes in your study'],
  ['Internal stickiness — Szulanski (1996)', 'Transfer fails even inside the same firm, for knowledge reasons, not motivational ones: ambiguity about why the practice works, and limited absorptive capacity in the receiving unit (Cohen & Levinthal, 1990).', 'Budget for absorption, not only for acquisition. Who here can receive this, and what must they already know?'],
  ['Causal ambiguity — Lippman & Rumelt (1982)', 'Even the source may not know which elements matter. Organisational knowledge lives in routines that are largely tacit (Nelson & Winter; Polanyi).', 'Do not ask the reference what it does. Ask what it stopped doing, and what it would never give up.'],
  ['Interdependence — Rivkin (2000)', 'Partial imitation underperforms no imitation: mismatched elements work against each other. The morning\'s complementarity argument in formal dress.', 'Identify the bundle, not the practice. If you cannot adopt the set, adopting one element may cost you.'],
  ['Time compression — Dierickx & Cool (1989)', 'Accumulated capability cannot be bought quickly at any price. Winter (2003): P is the operational capability, C the dynamic one.', 'Ask how long the reference took. Then plan for that order of magnitude, or change the objective.']], CX, 1.05, CW, { colW: [2.9, 5.2, 4.23], size: 11.5, headSize: 11.5 });
callout(s, pres, CX, 5.55, CW, 1.3, 'The rule this gives you: do not benchmark the number. Benchmark the routine that produces it — then ask what your organisation would have to accumulate in order to run that routine. The first question has an answer you can put on a slide. The second has an answer you can act on.', { size: 13.5, bold: true, color: C.NAVY });

s = content(pres, 'THE STRATEGIC CAVEAT — PORTER', 'Part Five — Benchmarking');
equation(s, pres, CX, 1.1, CW, 1.4, 'VC = (WTPA − CostA) − (WTPB − CostB)', 'a successful imitation is exactly the event that pulls the second bracket up towards the first', 26);
para(s, 'Benchmarking is by construction an imitative activity: it moves the organisation towards a frontier others already occupy. Practised well across an entire industry, it converges competitors onto the same operating model, and competition collapses into price. It is the one improvement activity whose logical endpoint, when both sides practise it well, is VC equal to zero for everyone.', CX, 2.75, CW, 1.4, { size: 14 });
card(s, pres, CX, 4.3, 6.05, 2.5, 'Closing a gap on a qualifier', 'Convergence is precisely the goal. Benchmark freely, and fund to the threshold.', { size: 14, headSize: 16 });
card(s, pres, 6.8, 4.3, 6.05, 2.5, 'Building an order winner', 'Imitation is the wrong instrument entirely. The question is not what the best do, but what nobody in the set can do yet.', { size: 14, headSize: 16, fill: C.SOFT });

s = content(pres, 'SPEAR & BOWEN\'S FOUR RULES — THE DECODING KEY', 'Part Five — Benchmarking');
para(s, 'The theory says what to look for. Spear and Bowen (1999) say where: the tacit operating rules a site visit will never surface unless the visitor arrives knowing they exist.', CX, 1.05, CW, 0.65, { size: 13.5 });
table(s, [['Rule', 'What naive benchmarking sees', 'What rigorous benchmarking decodes'],
  ['1. Standardised work', '“They have standard operating procedures and software forms.”', 'Work is specified to the level of content, sequence, timing and direct observable outcome. Any variance is treated as a testable scientific problem.'],
  ['2. Direct connections', '“They use a central ticketing platform or Slack channel.”', 'Every customer–supplier connection within the organisation is binary, direct and unambiguous, with no intermediate translation or ambiguous handoff.'],
  ['3. Simple pathways', '“They have automated end-to-end routing in their ERP.”', 'Every product, service or signal travels along a pre-specified single pathway. No work loops back or diverts unless explicitly designed.'],
  ['4. Scientific method', '“They run monthly retrospective meetings.”', 'Any improvement must be structured as a refutable hypothesis, mentored by a senior leader, and executed at the lowest possible organisational level.']], CX, 1.8, CW, { colW: [2.2, 4.0, 6.13], size: 12 });

// SIX
S('Part Six — The transformation vector');
divider(pres, 'Part Six', 'The transformation vector — how this is actually run', 'Diagnosis ends on a question no business case answers: if the path cannot be known in advance, what replaces the plan? Two instruments, read as one system: Cynefin says which method the problem admits; Kata is the routine that executes it.', 'Part Six — The transformation vector');

s = content(pres, 'THE DOMAIN DECIDES THE METHOD — CYNEFIN', 'Part Six — The transformation vector');
table(s, [['Domain', 'Nature of the problem', 'Approach', 'The trap'],
  ['Simple', 'Predictable; cause and effect obvious to everyone', 'Sense → Categorise → Respond', 'Rigidity; blindness to a change of context'],
  ['Complicated', 'Requires expertise and analysis; several right answers exist', 'Sense → Analyse → Respond', 'Paralysis by analysis; dependence on specialists'],
  ['Complex', 'Cause and effect visible only in hindsight. Innovation, culture and digital transformation live here', 'Probe → Sense → Respond; safe-to-fail experiments', 'Wanting control before acting; planning what can only be discovered'],
  ['Chaotic', 'No perceptible causal relation; speed over precision', 'Act → Sense → Respond', 'Analysis during a crisis'],
  ['Confusion', 'Not knowing which domain you are in — the most dangerous state', 'Break the problem up and reclassify each part', 'Applying a preferred style with no diagnosis at all']], CX, 1.05, CW, { colW: [1.5, 4.5, 3.2, 3.13], size: 12 });
callout(s, pres, CX, 5.15, CW, 1.7, 'Most leaders are trained for the Complicated domain, and that training serves daily operations well. The highest-stakes problems — digital transformation among them — are inherently Complex, and applying Complicated methods there is not merely ineffective: a detailed plan manufactures a sense of control that delays experimentation and penalises learning. (Snowden & Boone, 2007)', { size: 13 });

s = content(pres, 'NETFLIX AND BLOCKBUSTER, 2007', 'Part Six — The transformation vector');
card(s, pres, CX, 1.1, 6.05, 2.9, 'Netflix — operated the problem as Complex', 'No best practice existed to say whether consumers would pay for streaming. Netflix launched streaming as a free benefit for DVD subscribers (probe), observed adoption (sense), and only then pivoted the business model (respond).', { size: 14 });
card(s, pres, 6.8, 1.1, 6.05, 2.9, 'Blockbuster — treated it as Simple', 'Applied historical best practice to the same question, at the same moment, in the same market. One of the two firms was gone by 2010.', { size: 14, fill: C.SOFT });
callout(s, pres, CX, 4.25, CW, 2.6, 'Why this indicts the previous part. Benchmarking is a Simple-and-Complicated instrument: it presupposes that a knowable right answer exists somewhere and that the task is to locate and transfer it. Pointed at a Complex problem it does something worse than fail — it imports a confident answer to somebody else\'s question, and the confidence is what does the damage. That is the mechanism behind Rivkin\'s finding that a partial imitation can underperform not imitating at all.', { size: 13.5 });

s = content(pres, 'KATA — THE ROUTINE THAT MAKES PROBE–SENSE–RESPOND REPEATABLE', 'Part Six — The transformation vector');
table(s, [['', 'Step', 'What it requires', 'Horizon'],
  ['1', 'Direction or challenge', 'Aspirational enough to orient, concrete enough to guide daily decisions.', '1–3 years'],
  ['2', 'Grasp the current condition', 'Go and observe the process as it actually is, and share what is found so the next cycle does not restart from zero.', 'Continuous'],
  ['3', 'Set the target condition', 'A measurable future state, neither trivial nor impossible — in the zone of productive learning.', 'Up to 3 months'],
  ['4', 'Run experiments', 'Plan–do–check–act, daily. The path is deliberately obscure; were it clear, there would be nothing to learn.', 'Weekly / daily']], CX, 1.05, 7.6, { colW: [0.4, 2.2, 3.8, 1.2], size: 11.5, headSize: 11 });
card(s, pres, 8.4, 1.05, 4.43, 3.55, 'The coaching routine — five questions', ['What is the target condition?', 'What is the current condition?', 'What obstacles are in the way, and which one are you addressing now?', 'What is your next step, and what do you expect to happen?', 'When can we see what you learned from that step?'], { bullets: true, size: 11.5, fill: C.SOFT });
callout(s, pres, CX, 4.75, 7.6, 2.1, 'The point is not to solve the problem. It is to produce people who solve problems — the only form in which capability survives the person who had it. Organisations have excellent principles and poor routines, and it is the routines that determine the real culture, not the values on the wall. (Rother, 2009)', { size: 13 });
card(s, pres, 8.4, 4.75, 4.43, 2.1, 'The commonest Lean failure', 'The tools are adopted and the improvement does not survive six months. The tools were the visible content; the routine was the form that sustained them.', { size: 12 });

s = content(pres, 'A COMPETITOR CUTS COST BY 30% WITH GENERATIVE AI. WHAT DO YOU DO?', 'Part Six — The transformation vector');
card(s, pres, CX, 1.1, 4.0, 2.8, '1 · Cynefin', 'Is this Simple — copy the technology — or Complex — discover how AI could create value specific to your customer?', { size: 14, headSize: 17 });
card(s, pres, 4.67, 1.1, 4.0, 2.8, '2 · Lean', 'Is human contact a driver of willingness to pay in your segment? If it is, automating it cuts cost and destroys revenue at the same time.', { size: 14, headSize: 17, fill: C.SOFT });
card(s, pres, 8.83, 1.1, 4.0, 2.8, '3 · Kata', 'Set a ninety-day target condition and run controlled experiments towards it, rather than approving a programme whose benefits nobody can yet state.', { size: 14, headSize: 17 });
callout(s, pres, CX, 4.1, CW, 0.85, 'The reflex to copy reproduces operational effectiveness without producing differentiated advantage — which, in the morning\'s notation, leaves VC exactly where it was.', { size: 13.5, bold: true, color: C.NAVY });
projectTerms(s, pres, CX, 5.1, CW, 1.8, 'A gate asks for a plan. A Complex problem can only honestly supply a hypothesis.',
  'Change what an early gate receives: a target condition and the evidence from the last experiment, not a schedule and a projection.',
  'Rewrite one gate deliverable as: “By day 90, this measure will read this value; here is what the last four weeks showed.” If the sponsor will not accept that in place of a plan, the problem is being governed as Complicated.');

// SEVEN
S('Part Seven — Structured activity');
divider(pres, 'Part Seven', 'Structured activity — the Digital Tool Appraisal', 'The morning asked whether a project was worth funding. This afternoon asks a harder question about the same project: of the digital tooling it depends on, what is actually being bought — and what is being left undone?', 'Part Seven — Structured activity');

s = content(pres, 'FOUR LAYERS, AND WHY THEY ARE ONE INSTRUMENT', 'Part Seven — Structured activity');
table(s, [['Layer', 'The judgement it forces', 'Where it comes from'],
  ['VCAP triage', 'Does this change what we own, how work flows, or what we are able to improve? Most honest answers land on the first two.', 'This morning\'s identity'],
  ['Philosophical debt', 'Only where the tool contains AI: has anyone written down what it should want, what it may count as knowing, and what it is able to see?', 'Part Three'],
  ['The six conditions', 'For any tool: at which link does the chain from a working tool to a result currently break, or go unmeasured? This is the maturity read.', 'Part Four'],
  ['The reference', 'What does somebody already do that we do not — the routine, not the number — and what would have to be true here for it to work?', 'Part Five'],
  ['Maturity and roadmap', 'Which capability gaps most constrain performance, and in what order can they credibly be closed over six months?', 'The six conditions read across']], CX, 1.05, CW, { colW: [2.2, 7.5, 2.63], size: 12 });
card(s, pres, CX, 4.95, 6.05, 1.9, 'In the room — sections 1 to 5', 'The tool, the VCAP triage, the six conditions, the AI audit where it applies, and the verdict. Groups of three or four, one scribe on the fillable instrument. The page carries its own instructions.', { size: 12.5 });
card(s, pres, 6.8, 4.95, 6.05, 1.9, 'After the session — sections 6 and 7', 'The benchmarking reference and the six-month roadmap: the module\'s follow-up material, better done with a week of thought. No composite score — a single figure would conceal the only thing worth knowing, which is where the chain stops.', { size: 12.5, fill: C.SOFT });

s = content(pres, 'WHAT TO EXPECT — AND WHERE THE VERDICT LEADS', 'Part Seven — Structured activity');
card(s, pres, CX, 1.1, 4.0, 3.0, '“Not documented” will be the honest answer', 'Most groups find that nobody can say what the system optimises for when objectives conflict. That is the finding — cheap to fix before deployment and expensive afterwards.', { size: 12.5, headSize: 14 });
card(s, pres, 4.67, 1.1, 4.0, 3.0, 'Most tools land on A, or A and P', 'A correctly identified purchase, not a weakness. A competitor with the same budget can hold the same position — so argue the business case on that basis, not on advantage.', { size: 12.5, headSize: 14, fill: C.SOFT });
card(s, pres, 8.83, 1.1, 4.0, 3.0, '“Not measured” more often than “no”', 'An organisation that cannot say whether the output reached the decision in time does not have a failing implementation — it has an unobserved one, which is a different and more tractable problem.', { size: 12.5, headSize: 14 });
callout(s, pres, CX, 4.35, CW, 1.5, 'A verdict is not a score. It is a located gap. If the gap is at condition 2 or 3, the problem is Complex: the next move is a target condition at ninety days and an experiment, not a requirements document. If the gap is a missing measure, the next move is simply to measure it before spending anything further.', { size: 13.5 });
callout(s, pres, CX, 6.0, CW, 0.85, 'Keep the exported appraisal. With the morning\'s Value Case it is the kind of material the module\'s Execution Optimization Challenge draws on; the coordination sets out the brief.', { size: 12.5, fill: C.SOFT, line: C.BLUE });

// EIGHT
S('Part Eight — Building the multiplier');
divider(pres, 'Part Eight', 'Building the multiplier', 'The day has been an argument by elimination. Assets can be bought. Processes can be documented and taught. Benchmarking transfers the second and purchases the first. One question is left: how is C actually built?', 'Part Eight — Building the multiplier');

s = content(pres, 'CAPABILITY IS A STOCK, NOT A STATE', 'Part Eight — Building the multiplier');
figure(s, 's1-fig8.png', CX, 1.0, 7.6, 2.65, 'Capability as a stock with a regulated inflow and an unregulated outflow (Dierickx & Cool, 1989).');
table(s, [['', 'Mechanism', 'Managerial consequence'],
  ['Inflow', 'Deliberate improvement activity that produces causal understanding and validated action together', 'Volume of improvement projects is not the measure. Projects that produce only one of the two accumulate nothing.'],
  ['Condition', 'Psychological safety and the credibility of management\'s commitments', 'Where surfacing a problem is costly, the measured performance improves and the real performance does not.'],
  ['Outflow', 'Turnover and disuse', 'An organisation that was good at improving five years ago may no longer be, and nothing on its balance sheet will say so.']], CX, 4.1, CW, { colW: [1.3, 5.0, 6.03], size: 11.5 });
card(s, pres, 8.4, 1.0, 4.43, 2.9, 'What the inflow requires', ['Guided experimentation at the point of execution — Spear & Bowen\'s fourth rule as an accumulation mechanism; the improvement kata operationalised', 'Team learning — capability lives in coordinated routines, not in individuals', 'Credibility — above all the promise not to convert improvement gains into redundancies. Break it once and the inflow stops.'], { bullets: true, size: 10.5, fill: C.SOFT });

s = content(pres, 'THE INFLOW, IN A PROJECT ORGANISATION', 'Part Eight — Building the multiplier');
callout(s, pres, CX, 1.1, CW, 1.1, 'Across improvement projects in a single factory, only about a quarter accelerated the reduction of waste — the ones producing know-why and know-how simultaneously (Lapré et al., 2000). The rest slowed it or had no effect.', { size: 14 });
projectTerms(s, pres, CX, 2.4, CW, 3.0, 'The inflow and the outflow both have project equivalents that most organisations already own and few use as intended.',
  'The retrospective is guided experimentation — if its output changes the standard, and nothing if it does not. The lessons-learned repository is an attempt to arrest the outflow, and it fails for the reasons Part Five gives: it stores what can be written down, which is the part that was never the constraint.',
  'Open the last three retrospectives and look for one line in a template, a checklist or a gate criterion that changed because of them. If there is none, the retrospectives produced know-why without know-how, and the stock did not move.');
callout(s, pres, CX, 5.6, CW, 1.25, 'The practical test for a PMO: after the last three projects closed, what can this organisation now do that it could not do before — that does not depend on the people who happened to be on those teams?', { size: 14, bold: true, color: C.NAVY });

s = content(pres, 'DESIGN IS NOT THE SAME AS PRACTICE', 'Part Eight — Building the multiplier');
equation(s, pres, CX, 1.05, CW, 1.5, 'Operational Excellence = Design(VCAP) × Culture', 'what the organisation specified · multiplied by whether it is actually lived', 28);
card(s, pres, CX, 2.75, 6.05, 2.3, 'Design(VCAP)', 'The deliberate configuration: the chosen capability, the assets acquired, the processes written. The blueprint — the part that can be presented, bought, certified and copied.', { size: 13.5 });
card(s, pres, 6.8, 2.75, 6.05, 2.3, 'Culture', 'The substrate the configuration sits on — not a fourth term beside A, P and C, but the condition under which any of them delivers. What the organisation does when the auditor has left: whether the standard is followed when inconvenient, the andon pulled when embarrassing, the routine kept in a bad quarter.', { size: 12.5, fill: C.SOFT });
callout(s, pres, CX, 5.25, CW, 1.6, 'The form is multiplicative for the same reason VCAP is. An addition would say that a strong design partially compensates for an organisation that does not live it. It does not: excellent processes plus indifferent practice yield binders. Where Culture is zero, Operational Excellence is zero, whatever was designed and whatever was spent. A didactic statement of a relation — not an instrument; Culture has no unit and no score here.', { size: 12.5 });
s.addNotes('The formulation is the author\'s adaptation: a designed solution multiplied by its acceptance in practice is a long-standing structure in the change literature; the reading of the first term as a VCAP configuration is this course\'s.');

s = content(pres, 'WHERE THE DAY ENDS', 'Part Eight — Building the multiplier');
equation(s, pres, CX, 1.05, CW, 1.6, 'V = C × (A + P)', 'A is bought · P is copied · C is the only term you have to build');
para(s, 'This morning opened on a plant in Fremont where the assets and the people stayed the same and the result inverted. The afternoon has given that observation its mechanism: what changed was a stock that no visitor could photograph, no contract could transfer, and no platform could install — and which, left alone, would have drained away again within a few years.', CX, 2.9, CW, 1.4, { size: 14.5 });
card(s, pres, CX, 4.45, 4.0, 2.4, 'Technology', 'Buys A, sometimes P. Book the benefit accordingly; put conditions 2 and 3 in scope.', { size: 13 });
card(s, pres, 4.67, 4.45, 4.0, 2.4, 'Benchmarking', 'Transfers the routine, never the number — and converges the industry if everyone does it well.', { size: 13, fill: C.SOFT });
card(s, pres, 8.83, 4.45, 4.0, 2.4, 'Capability', 'A stock with an inflow you can design and an outflow you cannot see. Build it with a routine, and protect the routine with credibility.', { size: 13, fill: C.NAVY, line: C.NAVY, headColor: C.GOLD, color: C.WHITE });

closing(pres, 'Prof. Dr. Thiago Lima\ntflsixsigma@gmail.com\n\nReading notes and the Digital Tool Appraisal:\ntflsixsigma-png.github.io/lean-six-sigma-digital-tools-benchmarking\n\nInternational Certificate in Project Management and Organizational Performance · Module 3, Session 4');

pres.writeFile({ fileName: 'Session_2_Digital_Tools_Benchmarking.pptx' }).then(f => console.log('wrote', f));
