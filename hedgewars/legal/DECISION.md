# Static Hedgewars decision

Reuse apmlabs/webwars, the browser port announced by the Hedgewars project at
https://www.hedgewars.org/node/9500. The engine is real Hedgewars, compiled from
unchanged generated C and Rust at 2269ab1eab930b496b6ceb69ce65be5f30b0545d.
Official data comes from 406e53fde3cd811f15ca4cc5ff0909e69f58e276.

The published loader expected a roughly 196 MB compressed, 218 MB unpacked asset
package. Replace it with a contiguous 7 MB data file and an explicit FS manifest.
Two maps and two teams of two hedgehogs use the port's local IPC protocol.
This is local hotseat, with no multiplayer transport, backend or persistence.

The original published WASM worked, but its compiler and native-library versions
were undocumented. It is not delivered. Compile the same pinned engine with
Emscripten 4.0.13 and Rust 1.97.1 instead. The compiler's actual native ports and
locked Cargo source closure accompany the executable. Compile the upstream
generated C directly; this avoids its incomplete converter/CMake path. A missing
Lua header is supplied through a compiler flag. Engine rules, physics and source
are unchanged. host/compile.py is the rerunnable compilation command.

Use the browser-games Quake/2048 sibling conventions for a canvas page, corner
legal link, local licence texts and source receipt. No sibling game code or
assets are included. The template pin is
48069ee23afa3f5265a7b062993ab544077de6be.

Frame adaptations affect loader/glue, inputs, display and data packaging.
Forbidden capability imports return unsupported before a request. WASM uses
ArrayBuffer instantiation and fetches omit credentials. Touch buttons feed the
engine's real SDL handlers. Extra controls expose weapon slots, timers,
modifiers, camera, pause and quit. The fixed 1024x768 native canvas is composited
onto a responsive 4:3 display with DPR at most 2. The passive Lua observer reads
real positions, projectiles and turn changes without changing gameplay.

Include only data whose free terms are stated in the permitted source tree.
Exclude all music. Four recordings with unverified original grants are absent;
their required virtual filenames alias existing freely redistributable effects.
The font alias contains unchanged DejaVu bytes, with its original font notices.
Three paletted PNGs are converted to RGBA with identical pixels. Exact originals,
editable companions where available, copyright notices and grants are preserved.

Rejected: the live webwars.link endpoint, which fails HTTPS hostname validation
on this box and returns HTTP 400. The named GitHub alternative works.
Rejected: the full asset package, network UI, replacement engines, outside data
mirrors and assets with unverified third-party terms. SDK test artwork, sample
audio, prebuilt binaries and restricted HarfBuzz test fonts are excluded.

The browser needs WebGL 2 and WebAssembly promise integration (JSPI). The proof
uses Chromium 149 with software WebGL and real touch events. Safari/iOS support
is not claimed. Unsupported browsers get a visible capability message.

Observed failures are retained under proof/evidence/. Startup exposed an omitted
chef sprite; including the exact upstream sprite fixed it. A later Mushrooms
shot exposed a missing required sound, followed by native shutdown. All four
unverified sounds now resolve to known free effects, with real-FS assertions.
The responsive harness needed a parent viewport tag. A legal-return wait needed
to wait for the new document's START element. Those harness repairs kept the
original layout assertions and deadlines. Review then found SDL changing the
native canvas size and clipping the phone HUD, plus overlapping touch handlers.
The native canvas now stays 1024x768; the visible board maps all input into it.
Native touch synthesis is suppressed. Proof checks the real cursor, target
mode and fired homing bee's target. An attempted IPC target witness was invalid
for hotseat, which suppresses network IPC; real projectile state replaces that
measurement. Final proof runs against the delivered
files, checks both negative mutations and verifies byte-for-byte restoration.

Bundle reproduction also caught a missing HEAD reference and source files
excluded by build-directory and upstream ignore patterns. The bundle includes
main and HEAD, only root build outputs are ignored, and selected vendor inputs
are explicitly tracked. Archive permissions are normalized to Git's preserved
executable flag so a clean clone reproduces identical source archives.
