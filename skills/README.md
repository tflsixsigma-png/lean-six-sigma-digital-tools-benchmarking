# Digital Tool Appraisal — AI coach (Claude or Gemini)

An AI coach that walks you through **sections 1–5** of the Digital Tool Appraisal for one tool your
organisation uses or is evaluating. It asks; you answer. It will not fill the form for you, will not invent
facts about your organisation, and will not give you a score. "Not documented" and "not measured" are good
answers. Sections 6–7 (benchmarking and roadmap) are the separate Benchmarking Study on the platform.

At the end you get the appraisal as a text block. On the course platform's Digital Tool Appraisal page, click
**Paste from the AI coach**, paste it, then **Download as PDF**: you get the same PDF report as the online
instrument. You also get the open questions to take back to your organisation.

## Option A — Claude (claude.ai)
1. Settings → Capabilities: turn on **Code execution and file creation**.
2. Customize → Skills → **+** → **Create skill** → **Upload a skill**, and choose `digital-tool-appraisal.zip`
   (do not unzip it).
3. Make sure the skill is toggled on. In a new chat, type:
   *"I want to do a Digital Tool Appraisal of <tool>."*

## Option B — Gemini (gemini.google.com)
1. Open **Gems** → **New Gem**. Name it "Digital Tool Appraisal coach".
2. Open `GEM_INSTRUCTIONS.md`, copy everything below the first comment line, and paste it into **Instructions**.
3. Under **Knowledge**, upload `instrument.md`, `coaching.md`, `report-template.md` and `worked-example-zillow.md`.
4. Save, then start a chat: *"I want to do a Digital Tool Appraisal of <tool>."*

## Before you start
- Pick a tool you know first-hand. Anonymise organisation and vendor names if they are confidential.
- Have at hand whatever evidence exists: adoption figures, the business case's indicator, who receives the output.
- About twenty minutes for one tool in Guided mode. Use Review mode to challenge a draft you already filled in.

Instrument: Prof. Dr. Thiago Lima · IAE Paris – Sorbonne Business School · IDGP Academy · Module 3.
