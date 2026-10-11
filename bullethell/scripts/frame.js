/* Play frame adapter, 2026-10-11. Uses the original p5 keyboard handlers. */
const held = new Set();
const buttonPointers = new Map();
let stickPointer = null;
const codes = {37: 'ArrowLeft', 38: 'ArrowUp', 39: 'ArrowRight', 40: 'ArrowDown'};
function sendKey(type, n) {
    window.dispatchEvent(new KeyboardEvent(type, {
        key: codes[n] || String.fromCharCode(n), code: codes[n] || 'Key' + String.fromCharCode(n),
        keyCode: n, which: n, bubbles: true
    }));
}
function hold(n, down) {
    if (down === held.has(n)) return;
    down ? held.add(n) : held.delete(n);
    sendKey(down ? 'keydown' : 'keyup', n);
}
function release() {
    for (const n of [...held]) hold(n, false);
    buttonPointers.clear();
    stickPointer = null;
    document.getElementById('knob').style.transform = '';
}
function fitFrame() {
    const stage = document.getElementById('stage').getBoundingClientRect();
    const scale = Math.min(stage.width / 600, stage.height / 750);
    const canvas = document.querySelector('canvas');
    if (canvas) {
        pixelDensity(Math.min(2, scale * Math.min(2, window.devicePixelRatio || 1)));
        canvas.style.width = 600 * scale + 'px';
        canvas.style.height = 750 * scale + 'px';
    }
}
window.addEventListener('resize', fitFrame);
window.addEventListener('blur', release);
document.addEventListener('visibilitychange', () => { if (document.hidden) release(); });
window.addEventListener('keydown', e => {
    if ([37, 38, 39, 40, 32].includes(e.which)) e.preventDefault();
});
function begin() {
    release();
    resetGame();
    paused = false;
    document.getElementById('welcome').hidden = true;
    document.getElementById('game').focus();
}
document.getElementById('start').addEventListener('click', begin);
document.getElementById('restart').addEventListener('click', begin);
document.getElementById('more').addEventListener('click', e => {
    const panel = document.getElementById('options');
    panel.hidden = !panel.hidden;
    e.currentTarget.setAttribute('aria-expanded', String(!panel.hidden));
});
for (const button of document.querySelectorAll('[data-key]')) {
    button.addEventListener('click', () => {
        const n = Number(button.dataset.key);
        sendKey('keydown', n);
        sendKey('keyup', n);
    });
}
for (const button of document.querySelectorAll('[data-hold]')) {
    button.addEventListener('pointerdown', e => {
        if (buttonPointers.has(button)) return;
        e.preventDefault();
        buttonPointers.set(button, e.pointerId);
        button.setPointerCapture(e.pointerId);
        hold(Number(button.dataset.hold), true);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
        button.addEventListener(type, e => {
            if (buttonPointers.get(button) !== e.pointerId) return;
            buttonPointers.delete(button);
            hold(Number(button.dataset.hold), false);
        });
    }
}
const stick = document.getElementById('stick');
function moveStick(e) {
    const r = stick.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    hold(37, x < -10); hold(39, x > 10); hold(38, y < -10); hold(40, y > 10);
    const f = Math.min(1, 24 / (Math.hypot(x, y) || 1));
    document.getElementById('knob').style.transform = `translate(${x * f}px, ${y * f}px)`;
}
stick.addEventListener('pointerdown', e => {
    if (stickPointer !== null) return;
    e.preventDefault();
    stickPointer = e.pointerId;
    stick.setPointerCapture(e.pointerId);
    moveStick(e);
});
stick.addEventListener('pointermove', e => { if (e.pointerId === stickPointer) moveStick(e); });
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    stick.addEventListener(type, e => {
        if (e.pointerId !== stickPointer) return;
        stickPointer = null;
        for (const n of [37, 38, 39, 40]) hold(n, false);
        document.getElementById('knob').style.transform = '';
    });
}
