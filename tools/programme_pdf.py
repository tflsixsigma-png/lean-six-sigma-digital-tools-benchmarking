#!/usr/bin/env python3
"""Render programme.html to an A4 PDF with embedded fonts and a running footer."""
import asyncio, io, os, re
from playwright.async_api import async_playwright
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor

REPO = "/home/claude/lean-six-sigma-digital-tools-benchmarking"
SRC = f"{REPO}/programme.html"
OUT = f"{REPO}/pdf/Session_Programme_Module_3_Session_4.pdf"
FONTDIR = "file://" + os.path.abspath("fonts")
FONTCSS = "\n".join(l for l in open("print.css").read().splitlines() if l.startswith("@font-face")).replace("FONTDIR", FONTDIR)

html = open(SRC).read()
# drop the Google Fonts link (offline) and inject local @font-face + page setup
html = re.sub(r'<link[^>]*fonts\.googleapis[^>]*>', '', html)
html = html.replace("</style>", FONTCSS + "\n@page{size:A4;margin:16mm 0 20mm 0}\n</style>", 1)
# make the photo path absolute for the file:// render
import base64
b64 = base64.b64encode(open(f"{REPO}/img/thiago-lima.jpg","rb").read()).decode()
html = html.replace('src="img/thiago-lima.jpg"', f'src="data:image/jpeg;base64,{b64}"')

async def render():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
        pg = await b.new_page()
        await pg.set_content(html, wait_until="load")
        await pg.evaluate("document.fonts.ready")
        await pg.emulate_media(media="print")
        await pg.pdf(path="/tmp/claude-0/prog_body.pdf", format="A4", print_background=True, prefer_css_page_size=True)
        await b.close()

asyncio.run(render())

W, H = A4; MM = 2.8346
body = PdfReader("/tmp/claude-0/prog_body.pdf"); writer = PdfWriter(); total = len(body.pages)
running = "Session Programme · Module 3, Session 4 · 17 October 2026 · Prof. Dr. Thiago Lima"
for i, page in enumerate(body.pages):
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=A4)
    c.setFillColor(HexColor("#6B7D92")); c.setFont("Helvetica", 7.2); c.drawString(20*MM, 11*MM, running)
    c.setFont("Helvetica-Bold", 7.2); c.drawRightString(W-20*MM, 11*MM, "%d / %d" % (i+1, total))
    c.setStrokeColor(HexColor("#C6D2DF")); c.setLineWidth(0.4); c.line(20*MM, 14.6*MM, W-20*MM, 14.6*MM); c.save()
    buf.seek(0); page.merge_page(PdfReader(buf).pages[0]); writer.add_page(page)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "wb") as f: writer.write(f)
print(OUT, total, "pages")
