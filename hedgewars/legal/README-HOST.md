# Host and reproduce Hedgewars

Upload the complete site/ directory, including legal/, as one static folder.
Every runtime path is relative. Any path prefix works. No backend is required.
Do not upload the working repository, dependencies, research or tools.

Recommended content types: .html text/html, .js text/javascript, .css text/css,
.json application/json, .wasm application/wasm, .data application/octet-stream,
.png image/png, .tgz application/gzip, .txt text/plain. WASM also works when
served as text/plain because this loader always instantiates ArrayBuffer bytes.
Range support, cookies, COOP/COEP and service workers are unnecessary.

The Play tile should navigate its game region to this iframe:

```html
<iframe src="https://YOUR-GAME-ORIGIN/YOUR-PREFIX/hedgewars/"
  sandbox="allow-scripts allow-same-origin"
  style="width:100%;height:100%;border:0" title="Hedgewars"></iframe>
```

The enclosing app must be on a different origin. Do not add an allow attribute.
The URL above is a deployment placeholder; paths inside the page remain relative.
This delivery does not publish a host or modify the Play application.

Press START HOTSEAT. Two people can take turns on the same device. Choose Castle
or Mushrooms. Arrows walk/aim, Space charges/fires, Enter jumps, right click opens
weapons. Touch uses the displayed controls. Controls opens weapon slots, timers,
precision, cursor, camera zoom, sound, quit and other local actions. Tap the board
to select a target/weapon, drag to move the camera. New game reloads cleanly.
There is no saved state. Legal opens inside the same frame and returns to a new
start screen. Music is absent. Four unverified recordings are replaced by existing free effects.

Requires WebGL 2 and WebAssembly JSPI, as provided by the tested Chromium 149.
Touch was proved at 390x844 and 844x390. Safari/iOS support is not claimed.
Unsupported features produce a visible message. This is a behavioural proof,
not a frame-rate benchmark or a real-device certification.

From the supplied git bundle:

```bash
git clone repo.bundle hedgewars-play
cd hedgewars-play
```

For fix round 2, clone the original input bundle first, then apply the incremental
output bundle before the package commands below:

```bash
git fetch /path/to/fix-round-2/repo.bundle main
git checkout -B main FETCH_HEAD
npm ci
python3 host/build.py
python3 host/legal.py
PLAYWRIGHT_BROWSERS_PATH=/path/to/browser-cache bash proof/run.sh
python3 host/deliver.py /path/to/output-folder
```

If Chromium is absent, install the locked Playwright Chromium browser with
`npx playwright install chromium` before running proof. Node 22 and Python 3.12
were used. No Emscripten or Rust compilation is needed to reproduce this package.
The compiled WASM is tracked in dist/. Matching engine source is in
vendor/engine-source/. DATA.json records the selected original-data source pin.

Proof starts two servers on free 127.0.0.1 ports, uses different origins and the
exact sandbox contract, serves WASM with a wrong MIME, ignores Range, and denies
storage in one case. It reads engine Lua state after movement, a projectile and
another team's turn. Touch also positions the real cursor, drags without
selecting, commits a target and fires a homing bee whose real target matches.
The native framebuffer stays 1024x768 throughout all responsive layouts.
Capture and Record are absent. Their C/R shortcuts are blocked before SDL, with
no saved-output feedback. Touch controls are at least 44 by 44 CSS pixels even
at the minimum sizes; short screens show compact start instructions.
It then disables the real SDL keydown handler and adds a
pointer-lock call, checks the expected failures, and restores bytes in finally.
It closes its servers and browser on completion. The report records the tested
git head and file hashes. Exit 0 with PASS S1 through S6 and M1/M2 is success.

The source archives in legal/ can also be used independently. engine-source/
contains the pinned compilation sources. To compile the engine, install Emscripten 4.0.13 and Rust 1.97.1 with the
wasm32-unknown-emscripten target, set PLAY_EMSDK and PLAY_RUST_TOOLCHAIN to their
installation paths, and run python3 host/compile.py. Copy build/engine/hwengine.js
and .wasm to dist/, then rerun the package commands. This uses the upstream
generated C directly, bypassing its incomplete CMake converter path. The Rust
dependencies are vendored and Cargo builds offline. Native port inputs are
pinned by the SDK and DEPENDENCIES.json. Repackaging requires no compiler.
The dependency source archive also contains matching SDK runtime/headers,
official Rust std/core/alloc source and its separate 30-package locked closure.
