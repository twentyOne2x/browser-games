# Doom shareware data provenance

DOOM1.WAD is the unchanged v1.9 shareware episode, Knee-Deep in the Dead.
No registered Doom data, Freedoom WAD or custom levels are shipped.
Game data archives and WAD files are not committed.

## Verified archives

Both official idgames mirrors returned the same bytes:

| File and source | Bytes | SHA-256 |
| --- | ---: | --- |
| [doom19s.zip, gamers.org](https://www.gamers.org/pub/idgames/idstuff/doom/doom19s.zip) | 2450688 | cacf0142b31ca1af00796b4a0339e07992ac5f21bc3f81e7532fe1b5e1b486e6 |
| [doom19s.zip, youfailit.net](https://youfailit.net/pub/idgames/idstuff/doom/doom19s.zip) | 2450688 | cacf0142b31ca1af00796b4a0339e07992ac5f21bc3f81e7532fe1b5e1b486e6 |
| DOOMS_19.EXE, concatenated DOOMS_19.1 then DOOMS_19.2 | 2433820 | aa5b13f371239c2780fe3c79400a02cecc9f1d9b699dfe53d2c33e68b1dc6b0f |
| DOOM1.WAD, extracted from that self-extractor | 4196020 | 1d7d43be501e67d927e415e0b8f3e29c3bf33075e859721816f652a526cac771 |

DOOM1.WAD MD5: `f0cefca49926d00903cf57551d901abe`.
DOOM1.WAD SHA-1: `5b2e249b9c5133ec987b3ea77596381dc0d6bc1d`.

## Publisher redistribution text

The archive's DOOMS_19.DAT identifies `LINE5=SHAREWARE VERSION` and contains the publisher's exact redistribution invitation:

> PLEASE DISTRIBUTE!!!

The same file identifies id Software and Copyright (C) 1993-1995.
This is the archive's direct publisher redistribution notice. It has no separate LICENSE.DOC or standalone shareware EULA, and this document does not claim one exists.
README.TXT asks distributors not to modify shareware levels. The WAD is unchanged byte for byte.
The page and game data are supplied free of charge. The shareware invitation is separate from the engine's GPL-2.0 licence.
Vendor text files from both archive layers are retained unchanged in legal/.
The third-party DMFAQ66A-D.TXT files have separate restrictions on inclusion in computer software and are not part of the playable site. DOS executables are not hosted or executed.

## Extraction and verification

INSTALL.BAT documents running DEICE.EXE, then DOOMS_19.EXE, then SETUP.
DOOMS_19.DAT supplies SIZE=2433820. DEICE joins the two numbered parts to that size.
The joined file is a PKZIP self-extractor. Python's ZipFile reads its ZIP payload after the DOS stub without executing DOS code.
`scripts/prepare.py` compares both archives, validates every ZIP CRC, reconstructs that exact file, extracts DOOM1.WAD and asserts the required size, MD5, SHA-1 and SHA-256.
Rerun: `python3 scripts/prepare.py`.

## Retained vendor files

All source bytes come from the two verified doom19s.zip addresses above.
DOOMS_19.DAT and INSTALL.BAT are outer ZIP members. The other files are inner ZIP members.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| DOOMS_19.DAT | 226 | 94e78ec5e44728613bd807485eb9a8a97ba8ff5fdb6d96ecfd4c1a6a8c3d9125 |
| INSTALL.BAT | 184 | 1c49dca7b64a1ceb96b062ef7da0dcb2e5879d4dfbe902a10f5bfc94fe0e3a7d |
| README.TXT | 21631 | 17878ebe5ca179de7ec2cc90bbabbc922ab69924118be168a25f8d317f65a2ff |
| HELPME.TXT | 4690 | b8ee1678923e1130700ec6a73cf50ed320091c9f79a933124e8c99e347aae5f5 |
| ORDER.FRM | 4617 | a7fa68a0021b3d04abd781e74175511a1a96d923c544fce19805ea5a9696df86 |
| DM.DOC | 6397 | aade82ddad8b05b9e57121b80158893d2b3f2f8a2eed9147e720947dd9821b4e |
| DWANGO.DOC | 10623 | 2300bcb497b18389de4fa8ed7c2822710967b4a26d6d162bccae9cd8cebd0cee |
