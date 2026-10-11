# Bullet Hell data and source inventory

All game art, models and levels are procedural code. No external image, sound, map or data archive is loaded.

Original source: https://github.com/selenebun/bullethell/tree/75173f8c37868ac7f30b886da6d28560e8e4418b

## Free distribution grants

MIT, code and procedural data: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:"

OFL 1.1, unchanged Source Code Pro: "Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:"

LGPL 2.1 section 1, p5 source: "1. You may copy and distribute verbatim copies of the Library's complete source code as you receive it, in any medium, provided that you conspicuously and appropriately publish on each copy an appropriate copyright notice and disclaimer of warranty; keep intact all the notices that refer to this License and to the absence of any warranty; and distribute a copy of this License along with the Library."

LGPL sections 4 and 6 source obligations are met by local p5-source.tgz, including preferred modules, build scripts, readable library and dependency sources. The whole LGPL text is shipped.

ieee754 BSD-3-Clause: "Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:" Full conditions and disclaimer are preserved.

Other bundled dependencies use MIT, with grants and attribution in legal/dependency-notices/. Pins and download hashes are in legal/DEPENDENCIES.json.

## Runtime files

| File | Bytes | SHA256 | Licence and source |
| --- | ---: | --- | --- |
| fonts/SourceCodePro-Regular.ttf | 120548 | `2967dd73df838d2a2d390a638c6d7cfe9cd60c5ee2e162d8a1c10a70ea742b5c` | OFL 1.1, upstream pinned font name table 0/13, Adobe 2010/2012, version 1.017 |
| index.html | 3474 | `c0cd35d7274ef006793bc4c0a24ee5dfb0588ca26849b392bcea7cc93e9292fd` | MIT; upstream pinned file with listed frame patch |
| scripts/class/boss.js | 3136 | `b1e58bad6cf667651b41d5e7132f8ce08cd352c327bbd1151c041fe17288403a` | MIT; upstream pinned file |
| scripts/class/bullet.js | 2627 | `d9deb3183cb9197bf2ccd4c709cb7fd1f12b7fd529f83b34d4fe6314ee85f7ec` | MIT; upstream pinned file |
| scripts/class/emitter.js | 2519 | `8ded31697293d0666ba0210d873fd683fc8fbe88b74fa385f3d7973e554b7e1a` | MIT; upstream pinned file |
| scripts/class/enemy.js | 1124 | `787361ba499b44b781e384fb8db865728b7624bbc7b9d91b9a855427526f1f74` | MIT; upstream pinned file |
| scripts/class/entity.js | 2149 | `1d720e813fc0fe7fd392ffbc5108b6e6fedb3fe13b31f78ac681b330bead96c0` | MIT; upstream pinned file |
| scripts/class/item.js | 1183 | `8012b745ca8c6f00d337fe630fee51fd0a376958964a0e940490d6d0e426b92d` | MIT; upstream pinned file |
| scripts/class/particle.js | 1229 | `6b2d10c05defc141a7bd027b9670e21e5e2b32aad49da608456b883376de6ec4` | MIT; upstream pinned file |
| scripts/class/particle_system.js | 1044 | `74157cfc81d35ce2fee45951f0409541e6a993d02ee367977b07e173cd8ae726` | MIT; upstream pinned file |
| scripts/class/player.js | 2958 | `3c7a3bce2dcb786b69b751504c296af2e72d1d40d15b234484756219597dfc63` | MIT; upstream pinned file |
| scripts/class/ship.js | 1838 | `e6e942ae54d0ba29e49458dd9f26af15ac282c17d7e509492373271af62eb72f` | MIT; upstream pinned file |
| scripts/class/starfield.js | 1838 | `cec445e5c9190ca51c69d5ab59d0e306aa2a8b9ff7e54bb1e373dbc090305012` | MIT; upstream pinned file |
| scripts/class/wall.js | 1111 | `8a37d92d42bcb99484fff4e04e2448df26d4df192ebba86060374d0d870c82d0` | MIT; upstream pinned file |
| scripts/frame.js | 4011 | `59d52673cad8253e7224a2720c7797140bbef122d1525e09148652e389c159ca` | MIT; our frame adapter source supplied locally |
| scripts/lib/p5.min.js | 393537 | `183bafd797aa4292ea5af2e446777e12fbec1cb9e01149dead8e410d261f2ee3` | LGPL 2.1 and bundled MIT/BSD notices; official npm p5@0.6.0, unchanged |
| scripts/main.js | 10309 | `0315d6b3132a09870432b300dc16d0579f1d2020058a36265765320feb88e9f9` | MIT; upstream pinned file with listed frame patch |
| scripts/template/bosses.js | 9833 | `0e03bb2425238dfd9ec30e8eb419e26ea601d0b3521728ed5883b8136776665d` | MIT; upstream pinned file |
| scripts/template/bullets.js | 4851 | `5ff6c5a46c2bf6c768ec4615a0dd37e2ce51f429f2bb5dcb6975190d5c7c8f22` | MIT; upstream pinned file |
| scripts/template/enemies.js | 4690 | `b8f8ce69ad7b3ba108133b65bf73b594465cb9c695d3704a86f2df18aa11e9e5` | MIT; upstream pinned file |
| scripts/template/items.js | 1088 | `44197f57329fecd7261a998dd5030ea9c46891236c93d900323a3f9f8fc77439` | MIT; upstream pinned file |
| scripts/template/levels.js | 2721 | `668b8410e1b523dfa7ee896c2ef316d40c484b772ff57f3615f5199ba14c5489` | MIT; upstream pinned file |
| scripts/template/models.js | 8818 | `cb88419a11e2ec5c2d038fa951f0a32ae3aafabc64d4fe89f40f4e4079fd607a` | MIT; upstream pinned file |
| scripts/template/particles.js | 1002 | `a6107d8266a275e9e0edae252161c93434c02b9a56e2c3a597471cc71bb1dd93` | MIT; upstream pinned file |
| scripts/template/weapons.js | 436 | `9c700a544255a2aecee679481108f4de0864261f6bd2a10024a443635fd085c3` | MIT; upstream pinned file |
| scripts/util.js | 1653 | `a784cd129062a64dd66e2ec0c6339cc7f04c1ac8e3727ca9f356d00734cd0549` | MIT; upstream pinned file |
| style.css | 3999 | `bef74d3e2468a4abe428645e7a7e29f0156ffff499bfe6a02b4fdbcdc039e1c7` | MIT; upstream pinned file with listed frame patch |

Each original file source address is https://raw.githubusercontent.com/selenebun/bullethell/75173f8c37868ac7f30b886da6d28560e8e4418b/ followed by its file name. The three modified files and added adapter are listed in legal/SOURCE.txt. The p5 npm address is https://registry.npmjs.org/p5/-/p5-0.6.0.tgz.

Notices and source archives are accompanying provenance, not separately loaded game data. legal/FILES.sha256 inventories every served file except itself. It intentionally excludes self entries.
