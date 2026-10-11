/* GPL-2.0. Adapted 2026-10-11 for the static Play frame and local touch controls. */
const canvas = document.getElementById('canvas');
const board = document.getElementById('board');
const display = board.getContext('2d');
const status = document.getElementById('status');
const start = document.getElementById('start');
let resolveStart;
window.startRequested = new Promise(resolve => { resolveStart = resolve; });
window.runtimeReady = () => { status.textContent = 'Ready'; start.disabled = false; };
window.gameFailed = error => { status.textContent = 'Game failed: ' + error.message + '. Choose New game to retry.'; start.disabled = true; document.getElementById('menu').hidden = false; console.error(error); };
window.gameEnded = () => { status.textContent = 'Round finished. Choose New game to play again.'; document.getElementById('menu').hidden = false; start.disabled = true; };
window._webwars_roundFinished = window.gameEnded;
start.addEventListener('click', () => { canvas.focus(); resolveStart(); });
document.getElementById('restart').addEventListener('click', () => location.reload());
const controls = document.getElementById('controls');
document.getElementById('more').addEventListener('click', () => { releaseAll(); controls.hidden = !controls.hidden; });
document.getElementById('close').addEventListener('click', () => { controls.hidden = true; canvas.focus(); });
const keyCodes = {ArrowLeft:37, ArrowRight:39, ArrowUp:38, ArrowDown:40, Enter:13,
  Backspace:8, Space:32, ShiftLeft:16, Tab:9, Escape:27};
Object.assign(keyCodes, {Home:36, Delete:46, Backquote:192, Numpad8:104, Numpad6:102, Numpad4:100, Numpad2:98});
const held = new Map();
function keyEvent(code, down) {
  const keyCode = keyCodes[code] || (code.startsWith('Key') ? code.charCodeAt(3) :
    code.startsWith('Digit') ? code.charCodeAt(5) : 111 + Number(code.slice(1)));
  canvas.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup',
    {code, key:code === 'Space' ? ' ' : code, keyCode, which:keyCode, location:code.startsWith('Numpad') ? 3 : 0, bubbles:true}));
}
function releaseAll() { for (const code of held.values()) keyEvent(code, false); held.clear(); }
function bindButton(button) {
  button.addEventListener('pointerdown', event => {
    event.preventDefault(); canvas.focus(); button.setPointerCapture(event.pointerId);
    if (button.dataset.key) { held.set(event.pointerId, button.dataset.key); keyEvent(button.dataset.key, true); }
    else mouse(Number(button.dataset.mouse), true, canvas.width / 2, canvas.height / 2);
  });
  const up = event => {
    if (held.has(event.pointerId)) { keyEvent(held.get(event.pointerId), false); held.delete(event.pointerId); }
    else if (button.dataset.mouse) mouse(Number(button.dataset.mouse), false, canvas.width / 2, canvas.height / 2);
  };
  button.addEventListener('pointerup', up); button.addEventListener('pointercancel', up);
  button.addEventListener('lostpointercapture', up);
}
const extra = document.getElementById('extra');
const actions = [['ArrowLeft','Left'],['ArrowRight','Right'],['ArrowUp','Aim up'],['ArrowDown','Aim down'],['Space','Fire'],
  ['Backspace','High jump'],['ShiftLeft','Precise'],['Tab','Switch hog'],['KeyH','Find hog'],
  ['KeyM','Mission'],['KeyF','Fast forward'],['KeyN','Timer up'],['KeyY','Confirm'],['Escape','Quit'],
  ['Home','Hog tags'],['Delete','Team bars'],['Backquote','History'],['KeyO','Gear information'],
  ['Numpad8','Cursor up'],['Numpad6','Cursor right'],['Numpad4','Cursor left'],['Numpad2','Cursor down'],
  ['Digit0','Volume up'],['Digit9','Volume down'],['Digit8','Mute']];
for (let i = 1; i <= 10; i++) actions.push(['F' + i, 'Weapon ' + i]);
for (let i = 1; i <= 5; i++) actions.push(['Digit' + i, 'Timer ' + i]);
for (const [code,label] of actions) { const b = document.createElement('button'); b.dataset.key = code; b.textContent = label; extra.append(b); }
for (const [label,delta] of [['Zoom in',1],['Zoom out',-1]]) {
  const b = document.createElement('button'); b.textContent = label;
  b.addEventListener('click', () => canvas.dispatchEvent(new WheelEvent('wheel', {deltaY:-delta * 100, bubbles:true}))); extra.append(b);
}
const reset = document.createElement('button'); reset.textContent = 'Reset zoom'; reset.dataset.mouse = '1'; extra.append(reset);
document.querySelectorAll('[data-key],[data-mouse]').forEach(bindButton);
function mouse(button,down,x,y) {
  const r = canvas.getBoundingClientRect();
  canvas.dispatchEvent(new MouseEvent(down ? 'mousedown' : 'mouseup', {button,
    buttons:down ? (button === 2 ? 2 : 1) : 0, clientX:r.left + x * r.width / canvas.width,
    clientY:r.top + y * r.height / canvas.height, bubbles:true}));
}
// SDL sees only mapped native mouse events, never its automatic touch click.
for (const target of [board,canvas]) for (const type of ['touchstart','touchmove','touchend','touchcancel'])
  target.addEventListener(type,e => { e.preventDefault(); e.stopImmediatePropagation(); },{capture:true,passive:false});
function point(e) { const r = board.getBoundingClientRect(); return {x:(e.clientX-r.left)*1024/r.width,y:(e.clientY-r.top)*768/r.height}; }
function motion(p) { const r = canvas.getBoundingClientRect(); canvas.dispatchEvent(new MouseEvent('mousemove',{clientX:r.left+p.x,clientY:r.top+p.y,bubbles:true})); }
let touchPoint;
board.addEventListener('pointerdown', e => {
  e.preventDefault(); canvas.focus(); board.setPointerCapture(e.pointerId); const p = point(e); motion(p);
  if (e.pointerType === 'touch') touchPoint = {...p,moved:false,started:performance.now()};
  else mouse(e.button,true,p.x,p.y);
});
board.addEventListener('pointermove', e => {
  e.preventDefault(); const p = point(e); motion(p);
  if (touchPoint && Math.abs(p.x-touchPoint.x)+Math.abs(p.y-touchPoint.y)>6) touchPoint.moved = true;
});
board.addEventListener('pointerup', async e => {
  e.preventDefault(); const p = point(e);
  if (e.pointerType !== 'touch') { mouse(e.button,false,p.x,p.y); return; }
  const gesture = touchPoint; touchPoint = null;
  if (gesture && !gesture.moved) {
    // Native motion is applied during rendering, before /put reads the cursor.
    await new Promise(resolve => setTimeout(resolve,Math.max(0,50-(performance.now()-gesture.started))));
    mouse(0,true,p.x,p.y); mouse(0,false,p.x,p.y);
  }
});
board.addEventListener('pointercancel', () => { touchPoint = null; });
board.addEventListener('contextmenu', e => e.preventDefault());
board.addEventListener('wheel', e => { e.preventDefault(); canvas.dispatchEvent(new WheelEvent('wheel',{deltaY:e.deltaY,bubbles:true})); },{passive:false});
window.addEventListener('blur', releaseAll);
for (const type of ['keydown','keyup']) window.addEventListener(type, e => {
  if (['F12','KeyT','KeyU','KeyC','KeyR'].includes(e.code)) { e.preventDefault(); e.stopImmediatePropagation(); }
}, true);
document.addEventListener('keydown', e => { if (!document.getElementById('menu').hidden || !controls.hidden) return;
  if (e.code in keyCodes || e.code.startsWith('F') || e.code.startsWith('Digit')) e.preventDefault(); });
const gl = canvas.getContext('webgl2', {alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:true});
function resize() {
  const availableHeight = Math.max(1, innerHeight - document.getElementById('touch').getBoundingClientRect().height - 8);
  const width = Math.min(innerWidth, availableHeight * 4/3), height = width * 3/4;
  for (const c of [board]) {
    if (c.style.width !== width + 'px') c.style.width = width + 'px';
    if (c.style.height !== height + 'px') c.style.height = height + 'px';
    if (c.style.top !== availableHeight / 2 + 'px') c.style.top = availableHeight / 2 + 'px';
  }
  const dpr = Math.min(devicePixelRatio || 1, 2);
  board.width = Math.round(width * dpr); board.height = Math.round(height * dpr);
}
window.addEventListener('resize', resize); resize();
new MutationObserver(resize).observe(canvas, {attributes:true,attributeFilter:['style']});
function present() { if (canvas.width && canvas.height) display.drawImage(canvas,0,0,board.width,board.height); requestAnimationFrame(present); }
requestAnimationFrame(present);
var Module = {canvas, preinitializedWebGLContext:gl, elementPointerLock:false,
  locateFile:path => path, print:text => console.log(text), printErr:text => console.error(text),
  onAbort:reason => window.gameFailed(new Error(String(reason))),
  postRun:[resize], setStatus:text => { if (text) status.textContent = text; }};
async function load() {
  if (!gl) throw new Error('This browser needs WebGL 2 to play Hedgewars.');
  if (!WebAssembly.Suspending) throw new Error('This browser needs WebAssembly promise integration to play Hedgewars.');
  const [manifest,bytes,observer] = await Promise.all([fetch('data.json',{credentials:'omit'}).then(r => r.json()),
    fetch('game.data',{credentials:'omit'}).then(r => r.arrayBuffer()),
    fetch('observer.lua',{credentials:'omit'}).then(r => r.text())]);
  window.gameData = {files:manifest.files,bytes:new Uint8Array(bytes),observer};
  for (const src of ['bridge.js','hwengine.js']) await new Promise((resolve,reject) => {
    const script = document.createElement('script'); script.src = src; script.onload = resolve; script.onerror = reject; document.body.append(script);
  });
}
load().catch(window.gameFailed);
