# Engine dependency notices and source

The engine is GPL-2.0. Original copyright and permission notices for linked
libraries are preserved in legal/dependency-notices/ and dependency-source.tgz.
The source commit and its Cargo.lock are pinned, and every Cargo package archive
checksum was checked. The delivered binary is compiled with Emscripten 4.0.13 and Rust 1.97.1
(commit 8bab26f4f68e0e26f0bb7960be334d5b520ea452). The tool-port source versions
are the actual compiler inputs. The undocumented published binary is not shipped.
DEPENDENCIES.json records each URL, version and downloaded archive hash.

| Component | Selected redistribution terms | Preserved evidence |
| --- | --- | --- |
| Lua | MIT | engine-source/hedgewars/misc/liblua/lua.h, full copyright and grant |
| PhysicsFS and embedded miniz | Zlib and Unlicense/public domain | engine-source/hedgewars/misc/libphysfs/LICENSE.txt and physfs_miniz.h |
| SDL2, SDL_image, SDL_mixer, SDL_ttf | Zlib | Each original LICENSE.txt plus full build-library source |
| libpng 1.6.39 | PNG Reference Library License v2 | libpng/LICENSE and source copyright notices |
| Ogg and Vorbis | BSD-3-Clause | Each original COPYING and AUTHORS |
| zlib 1.3.1 | Zlib | zlib/README and zlib.h |
| FreeType 2.13.3 | GPL-2.0, chosen from its dual terms | freetype/LICENSE.TXT and docs/GPLv2.TXT; secondary MIT/Zlib headers retained |
| HarfBuzz 3.2.0 | Old MIT and ISC | harfbuzz/COPYING and src/hb-ucd.cc |
| Emscripten runtime, musl, compiler runtime | MIT/NCSA, MIT, LLVM exception | Emscripten-LICENSE.txt, AUTHORS, musl-COPYRIGHT.txt and compiler/libcxx notices |
| MiniLZ4 | MIT, Pierre Curto 2012 | MiniLZ4.js preserves the complete header |
| Locked Rust crates | MIT where offered; BSL-1.0 for ryu; MIT plus Unicode-3.0 for unicode-ident | All crate source, original licence files, r-efi AUTHORS and Cargo.lock |
| Rust standard library | MIT where offered, Unicode-3.0 and applicable compiler-runtime exceptions | Official matching Rust-stdlib-COPYRIGHT.html; full Unicode text under Rust/unicode-ident/LICENSE-UNICODE |
| Rust compiler-builtins | MIT AND Apache-2.0 WITH LLVM-exception | rust-stdlib/library/compiler-builtins/LICENSE.txt and original third-party notices |
| Rust standard-library source closure | MIT where offered; foldhash Zlib; unused Fortanix SGX source MPL-2.0 | Matching rust-src 1.97.1 and all 30 Cargo.lock registry packages with original notices |

FreeType's own LICENSE.TXT explicitly offers GPLv2 for GPL programs and warns
that its FTL alternative is incompatible with GPLv2. This distribution chooses
GPL-2.0 for FreeType. This software is based in part on the work of the FreeType
Team. Other authors are credited in the preserved original files.

Representative exact grants, subject to the full conditions in the local texts:

GPL-2.0 section 3: "You may copy and distribute the Program (or a work based on
it, under Section 2) in object code or executable form under the terms of
Sections 1 and 2 above provided that you also do one of the following:"
The accompanying engine and dependency source packages implement option 3(a).

Zlib: "Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it freely,
subject to the following restrictions:"

BSD: "Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:"

MIT: "Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the 'Software'), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:"
Original texts use double quotation marks around Software.

Build-library source includes code, headers, configuration and build scripts.
Matching SDK system/lib, system/include, JS runtime and port build recipes are
included. Official rust-src 1.97.1 supplies std/core/alloc, compiler-builtins and
the standard library's separate locked dependency closure. Platform-specific
source that is not linked for wasm remains separately licensed as its original
manifest states. No assumption about a compiler-library source exception is
needed for the source that accompanies this executable.
Unrelated prebuilt binaries, test fonts, test artwork and sample audio are
excluded. In particular, the HarfBuzz source release contains a Monotype
FranklinGothic test font whose notice forbids copying; none of its font fixtures
are redistributed. No such fixture is a game asset or build dependency.

The standard sha256sum/sha512sum tools perform all archive checks. Engine source
files are checked by vendor/engine-source.SHA256SUMS.txt; dependency source and
notice files by vendor/dependencies.SHA256SUMS.txt. npm build/proof utilities are
pinned by package-lock.json with their package integrity values. No library
source or permission notice was replaced by a local implementation.
