# Licence inventory and exclusions

The permitted upstream is https://github.com/apmlabs/webwars at
406e53fde3cd811f15ca4cc5ff0909e69f58e276. It embeds the Hedgewars source and data.
The official announcement is https://www.hedgewars.org/node/9500.

README.md assigns source code GPL-2.0 and images/sounds GFDL-1.2. CREDITS says:
"IF NO LICENSE IS SPECIFIED, THE LICENSE IS THE SAME AS MENTIONED IN README.md."
This express fallback is used for unannotated project assets. Configuration,
locale, CSV key bindings and templates are treated as project source. Both full
project licence texts are preserved. Explicit per-file terms take precedence.
No invariant sections or cover texts are identified by the project notice.

The data tree and adjacent notices contain the following terms:

| Terms | Evidence | Included treatment |
| --- | --- | --- |
| GPL-2.0 | Project README fallback, Graphics/hedgehog.svg explicit notice | Source/configuration, shaders and that editable SVG |
| GFDL-1.2 | Project README and CREDITS fallback | Most delivered PNG/Ogg assets and editable SVGs |
| CC-BY-3.0 | Explosives/ExplosivesRoll and Nature mushroom/mushroom2/snail SVG RDF; CREDITS audio entries; Droplet Ogg tags | Full terms, original attribution, exact originals and modification notices |
| CC-BY-4.0 | Forts/SnailL.svg RDF | Not selected |
| CC-BY-SA-4.0 | Graphics/Hats SVG RDF, including Dauber and DayAndNight | Not selected |
| CC0-1.0 | Graves/Clover.svg and TV.svg; CREDITS sound entries | Only expressly credited CC0 sounds selected; source CC0 recording plus GFDL project edits distinguished |
| Public domain | CREDITS rubber duck sound declaration; DejaVu modification notice | Original notices preserved |
| Bitstream Vera and Arev font terms | Fonts_LICENSE.txt and DejaVu name-table records 0/13 | Full terms preserved, unchanged DejaVu bytes |
| GPL-2.0 with font embedding exception | wqy-zenhei.ttc embedded notice | Font not selected; alias uses DejaVu bytes instead |
| Apache-2.0 | Fonts_LICENSE.txt Google Droid section | Notice preserved; no Droid font selected |
| MIT-style permission | Scripts/Multiplayer/Continental_supplies.lua header | Script not selected |

Engine libraries are recorded in DEPENDENCIES.md, including Lua, PhysicsFS,
SDL, FreeType, HarfBuzz, codecs, Emscripten runtime and locked Rust crates.
Their original headers, full notices and build-library sources are included.
No original licence is replaced by the shell's GPL-2.0 declaration.

Excluded recordings: Sounds/mineimpact.ogg, hammer.ogg, sinegun.ogg and
knife_impact.ogg. CREDITS links external recordings without quoting their
original grants. Those external sites are outside the permitted download list.
The project fallback alone cannot resolve a possible third-party grant conflict.

All Music/ files are excluded. Nature.ogg has conflicting authorship notices,
and the supplied Kevin MacLeod sudden-death music attribution does not establish
the specific track's grant in this tree. The Nature theme's music reference is
removed. The delivered build has sound effects and voices, without music.

Only Castle and Mushrooms maps, Nature graphics, default voices, NoHat, the
required chef sprite, Statue grave and generic Hedgewars flag are packaged.
Franchise hats, Starbound maps, extra DLC, other fonts and unneeded assets are
excluded. DATA.md records each included file's source, terms, author, hash and
any conversion. data-source.tgz preserves original selected bytes and available
editable SVGs. The four excluded effect paths alias existing free effects because the old engine
treats absent sound files as fatal. Actual replacement sources are identified
in the ledger; none of the excluded original bytes is redistributed.

Creative Commons full texts are copied from the locked build utility
spdx-license-list 6.11.0. Its npm integrity is recorded in package-lock.json.
No Creative Commons website or third-party audio source was downloaded.
