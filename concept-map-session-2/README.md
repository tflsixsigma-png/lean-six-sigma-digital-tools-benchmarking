# Digital Tools & Benchmarking · Interactive Concept Map

Teaching app for the afternoon session of Module 3, Session 4 of the **International Certificate in Project Management and Organizational Performance** — IAE Paris / Sorbonne Business School, delivered through IDGP Academy. 17 October 2026 · Prof. Dr. Thiago Lima.

Built on the same engine as [Cadeia Circular](https://tflsixsigma-png.github.io/Cadeia-Circular-Prof-Thiago-Lima/), with the content of the session's [reading notes](https://tflsixsigma-png.github.io/lean-six-sigma-digital-tools-benchmarking/).

## What is in it

- **Slides** — the session deck, navigable, full screen, PDF download (`slides/`).
- **Concept map** — a force-directed network of concepts, equations, authors, tools, failure modes and project bridges; each node opens a detail panel with its connections and a link to the slide where it is treated.
- **Figures** — the figures of the reading notes, redrawn as vector SVG.
- **Timeline**, **Theory frame** (author → work → concept → contribution → practice), **Cases**, **On Monday** (equations, bridges to project management, group activity) and **References** (APA 7, clickable DOIs).

## Publishing

Push the folder to a GitHub repository and enable GitHub Pages (Settings → Pages → Deploy from branch, root). Everything is static; nothing is transmitted.

## Editing

All content lives in the `DATA` block at the top of the script in `index.html` (`NODES`, `LINKS`, `TIMELINE`, `CASES`, `QUADRO`, `REFS_*`, `APS_META`, `NODE2SLIDE`). To replace the slides, export the deck as JPEG into `slides/` as `s-01.jpg … s-NN.jpg`, put the PDF at `slides/deck.pdf`, and update the slide count in `APS_IMG` and the titles in `APS_META`.

Teaching material. Please credit the author if you reuse it.
