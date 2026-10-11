# The Last Pawn data and provenance

Source pin: `13ac4dab9393f9e6088deba09bdb7c63e9fb95ad`. Deployed author tree: `b35f563789de3e82a49a1e69caa66cc54fd1dfa0`. Files were fetched from the live author page, then compared byte for byte with that deployed tree. The JavaScript is hosted unchanged. The original stylesheet is changed only to use a relative font path. HTML changes and all adapter additions are listed in legal/SOURCE.txt.

Project MIT grant for code and original project graphics:

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The project README states: "This project is licensed under the MIT License." There are no separate restrictive notices on original game graphics.

Concert One embedded name metadata states: "This Font Software is licensed under the SIL Open Font License, Version 1.1." Full standard OFL grant:

> Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:

The unchanged font retains its embedded copyright: Copyright (c) 2011, 2011 Johan Kallas (johankallas@gmail.com), Copyright (c) 2011, 2011 Mihkel Virkus (mihkelvirkus@gmail.com), with Reserved Font Name Concert. The source repository does not contain full OFL text. legal/ConcertOne-OFL.txt combines that embedded copyright with complete standard OFL 1.1 text already installed locally at /usr/share/doc/fonts-noto-color-emoji/copyright (original file SHA256 3720722d2046accb40e1696f096b57c658b0b47d74031b3d114cf7545b840b3c). No third-party font or game data was downloaded.

## Fetched runtime files

Each row lists the exact fetched bytes before hosting patches. MIT means the project grant above, OFL means the font grant above. All addresses are provenance only and never requested by the hosted game.

| File | Bytes | SHA256 | License | Source |
| --- | ---: | --- | --- | --- |
| index.html | 1310 | 254e6d83e75f3bdfb7890330b08ee34d1d734628a29e797da923838b5c18b958 | MIT | https://gbrln.github.io/the-last-pawn/index.html |
| assets/index-CqnDThAh.js | 291857 | b817dd3aafa9949f4264b169f6092355cc70541685a830be3a22b2af679bdbcc | MIT | https://gbrln.github.io/the-last-pawn/assets/index-CqnDThAh.js |
| assets/index-B24FUZXh.css | 62284 | 47035a234c1500096c71bfd59f4cccbd99d4623025652bca0717ed99b0f11e31 | MIT | https://gbrln.github.io/the-last-pawn/assets/index-B24FUZXh.css |
| fonts/ConcertOne-Regular.ttf | 69996 | 6815318f61c9662d9d553476965ce137185f0c790bf47fb08932b58fcc71dc2d | OFL 1.1 | https://gbrln.github.io/the-last-pawn/fonts/ConcertOne-Regular.ttf |
| Cursor.png | 915 | 8a3a541129e1c489e9d09fe9746abbf60708939bc2e578b6281ef79cb0c319c9 | MIT | https://gbrln.github.io/the-last-pawn/Cursor.png |
| apple-touch-icon.png | 9241 | e1766b9c7d8d3191befbed10e9e761de65282a606d0cdd7e68b07bb81bc5e2cf | MIT | https://gbrln.github.io/the-last-pawn/apple-touch-icon.png |
| favicon-16x16.png | 596 | cba22c85de485438cd71f7283da242fbbcde15ce24f98390a521c05bd9658a8d | MIT | https://gbrln.github.io/the-last-pawn/favicon-16x16.png |
| favicon-32x32.png | 1195 | 9dcf13ae4242c128ed7261b0da8100029f1cedd896fc5cf771bc679baad489a6 | MIT | https://gbrln.github.io/the-last-pawn/favicon-32x32.png |
| favicon-48x48.png | 1803 | cce32cbd098087837c8183445fa2099d6ddf3391519c8c6b3ea94510cd914dd8 | MIT | https://gbrln.github.io/the-last-pawn/favicon-48x48.png |
| favicon-64x64.png | 2586 | 25cf8e1b635beb9bf4c06060463bd6b31a01c947140d4d27accfb7fa68230adb | MIT | https://gbrln.github.io/the-last-pawn/favicon-64x64.png |
| favicon-96x96.png | 4284 | 6fd11fbae8a40046550378281874ecfa17d1f1364836c4b97b4632f7746a3f51 | MIT | https://gbrln.github.io/the-last-pawn/favicon-96x96.png |

## Original game graphic source files

These are preserved in the pinned repository and bundled source. The game renders its inline SVG components from the unchanged author JavaScript. Unused raw assets are not copied to the site. Every file below uses the project MIT grant above.

| File | Bytes | SHA256 | Source |
| --- | ---: | --- | --- |
| src/assets/FlatCursor.svg | 2414 | 707c05441ad10b6a9047fd8664599f375a033b0bc24dc7278d26e50d297f6e8a | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/assets/FlatCursor.svg |
| src/features/game/assets/Bishop.svg | 3219 | 83f01b3eff48866e4108a9c6324b00c25b11c228d6b0a41c34236493c6190a99 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Bishop.svg |
| src/features/game/assets/King.svg | 15020 | df7b5358003b8321a84a586ec4a95409da7a1550594c85c244cd411e3272862d | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/King.svg |
| src/features/game/assets/Knight.svg | 2902 | a6640edc4720abeee1d4c00e7fc48d751fd8e32f3feb5426ad221b54d19b0ba1 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Knight.svg |
| src/features/game/assets/Pawn.svg | 3040 | 23464269ff8d0553f0648207a9bd4b21c3943eda86730611b10c8b8c9c2546c6 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Pawn.svg |
| src/features/game/assets/Player.svg | 1407 | 6e8bec444c60a6441e21d7e57b0ce7129d01487f05f1833ce4be71985f511940 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Player.svg |
| src/features/game/assets/Queen.svg | 5773 | 8cecc3c6a3afe946ad4922a8c496896e9ec4353901b82ef45d065783fb936269 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Queen.svg |
| src/features/game/assets/Rook.svg | 4119 | 1b65706037eb1347b5a4348a0ee0f81b452a68c98d76faccc619e018804f7626 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Rook.svg |
| src/features/game/assets/Shadow.svg | 181 | 011417b75159d003d897e74add16f91303ff66e29dd4c826bd767f0f81ea58af | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Shadow.svg |
| src/features/game/assets/SquareWarning.svg | 569 | 680026900d8ba964ca52ec43cc802d1b1f764cb4a72d880dd66856bc198703d7 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/SquareWarning.svg |
| src/features/game/assets/SquareWarningOpaque.svg | 508 | 58b4ee68685b567ee8ce32182e2fc5afddbaff891d52b1d3d343c2cea7c339f7 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/SquareWarningOpaque.svg |
| src/features/game/assets/SquareWarningOpaqueNoBorder.svg | 473 | a01e5ae5b9f04f1c8f1d39fe73d823afd7cb46d5c710e071a52964760dd0d4e8 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/SquareWarningOpaqueNoBorder.svg |
| src/features/game/assets/Warning.svg | 667 | acfad50087e6cc1fef398a381399b7ba19e8d688d777c5b44ee433b90beda5d1 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/assets/Warning.svg |
| src/features/game/components/piece/BishopSvg.jsx | 4090 | 689f81c0d152fae20568808b5387147a6079222589f6a4ce23a82cefdcb3e303 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/BishopSvg.jsx |
| src/features/game/components/piece/KnightSvg.jsx | 3647 | 7671afaf5a319661d1bce608373426b932d0dbc0893e22e428cccd05a66ab75d | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/KnightSvg.jsx |
| src/features/game/components/piece/PawnSvg.jsx | 3905 | 936d099f3505a3985d75ad01e98953250ed6e691d190d85ef80364f196beef7d | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/PawnSvg.jsx |
| src/features/game/components/piece/PlayerSvg.jsx | 2014 | 300e412dc64c91f3218dcf5c5fedc450a25fefeaa86801298fbbbad2864c27ae | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/PlayerSvg.jsx |
| src/features/game/components/piece/QueenSvg.jsx | 7223 | 171d5aa7ff0048aa87f818c8708eebdc5539386005450dcb8b0b97df4d9ffa81 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/QueenSvg.jsx |
| src/features/game/components/piece/RookSvg.jsx | 5178 | 335e677637f4cf44b0f8b94acb619911ccbca978b8726fbd83889829304c0eb1 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/RookSvg.jsx |
| src/features/game/components/piece/ShadowSvg.jsx | 489 | 1ef8ead5b3659530f0658eddda8bae3b5ca5592c8b3c657f34df05894e123687 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/piece/ShadowSvg.jsx |
| src/features/game/components/ui/GuideSvg.jsx | 3012 | 4b3e1cb8143558e33f39d80428319373e81112ceb79dcdee10913aab03a8c065 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/ui/GuideSvg.jsx |
| src/features/game/components/ui/QuitSvg.jsx | 1036 | 46c7e0b1b2db5354a8cff69d3136b370f623cac6b685bc00d6f9ce83214a9036 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/ui/QuitSvg.jsx |
| src/features/game/components/ui/ResetSvg.jsx | 1745 | 3bc584b7c2c5e4ad28285f5f3ef1738b93e5fe60b961b57bda9d8cf2867d2097 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/game/components/ui/ResetSvg.jsx |
| src/features/menu/assets/ControlsIcon.svg | 12092 | 0c367f0e2a7aae72f7a2292bb79c394078bb32d2cecd54bf044e781367404a79 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/menu/assets/ControlsIcon.svg |
| src/features/menu/assets/Guide.svg | 2773 | dd02c21fbc3ef7189e8dcda29cab52aee37007301b85606410f7094bd289e6c5 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/menu/assets/Guide.svg |
| src/features/menu/assets/Quit.svg | 799 | f1dd2bf11f3be0ef74b9dc885602b75e7cbf9cdebb800c34f6604c5b8054806c | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/menu/assets/Quit.svg |
| src/features/menu/assets/Reset.svg | 1506 | 883869613eda5cb9ea2f998647185eecdc4c9069ef3a60306b1a852eb1344ab7 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/menu/assets/Reset.svg |
| src/features/menu/components/ControlsIcon.jsx | 13168 | 88750568eaa9f5a54fc71b4df6d085cb2ef7f68af798cdef33b2b9f0632e878e | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/menu/components/ControlsIcon.jsx |
| src/features/menu/components/Logo.jsx | 23498 | 140fccf008f0e2ae78709813e1adf99cff70f8a6dce532af185a8136499ce193 | https://github.com/gbrln/the-last-pawn/blob/13ac4dab9393f9e6088deba09bdb7c63e9fb95ad/src/features/menu/components/Logo.jsx |

Runtime package notices are in legal/DEPENDENCIES.txt and versions/hashes in evidence/runtime-dependencies.json. Build dependencies and Playwright stay outside the hosted site. No GPL code or data is included. Unused public/readme logos and promotional graphics are excluded, including the Sass logo with separate CC-BY-SA-4.0 terms.
