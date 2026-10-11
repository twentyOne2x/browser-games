/* MIT. Frame adapter for the unchanged upstream DOM/SVG game. */
(() => {
  let nativeStorage;
  try { nativeStorage = window.localStorage; } catch {}
  const memory = new Map();
  const storage = {
    getItem(key) {
      key = String(key);
      if (memory.has(key)) return memory.get(key);
      try {
        const value = nativeStorage?.getItem(key);
        if (value != null) { memory.set(key, value); return value; }
      } catch {}
      return memory.get(key) ?? null;
    },
    setItem(key, value) {
      key = String(key); value = String(value); memory.set(key, value);
      try { nativeStorage?.setItem(key, value); } catch {}
    },
    removeItem(key) {
      memory.delete(String(key));
      try { nativeStorage?.removeItem(key); } catch {}
    },
    clear() { memory.clear(); try { nativeStorage?.clear(); } catch {} },
    key(index) { return [...memory.keys()][index] ?? null; },
    get length() { return memory.size; },
  };
  Object.defineProperty(window, 'localStorage', { configurable: true, get: () => storage });
  // Rendering is vector-only. Also cap the ratio exposed to game code.
  const dpr = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  Object.defineProperty(window, 'devicePixelRatio', {
    configurable: true, get: () => Math.min(2, dpr?.get?.call(window) ?? dpr?.value ?? 1),
  });
  const find = name => document.querySelector(`[class*="_${name}_"]`);
  const fit = () => {
    const w = innerWidth, h = innerHeight;
    const reserved = w < 300 ? 172 : 124;
    const size = Math.min(w - 12, h - reserved) * 65 / 71;
    const scale = size / (Math.min(w, h) * .65);
    const left = (w - size) / 2, top = 58 + (h - reserved - size) / 2;
    for (const name of ['gridContainer', 'piecesContainer']) {
      const node = find(name);
      if (node) Object.assign(node.style, {
        left: `${left}px`, top: `${top}px`, transform: `scale(${scale})`, transformOrigin: '0 0',
      });
    }
    const border = find('graphicsGridBorder');
    const edge = size * 3 / 65;
    if (border) Object.assign(border.style, {
      left: `${left - edge}px`, top: `${top - edge}px`,
      width: `${size + edge * 2}px`, height: `${size + edge * 2}px`,
    });
    document.getElementById('frame-controls').hidden = !find('gridContainer');
    document.documentElement.style.setProperty('--frame-rem', `${Math.max(4, Math.min(16, h / 72, w / 50))}px`);
  };
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    root.tabIndex = -1;
    document.addEventListener('click', event => {
      if (!event.target.closest('a')) root.focus({ preventScroll: true });
    });
    const controls = document.getElementById('frame-controls');
    for (const [label, key] of [['Left', 'a'], ['Up', 'w'], ['Pass', ' '], ['Down', 's'], ['Right', 'd']]) {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = label; button.dataset.key = key;
      const activate = () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
        setTimeout(() => window.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true })), 20);
      };
      // Browsers may suppress the compatibility click after a board swipe.
      // Handle the actual touch and cancel its synthetic mouse activation.
      button.addEventListener('touchend', event => {
        event.preventDefault();
        const touch = event.changedTouches[0], r = button.getBoundingClientRect();
        if (touch && touch.clientX >= r.left && touch.clientX <= r.right &&
            touch.clientY >= r.top && touch.clientY <= r.bottom) activate();
      }, { passive: false });
      for (const type of ['keydown', 'keyup']) button.addEventListener(type, event => {
        if (event.key === ' ' || event.key === 'Enter') event.stopPropagation();
      });
      button.addEventListener('click', activate);
      controls.append(button);
    }
    new MutationObserver(fit).observe(root, { childList: true, subtree: true });
    window.addEventListener('resize', fit);
    fit();
  });
})();
