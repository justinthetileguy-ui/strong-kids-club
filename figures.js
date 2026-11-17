// Original animated stick-figure SVGs (no external assets). Joints: H N P K1 F1 K2 F2 E1 W1 E2 W2
const J="H N P K1 F1 K2 F2 E1 W1 E2 W2".split(" ");
const mk=a=>{const o={};J.forEach((k,i)=>o[k]=a[i]);return o};
const sh=(p,dx,dy,skip=[])=>{const o={};for(const k in p)o[k]=skip.includes(k)?p[k]:[p[k][0]+dx,p[k][1]+dy];return o};
const mir=p=>{const o={};for(const k in p)o[k]=[100-p[k][0],p[k][1]];return o};
const STAND=mk([[50,18],[50,28],[50,55],[46,72],[44,90],[54,72],[56,90],[42,42],[40,55],[58,42],[60,55]]);
const SQUAT=mk([[42,38],[45,47],[60,67],[44,69],[46,90],[48,71],[54,90],[34,50],[22,49],[36,52],[24,52]]);
const HIPS=mk([[50,18],[50,28],[50,55],[46,72],[44,90],[54,72],[56,90],[42,44],[46,56],[58,44],[54,56]]);
const SKA=mk([[34,30],[38,38],[44,60],[40,74],[42,90],[54,72],[64,84],[48,46],[58,52],[30,46],[22,54]]);
const TW=mk([[50,18],[50,28],[50,55],[44,72],[38,90],[56,72],[62,90],[40,38],[26,38],[44,42],[30,40]]);
const ONE=mk([[50,18],[50,28],[50,55],[48,72],[48,88],[58,66],[56,78],[42,42],[36,52],[58,42],[64,52]]);
const PU=mk([[22,58],[30,62],[60,72],[72,80],[86,88],[72,80],[86,88],[30,76],[30,89],[31,76],[31,89]]);
const MC=mk([[22,58],[30,62],[58,70],[46,76],[58,88],[72,80],[86,88],[30,76],[30,89],[31,76],[31,89]]);
const POSES={
squat:[STAND,SQUAT],
pushup:[PU,mk([[22,77],[30,80],[60,83],[72,85],[86,88],[72,85],[86,88],[42,78],[30,89],[43,78],[31,89]])],
lunge:[HIPS,mk([[50,30],[50,40],[50,64],[36,70],[34,90],[58,80],[70,90],[42,54],[46,66],[58,54],[54,66]])],
bridge:[mk([[14,82],[22,86],[54,88],[68,70],[78,89],[68,70],[78,89],[34,88],[44,89],[34,88],[44,89]]),mk([[14,82],[22,86],[54,70],[68,64],[78,89],[68,64],[78,89],[34,88],[44,89],[34,88],[44,89]])],
plank:[mk([[22,73],[30,76],[58,78],[72,82],[86,88],[72,82],[86,88],[30,89],[18,89],[31,89],[19,89]]),mk([[22,72],[30,75],[58,76],[72,81],[86,88],[72,81],[86,88],[30,89],[18,89],[31,89],[19,89]])],
deadbug:[mk([[14,82],[22,85],[52,87],[52,66],[68,66],[53,66],[69,66],[22,72],[22,58],[23,72],[23,58]]),mk([[14,82],[22,85],[52,87],[68,80],[86,82],[53,66],[69,66],[22,72],[22,58],[14,76],[4,72]])],
bear:[mk([[22,60],[30,64],[62,62],[66,80],[78,89],[70,80],[82,89],[30,77],[30,89],[34,77],[36,89]]),mk([[24,60],[32,64],[64,62],[62,80],[72,89],[70,80],[82,89],[36,77],[40,89],[34,77],[36,89]])],
row:[mk([[25,66],[32,68],[58,78],[70,68],[82,89],[70,68],[82,89],[32,56],[32,42],[33,56],[33,42]]),mk([[24,48],[32,52],[58,68],[70,60],[82,89],[70,60],[82,89],[46,52],[32,42],[47,52],[33,42]])],
hang:[mk([[50,24],[50,32],[50,58],[47,74],[46,88],[53,74],[54,88],[45,20],[44,10],[55,20],[56,10]]),null],
jump:[SQUAT,sh(mk([[50,14],[50,24],[50,52],[47,70],[45,86],[53,70],[55,86],[42,14],[38,4],[58,14],[62,4]]),0,-6)],
skater:[SKA,mir(SKA)],
medthrow:[TW,mir(TW)],
calf:[ONE,sh(ONE,0,-4)],
mountain:[MC,(()=>{const p={...MC};p.K1=[72,80];p.F1=[86,88];p.K2=[46,76];p.F2=[58,88];return p})()]};
POSES.hang[1]=sh(POSES.hang[0],0,-4,["W1","W2"]);
const BONES=[["N","P"],["P","K1"],["K1","F1"],["P","K2"],["K2","F2"],["N","E1"],["E1","W1"],["N","E2"],["E2","W2"]];
const PROPS={row:'<line x1="20" y1="42" x2="48" y2="42" stroke="#8d5524" stroke-width="3"/><line x1="22" y1="42" x2="22" y2="90" stroke="#8d5524" stroke-width="2"/>',hang:'<line x1="28" y1="10" x2="72" y2="10" stroke="#555" stroke-width="3"/>'};
function figureSVG(id,size){const [a,b]=POSES[id]||POSES.squat,dur=id==="plank"?"3s":"2s";
 const an=(attr,v1,v2)=>`<animate attributeName="${attr}" values="${v1};${v2};${v1}" dur="${dur}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>`;
 const line=([s,e],i)=>`<line x1="${a[s][0]}" y1="${a[s][1]}" x2="${a[e][0]}" y2="${a[e][1]}" stroke="${i>4?"#ff6b35":i>2?"#136f63":"#1b998b"}" stroke-width="5" stroke-linecap="round">${an("x1",a[s][0],b[s][0])}${an("y1",a[s][1],b[s][1])}${an("x2",a[e][0],b[e][0])}${an("y2",a[e][1],b[e][1])}</line>`;
 return `<svg class="fig" viewBox="0 0 100 100" width="${size||120}" height="${size||120}" role="img" aria-label="${id} animation"><rect width="100" height="100" rx="14" fill="#e8f6f4"/><line x1="4" y1="91" x2="96" y2="91" stroke="#c9b28a" stroke-width="2"/>${PROPS[id]||""}${BONES.map(line).join("")}<circle cx="${a.H[0]}" cy="${a.H[1]}" r="7" fill="#f7c548" stroke="#2d3047" stroke-width="2">${an("cx",a.H[0],b.H[0])}${an("cy",a.H[1],b.H[1])}</circle></svg>`}
const reduceMotion=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function initFigs(root){(root||document).querySelectorAll("svg.fig").forEach(s=>{if(reduceMotion()&&s.pauseAnimations){s.pauseAnimations();s.setCurrentTime&&s.setCurrentTime(0.9)}})}
function toggleFig(btn){const s=btn.parentElement.querySelector("svg.fig");if(!s)return;if(s.animationsPaused()){s.unpauseAnimations();btn.textContent="⏸ Pause"}else{s.pauseAnimations();btn.textContent="▶ Play"}}
function figBlock(x,size){return `<div class="figwrap">${figureSVG(x.id,size)}<button class="mini" onclick="toggleFig(this)">${reduceMotion()?"▶ Play":"⏸ Pause"}</button>${("speechSynthesis" in window)?`<button class="mini" onclick="speakEx('${x.id}')">🔊 Listen</button><button class="mini" onclick="speechSynthesis.cancel()">⏹ Stop</button>`:""}${x.videoUrl?`<button class="mini" onclick="watchVideo('${x.id}')">🎬 Watch video</button>`:""}</div>`}
function watchVideo(id){const x=EX.find(e=>e.id===id),u=x.videoUrl,yt=/youtube\.com|youtu\.be/.test(u);const ov=document.createElement("div");ov.className="overlay";ov.innerHTML=`<div class="modal"><h2>${x.e} ${x.name}</h2>${yt?`<iframe width="100%" height="260" src="${u}" allowfullscreen frameborder="0"></iframe>`:`<video src="${u}" controls style="width:100%"></video>`}<p><button class="btn" onclick="this.closest('.overlay').remove()">Close</button></p></div>`;document.body.appendChild(ov)}

function speakEx(id){if(!("speechSynthesis" in window))return;const x=EX.find(e=>e.id===id);speechSynthesis.cancel();let intro="";
 if(typeof profile!=="undefined"&&profile){const g=x.g.filter(k=>profile.goals.includes(k)).map(k=>GOALS[k].replace(/^[^A-Za-z]+/,"").toLowerCase());
  if(g.length)intro=`This one helps your ${g.join(" and ")}. `;if(x.s.includes(profile.sport))intro+=`It's great for ${profile.sport.replace("/"," and ")}. `}
 const u=new SpeechSynthesisUtterance(`${x.name}. ${intro}${x.voice}`);u.rate=0.95;u.pitch=1.15;speechSynthesis.speak(u)}
