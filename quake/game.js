// Browser controls and lifecycle. GPL-2.0. Modified 2026-10-09.
const Store = {
 memory: new Map(),
 getItem(key) { if(this.memory.has(key))return this.memory.get(key); try { return localStorage.getItem(key); } catch (_) { return null; } },
 setItem(key, value) { this.memory.set(key, String(value)); try { localStorage.setItem(key, String(value)); } catch (_) {} },
 removeItem(key) { this.memory.set(key,null); try { localStorage.removeItem(key); } catch (_) {} }
};
const Game = {
 pack: null, files: new Map(), active: false, paused: false, initialized: false,
 held: new Map(), touches: new Map(), drag: null, clickTimers: new Set(), sensitivity: .3,
 async load() {
  document.title=GAME_NAME; document.getElementById('game-name').textContent = GAME_NAME;
  const saved = Number(Store.getItem('drag-sensitivity'));
  if (saved >= .05 && saved <= 1.5) this.sensitivity = saved;
  try {
   const response = await fetch('id1/pak0.pak.gz', { credentials: 'omit' });
   if (!response.ok) throw Error('Files unavailable');
   const total = Number(response.headers.get('Content-Length')) || 8561906;
   const reader = response.body.getReader(); const chunks = []; let received = 0;
   for (;;) { const {done, value} = await reader.read(); if (done) break; chunks.push(value); received += value.length; document.getElementById('load-bar').value = received / total; }
   const bytes = new Uint8Array(received); let offset = 0;
   for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
   let unpacked;
   if(bytes[0]===0x1f && bytes[1]===0x8b) {
    if(typeof DecompressionStream==='function') {
     unpacked=new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
    } else unpacked=new Zlib.Gunzip(bytes).decompress();
   } else if(bytes[0]===80 && bytes[1]===65 && bytes[2]===67 && bytes[3]===75) unpacked=bytes;
   else throw Error('Files unavailable');
   if(unpacked.byteLength!==18689235) throw Error('Files unavailable');
   const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',unpacked)),n=>n.toString(16).padStart(2,'0')).join('');
   if(digest!=='35a9c55e5e5a284a159ad2a62e0e8def23d829561fe2f54eb402dbc0a9a946af') throw Error('Files unavailable');
   console.log('PACK_SHA256 '+digest);
   this.pack=unpacked.buffer.slice(unpacked.byteOffset,unpacked.byteOffset+unpacked.byteLength);
   const view = new DataView(this.pack);
   if (view.getUint32(0,true) !== 0x4b434150) throw Error('Files unavailable');
   const directory = view.getUint32(4,true), length = view.getUint32(8,true);
   if (length !== 339 * 64 || directory + length > unpacked.byteLength) throw Error('Files unavailable');
   for (let i = directory; i < directory + length; i += 64) {
    const raw = unpacked.subarray(i,i+56); const end = raw.indexOf(0);
    const name = new TextDecoder().decode(raw.subarray(0,end < 0 ? 56 : end)).toLowerCase();
    const filepos = view.getUint32(i+56,true), filelen = view.getUint32(i+60,true);
    if (filepos + filelen > unpacked.byteLength) throw Error('Files unavailable');
    this.files.set(name,{name,filepos,filelen});
   }
   document.getElementById('progress').hidden = true;
   document.getElementById('load-bar').hidden = true;
   document.getElementById('start').disabled = false;
  } catch (error) { this.fail('Files unavailable'); }
 },
 configure() {
  Object.assign(Key.bindings, {119:'+forward',115:'+back',97:'+moveleft',100:'+moveright',102:'+attack', [Key.k.ctrl]:'+attack', [Key.k.mouse2]:'+attack', [Key.k.space]:'+jump', [Key.k.uparrow]:'+forward', [Key.k.downarrow]:'+back', [Key.k.leftarrow]:'+left', [Key.k.rightarrow]:'+right', [Key.k.mwheelup]:'impulse 10', [Key.k.mwheeldown]:'impulse 12'});
  Cvar.SetValue('m_filter',0); Cvar.SetValue('sensitivity',this.sensitivity / CL.m_yaw.value);
  Cvar.SetValue('m_pitch',CL.m_yaw.value); Cvar.SetValue('lookstrafe',0);
  Cmd.text += '+mlook\n'; Cmd.Execute();
 },
 start() {
  if (!this.pack || this.active) return;
  try {
   if (!this.initialized) {
    try { S.unlockedContext = new (window.AudioContext || window.webkitAudioContext)(); S.unlockedContext.resume().catch(() => this.audioError()); } catch (_) { this.audioError(); }
    Sys.Init(); this.initialized = true;
   }
   this.active = true; this.paused = false; PR.acceptedShots = 0;
   if(S.context) S.context.resume().catch(()=>this.audioError());
   Host.oldrealtime=Host.realtime=Sys.FloatTime();
   document.body.classList.add('playing'); document.body.classList.remove('paused');
   Key.dest.value = Key.dest.game; M.state.value = M.state.none;
   this.configure(); Cmd.text += 'disconnect\nskill 1\nmap e1m1\n';
   this.loadingGame=true; document.getElementById('mainwindow').style.visibility='hidden';
   document.getElementById('start-screen').hidden = true;
   document.getElementById('hint').hidden = false;
   setTimeout(() => { document.getElementById('hint').hidden = true; },6000);
   document.getElementById('mainwindow').focus();
   this.last = performance.now(); this.tick();
  } catch (error) { if(!error.reported)this.fail('Game unavailable'); }
 },
 tick() {
  if (!this.active) return;
  if (!this.paused) { try { Host.Frame(); } catch (error) { this.fail('Game unavailable'); console.error(error); return; } }
  this.animation = requestAnimationFrame(() => this.tick());
 },
 input(key, down, owner) {
  if (down) {
   if (!this.held.has(key)) this.held.set(key,new Set());
   const owners = this.held.get(key); if (owners.has(owner)) return;
   if (!owners.size) Key.Event(key,true); owners.add(owner);
  } else {
   const owners = this.held.get(key); if (!owners) return; owners.delete(owner);
   if (!owners.size) { Key.Event(key); this.held.delete(key); }
  }
 },
 tap(key) { const owner = Symbol(); this.input(key,true,owner); const timer=setTimeout(() => { this.input(key,false,owner); this.clickTimers.delete(timer); },80); this.clickTimers.add(timer); },
 releaseAll() {
  if (!this.initialized && !Host.initialized) return;
  for (const key of this.held.keys()) Key.Event(key);
  this.held.clear(); for (const timer of this.clickTimers) clearTimeout(timer); this.clickTimers.clear();
  for (let i=0;i<256;i++) { if (Key.down[i]) Key.Event(i); Key.down[i]=false; }
  for (const button of CL.kbuttons || []) { if (button) { button.state=0; button.down=[0,0]; } }
  for(const [id,pointer] of this.touches) { if(pointer.element.hasPointerCapture(id))pointer.element.releasePointerCapture(id); }
  if(this.drag && document.getElementById('mainwindow').hasPointerCapture(this.drag.id))document.getElementById('mainwindow').releasePointerCapture(this.drag.id);
  this.touches.clear(); IN.touch_forward=IN.touch_side=0; document.getElementById('stick-thumb').style.transform='';
  this.endDrag(); IN.mouse_x=IN.mouse_y=IN.old_mouse_x=IN.old_mouse_y=0;
  Cmd.Execute();
 },
 endDrag() { this.drag=null; document.body.classList.remove('dragging'); },
 pause() {
  if (!this.active || this.paused) return;
  this.releaseAll(); this.paused=true; document.body.classList.add('paused');
  if (S.context) S.context.suspend().catch(()=>{});
  else for (const ch of [...S.channels,...S.static_channels,...S.ambient_channels]) if(ch.audio) ch.audio.pause();
  document.getElementById('paused').hidden=false;
 },
 resume() {
  if (!this.active || !this.paused) return;
  this.releaseAll(); this.paused=false; document.body.classList.remove('paused'); this.configure(); Host.oldrealtime=Sys.FloatTime(); Host.realtime=Host.oldrealtime;
  if (S.context) S.context.resume().catch(()=>this.audioError());
  document.getElementById('paused').hidden=true; document.getElementById('mainwindow').focus();
 },
 returnToStart() {
  this.releaseAll(); this.active=false; document.body.classList.remove('playing','paused'); cancelAnimationFrame(this.animation);
  CL.Disconnect(); S.StopAllSounds(); if(S.context) S.context.suspend().catch(()=>{});
  document.getElementById('start-screen').hidden=false; document.getElementById('paused').hidden=true;
  document.getElementById('hint').hidden=true; document.getElementById('start').focus();
 },
 audioError() { const e=document.getElementById('error'); e.textContent='Audio unavailable'; e.hidden=false; },
 playAudio(audio) { const promise=audio.play(); if(promise) promise.catch(()=>this.audioError()); },
 fail(text) { this.active=false; cancelAnimationFrame(this.animation); const e=document.getElementById('error'); e.textContent=text; e.hidden=false; },
 showTouch() { document.body.classList.add('touch'); },
 bindTouch() {
  const bind=(id,kind)=>{
   const element=document.getElementById(id);
   element.addEventListener('pointerdown',event=>{
    if(!this.active || this.paused || (kind==='look' && event.pointerType!=='touch')) return;
    event.preventDefault(); this.showTouch();
    if((kind==='stick'||kind==='look') && [...this.touches.values()].some(p=>p.kind===kind)) return;
    const pointer={kind,x:event.clientX,y:event.clientY,element};
    this.touches.set(event.pointerId,pointer); element.setPointerCapture(event.pointerId);
    if(kind==='stick') this.moveStick(event,pointer);
    if(kind==='fire') this.input(Key.k.ctrl,true,'touch:'+event.pointerId);
    if(kind==='jump') this.input(Key.k.space,true,'touch:'+event.pointerId);
    if(kind==='next') this.tap(Key.k.mwheelup);
    if(kind==='menu') this.tap(Key.k.escape);
   });
   element.addEventListener('pointermove',event=>{
    const pointer=this.touches.get(event.pointerId); if(!pointer || this.paused) return;
    event.preventDefault();
    if(pointer.kind==='stick') this.moveStick(event,pointer);
    if(pointer.kind==='look' && Key.dest.value===Key.dest.game) { IN.mouse_x+=event.clientX-pointer.x; IN.mouse_y+=event.clientY-pointer.y; pointer.x=event.clientX; pointer.y=event.clientY; }
   });
   const release=event=>{
    const pointer=this.touches.get(event.pointerId); if(!pointer) return;
    if(pointer.kind==='stick') { IN.touch_forward=IN.touch_side=0; document.getElementById('stick-thumb').style.transform=''; }
    if(pointer.kind==='fire') this.input(Key.k.ctrl,false,'touch:'+event.pointerId);
    if(pointer.kind==='jump') this.input(Key.k.space,false,'touch:'+event.pointerId);
    this.touches.delete(event.pointerId);
    if(element.hasPointerCapture(event.pointerId))element.releasePointerCapture(event.pointerId);
   };
   for(const event of ['pointerup','pointercancel','lostpointercapture']) element.addEventListener(event,release);
  };
  bind('stick','stick'); bind('look-zone','look'); bind('touch-fire','fire'); bind('touch-jump','jump'); bind('touch-next','next'); bind('touch-menu','menu');
 },
 moveStick(event,pointer) {
  const box=pointer.element.getBoundingClientRect(), radius=box.width*.4;
  let dx=(event.clientX-(box.left+box.width/2))/radius, dy=(event.clientY-(box.top+box.height/2))/radius;
  const magnitude=Math.hypot(dx,dy); if(magnitude>1) { dx/=magnitude; dy/=magnitude; }
  IN.touch_forward=Math.abs(dy)<.12?0:-dy; IN.touch_side=Math.abs(dx)<.12?0:dx;
  document.getElementById('stick-thumb').style.transform=`translate(${dx*radius*.65}px,${dy*radius*.65}px)`;
 },
 bindInputs() {
  const canvas=document.getElementById('mainwindow');
  const mouseTargets=[canvas,document.getElementById('look-zone')];
  const onMouse=(name,handler,options)=>mouseTargets.forEach(target=>target.addEventListener(name,handler,options));
  onMouse('pointerdown',e=>{
   if (e.pointerType==='touch' || !this.active || this.paused) return;
   canvas.focus(); e.preventDefault(); canvas.setPointerCapture(e.pointerId);
   if(e.button===0) { this.drag={id:e.pointerId,x:e.clientX,y:e.clientY,travel:0,time:performance.now()}; document.body.classList.add('dragging'); }
   if(e.button===2) this.input(Key.k.mouse2,true,'mouse');
  });
  onMouse('pointermove',e=>{
   if(e.pointerType==='touch') return;
   if(this.active && !this.paused) this.input(Key.k.mouse2,!!(e.buttons&2),'mouse');
   const d=this.drag; if(!d || e.pointerId!==d.id) return;
   const dx=e.clientX-d.x,dy=e.clientY-d.y; d.x=e.clientX; d.y=e.clientY; d.travel+=Math.hypot(dx,dy);
   if (this.active && !this.paused && Key.dest.value===Key.dest.game) { IN.mouse_x+=dx; IN.mouse_y+=dy; }
  });
  onMouse('pointerup',e=>{
   const d=this.drag;
   if(e.button===0 && d && e.pointerId===d.id) { if(d.travel<6 && performance.now()-d.time<250) this.tap(Key.k.ctrl); this.endDrag(); }
   if(e.button===2) this.input(Key.k.mouse2,false,'mouse');
   if(e.buttons===0 && canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  });
  for(const event of ['pointercancel','lostpointercapture']) onMouse(event,()=>{this.endDrag(); this.input(Key.k.mouse2,false,'mouse');});
  onMouse('mousedown',e=>{if(e.button===2 && this.active && !this.paused)this.input(Key.k.mouse2,true,'mouse');});
  window.addEventListener('mouseup',e=>{if(e.button===2)this.input(Key.k.mouse2,false,'mouse');});
  this.bindTouch();
  onMouse('wheel',e=>{e.preventDefault(); this.tap(e.deltaY<0?Key.k.mwheelup:Key.k.mwheeldown);},{passive:false});
 }
};
document.getElementById('start').addEventListener('click',()=>Game.start());
document.getElementById('paused').addEventListener('click',()=>Game.resume());
window.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')Game.showTouch();if(Game.paused){e.preventDefault();e.stopImmediatePropagation();Game.resume();}},{capture:true});
if(new URLSearchParams(location.search).get('touch')==='1')Game.showTouch();
window.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('keydown',e=>{
 if(!Game.active) { if(e.code==='Enter') { e.preventDefault(); Game.start(); } return; }
 if(Game.paused) return;
 if(e.code==='KeyT') { if(!e.repeat)Game.showTouch(); e.preventDefault(); return; }
 if(e.code==='BracketLeft'||e.code==='BracketRight') {
  if(!e.repeat) { Game.sensitivity=Math.max(.05,Math.min(1.5,Game.sensitivity*(e.code==='BracketRight'?1.1:1/1.1))); Cvar.SetValue('sensitivity',Game.sensitivity/CL.m_yaw.value); Store.setItem('drag-sensitivity',Game.sensitivity); } e.preventDefault(); return;
 }
 const key=Sys.scantokey[e.keyCode]; if(key!=null) { e.preventDefault(); if(!e.repeat) Game.input(key,true,'keyboard:'+e.code); }
});
window.addEventListener('keyup',e=>{ if(!Game.initialized) return; const key=Sys.scantokey[e.keyCode]; if(key!=null) { e.preventDefault(); Game.input(key,false,'keyboard:'+e.code); } });
window.addEventListener('blur',()=>Game.pause());
document.addEventListener('visibilitychange',()=>{if(document.hidden) Game.pause();});
if(new URLSearchParams(location.search).get('proof')==='1') {
 window.__proof=Object.freeze({state() {
  const client=typeof SV!=='undefined' && SV.svs && SV.svs.clients && SV.svs.clients[0];
  const ent=client && client.edict, v=ent && ent.v_float;
  const angles=typeof CL!=='undefined' && CL.state && CL.state.viewangles || [0,0,0];
  return { ready:!!(SV.server && SV.server.active && CL.cls.signon===4), map:v?PR.GetString(PR.globals_int[PR.globalvars.mapname]):'', frame:typeof Host!=='undefined'?Host.framecount:0,
   pos:v?Array.from(v.subarray(PR.entvars.origin,PR.entvars.origin+3)):[0,0,0], yaw:angles[1],pitch:angles[0],health:v?v[PR.entvars.health]:0,
   ammo:v?(v[PR.entvars.weapon]===4096?null:v[PR.entvars.currentammo]):null,shots:typeof PR!=='undefined'?PR.acceptedShots:0,lock_calls:window.__lockCalls || 0 };
 }});
}
