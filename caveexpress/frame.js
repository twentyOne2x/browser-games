'use strict';
const canvas = document.getElementById('canvas');
const notice = document.getElementById('notice');
const held = new Map();
window.frameNotice = text => {
  notice.textContent = text;
  notice.hidden = false;
  clearTimeout(window.noticeTimer);
  window.noticeTimer = setTimeout(() => { notice.hidden = true; }, 5000);
};
function dimensions() {
  const scale = Math.min(innerWidth / 16, innerHeight / 9);
  const width = Math.max(16, Math.floor(scale) * 16);
  const height = width * 9 / 16;
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  return {width, height, pixelWidth: Math.round(width * ratio), pixelHeight: Math.round(height * ratio), ratio};
}
function fit() {
  const d = dimensions();
  canvas.style.width = d.width + 'px';
  canvas.style.height = d.height + 'px';
  if (typeof Browser !== 'undefined') Browser.setCanvasSize(d.pixelWidth, d.pixelHeight);
  else { canvas.width = d.pixelWidth; canvas.height = d.pixelHeight; }
  canvas.style.width = d.width + 'px';
  canvas.style.height = d.height + 'px';
}
fit();
const keys = {ArrowUp:38, ArrowDown:40, ArrowLeft:37, ArrowRight:39, Enter:13, Escape:27, Tab:9, PageUp:33, PageDown:34, '.':190, Backspace:8, Delete:46, ShiftTab:9, Shift:16, Insert:45};
function deliver(key, down) {
  if (key === 'ShiftTab' && down) deliver('Shift', true);
  const event = new KeyboardEvent(down ? 'keydown' : 'keyup', {key:key === 'ShiftTab' ? 'Tab' : key, code:key === 'Shift' ? 'ShiftLeft' : key === 'ShiftTab' ? 'Tab' : key === '.' ? 'Period' : key, shiftKey:key === 'ShiftTab', bubbles:true, cancelable:true});
  Object.defineProperties(event, {keyCode:{value:keys[key]}, which:{value:keys[key]}});
  canvas.dispatchEvent(event);
  if (key === 'ShiftTab' && !down) deliver('Shift', false);
}
function release() {
  for (const [id, button] of held) { deliver(button.dataset.key, false); button.classList.remove('held'); }
  held.clear();
}
document.getElementById('send-text').addEventListener('click', () => {
  const input = document.getElementById('text-entry'); canvas.focus();
  for (const key of input.value) {
    const event = new KeyboardEvent('keypress', {key,bubbles:true,cancelable:true});
    Object.defineProperties(event, {charCode:{value:key.codePointAt(0)},keyCode:{value:key.codePointAt(0)},which:{value:key.codePointAt(0)}});
    canvas.dispatchEvent(event);
  }
  input.value = '';
});
for (const type of ['keydown','keyup','keypress']) window.addEventListener(type, event => {
  if (event.target === document.getElementById('text-entry')) event.stopImmediatePropagation();
}, true);
for (const button of document.querySelectorAll('[data-key]')) {
  button.addEventListener('pointerdown', event => {
    event.preventDefault(); canvas.focus(); button.setPointerCapture(event.pointerId);
    held.set(event.pointerId, button); button.classList.add('held'); deliver(button.dataset.key, true);
  });
  const up = event => {
    if (!held.has(event.pointerId)) return;
    deliver(button.dataset.key, false); button.classList.remove('held'); held.delete(event.pointerId);
  };
  button.addEventListener('pointerup', up); button.addEventListener('pointercancel', up); button.addEventListener('lostpointercapture', up);
}
canvas.addEventListener('contextmenu', event => event.preventDefault());
canvas.addEventListener('pointerdown', () => canvas.focus());
canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); frameNotice('Graphics stopped. Reload this page to resume.'); });
window.addEventListener('blur', release);
document.addEventListener('visibilitychange', () => { if (document.hidden) release(); });
window.addEventListener('keydown', event => {
  if ((event.altKey && event.key === 'Enter') || event.key === 'F11') { event.stopImmediatePropagation(); event.preventDefault(); }
}, true);
window.addEventListener('resize', fit);
var Module = {
  canvas, noImageDecoding:true, elementPointerLock:false,
  arguments:['-set','width',String(canvas.width),'-set','height',String(canvas.height),'-set','fullscreen','false','-set','grabmouse','false','-set','resizeable','true','-set','network','false','-set','gamecontroller','false'],
  preRun:[() => { FS.mkdir('/user_data'); }],
  onRuntimeInitialized:() => { fit(); },
  postRun:[() => { fit(); document.getElementById('loading').hidden = true; canvas.focus(); }],
  print:text => console.log(text), printErr:text => console.error(text),
  setStatus:text => { document.getElementById('status').textContent = text || 'Starting game...'; },
  onAbort:text => { document.getElementById('loading').hidden = false; document.getElementById('status').textContent = 'Could not start: ' + text; }
};
