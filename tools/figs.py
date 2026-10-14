#!/usr/bin/env python3
"""Generates the inline SVG figures for the Session 1 reading notes.

Palette validated with the dataviz skill's checker:
  #2A5D9F (blue, data) / #B8820F (gold, data) — all six checks PASS on a light surface.
Structure, axes and text use the document's ink colours, never a series colour.
"""
import math

C1 = "#2A5D9F"   # data, series 1
C2 = "#B8820F"   # data, series 2
INK = "#0A2342"
MUT = "#56687C"
GRID = "#D3DCE6"
LINE = "#A9BACB"
PAPER = "#FFFFFF"
SOFT = "#EAF0F6"
GOLDSOFT = "#F6E9CB"

SANS = "'Source Sans 3',system-ui,sans-serif"
MONO = "'JetBrains Mono',monospace"
SERIF = "'Fraunces',serif"


def t(x, y, s, size=14, fill=INK, anchor="start", weight="400", fam=SANS, extra=""):
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-family="{fam}" font-size="{size}" '
            f'fill="{fill}" text-anchor="{anchor}" font-weight="{weight}"{extra}>{s}</text>')


def fig(svg, n, caption, label):
    return (f'<figure class="fig">\n<svg viewBox="{svg["vb"]}" role="img" aria-label="{label}">\n'
            f'{svg["body"]}\n</svg>\n<figcaption><b>Figure {n}.</b> {caption}</figcaption>\n</figure>')


# ---------------------------------------------------------------- 1. VSM
def vsm():
    W, H = 1160, 440
    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']
    steps = [("Request logged", "15 min"), ("Triage", "30 min"), ("Technical review", "90 min"),
             ("Approval board", "45 min"), ("Implementation", "60 min")]
    waits = ["2 days", "6 days", "1 day", "6 days"]
    bw, gap, x0, by, bh = 168, 62, 24, 64, 92
    xs = [x0 + i * (bw + gap) for i in range(5)]

    o.append(t(24, 30, "THE WORK, AND WHAT TRIGGERS EACH STEP", 11.5, MUT, weight="700", fam=MONO,
               extra=' letter-spacing="1.6"'))
    for i, (name, pt) in enumerate(steps):
        x = xs[i]
        o.append(f'<rect x="{x}" y="{by}" width="{bw}" height="{bh}" rx="5" fill="{SOFT}" stroke="{C1}" stroke-width="2"/>')
        o.append(f'<line x1="{x}" y1="{by+40}" x2="{x+bw}" y2="{by+40}" stroke="{C1}" stroke-width="1.2" opacity=".45"/>')
        o.append(t(x + bw / 2, by + 26, name, 15, INK, "middle", "700"))
        o.append(t(x + bw / 2, by + 62, "process time", 11, MUT, "middle", fam=MONO))
        o.append(t(x + bw / 2, by + 82, pt, 16, C1, "middle", "700", fam=MONO))
        if i < 4:
            cx = x + bw + gap / 2
            o.append(f'<path d="M {cx-21} {by+78} L {cx+21} {by+78} L {cx} {by+40} Z" fill="{GOLDSOFT}" stroke="{C2}" stroke-width="2"/>')
            o.append(t(cx, by + 72, "wait", 10.5, "#7E5B0C", "middle", "700", fam=MONO))
            o.append(f'<path d="M {x+bw+6} {by+bh/2-14} L {x+bw+gap-6} {by+bh/2-14}" stroke="{LINE}" stroke-width="1.6" stroke-dasharray="4 3"/>')

    # staircase timeline
    hi, lo = 272, 322
    o.append(t(24, 240, "THE TIMELINE — WORKED TIME BELOW, ELAPSED TIME ABOVE", 11.5, MUT, weight="700",
               fam=MONO, extra=' letter-spacing="1.6"'))
    d = [f"M {xs[0]} {lo}"]
    for i in range(5):
        d.append(f"L {xs[i]+bw} {lo}")
        if i < 4:
            d.append(f"L {xs[i]+bw} {hi}")
            d.append(f"L {xs[i+1]} {hi}")
            d.append(f"L {xs[i+1]} {lo}")
    o.append(f'<path d="{" ".join(d)}" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    for i, (_, pt) in enumerate(steps):
        o.append(t(xs[i] + bw / 2, lo + 22, pt, 13.5, INK, "middle", "700", fam=MONO))
    for i, w in enumerate(waits):
        cx = (xs[i] + bw + xs[i + 1]) / 2
        o.append(t(cx, hi - 12, w, 13.5, "#7E5B0C", "middle", "700", fam=MONO))

    # summary strip
    sy = 358
    o.append(f'<rect x="24" y="{sy}" width="{W-48}" height="60" rx="6" fill="{INK}"/>')
    cells = [("Process time", "4 hours"), ("Lead time", "15 working days"),
             ("Flow efficiency", "3.3%"), ("Where it sits", "two approval queues")]
    cw = (W - 48) / 4
    for i, (k, v) in enumerate(cells):
        cx = 24 + cw * i + 22
        o.append(t(cx, sy + 24, k.upper(), 10.5, "#9FB6CE", weight="700", fam=MONO, extra=' letter-spacing="1.4"'))
        o.append(t(cx, sy + 46, v, 17, "#FFFFFF" if i != 2 else "#F2DFB4", weight="600", fam=SERIF))
        if i:
            o.append(f'<line x1="{24+cw*i}" y1="{sy+12}" x2="{24+cw*i}" y2="{sy+48}" stroke="#2C4766" stroke-width="1"/>')
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


# ------------------------------------------------- 2. efficiency matrix
def halo(x, y, txt, size=14, fill=INK, anchor="start", weight="400", fam=SANS):
    """Text with a white outline so it stays legible where it crosses a line."""
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-family="{fam}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}" font-weight="{weight}" stroke="{PAPER}" stroke-width="4.5" '
            f'paint-order="stroke" stroke-linejoin="round">{txt}</text>')


def matrix():
    W, H = 980, 720
    L, R, T, B = 120, 930, 50, 500
    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']
    o.append(f'<rect x="{L}" y="{T}" width="{R-L}" height="{B-T}" fill="{SOFT}" opacity=".45"/>')
    mx, my = (L + R) / 2, (T + B) / 2
    o.append(f'<line x1="{mx}" y1="{T}" x2="{mx}" y2="{B}" stroke="{LINE}" stroke-width="1" stroke-dasharray="5 4"/>')
    o.append(f'<line x1="{L}" y1="{my}" x2="{R}" y2="{my}" stroke="{LINE}" stroke-width="1" stroke-dasharray="5 4"/>')

    def P(nx, ny):
        return L + (R - L) * nx, B - (B - T) * ny

    def frontier(r):
        rx, ry = (R - L) * r, (B - T) * r
        return f"M {L} {B-ry:.1f} A {rx:.1f} {ry:.1f} 0 0 1 {L+rx:.1f} {B}"

    o.append('<defs><marker id="arrH" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">'
             f'<path d="M 0 0 L 10 5 L 0 10 z" fill="{INK}"/></marker></defs>')
    o.append(f'<path d="{frontier(0.66)}" fill="none" stroke="{C2}" stroke-width="3" stroke-dasharray="8 5"/>')
    o.append(f'<path d="{frontier(0.93)}" fill="none" stroke="{C1}" stroke-width="3"/>')
    x1, y1 = P(0.467, 0.467)
    x2, y2 = P(0.635, 0.635)
    o.append(f'<path d="M {x1:.1f} {y1:.1f} L {x2:.1f} {y2:.1f}" stroke="{INK}" stroke-width="2.6" marker-end="url(#arrH)"/>')

    o.append(f'<line x1="{L}" y1="{B}" x2="{R}" y2="{B}" stroke="{INK}" stroke-width="2"/>')
    o.append(f'<line x1="{L}" y1="{T}" x2="{L}" y2="{B}" stroke="{INK}" stroke-width="2"/>')
    cdx, cdy = P(1.0, 1.0)
    o.append(f'<circle cx="{cdx-10:.1f}" cy="{cdy+10:.1f}" r="8" fill="{INK}"/>')

    quads = [(L + 22, B - 56, "Wasteland", "busy nobody, moves nothing", "start"),
             (mx + 22, B - 56, "Efficient islands", "every unit busy, the work still waits", "start"),
             (L + 22, T + 174, "Efficient ocean", "work flows, capacity deliberately spare", "start"),
             (R - 30, T + 36, "The perfect state", "unreachable while variation is what it is", "end")]
    for x, y, name, sub, anc in quads:
        o.append(halo(x, y, name, 18, INK, anc, "600", SERIF))
        o.append(halo(x, y + 21, sub, 13.5, MUT, anc))

    o.append(t((L + R) / 2, B + 38, "Resource efficiency  \u2192  how busy the people and machines are", 15, INK, "middle", "600"))
    o.append(f'<text transform="translate({L-48},{(T+B)/2}) rotate(-90)" font-family="{SANS}" font-size="15" '
             f'fill="{INK}" text-anchor="middle" font-weight="600">Flow efficiency  \u2192  how little the work waits</text>')

    # legend row, outside the plot
    ly = B + 76
    items = [("dash", C2, "the frontier today"),
             ("solid", C1, "the frontier once variation is removed"),
             ("arrow", INK, "the one move that is not a trade-off")]
    x = L
    for kind, col, lab in items:
        if kind == "dash":
            o.append(f'<line x1="{x}" y1="{ly}" x2="{x+30}" y2="{ly}" stroke="{col}" stroke-width="3" stroke-dasharray="8 5"/>')
        elif kind == "solid":
            o.append(f'<line x1="{x}" y1="{ly}" x2="{x+30}" y2="{ly}" stroke="{col}" stroke-width="3"/>')
        elif kind == "arrow":
            o.append(f'<path d="M {x} {ly} L {x+24} {ly}" stroke="{col}" stroke-width="2.6" marker-end="url(#arrH)"/>')
        else:
            o.append(f'<circle cx="{x+15}" cy="{ly}" r="7" fill="{col}"/>')
        o.append(t(x + 40, ly + 5, lab, 13.5, MUT))
        x += 42 + len(lab) * 6.9

    ny = B + 110
    o.append(f'<rect x="{L}" y="{ny}" width="{R-L}" height="120" rx="7" fill="{INK}"/>')
    o.append(t(L + 24, ny + 32, "THE PARADOX", 11.5, "#F2DFB4", weight="700", fam=MONO, extra=' letter-spacing="1.8"'))
    for i, line in enumerate([
        "Every point on a frontier is a trade-off, so pushing one efficiency up pushes the other down and the argument",
        "never ends. The one move that is not a trade-off is removing the variation that drew the curve in the first place.",
        "Most organisations sit bottom-right, call it productivity, and never notice they chose a point on a poor curve."]):
        o.append(t(L + 24, ny + 60 + i * 22, line, 14.5, "#FFFFFF" if i < 2 else "#C6D4E4"))
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


# ----------------------------------------------------- 3. capability
def normal_path(cx, sigma_px, base, height, x_from, x_to, step=4.0):
    pts = []
    x = x_from
    while x <= x_to:
        z = (x - cx) / sigma_px
        y = base - height * math.exp(-0.5 * z * z)
        pts.append((x, y))
        x += step
    return pts


def capability():
    W, H = 1160, 420
    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']
    panels = [
        (20, "Centred on target", "C<tspan dy='4' font-size='11'>p</tspan><tspan dy='-4'> = 1.33</tspan>",
         "C<tspan dy='4' font-size='11'>pk</tspan><tspan dy='-4'> = 1.33</tspan>", 0.0,
         "The spread fits the tolerance and sits where it should."),
        (600, "Same spread, shifted mean", "C<tspan dy='4' font-size='11'>p</tspan><tspan dy='-4'> = 1.33</tspan>",
         "C<tspan dy='4' font-size='11'>pk</tspan><tspan dy='-4'> = 0.67</tspan>", 2.0,
         "Identically capable on paper. Reliably in the wrong place."),
    ]
    for px, title, cp, cpk, shift, foot in panels:
        pw = 540
        base = 300
        cx = px + pw / 2
        sig = 38.0
        lsl = cx - 4 * sig - shift * sig
        usl = cx + 4 * sig - shift * sig
        o.append(t(px, 38, title, 18, INK, weight="600", fam=SERIF))
        # tolerance band
        o.append(f'<rect x="{lsl}" y="80" width="{usl-lsl}" height="{base-80}" fill="{SOFT}" opacity=".75"/>')
        for xv, lab in ((lsl, "LSL"), (usl, "USL")):
            o.append(f'<line x1="{xv}" y1="78" x2="{xv}" y2="{base}" stroke="{INK}" stroke-width="2.2"/>')
            o.append(t(xv, 70, lab, 12.5, INK, "middle", "700", fam=MONO))
        pts = normal_path(cx, sig, base, 170, px + 16, px + pw - 16)
        d = "M " + " L ".join(f"{a:.0f} {b:.1f}" for a, b in pts)
        # out-of-tolerance tail
        tail = [(x, y) for x, y in pts if x > usl] if shift else []
        if tail:
            td = "M " + f"{usl:.0f} {base:.0f} L " + " L ".join(f"{a:.0f} {b:.1f}" for a, b in tail) + f" L {tail[-1][0]:.0f} {base:.0f} Z"
            o.append(f'<path d="{td}" fill="{C2}" opacity=".85"/>')
        o.append(f'<path d="{d}" fill="none" stroke="{C1}" stroke-width="2.6"/>')
        o.append(f'<line x1="{px+16}" y1="{base}" x2="{px+pw-16}" y2="{base}" stroke="{INK}" stroke-width="2"/>')
        o.append(f'<line x1="{cx}" y1="{base-178}" x2="{cx}" y2="{base}" stroke="{C1}" stroke-width="1.6" stroke-dasharray="4 4"/>')
        o.append(t(cx, base - 188, "process mean", 12.5, C1, "middle", "700", fam=MONO))
        # six-sigma span
        o.append(f'<line x1="{cx-3*sig}" y1="{base+22}" x2="{cx+3*sig}" y2="{base+22}" stroke="{C1}" stroke-width="2"/>')
        for e in (cx - 3 * sig, cx + 3 * sig):
            o.append(f'<line x1="{e}" y1="{base+16}" x2="{e}" y2="{base+28}" stroke="{C1}" stroke-width="2"/>')
        o.append(t(cx, base + 42, "6σ — the voice of the process", 12.5, MUT, "middle", fam=MONO))
        o.append(f'<text x="{px}" y="{base+78}" font-family="{MONO}" font-size="16" fill="{INK}" font-weight="700">{cp}</text>')
        o.append(f'<text x="{px+130}" y="{base+78}" font-family="{MONO}" font-size="16" fill="{C2 if shift else INK}" font-weight="700">{cpk}</text>')
        o.append(t(px, base + 100, foot, 13.5, MUT))
    o.append(f'<line x1="{570}" y1="30" x2="{570}" y2="{400}" stroke="{GRID}" stroke-width="1.5"/>')
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


# ------------------------------------------------------ 4. control chart
def control_chart():
    W, H = 1160, 440
    L, R, T, B = 90, 1120, 60, 330
    vals = [101, 98, 103, 97, 100, 104, 96, 102, 99, 101, 97, 103, 100, 116,
            99, 102, 97, 96, 98, 95, 97, 96, 94, 101]
    mean, sd = 100, 4
    ucl, lcl = mean + 3 * sd, mean - 3 * sd
    ymin, ymax = 86, 120

    def X(i):
        return L + (R - L) * i / (len(vals) - 1)

    def Y(v):
        return B - (B - T) * (v - ymin) / (ymax - ymin)

    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']
    o.append(f'<rect x="{L}" y="{Y(ucl):.1f}" width="{R-L}" height="{Y(lcl)-Y(ucl):.1f}" fill="{SOFT}" opacity=".6"/>')
    for v, lab, col, dash in ((ucl, "UCL  +3σ", INK, "6 4"), (mean, "centre line", INK, ""), (lcl, "LCL  −3σ", INK, "6 4")):
        o.append(f'<line x1="{L}" y1="{Y(v):.1f}" x2="{R}" y2="{Y(v):.1f}" stroke="{col}" stroke-width="{2.2 if not dash else 1.8}"'
                 + (f' stroke-dasharray="{dash}"' if dash else "") + "/>")
        o.append(t(L - 10, Y(v) + 5, lab, 12.5, INK, "end", "700", fam=MONO))
    o.append(f'<line x1="{L}" y1="{B}" x2="{R}" y2="{B}" stroke="{INK}" stroke-width="2"/>')
    o.append(t((L + R) / 2, B + 34, "successive measurements, in order", 14, MUT, "middle"))

    d = "M " + " L ".join(f"{X(i):.1f} {Y(v):.1f}" for i, v in enumerate(vals))
    o.append(f'<path d="{d}" fill="none" stroke="{C1}" stroke-width="2"/>')
    for i, v in enumerate(vals):
        special = (v > ucl)
        run = 16 <= i <= 22
        col = C2 if (special or run) else C1
        r = 7 if special else 5
        o.append(f'<circle cx="{X(i):.1f}" cy="{Y(v):.1f}" r="{r}" fill="{col}" stroke="{PAPER}" stroke-width="2"/>')

    # annotations
    o.append(f'<line x1="{X(13):.1f}" y1="{Y(116)-14:.1f}" x2="{X(13):.1f}" y2="{T-14}" stroke="{C2}" stroke-width="1.8"/>')
    o.append(t(X(13) - 8, T - 20, "one point beyond the limit — a special cause, and worth investigating", 13.5, "#7E5B0C", "end", "700"))
    x1, x2 = X(16), X(22)
    o.append(f'<rect x="{x1-12:.1f}" y="{B+46}" width="{x2-x1+24:.1f}" height="4" fill="{C2}"/>')
    o.append(t((x1 + x2) / 2, B + 76, "seven consecutive points below the centre line —", 13.5, "#7E5B0C", "middle", "700"))
    o.append(t((x1 + x2) / 2, B + 94, "inside the limits, and still a special cause: the process has shifted", 13.5, MUT, "middle"))
    o.append(t(L, B + 76, "Everything in blue is common cause:", 13.5, INK, weight="700"))
    o.append(t(L, B + 94, "the process doing what it was built to do.", 13.5, MUT))
    o.append(t(L, B + 112, "Explaining these points one by one makes it worse.", 13.5, MUT))
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


# ------------------------------------------------------ 6. ROIC tree
def roic_tree():
    W, H = 1160, 470
    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']

    def node(x, y, w, h, title, sub, fill=SOFT, stroke=C1, tcol=INK):
        g = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="2"/>',
             t(x + w / 2, y + 26, title, 15.5, tcol, "middle", "700")]
        if sub:
            g.append(t(x + w / 2, y + 48, sub, 13, MUT if fill != INK else "#9FB6CE", "middle", fam=MONO))
        return "\n".join(g)

    def link(x1, y1, x2, y2):
        my = (y1 + y2) / 2
        return (f'<path d="M {x1} {y1} L {x1} {my} L {x2} {my} L {x2} {y2}" fill="none" '
                f'stroke="{LINE}" stroke-width="2"/>')

    o.append(node(470, 20, 220, 62, "ROIC", "NOPAT / invested capital", INK, INK, "#FFFFFF"))
    o.append(link(580, 82, 320, 130))
    o.append(link(580, 82, 840, 130))
    o.append(t(580, 112, "×", 22, INK, "middle", "700", fam=SERIF))
    o.append(node(200, 130, 240, 62, "Operating margin", "NOPAT / revenue"))
    o.append(node(720, 130, 240, 62, "Capital turnover", "revenue / capital"))

    o.append(link(320, 192, 190, 250))
    o.append(link(320, 192, 450, 250))
    o.append(link(840, 192, 710, 250))
    o.append(link(840, 192, 970, 250))
    leaves = [(90, "Revenue", "price × volume"), (350, "Operating cost", "rework · overtime · expediting"),
              (610, "Working capital", "inventory · WIP · receivables"), (870, "Fixed assets", "plant · equipment · systems")]
    for x, a, b in leaves:
        o.append(node(x, 250, 200, 62, a, b, PAPER, LINE))

    # lean levers
    ly = 350
    o.append(f'<rect x="20" y="{ly}" width="{W-40}" height="100" rx="7" fill="{GOLDSOFT}" stroke="{C2}" stroke-width="2"/>')
    o.append(t(42, ly + 28, "WHERE THE MORNING'S LEVERS ATTACH", 11.5, "#7E5B0C", weight="700", fam=MONO,
               extra=' letter-spacing="1.6"'))
    levers = [(42, "Defects ↓", "rework and scrap leave operating cost"),
              (322, "Lead time ↓", "inventory and WIP leave invested capital"),
              (602, "Flow ↑", "overtime and expediting stop being normal"),
              (882, "Reliability ↑", "the WTP edge, so revenue moves too")]
    for x, a, b in levers:
        o.append(t(x, ly + 58, a, 15, INK, weight="700"))
        o.append(t(x, ly + 80, b, 12.5, "#5C4708"))
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


# ------------------------------------- 8. capability stock and flow
def stock_flow():
    W, H = 1160, 400
    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']
    # stock
    o.append(f'<rect x="420" y="120" width="320" height="140" rx="8" fill="{INK}"/>')
    o.append(t(580, 170, "C", 36, "#FFFFFF", "middle", "600", fam=SERIF))
    o.append(t(580, 200, "the capability to improve", 14, "#C6D4E4", "middle"))
    o.append(t(580, 224, "a stock, not a state", 12.5, "#F2DFB4", "middle", "700", fam=MONO))

    # inflow pipe
    o.append(f'<path d="M 60 170 L 400 170 L 400 210 L 60 210 Z" fill="{SOFT}" stroke="{C1}" stroke-width="2"/>')
    o.append(f'<path d="M 360 178 L 392 190 L 360 202 Z" fill="{C1}"/>')
    o.append(t(70, 150, "INFLOW", 11.5, MUT, weight="700", fam=MONO, extra=' letter-spacing="1.6"'))
    o.append(t(70, 196, "improvement that produces know-why and know-how together", 14, INK))
    # valve
    o.append(f'<circle cx="300" cy="190" r="26" fill="{PAPER}" stroke="{C2}" stroke-width="3"/>')
    o.append(f'<path d="M 286 178 L 314 202 M 286 202 L 314 178" stroke="{C2}" stroke-width="3"/>')
    o.append(t(300, 254, "the valve", 13, "#7E5B0C", "middle", "700", fam=MONO))
    o.append(t(300, 276, "psychological safety", 13, MUT, "middle"))
    o.append(t(300, 294, "and credible promises", 13, MUT, "middle"))
    o.append(t(300, 316, "close it and the flow stops", 12.5, "#7E5B0C", "middle", "700"))

    # outflow
    o.append(f'<path d="M 760 170 L 1100 170 L 1100 210 L 760 210 Z" fill="{SOFT}" stroke="{LINE}" stroke-width="2"/>')
    o.append(f'<path d="M 1062 178 L 1094 190 L 1062 202 Z" fill="{MUT}"/>')
    o.append(t(770, 150, "OUTFLOW", 11.5, MUT, weight="700", fam=MONO, extra=' letter-spacing="1.6"'))
    o.append(t(770, 196, "turnover, disuse, reorganisation", 14, INK))

    o.append(f'<rect x="60" y="334" width="{W-120}" height="48" rx="6" fill="{SOFT}" stroke="{LINE}"/>')
    o.append(t(80, 364, "A stock adjusts slowly and drains quietly. An organisation that was good at improving five years ago "
                        "may no longer be, and nothing on its balance sheet will say so.", 14, INK))
    o.append(t(580, 100, "Volume of improvement activity is not the inflow. Only the part that produces both kinds of knowledge is.",
               14, MUT, "middle"))
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


# ------------------------------------------------- 9. Lapré 2x2
def lapre():
    W, H = 980, 620
    L, R, T, B = 120, 930, 40, 470
    o = [f'<rect width="{W}" height="{H}" fill="{PAPER}"/>']
    mx, my = (L + R) / 2, (T + B) / 2
    o.append(f'<rect x="{L}" y="{T}" width="{R-L}" height="{B-T}" fill="{SOFT}" opacity=".45"/>')
    o.append(f'<rect x="{mx}" y="{T}" width="{R-mx}" height="{my-T}" fill="{GOLDSOFT}"/>')
    o.append(f'<line x1="{mx}" y1="{T}" x2="{mx}" y2="{B}" stroke="{LINE}" stroke-width="1.5"/>')
    o.append(f'<line x1="{L}" y1="{my}" x2="{R}" y2="{my}" stroke="{LINE}" stroke-width="1.5"/>')
    o.append(f'<line x1="{L}" y1="{B}" x2="{R}" y2="{B}" stroke="{INK}" stroke-width="2"/>')
    o.append(f'<line x1="{L}" y1="{T}" x2="{L}" y2="{B}" stroke="{INK}" stroke-width="2"/>')

    cells = [(L, my, "Firefighting", "neither why nor how", "No acceleration"),
             (mx, my, "Artisan skills", "how, without why", "No acceleration"),
             (L, T, "Nonvalidated theories", "why, never tested in the work", "No acceleration"),
             (mx, T, "Operationally validated theories", "why and how, acquired together", "The only group that accelerated")]
    for x, y, name, sub, verdict in cells:
        hi = (x == mx and y == T)
        o.append(t(x + 28, y + 50, name, 18, INK, weight="600", fam=SERIF))
        o.append(t(x + 28, y + 74, sub, 13.5, MUT))
        o.append(t(x + 28, y + 108, verdict, 13.5, "#7E5B0C" if hi else MUT, weight="700" if hi else "400", fam=MONO))
    o.append(t((L + R) / 2, B + 38, "Operational learning  →  know-how: what actually works here", 15, INK, "middle", "600"))
    o.append(f'<text transform="translate({L-50},{(T+B)/2}) rotate(-90)" font-family="{SANS}" font-size="15" '
             f'fill="{INK}" text-anchor="middle" font-weight="600">Conceptual learning  →  know-why: the mechanism</text>')

    o.append(f'<rect x="{L}" y="{B+62}" width="{R-L}" height="96" rx="6" fill="{INK}"/>')
    o.append(t(L + 24, B + 94, "THE FINDING", 11.5, "#F2DFB4", weight="700", fam=MONO, extra=' letter-spacing="1.8"'))
    o.append(t(L + 24, B + 124, "Across 62 improvement projects in one factory, only about a quarter accelerated waste reduction —",
               15, "#FFFFFF"))
    o.append(t(L + 24, B + 146, "and they were the ones in the top-right cell. The rest slowed it, or did nothing at all.",
               15, "#FFFFFF"))
    return {"vb": f"0 0 {W} {H}", "body": "\n".join(o)}


FIGS = {
    "vsm": (vsm, "A value stream map of an administrative process — a change request from arrival to implementation. "
                 "The boxes carry the worked time, the triangles the waiting. The staircase at the bottom is the whole point of "
                 "the exercise: four hours of work spread across fifteen working days, with almost all of the elapsed time "
                 "sitting in two approval queues.",
            "Value stream map of a change-request process, showing four hours of process time across fifteen days of lead time"),
    "matrix": (matrix, "The efficiency matrix, after Modig and Åhlström (2012). Resource efficiency and flow efficiency are not "
                       "two names for the same thing, and the curve is the reason they trade off: with variation at its current level, "
                       "the combinations beyond the frontier cannot be bought with effort. Removing variation is what moves the frontier "
                       "towards the corner where both are high.",
               "Two-by-two matrix of resource efficiency against flow efficiency with the efficiency frontier"),
    "capability": (capability, "Two processes with identical spread and opposite fates. On the left the mean sits on target and the "
                               "tolerance is comfortable. On the right nothing about the process changed except where it is centred — "
                               "C<sub>p</sub> is unmoved, C<sub>pk</sub> halves, and the shaded tail is the share of output the customer "
                               "will reject. This is why the average is a poor promise and the spread, read against the tolerance, is the real one.",
                   "Two normal distributions against the same tolerance limits, one centred and one shifted"),
    "control": (control_chart, "A control chart of the same process over twenty-four measurements. The limits are calculated from the "
                               "process itself, not from the target. Two signals are present and everything else is noise — and the costly "
                               "managerial error is not missing the two signals, it is explaining the noise.",
                "Control chart with centre line, three-sigma limits, one point beyond the upper limit and a run of seven below the centre"),
    "roictree": (roic_tree, "Return on invested capital, decomposed. The identity has two branches and the morning's work lands on both: "
                            "removing defects and expediting lifts the left branch, and removing lead time lifts the right one by taking "
                            "capital out of the denominator. A programme argued only as cost saving is claiming half of what it does.",
                 "A DuPont-style tree decomposing ROIC into operating margin and capital turnover, with lean levers attached"),
    "stock": (stock_flow, "Capability as a stock with a regulated inflow and an unregulated outflow. The valve is the part most improvement "
                          "programmes leave out: where surfacing a problem is costly, the measured performance improves and the real "
                          "performance does not.",
              "Stock and flow diagram of capability, with a valve on the inflow and an outflow of turnover and disuse"),
    "lapre": (lapre, "The classification behind the finding, after Lapré, Mukherjee and Van Wassenhove (2000). Projects were sorted by "
                     "whether they produced an understanding of the mechanism and whether that understanding was validated in the work. "
                     "Only the cell that produced both accelerated the reduction of waste.",
              "Two-by-two matrix of conceptual learning against operational learning with four project types"),
}


def build():
    out = {}
    nums = {"vsm": 1, "matrix": 2, "capability": 4, "control": 3, "roictree": 6, "stock": 8, "lapre": 9}
    for k, (fn, cap, label) in FIGS.items():
        out[k] = fig(fn(), nums[k], cap, label)
    return out


if __name__ == "__main__":
    import json, sys
    b = build()
    for k, v in b.items():
        open(f"/home/claude/apostila/fig_{k}.html", "w").write(v)
    print(json.dumps({k: len(v) for k, v in b.items()}, indent=0))
