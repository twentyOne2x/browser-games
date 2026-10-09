'use strict';
(() => {
const canvas = document.getElementById('canvas');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const startButton = document.getElementById('start');
const hint = document.getElementById('hint');
const params = new URLSearchParams(location.search);
document.getElementById('game-name').textContent = GAME_NAME;
canvas.setAttribute('aria-label', GAME_NAME);
document.getElementById('legal').href = 'legal/index.html' + location.search;
let loaded = false, running = false, paused = false, started = false;
let audioUnavailable = false;
let drag = null, hintTimer = 0, pulseTimer = 0;
let sensitivity = .3;
try {
  const stored = Number(localStorage.getItem('freedoom-sensitivity'));
  if (stored >= .05 && stored <= 1.5) sensitivity = stored;
} catch {}
const held = new Map();
const keyCodes = { KeyW: 119, KeyA: 97, KeyS: 115, KeyD: 100,
  ArrowUp: 173, ArrowDown: 175, ArrowLeft: 172, ArrowRight: 174,
  KeyF: 157, ControlLeft: 157, ControlRight: 157, KeyE: 32, Space: 32,
  Escape: 27, Enter: 13, Backspace: 127, ShiftLeft: 182, ShiftRight: 182,
  KeyY: 121, KeyN: 110 };
for (let i = 0; i <= 9; ++i) keyCodes['Digit' + i] = 48 + i;
for (let i = 65; i <= 90; ++i) if (keyCodes['Key' + String.fromCharCode(i)] === undefined) keyCodes['Key' + String.fromCharCode(i)] = i + 32;
const Module = window.Module = {
  canvas, noInitialRun: true,
  print: text => console.log(text),
  printErr: text => {
    console.warn(text);
    if (/SDL_CreateRenderer|SDL_CreateWindow|Could not initialize video|Failed to create.*context/i.test(text)) showStatus('GRAPHICS UNAVAILABLE');
    if (/Failed.*audio|audio.*failed/i.test(text)) showStatus('AUDIO UNAVAILABLE');
  },
  locateFile: name => name,
  onAbort: () => showStatus('LOAD FAILED'),
  onExit: code => { if (code) showStatus('LOAD FAILED'); },
  onReturnToStart: () => {
    releaseAll(); pauseEngine(true); running = false;
    startScreen.hidden = false; pauseScreen.hidden = true; hint.hidden = true;
    touchControls.hidden = true;
  },
  onRuntimeInitialized: () => {
    Module.FS.writeFile('/freedoom1.wad', wadBytes);
    loaded = true; startButton.disabled = false; startButton.textContent = 'START';
    document.getElementById('loading').hidden = true;
  }
};
let wadBytes;
const touchControls = document.getElementById('touch-controls');
const stick = document.getElementById('stick');
const stickThumb = document.getElementById('stick-thumb');
const touchPointers = new Map();
let touchEnabled = params.get('touch') === '1';
function showTouch() {
  touchEnabled = true;
  touchControls.hidden = !running || paused;
}
document.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') showTouch();
}, true);
function showStatus(text) {
  const status = document.getElementById('status');
  status.textContent = text; status.hidden = false;
}
function resize() {
  const width = innerWidth, height = innerHeight;
  const scale = Math.min(width / 4, height / 3);
  if (started) Module._Browser_Resize(Math.floor(scale * 4), Math.floor(scale * 3));
  canvas.style.width = `${scale * 4}px`; canvas.style.height = `${scale * 3}px`;
}
addEventListener('resize', resize); resize();
function audioContexts() {
  return [Module.SDL2?.audioContext].filter(Boolean);
}
function unlockAudio() {
  for (const ctx of audioContexts()) ctx.resume().catch(() => showStatus('AUDIO UNAVAILABLE'));
}
function prepareAudio() {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) throw new Error('Audio unavailable');
    Module.SDL2 ||= {};
    Module.SDL2.audioContext ||= new Audio();
    unlockAudio();
  } catch { audioUnavailable = true; showStatus('AUDIO UNAVAILABLE'); }
}
function pauseEngine(value) {
  if (started) Module._Browser_Pause(value ? 1 : 0);
  if (value) for (const ctx of audioContexts()) ctx.suspend().catch(() => {});
  else unlockAudio();
}
function key(code, down, source) {
  if (!running || paused) return;
  if (down) {
    if (held.has(source)) return;
    const already = [...held.values()].includes(code);
    held.set(source, code);
    if (!already) Module._Browser_Key(code, 1);
  } else {
    const old = held.get(source); held.delete(source);
    if (old !== undefined && ![...held.values()].includes(old)) Module._Browser_Key(old, 0);
  }
}
function endDrag() {
  if (drag) {
    const id = drag.id; drag = null;
    if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
  }
  canvas.classList.remove('dragging'); canvas.style.cursor = '';
}
function releaseAll() {
  clearTimeout(pulseTimer);
  if (started) for (const code of new Set(held.values())) Module._Browser_Key(code, 0);
  held.clear(); endDrag();
  for (const [id, pointer] of touchPointers) {
    if (pointer.target.hasPointerCapture(id)) pointer.target.releasePointerCapture(id);
  }
  touchPointers.clear(); stickThumb.style.transform = '';
}
function pause() {
  if (!running || paused) return;
  releaseAll(); pauseEngine(true); paused = true;
  pauseScreen.hidden = false;
  touchControls.hidden = true;
}
function resume() {
  if (!running) return;
  paused = false; pauseScreen.hidden = true; pauseEngine(false); canvas.focus();
  touchControls.hidden = !touchEnabled;
}
function firePulse() {
  key(157, true, 'click'); clearTimeout(pulseTimer);
  pulseTimer = setTimeout(() => key(157, false, 'click'), 100);
}
function start() {
  if (!loaded) return;
  releaseAll(); paused = false; running = true;
  prepareAudio();
  startScreen.hidden = true; pauseScreen.hidden = true; canvas.focus();
  if (!started) {
    const args = ['-iwad', '/freedoom1.wad', '-warp', '1', '1', '-skill', '3', '-window', '-nograbmouse', '-novert', '-nomusic'];
    if (audioUnavailable) args.push('-nosound');
    Module.callMain(args);
    started = true;
  } else Module._Browser_NewGame();
  pauseEngine(false);
  resize();
  touchControls.hidden = !touchEnabled;
  hint.hidden = false; hint.classList.remove('faded'); clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { hint.classList.add('faded'); }, 6000);
}
startButton.addEventListener('click', start);
document.getElementById('resume').addEventListener('click', resume);
addEventListener('keydown', event => {
  if (event.code === 'KeyT') { event.preventDefault(); showTouch(); return; }
  if (!running) {
    if (event.code === 'Enter') { event.preventDefault(); start(); }
    return;
  }
  if (event.code === 'BracketLeft' || event.code === 'BracketRight') {
    event.preventDefault();
    sensitivity = Math.max(.05, Math.min(1.5, sensitivity * (event.code === 'BracketRight' ? 1.1 : 1 / 1.1)));
    try { localStorage.setItem('freedoom-sensitivity', String(sensitivity)); } catch {}
    return;
  }
  const code = Module._Browser_MenuActive() && event.key.length === 1 ? event.key.toLowerCase().charCodeAt(0) : keyCodes[event.code];
  if (code !== undefined) { event.preventDefault(); key(code, true, event.code); }
}, true);
addEventListener('keyup', event => {
  const code = keyCodes[event.code];
  if (code !== undefined) { event.preventDefault(); key(code, false, event.code); }
}, true);
canvas.addEventListener('pointerdown', event => {
  if (running && !paused && event.pointerType === 'touch' && event.clientX >= innerWidth / 2 && ![...touchPointers.values()].some(p => p.role === 'look')) {
    event.preventDefault(); canvas.focus();
    touchPointers.set(event.pointerId, { role: 'look', target: canvas, x: event.clientX });
    canvas.setPointerCapture(event.pointerId);
    return;
  }
  if (!running || paused || event.pointerType !== 'mouse') return;
  event.preventDefault(); canvas.focus();
  if (event.button === 2) key(157, true, 'right-mouse');
  if (event.button === 0) {
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, travel: 0, time: performance.now() };
    canvas.setPointerCapture(event.pointerId); canvas.classList.add('dragging'); canvas.style.cursor = 'none';
  }
});
canvas.addEventListener('pointermove', event => {
  const touch = touchPointers.get(event.pointerId);
  if (touch?.role === 'look') {
    Module._Browser_Drag(event.clientX - touch.x, sensitivity); touch.x = event.clientX;
    return;
  }
  if (!drag || drag.id !== event.pointerId) return;
  const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
  drag.travel += Math.hypot(dx, dy); drag.x = event.clientX; drag.y = event.clientY;
  Module._Browser_Drag(dx, sensitivity);
});
canvas.addEventListener('pointerup', event => {
  if (touchPointers.get(event.pointerId)?.role === 'look') {
    touchPointers.delete(event.pointerId);
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    return;
  }
  if (event.button === 2) key(157, false, 'right-mouse');
  if (drag?.id === event.pointerId && event.button === 0) {
    const click = drag.travel < 6 && performance.now() - drag.time < 250;
    endDrag(); if (click) firePulse();
  }
});
canvas.addEventListener('pointercancel', releaseAll);
canvas.addEventListener('lostpointercapture', endDrag);
canvas.addEventListener('lostpointercapture', event => {
  if (touchPointers.get(event.pointerId)?.role === 'look') touchPointers.delete(event.pointerId);
});
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('pointerup', event => { if (event.button === 2) key(157, false, 'right-mouse'); });
document.getElementById('stage').addEventListener('wheel', event => {
  if (!running || paused) return;
  event.preventDefault(); Module._Browser_NextWeapon(event.deltaY > 0 ? 1 : -1);
}, { passive: false });
addEventListener('blur', pause);
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
canvas.addEventListener('webglcontextlost', event => {
  event.preventDefault(); pause(); showStatus('GRAPHICS UNAVAILABLE');
});
const stage = document.getElementById('stage');
stage.addEventListener('pointerdown', event => {
  if (!running || paused || event.target.closest('button,#stick') || touchPointers.has(event.pointerId)) return;
  if (event.pointerType === 'touch' && event.clientX >= innerWidth / 2 && ![...touchPointers.values()].some(p => p.role === 'look')) {
    event.preventDefault(); canvas.focus();
    touchPointers.set(event.pointerId, { role: 'look', target: stage, x: event.clientX });
    stage.setPointerCapture(event.pointerId);
  } else if (event.pointerType === 'mouse' && event.target === stage && event.button === 2) {
    event.preventDefault(); canvas.focus(); key(157, true, 'right-mouse');
  } else if (event.pointerType === 'mouse' && event.target === stage && event.button === 0) {
    event.preventDefault(); canvas.focus();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, travel: 0, time: performance.now() };
    canvas.setPointerCapture(event.pointerId); canvas.classList.add('dragging'); canvas.style.cursor = 'none';
  }
});
stage.addEventListener('pointermove', event => {
  const pointer = touchPointers.get(event.pointerId);
  if (pointer?.role === 'look' && pointer.target === stage) {
    Module._Browser_Drag(event.clientX - pointer.x, sensitivity); pointer.x = event.clientX;
  }
});
for (const name of ['pointerup','pointercancel','lostpointercapture']) stage.addEventListener(name, event => {
  if (touchPointers.get(event.pointerId)?.target === stage) endTouch(event);
});
function updateStick(event) {
  const box = stick.getBoundingClientRect();
  let x = (event.clientX - box.left - box.width / 2) / (box.width / 2);
  let y = (event.clientY - box.top - box.height / 2) / (box.height / 2);
  const length = Math.hypot(x, y); if (length > 1) { x /= length; y /= length; }
  stickThumb.style.transform = `translate(${x * 32}px,${y * 32}px)`;
  for (const [name, code, value] of [['forward',119,y < -.2],['back',115,y > .2],['left',97,x < -.2],['right',100,x > .2]]) key(code, value, 'stick-' + name);
}
stick.addEventListener('pointerdown', event => {
  if (!running || paused || [...touchPointers.values()].some(p => p.role === 'stick')) return;
  event.preventDefault(); touchPointers.set(event.pointerId, { role: 'stick', target: stick });
  stick.setPointerCapture(event.pointerId); updateStick(event);
});
stick.addEventListener('pointermove', event => {
  if (touchPointers.get(event.pointerId)?.role === 'stick') updateStick(event);
});
function endTouch(event) {
  const pointer = touchPointers.get(event.pointerId); if (!pointer) return;
  touchPointers.delete(event.pointerId);
  if (pointer.role === 'stick') {
    for (const [name, code] of [['forward',119],['back',115],['left',97],['right',100]]) key(code, false, 'stick-' + name);
    stickThumb.style.transform = '';
  } else if (pointer.code !== undefined) key(pointer.code, false, 'touch-' + event.pointerId);
  if (pointer.target.hasPointerCapture(event.pointerId)) pointer.target.releasePointerCapture(event.pointerId);
}
for (const target of [stick, ...touchControls.querySelectorAll('button')]) {
  for (const name of ['pointerup','pointercancel','lostpointercapture']) target.addEventListener(name, endTouch);
}
for (const [id, code] of [['touch-fire',157],['touch-use',32],['touch-menu',27]]) {
  const target = document.getElementById(id);
  target.addEventListener('pointerdown', event => {
    if (!running || paused) return;
    event.preventDefault(); touchPointers.set(event.pointerId, { role: id, target, code });
    target.setPointerCapture(event.pointerId); key(code, true, 'touch-' + event.pointerId);
  });
}
document.getElementById('touch-next').addEventListener('pointerdown', event => {
  if (!running || paused) return;
  event.preventDefault(); Module._Browser_NextWeapon(1);
});
if (params.has('proof')) window.__proof = {
  state: () => {
    if (!started) return { ready: false, map: '', frame: 0, pos: [0, 0, 0], yaw: 0, pitch: 0, health: 0, ammo: null, shots: 0, lock_calls: window.__lockCalls || 0 };
    const state = JSON.parse(Module.UTF8ToString(Module._Browser_State()));
    delete state.weapon_frame;
    state.lock_calls = window.__lockCalls || 0;
    return state;
  }
};
async function download(name, track) {
  const response = await fetch(name);
  if (!response.ok) throw new Error(`Load ${response.status}`);
  const total = Number(response.headers.get('Content-Length')) || 1;
  const reader = response.body.getReader(); const chunks = []; let count = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    chunks.push(value); count += value.length;
    if (track) document.getElementById('loading').value = Math.min(count / total, 1);
  }
  const bytes = new Uint8Array(count); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}
(async () => {
  try {
    const [wasm, wad] = await Promise.all([download('freedoom.wasm', false), download('freedoom1.wad', true)]);
    Module.wasmBinary = wasm; wadBytes = wad;
    const script = document.createElement('script'); script.src = 'freedoom.js';
    script.onerror = () => showStatus('LOAD FAILED'); document.body.append(script);
  } catch { showStatus('LOAD FAILED'); }
})();

})();
