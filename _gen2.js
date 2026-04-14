const fs=require('fs');
// Simple approach: build HTML as string concatenation
let h='';
h+='<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Rock Chen \u9648\u539A\u7404 \u2014 AI \u00d7 \u4ea7\u54c1 \u00d7 \u5de5\u7a0b</title>';
h+='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
h+='<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet"><style>';

// CSS (compact)
const css=`*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}:root{--n:#0A1628;--nm:#0F2847;--t:#0D9488;--tl:#14B8A6;--a:#F59E0B;--al:#FBBF24;--l:rgba(255,255,255,.88);--d:rgba(255,255,255,.55);--fh:'Space Grotesk',sans-serif;--fb:'Space Grotesk',system-ui,sans-serif;--fm:'JetBrains Mono',monospace}html{scroll-behavior:smooth;overflow-x:hidden}body{font-family:var(--fb);color:var(--l);background:var(--n);overflow-x:hidden;line-height:1.7;-webkit-font-smoothing:antialiased}
#ab{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 120% 80% at 50% 50%,var(--nm),var(--n));transition:background 1.2s ease}
#ab::after{content:'';position:absolute;inset:0;background:radial-gradient(circle 500px at var(--mx,50%) var(--my,40%),rgba(13,148,136,.22) 0%,rgba(13,148,136,.10) 30%,transparent 65%);transition:background .6s ease}
#tl{position:fixed;left:32px;top:0;height:100vh;width:2px;z-index:100;background:rgba(255,255,255,.06)}
#tp{width:100%;background:linear-gradient(180deg,var(--t),var(--a));border-radius:0 0 2px 2px;transition:height .15s ease;box-shadow:0 0 12px rgba(13,148,136,.5)}
#td{position:fixed;left:25px;top:0;height:100vh;z-index:101;pointer-events:none}
.td{position:absolute;width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.15);background:var(--n);transition:all .4s ease;transform:translateX(-50%)}.td.a{border-color:var(--tl);background:var(--t)}.td.w{border-color:var(--a);background:var(--a)}
.sc{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;z-index:1;overflow:hidden;padding:80px 60px 80px 100px}
.rv{opacity:0;transform:translateY(60px);transition:opacity .9s cubic-bezier(.23,1,.32,1),transform .9s cubic-bezier(.23,1,.32,1)}.rv.v{opacity:1;transform:translateY(0)}
.rl{opacity:0;transform:translateX(-80px);transition:opacity .9s cubic-bezier(.23,1,.32,1),transform .9s cubic-bezier(.23,1,.32,1)}.rl.v{opacity:1;transform:translateX(0)}.rr{opacity:0;transform:translateX(80px);transition:.9s}.rr.v{opacity:1;transform:translateX(0)}
.rs{opacity:0;transform:scale(.85);transition:.8s ease,transform .8s cubic-bezier(.23,1,.32,1)}.rs.v{opacity:1;transform:scale(1)}
.rf{opacity:0;transform:translateY(100px);transition:1s .2s,transform 1s cubic-bezier(.23,1,.32,1) .2s}.rf.v{opacity:1;transform:translateY(0)}
.cc{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;padding:40px 50px;opacity:0;pointer-events:none;z-index:0;transition:opacity .6s ease}
.cc .cn{font-family:var(--fm);font-size:.72rem;text-transform:uppercase;letter-spacing:.4em;color:var(--tl);opacity:0;margin-bottom:8px;transition:opacity .8s .3s,transform 1s cubic-bezier(.23,1,.32,1);transform:translateY(20px)}
.cc h2{font-family:var(--fh);font-size:clamp(3rem,7vw,5.5rem);font-weight:300;letter-spacing:-.02em;line-height:1;color:rgba(13,148,136,.10);opacity:0;transition:opacity .8s .4s,transform 1s cubic-bezier(.23,1,.32,1);transform:translateY(30px)}
.cc.s{opacity:1}.cc.s .cn,.cc.s h2{opacity:1;transform:translateY(0)}.swarm .cc .cn{color:var(--al)}.swarm .cc h2{color:rgba(245,158,11,.10)}
.qf{position:relative;padding:32px 40px;margin:48px 0;border-left:2px solid var(--tl);background:linear-gradient(135deg,rgba(13,148,136,.06),transparent);font-family:var(--fh);font-size:1.35rem;font-style:italic;line-height:1.8;color:rgba(255,255,255,.82);max-width:680px}
.qf::before{content:'\\201C';position:absolute;top:-10px;left:16px;font-size:4rem;color:var(--tl);opacity:.4;font-style:normal}
.swd{display:flex;align-items:center;gap:3px;height:60px}.swd span{width:4px;border-radius:4px;background:var(--tl);animation:w 1.2s ease-inout infinite}@keyframes w{0%,100%{height:8px;opacity:.3}50%{height:var(--h,40px);opacity:1}}
.bo{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border:1px solid rgba(255,255,255,.25);border-radius:40px;color:var(--l);text-decoration:none;font-family:var(--fb);font-size:.85rem;letter-spacing:.06em;text-transform:uppercase;transition:all .4s ease;cursor:pointer;background:transparent}.bo:hover{border-color:var(--tl);background:rgba(13,148,136,.1);transform:translateY(-2px)}.bw{border-color:var(--a);color:var(--al)}.bw:hover{background:rgba(245,158,11,.1);border-color:var(--al)}
.si{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;opacity:.5;animation:sp 2.5s infinite}.si span{font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--d)}.sl{width:1px;height:48px;background:linear-gradient(to bottom,var(--tl),transparent);animation:sll 2s infinite}@keyframes sp{0%,100%{opacity:.3;transform:translateX(-50%)}50%{opacity:.7}}@keyframes sll{0%{transform:scaleY(0)}50%{transform:scaleY(1)}51%{transform:scaleY(1)}100%{transform:scaleY(0)}}`;
h+=css;
h+='</style></head><body>';
h+='<div id="ab"></div><div id="gr"></div><div id="tl"><div id="tp" style="height:0%"></div></div><div id="td"></div>';

// Nav
h+='<nav id="sn" class="rv v"><div style="font-family:var(--fh);font-size:.85rem;font-weight:600;color:var(--tl)">Rock</div><ul style="display:flex;gap:6px;list-style:none">';
[['#hero','01 About'],['#resume','02 Resume'],['#video','03 Video'],['#project','04 Project']].forEach(([t,n])=>h+=`<li><a href="${t}" data-target="${t.slice(1)}" style="padding:5px 10px;text-decoration:none;font-family:var(--fm);font-size:.65rem;color:var(--d);border-radius:6px">${n}</a></li>`);
h+='</ul></nav>';

// Scene 1: Hero
h+=`<section class="sc" data-scene="hero" style="flex-direction:column;text-align:center"><div>`;
h+='<p class="rv" style="font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:var(--tl);margin-bottom:20px">Personal Portfolio \\u00b7 2026</p>';
h+='<h1 class="rv" style="font-family:var(--fh);font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.15;margin-bottom:12px"><span style="color:var(--tl);font-weight:300">Rock Chen</span><br><span style="font-size:clamp(1.6rem,3vw,2.4rem);font-weight:300;color:var(--d);letter-spacing:.15em">\u9648 \u539A \u7404</span></h1>';
h+='<p class="rv sub" style="font-size:1.05rem;color:var(--d);max-width:520px;margin:20px auto">AI Product Manager &times; Data Analyst &times; Full-Stack Engineer<br>\u8ba9\u6280\u672f\u4e3a\u601d\u60f3\u7684\u5ef6\u4f38</p>';
h+='<div class="swd rv" id="hw" style="justify-content:center"></div>';
h+='<div class="rv kc" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:900px;margin:36px auto 0">';
[
['\ud83c\udfe9 AI \u4ea7\u54c1\u7ecf\u7406','.88 \u5168\u6808\u72ec\u7acb\u5f00\u53d1\u8003',
['\ud83e\uddfe Prompt Engineering','','LLM / SFT \u5fae\u8c03',
'Agent \u5de5\u4f5c\u6d41\u8ba1\u8bbe\u8ba1','\ud83d\udcca \u6570\u636e\u5206\u6790',
'Python / FastAPI','SQL / Tableau','RAG \u5411\u91cf\u68c0\u7d22',
'\u4ece 0\u21921 \u7684\u521b\u9020\u8005',
['\ud83c\udfa4 GRE 322 \\u00b7 IELTS 7.5'],
].forEach(t=>{if(!t[1]&&t[0])h+=`<span style="padding:11px 30px;border-radius:30px;font-size:.95rem;font-weight:600;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);color:var(--al)">${t[0]}</span>`;
else if(!t[0]&&t[1])h+=`<span style="padding:11px 30px;border-radius:30px;font-size:.95rem;font-weight:600;background:rgba(13,148,136,.08);border:1px solid rgba(13,148,136,.25);color:var(--tl)">${t[1]}</span>`;
else if(t[0]==='\ud83e\uddfe')h+=`<span style="padding:8px 22px;border-radius:30px;font-size:.78rem;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);color:var(--al)")>${t[0]} ${t[1]}</span>`;
else h+=`<span style="padding:8px 22px;border-radius:30px;font-size:.78rem;background:${t[0]=='\ud83c\udfe9'?'rgba(245,158,11,.08)':'rgba(13,148,136,.08)'};border:1px solid ${t[0]=='\ud83c\udfe9'?`rgba(245,158,11,.25)`:`rgba(13,148,136,.25)`};color:${t[0]=='\ud83c\udfe9'?var(--al):t[0]=='\ud83c\udfa4'?var(--al):var(--tl)}">${t[0]}${t[1]?` ${t[1]}`:''}</span>`});
h+='</div>';
h+='<p class="rf qf" style="max-width:580px;margin:32px auto 0">"\u6211\u4e0d\u53ea\u505a\u5de5\u5177\u2014\u6211\u6784\u5efa\u662f\u300c\u7406\u89e3\u4f60\u300d\u7684\u7cfb\u7edf\u3002\u4ece\u6570\u636e\u6d1e\u89c1\u5230 AI \u4ea7\u54c1\uff0c\u4ece\u5206\u6790\u5e08\u5230\u5168\u6808\u5de5\u5e08\uff0c\u6211\u76f8\u4fe1\u6700\u597d\u7684\u4ea7\u54c1\u662f\u8ba9\u4eba\u7684\u601d\u60f3\u88ab\u66f4\u597d\u5730\u5448\u3002"</p>';
h+='<div class="si rv"><span>Scroll down</span><div class="sl"></div></div></div></section>';

// I'll skip the full body here and write a minimal working version that focuses on the key structure
// The file is getting too long for inline generation. Let me write it in parts.

// For now, let me just output the essential parts and complete the rest with a simpler approach
fs.writeFileSync('/Users/rlf/Desktop/code/codebuddy/voice-helper-portfolio/index.html', h);
console.log('Part 1 written: ' + (h.length/1024).toFixed(0) + ' KB');

// Continue building...
h='';

// Scene 2-5 will be added via append in the next step
// For now let's close what we have minimally
h+='</body></html>';
fs.appendFileSync('/Users/rlf/Desktop/code/codebuddy/voice-helper-portfolio/index.html', h);
console.log('Total: ' + (fs.statSync('/Users/rlf/Desktop/code/codebuddy/voice-helper-portfolio/index.html').size/1024).toFixed(0) + ' KB');
