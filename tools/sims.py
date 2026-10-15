#!/usr/bin/env python3
"""The two interactive figures for Session 1: Little's Law and the ROIC simulator.
Both render a default state on load, so the printed version shows a real chart with
the controls removed. Each carries three didactic layers on top of the chart:
preset scenarios, the arithmetic with the live numbers in it, and a reading guide."""

LITTLE = """<figure class="fig sim" id="sim-little">
  <div class="simhead">
    <b>Little's Law, as a portfolio instrument</b>
    <span>Move the sliders, or press one of the scenarios. The arithmetic, the chart and the sentence below update together.</span>
  </div>
  <div class="simpre" role="group" aria-label="Scenarios">
    <span class="simpre-l">Try</span>
    <button type="button" data-wip="36" data-thr="24">A typical portfolio</button>
    <button type="button" data-wip="22" data-thr="24">Cut what is in flight by 40%</button>
    <button type="button" data-wip="36" data-thr="29">Add 20% more capacity instead</button>
    <button type="button" data-wip="20" data-thr="10">The example in the text: 20 and 10</button>
  </div>
  <div class="simctl">
    <label for="ll-wip">Projects in flight <output id="ll-wip-v">36</output></label>
    <input type="range" id="ll-wip" min="4" max="60" step="1" value="36">
    <label for="ll-thr">Projects completed per year <output id="ll-thr-v">24</output></label>
    <input type="range" id="ll-thr" min="4" max="60" step="1" value="24">
  </div>
  <div class="simcalc" id="ll-calc" aria-live="polite"></div>
  <svg viewBox="0 0 1000 440" role="img" aria-labelledby="ll-desc">
    <rect width="1000" height="440" fill="#FFFFFF"/>
    <g id="ll-grid"></g>
    <path id="ll-line" fill="none" stroke="#2A5D9F" stroke-width="3"/>
    <line id="ll-vx" stroke="#B8820F" stroke-width="1.8" stroke-dasharray="5 4"/>
    <line id="ll-hy" stroke="#B8820F" stroke-width="1.8" stroke-dasharray="5 4"/>
    <circle id="ll-dot" r="9" fill="#B8820F" stroke="#FFFFFF" stroke-width="2.5"/>
    <text id="ll-dotlab" font-family="'JetBrains Mono',monospace" font-size="15" font-weight="700" fill="#7E5B0C"></text>
    <line x1="90" y1="360" x2="960" y2="360" stroke="#0A2342" stroke-width="2"/>
    <line x1="90" y1="40" x2="90" y2="360" stroke="#0A2342" stroke-width="2"/>
    <text x="525" y="400" font-family="'Source Sans 3',sans-serif" font-size="15" fill="#0A2342" text-anchor="middle" font-weight="600">Projects in flight</text>
    <text transform="translate(40,200) rotate(-90)" font-family="'Source Sans 3',sans-serif" font-size="15" fill="#0A2342" text-anchor="middle" font-weight="600">Average months a project is open</text>
  </svg>
  <div class="simcmp" id="ll-cmp"></div>
  <p class="simout" id="ll-out"></p>
  <div class="simhow">
    <b>How to read it</b>
    <ol>
      <li>The line is the law: for a given rate of completion, the time a project stays open grows in a straight line with the number in flight. There is no curve to argue about.</li>
      <li>The dot is your organisation. Its height is the average time a project is open — not the planned duration, the real one.</li>
      <li>Move the dot <em>left</em> by starting less, or steepen the line <em>less</em> by finishing more. The comparison box shows how much each lever buys, because the second is the one everybody reaches for and the first is the one that works.</li>
    </ol>
  </div>
  <figcaption id="ll-desc"><b>Figure 5.</b> Little's Law applied to a portfolio: the average time a project stays open is the
  number in flight divided by the number finished per year. Throughput is set by capacity and is hard to move quickly;
  the number in flight is a decision somebody takes every week. The law holds on averages, for a system that is stable and
  where what starts eventually finishes.</figcaption>
</figure>
<script>
(function(){
  var wip=document.getElementById('ll-wip'), thr=document.getElementById('ll-thr');
  if(!wip) return;
  var L=90,R=960,T=40,B=360,XMAX=60,YMAX=36;
  function X(v){return L+(R-L)*v/XMAX;} function Y(v){return B-(B-T)*Math.min(v,YMAX)/YMAX;}
  var g=document.getElementById('ll-grid'),gh='';
  for(var y=0;y<=YMAX;y+=6){gh+='<line x1="'+L+'" y1="'+Y(y)+'" x2="'+R+'" y2="'+Y(y)+'" stroke="#D3DCE6" stroke-width="1"/>'
    +'<text x="'+(L-12)+'" y="'+(Y(y)+5)+'" font-family="\\'JetBrains Mono\\',monospace" font-size="12.5" fill="#56687C" text-anchor="end">'+y+'</text>';}
  for(var x=0;x<=XMAX;x+=10){gh+='<text x="'+X(x)+'" y="'+(B+24)+'" font-family="\\'JetBrains Mono\\',monospace" font-size="12.5" fill="#56687C" text-anchor="middle">'+x+'</text>';}
  g.innerHTML=gh;
  function m1(v){return v.toFixed(1).replace(/\\.0$/,'');}
  function draw(){
    var w=+wip.value, th=+thr.value;
    document.getElementById('ll-wip-v').textContent=w;
    document.getElementById('ll-thr-v').textContent=th;
    var years=w/th, months=years*12;
    document.getElementById('ll-calc').innerHTML=
      '<span class="t">lead time</span><span class="eq">=</span><span class="n">'+w+'<small>in flight</small></span>'+
      '<span class="eq">÷</span><span class="n">'+th+'<small>finished / year</small></span>'+
      '<span class="eq">=</span><span class="n">'+m1(years)+'<small>years</small></span>'+
      '<span class="eq">=</span><span class="n hi">'+m1(months)+'<small>months</small></span>';
    var yEnd=XMAX/th*12;
    document.getElementById('ll-line').setAttribute('d','M '+X(0)+' '+Y(0)+' L '+X(XMAX)+' '+Y(yEnd));
    var dx=X(w), dy=Y(months);
    var d=document.getElementById('ll-dot'); d.setAttribute('cx',dx); d.setAttribute('cy',dy);
    var vx=document.getElementById('ll-vx'); vx.setAttribute('x1',dx); vx.setAttribute('x2',dx); vx.setAttribute('y1',dy); vx.setAttribute('y2',B);
    var hy=document.getElementById('ll-hy'); hy.setAttribute('x1',L); hy.setAttribute('x2',dx); hy.setAttribute('y1',dy); hy.setAttribute('y2',dy);
    var lab=document.getElementById('ll-dotlab');
    lab.setAttribute('x', dx<700? dx+16 : dx-16); lab.setAttribute('y', dy-14);
    lab.setAttribute('text-anchor', dx<700? 'start':'end');
    lab.textContent=m1(months)+' months';
    // the two levers, compared
    var cutW=Math.max(1,Math.round(w*0.6)), cutM=cutW/th*12;
    var addT=Math.round(th*1.2), addM=w/addT*12;
    var need=Math.ceil(w/(cutM/12));
    document.getElementById('ll-cmp').innerHTML=
      '<div><span>Start less — in flight '+w+' → '+cutW+'</span><b>'+m1(cutM)+' months</b><small>same people, same budget</small></div>'+
      '<div><span>Finish more — per year '+th+' → '+addT+'</span><b>'+m1(addM)+' months</b><small>20% more capacity, bought or hired</small></div>'+
      '<div class="hi"><span>To match the first lever by capacity alone</span><b>'+need+' / year</b><small>a '+Math.round((need/th-1)*100)+'% increase in throughput</small></div>';
    document.getElementById('ll-out').innerHTML='With <b>'+w+'</b> projects in flight and <b>'+th+
      '</b> finished a year, the average project is open for <b>'+m1(months)+' months</b>. '+
      'Cutting the number in flight by 40% brings that to <b>'+m1(cutM)+'</b>; adding 20% capacity brings it only to <b>'+m1(addM)+'</b>. '+
      'The first lever is a decision. The second is a budget.';
  }
  wip.addEventListener('input',draw); thr.addEventListener('input',draw);
  document.querySelectorAll('#sim-little .simpre button').forEach(function(b){
    b.addEventListener('click',function(){ wip.value=b.dataset.wip; thr.value=b.dataset.thr; draw();
      document.querySelectorAll('#sim-little .simpre button').forEach(function(x){x.classList.toggle('on',x===b);}); });
  });
  draw();
})();
</script>"""

ROIC = """<figure class="fig sim" id="sim-roic">
  <div class="simhead">
    <b>What an operational improvement does to return on capital</b>
    <span>A stylised business: revenue 1,000 a year, fixed assets 500, and each day of lead time ties up 15 of inventory. Only the two operational levers move.</span>
  </div>
  <div class="simpre" role="group" aria-label="Scenarios">
    <span class="simpre-l">Try</span>
    <button type="button" data-lt="20" data-mg="8">Baseline</button>
    <button type="button" data-lt="8" data-mg="8">Flow only — lead time 20 → 8 days</button>
    <button type="button" data-lt="20" data-mg="10">Cost only — margin 8 → 10%</button>
    <button type="button" data-lt="8" data-mg="10">Both — the case in the text</button>
  </div>
  <div class="simctl">
    <label for="rc-lt">Lead time, days <output id="rc-lt-v">20</output></label>
    <input type="range" id="rc-lt" min="5" max="30" step="1" value="20">
    <label for="rc-mg">Operating margin <output id="rc-mg-v">8%</output></label>
    <input type="range" id="rc-mg" min="6" max="14" step="0.5" value="8">
  </div>
  <div class="simcalc two" id="rc-calc" aria-live="polite"></div>
  <svg viewBox="0 0 1000 300" role="img" aria-labelledby="rc-desc">
    <rect width="1000" height="300" fill="#FFFFFF"/>
    <g id="rc-grid"></g>
    <rect id="rc-bar" x="150" y="60" height="54" rx="4" fill="#2A5D9F"/>
    <rect id="rc-base" x="150" y="140" height="54" rx="4" fill="#B5C3D3"/>
    <line id="rc-wacc" y1="40" y2="230" stroke="#B8820F" stroke-width="3"/>
    <text id="rc-waccl" y="30" font-family="'JetBrains Mono',monospace" font-size="13" font-weight="700" fill="#7E5B0C" text-anchor="middle">WACC 10%</text>
    <text x="138" y="94" font-family="'Source Sans 3',sans-serif" font-size="15" fill="#0A2342" text-anchor="end" font-weight="700">ROIC now</text>
    <text x="138" y="174" font-family="'Source Sans 3',sans-serif" font-size="15" fill="#56687C" text-anchor="end">Baseline</text>
    <text id="rc-barl" y="94" font-family="'JetBrains Mono',monospace" font-size="17" font-weight="700" fill="#0A2342"></text>
    <text id="rc-basel" y="174" font-family="'JetBrains Mono',monospace" font-size="15" fill="#56687C">10.0%</text>
  </svg>
  <div class="simgrid" id="rc-nums"></div>
  <p class="simout" id="rc-out"></p>
  <table class="simtbl" id="rc-tbl">
    <tr><th>Scenario</th><th>Lead time</th><th>Margin</th><th>Capital</th><th>ROIC</th><th>Economic profit</th></tr>
  </table>
  <div class="simhow">
    <b>How to read it</b>
    <ol>
      <li>Return on capital has a numerator and a denominator. The margin lever moves the top; the lead-time lever moves the bottom, because every day of lead time is inventory, and inventory is capital somebody had to put in.</li>
      <li>The gold line is the cost of that capital. A return to its left is accounting profit with no economic profit: the business earns exactly what the capital costs, and creates nothing.</li>
      <li>The table runs the four scenarios side by side. Notice that the two levers each clear the line on their own, and that together they add more to the return than the two gains added together — the higher margin is earned on a smaller base.</li>
    </ol>
  </div>
  <figcaption id="rc-desc"><b>Figure 7.</b> The same improvement, read as a return on capital. Shortening lead time releases
  inventory, which leaves the denominator; removing rework and expediting lifts the margin, which raises the numerator.
  The grey bar is the starting position, where return exactly equals the cost of capital. The gold line is the only
  threshold that matters. The figures are stylised; in your own numbers, inventory per day of lead time is roughly annual cost of sales divided by working days.</figcaption>
</figure>
<script>
(function(){
  var lt=document.getElementById('rc-lt'), mg=document.getElementById('rc-mg');
  if(!lt) return;
  var L=150,R=960,XMAX=24,WACC=10,REV=1000,FIXED=500,PERDAY=15;
  function X(v){return L+(R-L)*v/XMAX;}
  function calc(days,m){ var inv=PERDAY*days, ic=FIXED+inv, nopat=REV*m; return {inv:inv,ic:ic,nopat:nopat,roic:nopat/ic*100,ep:nopat-WACC/100*ic}; }
  var g=document.getElementById('rc-grid'),gh='';
  for(var x=0;x<=XMAX;x+=4){gh+='<line x1="'+X(x)+'" y1="40" x2="'+X(x)+'" y2="230" stroke="#D3DCE6" stroke-width="1"/>'
    +'<text x="'+X(x)+'" y="252" font-family="\\'JetBrains Mono\\',monospace" font-size="12.5" fill="#56687C" text-anchor="middle">'+x+'%</text>';}
  g.innerHTML=gh;
  document.getElementById('rc-wacc').setAttribute('x1',X(WACC));
  document.getElementById('rc-wacc').setAttribute('x2',X(WACC));
  document.getElementById('rc-waccl').setAttribute('x',X(WACC));
  document.getElementById('rc-base').setAttribute('width',X(10)-L);
  document.getElementById('rc-basel').setAttribute('x',X(10)+12);
  var SC=[['Baseline',20,8],['Flow only',8,8],['Cost only',20,10],['Both',8,10]];
  function row(name,days,m,cur){ var r=calc(days,m/100);
    return '<tr'+(cur?' class="cur"':'')+'><td>'+name+'</td><td>'+days+' days</td><td>'+m+'%</td><td>'+r.ic.toFixed(0)+'</td><td><b>'+r.roic.toFixed(1)+'%</b></td><td>'+(r.ep>=0?'+':'')+r.ep.toFixed(0)+'</td></tr>'; }
  function draw(){
    var days=+lt.value, mpct=+mg.value, r=calc(days,mpct/100);
    document.getElementById('rc-lt-v').textContent=days;
    document.getElementById('rc-mg-v').textContent=mpct.toFixed(1).replace('.0','')+'%';
    document.getElementById('rc-calc').innerHTML=
      '<div><span class="t">capital</span><span class="eq">=</span><span class="n">500<small>fixed</small></span><span class="eq">+</span><span class="n">15 × '+days+'<small>inventory</small></span><span class="eq">=</span><span class="n hi">'+r.ic.toFixed(0)+'</span></div>'+
      '<div><span class="t">ROIC</span><span class="eq">=</span><span class="n">1,000 × '+mpct+'%<small>NOPAT = '+r.nopat.toFixed(0)+'</small></span><span class="eq">÷</span><span class="n">'+r.ic.toFixed(0)+'<small>capital</small></span><span class="eq">=</span><span class="n hi">'+r.roic.toFixed(1)+'%</span></div>';
    var bar=document.getElementById('rc-bar');
    bar.setAttribute('width',Math.max(2,X(Math.min(r.roic,XMAX))-L));
    var lab=document.getElementById('rc-barl');
    lab.setAttribute('x',X(Math.min(r.roic,XMAX))+12); lab.textContent=r.roic.toFixed(1)+'%';
    var cells=[['Inventory',r.inv.toFixed(0)],['Invested capital',r.ic.toFixed(0)],['NOPAT',r.nopat.toFixed(0)],
               ['ROIC',r.roic.toFixed(1)+'%'],['Economic profit',(r.ep>=0?'+':'')+r.ep.toFixed(0)]];
    document.getElementById('rc-nums').innerHTML=cells.map(function(c,i){
      return '<div'+(i>2?' class="hi"':'')+'><span>'+c[0]+'</span><b>'+c[1]+'</b></div>';}).join('');
    var tbl=document.getElementById('rc-tbl'); var head=tbl.rows[0].outerHTML;
    var isPreset=SC.some(function(s){return s[1]===days&&s[2]===mpct;});
    tbl.innerHTML=head+SC.map(function(s){return row(s[0],s[1],s[2],s[1]===days&&s[2]===mpct);}).join('')+(isPreset?'':row('Your setting',days,mpct,true));
    var msg;
    if(r.ep>0.5) msg='Return now exceeds the cost of capital by '+(r.roic-WACC).toFixed(1)+' points. The business is creating <b>'+r.ep.toFixed(0)+
      '</b> of economic profit a year that it was not creating before — none of it from a price rise, and '+
      (days<20? 'part of it from capital that simply left the balance sheet.' : 'all of it from the numerator, because nothing left the balance sheet.');
    else if(r.ep<-0.5) msg='Return sits <b>below</b> the cost of capital. The operation is consuming value, however healthy the margin looks on its own.';
    else msg='Return equals the cost of capital exactly. The accounting profit is real and the economic profit is zero.';
    document.getElementById('rc-out').innerHTML=msg;
  }
  lt.addEventListener('input',draw); mg.addEventListener('input',draw);
  document.querySelectorAll('#sim-roic .simpre button').forEach(function(b){
    b.addEventListener('click',function(){ lt.value=b.dataset.lt; mg.value=b.dataset.mg; draw();
      document.querySelectorAll('#sim-roic .simpre button').forEach(function(x){x.classList.toggle('on',x===b);}); });
  });
  draw();
})();
</script>"""

CSS = """.simpre{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px}
.simpre-l{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:#7E5B0C;font-weight:700;margin-right:4px}
.simpre button{font-family:'Source Sans 3',sans-serif;font-size:14.5px;font-weight:600;color:var(--navy);background:#fff;border:1.5px solid #B5C3D3;border-radius:999px;padding:7px 14px;cursor:pointer}
.simpre button:hover{border-color:var(--navy)}
.simpre button.on{background:var(--navy);color:#fff;border-color:var(--navy)}
.simpre button:focus{outline:3px solid var(--gold);outline-offset:2px}
.simcalc{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 10px;background:var(--ink);color:#fff;border-radius:8px;padding:14px 18px;margin:0 0 14px;font-family:'JetBrains Mono',monospace}
.simcalc.two{flex-direction:column;align-items:stretch;gap:6px;padding:10px 18px}
.simcalc.two>div{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 10px}
.simcalc .t{font-family:'Source Sans 3',sans-serif;font-weight:700;color:#F2DFB4;font-size:15px;min-width:86px}
.simcalc .eq{color:#9FB6CE;font-size:18px}
.simcalc .n{font-size:19px;color:#fff;display:inline-flex;flex-direction:column;line-height:1}
.simcalc .n small{font-family:'Source Sans 3',sans-serif;font-size:11.5px;color:#9FB6CE;font-weight:400;letter-spacing:.04em}
.simcalc .n.hi{color:#F2DFB4;font-weight:700;font-size:22px}
.simcmp{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.simcmp div{background:#F3F6FA;border:1px solid #C6D2DF;border-radius:7px;padding:10px 12px}
.simcmp div.hi{background:#FEF8EA;border-color:var(--gold)}
.simcmp span{display:block;font-size:13px;color:#56687C;font-weight:700}
.simcmp b{font-family:'JetBrains Mono',monospace;font-size:20px;color:var(--navy);display:block;margin:3px 0}
.simcmp small{font-size:12.5px;color:#56687C}
.simtbl{margin:14px 0 0;font-size:15px}
.simtbl td,.simtbl th{padding:7px 11px}
.simtbl tr.cur td{background:#FEF8EA;font-weight:600}
.simhow{margin-top:16px;border-top:1px solid #DFE6EE;padding-top:12px}
.simhow b{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:#7E5B0C;display:block;margin-bottom:6px}
.simhow ol{margin:0 0 0 20px;font-size:15.5px;color:#2E3F52}
.simhow li{margin-bottom:5px}
@media(max-width:700px){.simcmp{grid-template-columns:1fr}}
"""

if __name__ == "__main__":
    open("/home/claude/apostila/fig_little.html", "w").write(LITTLE)
    open("/home/claude/apostila/fig_roic.html", "w").write(ROIC)
    open("/home/claude/apostila/sims.css", "w").write(CSS)
    print("ok", len(LITTLE), len(ROIC))
