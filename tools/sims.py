#!/usr/bin/env python3
"""The two interactive figures for Session 1: Little's Law and the ROIC simulator.
Both render a default state on load, so the printed apostila shows a real chart with
the controls removed."""

LITTLE = """<figure class="fig sim" id="sim-little">
  <div class="simhead">
    <b>Little's Law, as a portfolio instrument</b>
    <span>Move the sliders. The chart and the sentence below update together.</span>
  </div>
  <div class="simctl">
    <label for="ll-wip">Projects in flight <output id="ll-wip-v">36</output></label>
    <input type="range" id="ll-wip" min="4" max="60" step="1" value="36">
    <label for="ll-thr">Projects completed per year <output id="ll-thr-v">24</output></label>
    <input type="range" id="ll-thr" min="4" max="60" step="1" value="24">
  </div>
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
  <p class="simout" id="ll-out"></p>
  <figcaption id="ll-desc"><b>Figure 5.</b> Little's Law applied to a portfolio: the average time a project stays open is the
  number in flight divided by the number finished per year. Throughput is set by capacity and is hard to move quickly;
  the number in flight is a decision somebody takes every week. The line is straight because the law is an identity, not a
  forecast — it holds on averages, for a system that is stable and where what starts eventually finishes.</figcaption>
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
  function draw(){
    var w=+wip.value, th=+thr.value;
    document.getElementById('ll-wip-v').textContent=w;
    document.getElementById('ll-thr-v').textContent=th;
    var months=w/th*12;
    var yEnd=XMAX/th*12;
    document.getElementById('ll-line').setAttribute('d','M '+X(0)+' '+Y(0)+' L '+X(XMAX)+' '+Y(yEnd));
    var dx=X(w), dy=Y(months);
    var d=document.getElementById('ll-dot'); d.setAttribute('cx',dx); d.setAttribute('cy',dy);
    var vx=document.getElementById('ll-vx'); vx.setAttribute('x1',dx); vx.setAttribute('x2',dx); vx.setAttribute('y1',dy); vx.setAttribute('y2',B);
    var hy=document.getElementById('ll-hy'); hy.setAttribute('x1',L); hy.setAttribute('x2',dx); hy.setAttribute('y1',dy); hy.setAttribute('y2',dy);
    var lab=document.getElementById('ll-dotlab');
    lab.setAttribute('x', dx<700? dx+16 : dx-16); lab.setAttribute('y', dy-14);
    lab.setAttribute('text-anchor', dx<700? 'start':'end');
    lab.textContent=months.toFixed(1)+' months';
    var cut=Math.round(w*0.6), cutM=cut/th*12;
    document.getElementById('ll-out').innerHTML='With <b>'+w+'</b> projects in flight and <b>'+th+
      '</b> finished a year, the average project is open for <b>'+months.toFixed(1)+' months</b>. '+
      'Cutting the number in flight to '+cut+' — with no change to capacity, no new tool and nobody working faster — '+
      'brings that to <b>'+cutM.toFixed(1)+' months</b>.';
  }
  wip.addEventListener('input',draw); thr.addEventListener('input',draw); draw();
})();
</script>"""

ROIC = """<figure class="fig sim" id="sim-roic">
  <div class="simhead">
    <b>What an operational improvement does to return on capital</b>
    <span>Revenue held at 1,000 and fixed assets at 500, so only the operational levers move. Inventory is carried at 15 per day of lead time.</span>
  </div>
  <div class="simctl">
    <label for="rc-lt">Lead time, days <output id="rc-lt-v">20</output></label>
    <input type="range" id="rc-lt" min="5" max="30" step="1" value="20">
    <label for="rc-mg">Operating margin <output id="rc-mg-v">8%</output></label>
    <input type="range" id="rc-mg" min="6" max="14" step="0.5" value="8">
  </div>
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
  <figcaption id="rc-desc"><b>Figure 7.</b> The same improvement, read as a return on capital. Shortening lead time releases
  inventory, which leaves the denominator; removing rework and expediting lifts the margin, which raises the numerator.
  The grey bar is the starting position, where return exactly equals the cost of capital and the business creates no economic
  value at all. The gold line is the only threshold that matters.</figcaption>
</figure>
<script>
(function(){
  var lt=document.getElementById('rc-lt'), mg=document.getElementById('rc-mg');
  if(!lt) return;
  var L=150,R=960,XMAX=24,WACC=10,REV=1000,FIXED=500;
  function X(v){return L+(R-L)*v/XMAX;}
  var g=document.getElementById('rc-grid'),gh='';
  for(var x=0;x<=XMAX;x+=4){gh+='<line x1="'+X(x)+'" y1="40" x2="'+X(x)+'" y2="230" stroke="#D3DCE6" stroke-width="1"/>'
    +'<text x="'+X(x)+'" y="252" font-family="\\'JetBrains Mono\\',monospace" font-size="12.5" fill="#56687C" text-anchor="middle">'+x+'%</text>';}
  g.innerHTML=gh;
  document.getElementById('rc-wacc').setAttribute('x1',X(WACC));
  document.getElementById('rc-wacc').setAttribute('x2',X(WACC));
  document.getElementById('rc-waccl').setAttribute('x',X(WACC));
  document.getElementById('rc-base').setAttribute('width',X(10)-L);
  document.getElementById('rc-basel').setAttribute('x',X(10)+12);
  function draw(){
    var days=+lt.value, m=+mg.value/100;
    document.getElementById('rc-lt-v').textContent=days;
    document.getElementById('rc-mg-v').textContent=(m*100).toFixed(1).replace('.0','')+'%';
    var inv=15*days, ic=FIXED+inv, nopat=REV*m, roic=nopat/ic*100, ep=nopat-0.10*ic;
    var bar=document.getElementById('rc-bar');
    bar.setAttribute('width',Math.max(2,X(Math.min(roic,XMAX))-L));
    var lab=document.getElementById('rc-barl');
    lab.setAttribute('x',X(Math.min(roic,XMAX))+12); lab.textContent=roic.toFixed(1)+'%';
    var cells=[['Inventory',inv.toFixed(0)],['Invested capital',ic.toFixed(0)],['NOPAT',nopat.toFixed(0)],
               ['ROIC',roic.toFixed(1)+'%'],['Economic profit',(ep>=0?'+':'')+ep.toFixed(0)]];
    document.getElementById('rc-nums').innerHTML=cells.map(function(c,i){
      return '<div'+(i>2?' class="hi"':'')+'><span>'+c[0]+'</span><b>'+c[1]+'</b></div>';}).join('');
    var msg;
    if(ep>0.5) msg='Return now exceeds the cost of capital. The business is creating <b>'+ep.toFixed(0)+
      '</b> of economic profit a year that it was not creating before — none of it from a price rise.';
    else if(ep<-0.5) msg='Return sits <b>below</b> the cost of capital. The operation is consuming value, however healthy the margin looks on its own.';
    else msg='Return equals the cost of capital exactly. The accounting profit is real and the economic profit is zero.';
    document.getElementById('rc-out').innerHTML=msg;
  }
  lt.addEventListener('input',draw); mg.addEventListener('input',draw); draw();
})();
</script>"""

if __name__ == "__main__":
    open("/home/claude/apostila/fig_little.html", "w").write(LITTLE)
    open("/home/claude/apostila/fig_roic.html", "w").write(ROIC)
    print("ok", len(LITTLE), len(ROIC))
