#!/usr/bin/env python3
"""Two-pass build: render once to learn where each part lands, then render again with
real page numbers in the contents."""
import json, subprocess, sys, os, re, io
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
import html as _html

REPO = "/home/claude/lean-six-sigma-digital-tools-benchmarking"
OUT = "/mnt/user-data/outputs"
os.makedirs(OUT, exist_ok=True)

JOBS = [
    {
        "src": f"{REPO}/session-1-lean-six-sigma.html",
        "out": f"{OUT}/Apostila_Sessao_1_Lean_Six_Sigma.pdf",
        "meta": {
            "eyebrow": "IAE Paris — Sorbonne Business School · IDGP Academy",
            "title": "Lean Six Sigma &amp; Continuous Improvement",
            "sub": "Reading notes for the morning session. Module 3 — Methods, Tools and Operational Efficiency, Session 4.",
            "meta": "<b>17 October 2026</b> &nbsp;·&nbsp; 09:00–12:00<br><b>Prof. Dr. Thiago Lima</b><br>International Certificate in Project Management and Organizational Performance",
            "foot": "No preparation is required. These notes carry the definitions, figures and sources, so the time in the room can be spent on judgement rather than on terminology.",
            "tocTitle": "Contents",
            "tocKick": "The session builds one argument in twelve movements: value is defined from the customer backwards, waste is what the customer would not pay for, and the efficiency that matters is the unit's journey rather than the resource's occupancy.",
            "tocNote": "<b>Bring three things.</b> One recurring process that takes longer than it should; two rough figures — projects in flight, and projects closed in the last twelve months; and one authorised project you know well enough to defend, which is the raw material for the group activity in Part Nine.",
            "runningFoot": "Lean Six Sigma &amp; Continuous Improvement · 17 October 2026 · Prof. Dr. Thiago Lima",
        },
    },
    {
        "src": f"{REPO}/session-2-digital-tools-benchmarking.html",
        "out": f"{OUT}/Apostila_Sessao_2_Digital_Tools_e_Benchmarking.pdf",
        "meta": {
            "eyebrow": "IAE Paris — Sorbonne Business School · IDGP Academy",
            "title": "Digital Tools &amp; Benchmarking",
            "sub": "Reading notes for the afternoon session. Module 3 — Methods, Tools and Operational Efficiency, Session 4.",
            "meta": "<b>17 October 2026</b> &nbsp;·&nbsp; 14:00–17:00<br><b>Prof. Dr. Thiago Lima</b><br>International Certificate in Project Management and Organizational Performance",
            "foot": "No preparation is required. The afternoon tests the morning's argument against the two things organisations buy when they want capability and cannot build it: technology, and other people's practices.",
            "tocTitle": "Contents",
            "tocKick": "What a digital investment actually buys; what an AI system was never told and what nobody measured; why best practice resists transfer; and how a transformation is run when the path cannot be known in advance.",
            "tocNote": "<b>The instrument.</b> The group activity in Part Seven is run on a separate booklet, the <i>Digital Tool Appraisal</i>, which is fillable online and printed here as a companion. Bring one tool you are evaluating, or one you have already bought and are not sure about.",
            "runningFoot": "Digital Tools &amp; Benchmarking · 17 October 2026 · Prof. Dr. Thiago Lima",
        },
    },
    {
        "src": f"{REPO}/digital-tool-appraisal.html",
        "out": f"{OUT}/Instrumento_Digital_Tool_Appraisal.pdf",
        "meta": {
            "eyebrow": "IAE Paris — Sorbonne Business School · IDGP Academy",
            "title": "Digital Tool Appraisal",
            "sub": "The instrument for the afternoon's group activity. One tool, about twenty minutes, filled in by the people who will live with the decision.",
            "meta": "<b>17 October 2026</b> &nbsp;·&nbsp; 14:00–17:00<br><b>Prof. Dr. Thiago Lima</b><br>Companion to the Digital Tools &amp; Benchmarking reading notes",
            "foot": "This printed version is for working in the room. The same instrument is fillable and exportable online, which is the version to use when the appraisal has to leave the session.",
            "tocTitle": "Contents",
            "tocKick": "Does the tool change what the organisation owns or what it is able to do; where it contains AI, what the system was told to want, to know and to see, and at which link the chain from a working model to a result breaks; and which capability gaps to close first.",
            "tocNote": "<b>There is no score.</b> The instrument restates your own answers and locates the gap. A composite figure would hide the only thing worth knowing, which is where the chain stops.",
            "runningFoot": "Digital Tool Appraisal · 17 October 2026 · Prof. Dr. Thiago Lima",
        },
    },
]


def run(src, out, meta_file, mode="body", toc_file=None):
    cmd = ["node", "build.mjs", src, out, meta_file, mode] + ([toc_file] if toc_file else [])
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout, r.stderr, file=sys.stderr)
        raise SystemExit(f"build failed for {src}")
    return json.loads(r.stdout.strip().splitlines()[-1])


def norm(s):
    return re.sub(r"\s+", " ", s.replace("—", "-").replace("&amp;", "&")).strip().lower()


W, H = A4
MM = 2.8346


def stamp(cover_pdf, body_pdf, out_pdf, running):
    """Merge cover + body and draw the running foot and page number on every page but the cover."""
    writer = PdfWriter()
    for page in PdfReader(cover_pdf).pages:
        writer.add_page(page)
    body = PdfReader(body_pdf)
    total = 1 + len(body.pages)
    for i, page in enumerate(body.pages):
        buf = io.BytesIO()
        c = canvas.Canvas(buf, pagesize=A4)
        c.setFillColor(HexColor("#6B7D92"))
        c.setFont("Helvetica", 7.2)
        c.drawString(20 * MM, 11 * MM, running)
        c.setFont("Helvetica-Bold", 7.2)
        c.drawRightString(W - 20 * MM, 11 * MM, "%d / %d" % (i + 2, total))
        c.setStrokeColor(HexColor("#C6D2DF"))
        c.setLineWidth(0.4)
        c.line(20 * MM, 14.6 * MM, W - 20 * MM, 14.6 * MM)
        c.save()
        buf.seek(0)
        page.merge_page(PdfReader(buf).pages[0])
        writer.add_page(page)
    with open(out_pdf, "wb") as f:
        writer.write(f)
    return total


for job in JOBS:
    meta_file = "/tmp/claude-0/meta.json"
    os.makedirs("/tmp/claude-0", exist_ok=True)
    with open(meta_file, "w") as f:
        json.dump(job["meta"], f)

    cover = "/tmp/claude-0/cover.pdf"
    run(job["src"], cover, meta_file, "cover")

    tmp = "/tmp/claude-0/pass1.pdf"
    info = run(job["src"], tmp, meta_file, "body")
    titles = info["parts"]
    if info["errors"]:
        print("  page errors:", info["errors"])

    reader = PdfReader(tmp)
    # body page i is merged page i+2 (cover is 1, contents is 2)
    pages = [norm(p.extract_text() or "") for p in reader.pages]
    nums = []
    search_from = 1  # skip the contents page itself
    for t in titles:
        key = norm(t)
        hit = None
        for i in range(search_from, len(pages)):
            if key and key in pages[i]:
                hit = i + 2
                break
        nums.append(hit if hit else None)
        if hit:
            search_from = hit - 2

    toc_file = "/tmp/claude-0/toc.json"
    with open(toc_file, "w") as f:
        json.dump(nums, f)

    body2 = "/tmp/claude-0/body2.pdf"
    run(job["src"], body2, meta_file, "body", toc_file)
    running = _html.unescape(job["meta"]["runningFoot"])
    total = stamp(cover, body2, job["out"], running)
    print(f"{os.path.basename(job['out'])}: {total} pages, toc {nums}")
