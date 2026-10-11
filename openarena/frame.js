// GPL-2.0. Page shell using the official ioquake3 Emscripten module.
const canvas = document.querySelector('#canvas');
const start = document.querySelector('#start');
const status = document.querySelector('#status');
let engine, active = false, arena = 0, started = false;
const held = new Map(), pointers = new Map();
const play = window.play = {ready:false, state:() => engine ? JSON.parse(engine.UTF8ToString(engine._play_state())) : {ready:false}};
function dimensions() {
  const w = Math.min(innerWidth, innerHeight * 16 / 9), h = w * 9 / 16;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  if(canvas.style.width!==`${w}px`) canvas.style.width = `${w}px`;
  if(canvas.style.height!==`${h}px`) canvas.style.height = `${h}px`;
  return [Math.max(320, Math.round(w*dpr)), Math.max(180, Math.round(h*dpr))];
}
function input(kind, a, b) {
  if (!active) return;
  if (kind === 'key') engine._play_key(a, Number(b));
  if (kind === 'mouse') engine._play_mouse(Math.round(a), Math.round(b));
}
function key(code, down, owner) {
  if (!held.has(code)) held.set(code, new Set());
  const owners=held.get(code);
  if(down) {if (!owners.size) input('key',code,true); owners.add(owner);}
  else {owners.delete(owner); if(!owners.size) {input('key',code,false); held.delete(code);}}
}
function release() {
  for(const code of held.keys()) input('key',code,false);
  held.clear(); pointers.clear(); document.querySelector('#move span').style.transform='';
}
const keys={KeyW:119,KeyS:115,KeyA:97,KeyD:100,KeyF:102,KeyE:101,Space:32,ArrowUp:119,ArrowDown:115,ArrowLeft:97,ArrowRight:100};
for(const name of ['keydown','keyup']) window.addEventListener(name,e=>{
  if(!active) return;
  // Keep SDL isolated without cancelling native focus or control activation.
  e.stopImmediatePropagation();
  if(e.target !== canvas || !keys[e.code]) return;
  e.preventDefault();
  if(!e.repeat) key(keys[e.code],name==='keydown',`keyboard:${e.code}`);
},true);
// SDL keypress cancellation must not swallow native Enter button clicks.
window.addEventListener('keypress',e=>{if(active)e.stopImmediatePropagation();},true);
function move(e,p) {
  const dx=e.clientX-p.x,dy=e.clientY-p.y,owner=`move:${e.pointerId}`;
  for(const [code,on] of [[97,dx<-12],[100,dx>12],[119,dy<-12],[115,dy>12]]) key(code,on,owner);
  const thumb=document.querySelector('#move span');thumb.style.transform=`translate(${Math.max(-28,Math.min(28,dx))}px,${Math.max(-28,Math.min(28,dy))}px)`;
}
function bind(element,kind,code) {
  element.addEventListener('pointerdown',e=>{
    if(!active) return; e.preventDefault(); e.stopImmediatePropagation();
    const p={kind,x:e.clientX,y:e.clientY,code,element}; pointers.set(e.pointerId,p); element.setPointerCapture(e.pointerId); canvas.focus();
    if(code) key(code,true,`pointer:${e.pointerId}`);
  });
  element.addEventListener('pointermove',e=>{
    const p=pointers.get(e.pointerId); if(!p) return; e.preventDefault(); e.stopImmediatePropagation();
    if(p.kind==='move') move(e,p);
    if(p.kind==='look') {input('mouse',e.clientX-p.x,e.clientY-p.y);p.x=e.clientX;p.y=e.clientY;}
  });
  const up=e=>{const p=pointers.get(e.pointerId);if(!p)return;
    if(p.code) key(p.code,false,`pointer:${e.pointerId}`);
    if(p.kind==='move') {for(const code of [97,100,119,115])key(code,false,`move:${e.pointerId}`);document.querySelector('#move span').style.transform='';}
    pointers.delete(e.pointerId);if(element.hasPointerCapture(e.pointerId))element.releasePointerCapture(e.pointerId);
  };
  for(const event of ['pointerup','pointercancel','lostpointercapture'])element.addEventListener(event,up);
}
bind(canvas,'look');bind(document.querySelector('#look'),'look');bind(document.querySelector('#move'),'move');
bind(document.querySelector('#fire'),'key',102);bind(document.querySelector('#jump'),'key',32);bind(document.querySelector('#weapon'),'key',101);
// Native Enter/Space clicks activate the focused action, never a canvas jump.
for(const [id,code] of [['fire',102],['jump',32],['weapon',101]]) {
  document.getElementById(id).addEventListener('click',e=>{
    if(!active || e.detail !== 0) return;
    const owner=`button:${id}`;
    key(code,true,owner);setTimeout(()=>key(code,false,owner),150);
  });
}
canvas.addEventListener('blur',release);
window.addEventListener('blur',release);document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
document.querySelector('#arena').addEventListener('click',()=>{if(active){release();arena=(arena+1)%3;engine._play_arena(arena);}});
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const [w,h]=dimensions();if(engine)engine._play_resize(w,h);else{canvas.width=w;canvas.height=h;}},150);});
const [initialWidth,initialHeight]=dimensions();canvas.width=initialWidth;canvas.height=initialHeight;
// SDL sets CSS dimensions during renderer restarts. The frame owns its fitted CSS size.
new MutationObserver(dimensions).observe(canvas,{attributes:true,attributeFilter:['style']});
async function launch() {
  if(started)return;started=true;start.disabled=true;status.textContent='Loading arena';
  // START_POINTER_LOCK_MUTATION
  try {
    const [{default:create},wasm,data]=await Promise.all([
      import('./ioquake3.js'),fetch('./ioquake3.wasm',{credentials:'omit'}).then(r=>{if(!r.ok)throw Error('Engine unavailable');return r.arrayBuffer();}),
      fetch('./baseoa/play.pk3',{credentials:'omit'}).then(r=>{if(!r.ok)throw Error('Data unavailable');return r.arrayBuffer();})]);
    const [width,height]=dimensions();
    const config='unbindall\nbind w +forward\nbind s +back\nbind a +moveleft\nbind d +moveright\nbind f +attack\nbind SPACE +moveup\nbind e weapnext\nseta sensitivity 8\nseta m_filter 0\nseta cl_freelook 1\nseta model sarge/default\nseta name Player\n';
    engine=await create({canvas,wasmBinary:wasm,locateFile:f=>`./${f}`,
      arguments:['+set','com_basegame','baseoa','+set','fs_homepath','/home/web','+set','net_enabled','0','+set','sv_pure','0','+set','in_mouse','0','+set','r_fullscreen','0','+set','r_mode','-1','+set','r_customwidth',String(width),'+set','r_customheight',String(height),'+set','r_ext_compressed_textures','0','+set','r_picmip','1','+set','r_shadowFilter','0','+set','r_shadowCascadeZFar','0','+set','r_normalMapping','0','+set','r_specularMapping','0','+set','com_maxfps','60','+set','vm_game','0','+set','vm_cgame','0','+set','vm_ui','0','+set','bot_enable','1','+set','bot_minplayers','0','+set','g_spSkill','1','+set','g_gametype','0','+set','g_elimination','1','+set','fraglimit','20','+exec','play.cfg','+map','oa_dm1','+addbot','Sarge','1','+addbot','Andriy','1'],
      preRun:[m=>{m.FS.mkdirTree('/baseoa');m.FS.mkdirTree('/home/web');m.FS.writeFile('/baseoa/play.pk3',new Uint8Array(data));m.FS.writeFile('/baseoa/play.cfg',config);}],
      print:line=>console.log(line),printErr:line=>console.error(line)});
    const [latestWidth,latestHeight]=dimensions();if(canvas.width!==latestWidth || canvas.height!==latestHeight)engine._play_resize(latestWidth,latestHeight);
    active=true;document.querySelector('#start-screen').hidden=true;document.querySelector('#controls').hidden=false;canvas.focus();
    const timer=setInterval(()=>{if(play.state().ready){play.ready=true;clearInterval(timer);}},100);
  } catch(error) {console.error(error);status.textContent='Game unavailable';start.disabled=false;started=false;}
}
start.addEventListener('click',launch);
