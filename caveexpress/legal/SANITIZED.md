# SANITIZED source package

This source offer omits 24 unused precompiled artifacts: 23 native binaries and one Android Gradle wrapper JAR containing 40 compiled classes. It does not claim to convey their corresponding source or a written source offer. All retained archive members preserve their original bytes, including code, headers, build scripts and notices.

The two LGPL-2.1 libgme.dll files have no corresponding GME implementation here. Optional Opus, Opusfile, Wavpack, XMP, TIFF and WebP DLLs also lack exact implementation closure. The Apple SDL framework binaries identify version 2.0.22, unlike the included SDL 2.32.0 source. The Gradle JAR and Games installer plugin are unused tool/platform objects without exact corresponding implementation here. Some removed libraries have permissive terms; omission also keeps this package source-only.

The wasm ports compile C/C++ from src/ and IMG*.c; they do not read VisualC/, Xcode/, Android wrapper code or the NSIS Games plugin. Separate ogg/vorbis source ports remain. All 12 dependency source packages, all engine C++ and the editable Lua/map source remain. The build proof also restores the pinned Emscripten 4.0.5 media/powered_by_logo_shell.png, required by its default HTML linker and omitted from the original source offer. Its SHA256 is 9e99e3b6f05d94454b008eb39873e23bbeb35e77306b4d691063591e52615398.

Original dependency pins, URLs, byte sizes and hashes remain in source/page/evidence/dependencies.json. The three modified ZIPs are explicitly labeled sanitized in dependencies.json, which records both original and supplied hashes. The game pin remains 43fc170567c140d037d592148e652fc864ee0302; removal of the unused installer DLL is the only upstream tree omission added by this fix.

Regenerate with `python3 tools/sanitize-source.py`, then `python3 tools/package-source.py` and `python3 tools/inventory.py`. Verify every nested archive with `python3 proof/source-check.py`. Build the extracted offer with `bash source/build.sh /absolute/path/to/caveexpress.data` after activating emsdk 4.0.5.

| Archive | Omitted member | Bytes | Original SHA256 |
| --- | --- | ---: | --- |
| sdl2.zip | SDL-release-2.32.0/android-project/gradle/wrapper/gradle-wrapper.jar | 54213 | 2c23278a62dc9f96ab11bee897d9f53e6479d6419135e4560ce822a6431df5e5 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x64/libgme.dll | 612864 | ff03d6268e76b8bb0a3526be86de23352696284bca6c72e07fbfb410b1c28772 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x64/libogg-0.dll | 35328 | 2faf08f27f1008ca602039e199fdf671df0962923836351eade6ceb6c88e49e4 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x64/libopus-0.dll | 370176 | 9c09ad462d201d13c9aebfb4f31d1537ef071128b1ce9bb0f8b79f52090ffe1c |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x64/libopusfile-0.dll | 51200 | 6760d02f10ed90708504eb08fadb4cda9ead438893996f13d0a09925d126e338 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x64/libwavpack-1.dll | 175616 | 4858ee1978ce427955b9d6d44b852b323ee7a8c4b5914231127fe57aff40057e |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x64/libxmp.dll | 387584 | 8d44f1032433e16643e370142049572bd98bdb27f795b36922c4757461e1add9 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x86/libgme.dll | 558592 | 44c63c36fdd5a6db19d85db7b0168e21f6d55d57b4ea4bd9a2220a438ad01f85 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x86/libogg-0.dll | 30720 | 893e9e0126055a04139c03b460f1a2d9d8c1e8a2a23a217f45703372f369971f |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x86/libopus-0.dll | 348672 | cc122858bfc543a791cd457299c59a45ff02ee40c2d771e4a10b2180191a7b10 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x86/libopusfile-0.dll | 51712 | 5720616fe6435f5e2e8ac3b1ac4769cb4cab4948047543ab59b34546ec34e519 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x86/libwavpack-1.dll | 168448 | c112d04ea8e6363203c7d87f584d76a29cd8438be1ee9bb0322780ff443085d3 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/VisualC/external/optional/x86/libxmp.dll | 374784 | 806b8ab090717faca7b5937268b9a5116854ce89af70d152aff00a84df95a580 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/Xcode/iOS/SDL2.framework/SDL2 | 8304088 | ac9102a8f37c5c6b9509d7904021576e2b904f8b8f8c239af3072cfde0bcdac7 |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/Xcode/macOS/SDL2.framework/Versions/A/SDL2 | 3047536 | f225326371fa638b529a73428fae3a610ea0a8f0920c8b566b7e5338aded549b |
| sdl2_mixer.zip | SDL_mixer-release-2.8.0/Xcode/tvOS/SDL2.framework/SDL2 | 4204552 | 3b4962c688884ea6cb313c1c79362799e1d2ff282ae64beba4749a2d511bdfa8 |
| sdl2_image.zip | SDL_image-release-2.6.0/VisualC/external/optional/x64/libtiff-5.dll | 426496 | 5ce626b7e561869d9839b0de0e580ac8f87bb8d525909b72731a3d5dfcfec554 |
| sdl2_image.zip | SDL_image-release-2.6.0/VisualC/external/optional/x64/libwebp-7.dll | 446464 | fbf71e942fb7a30fca6a739241381ba38e6155bcc3eed93f7c930d51d8817894 |
| sdl2_image.zip | SDL_image-release-2.6.0/VisualC/external/optional/x86/libtiff-5.dll | 421888 | 96a76918b40df1dfb85e2c638badd4c00e3865f1c45c8b9bbb65e9b3f1949c2a |
| sdl2_image.zip | SDL_image-release-2.6.0/VisualC/external/optional/x86/libwebp-7.dll | 407552 | 2c6714626236e8dbca50bc784bb128cf7dfc715b6863e5ae9aca5b2b19c3ba29 |
| sdl2_image.zip | SDL_image-release-2.6.0/Xcode/iOS/SDL2.framework/SDL2 | 8304088 | ac9102a8f37c5c6b9509d7904021576e2b904f8b8f8c239af3072cfde0bcdac7 |
| sdl2_image.zip | SDL_image-release-2.6.0/Xcode/macOS/SDL2.framework/Versions/A/SDL2 | 3047536 | f225326371fa638b529a73428fae3a610ea0a8f0920c8b566b7e5338aded549b |
| sdl2_image.zip | SDL_image-release-2.6.0/Xcode/tvOS/SDL2.framework/SDL2 | 4204552 | 3b4962c688884ea6cb313c1c79362799e1d2ff282ae64beba4749a2d511bdfa8 |
| upstream | contrib/installer/windows/plugins/games.dll | 105472 | b72370505494abe41db16fd07d2abbbd22d56fb4873d8dfd14a2bde0df966156 |
