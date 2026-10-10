# 2048 data inventory

All runtime assets come from https://github.com/gabrielecirulli/2048 at commit `478b6ec346e3787f589e4af751378d06ded4cbbc`, tree `693fbb47db2d71aa65cc0e566a288473970233e6`. There is no separate game data archive. The icon and fonts below are byte-for-byte upstream files. They are listed here and in assets.json, cached under ignored data/, and included only in the site archive. No binary or font data is committed to this repository.

MIT redistribution sentence, quoted from pinned LICENSE.txt:

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:

Condition:

> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.

The full MIT license is shipped in legal/MIT.txt. Copyright (c) 2014 Gabriele Cirulli.

The WOFF name tables separately state: "Font software Copyright © 2012 Intel Corporation. Licensed under the Apache License, Version 2.0." The full Apache text is shipped in legal/Apache-2.0.txt, copied from the box's existing /usr/share/common-licenses/Apache-2.0. Fonts are unchanged, and the Intel notice is retained in the files and legal page.

Apache 2.0 section 2 grants redistribution, quoted from that full text:

> each Contributor hereby grants to You a perpetual,
> worldwide, non-exclusive, no-charge, royalty-free, irrevocable
> copyright license to reproduce, prepare Derivative Works of,
> publicly display, publicly perform, sublicense, and distribute the
> Work and such Derivative Works in Source or Object form.

This is free redistribution subject to the complete licenses and notice requirements, not a claim of public domain status.

| Data file | Bytes | SHA-256 | Pinned source address |
| --- | ---: | --- | --- |
| favicon.ico | 4286 | `392935e5853c28b5cd4ebd9ee2fc06bcfd87523c1e4bf059d948dcd0b5708b00` | https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/favicon.ico |
| style/fonts/ClearSans-Light-webfont.woff | 28700 | `465697ff07395574f9771970ca020bf64019dfbd96c2c64ba419c5d074336d90` | https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/style/fonts/ClearSans-Light-webfont.woff |
| style/fonts/ClearSans-Regular-webfont.woff | 26764 | `8c94cd2fdc93f5a86f1761c0ce14bb695f20e16dc1a585ccad7f0289bd3dbc76` | https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/style/fonts/ClearSans-Regular-webfont.woff |
| style/fonts/ClearSans-Bold-webfont.woff | 27120 | `b16e36cc53aa72023c67ab31c38290de77905dd2285f331189b2236100b8f849` | https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/style/fonts/ClearSans-Bold-webfont.woff |

All source-file hashes are in upstream.json. The build validates every source and data hash. site/SHA256SUMS covers every shipped file except itself. SHA256SUMS in the delivery folder covers the archives and other delivered files.

Unused upstream EOT/SVG fonts and app startup images are not shipped or cached as build inputs. No asset from another game or source is used.
