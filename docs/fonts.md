# Font measurements and verification

Every existing page transfers **40,480 → 31,248 font bytes**, a reduction of
9,232 bytes or 22.8%. The two generated files total **39,784 bytes**, down from
86,320 bytes across the six original Google subsets.

The final comparison has **zero changed pixels across 42 captures and
203,693,830 pixels**. This result covers Chrome for Testing 146.0.7680.153 on
macOS, at widths of 1280 and 390 pixels and device scale factor 1. It is not a
Firefox, Safari, Windows, or latency benchmark.

## Original files

All six files are JetBrains Mono 2.211, normal style, with a `wght` axis whose
minimum, default, and maximum are 100, 400, and 800. Italics are synthetic.
Every file has an eight-byte `gasp` table and zero glyph instruction bytes.
There are no `fpgm`, `prep`, or `cvt ` tables in the shipped files.

| Subset and file prefix | Bytes | Glyphs | Cmap entries | GSUB | GPOS |
| --- | ---: | ---: | ---: | --- | --- |
| Latin, `70bc3e132a0a741e` | 40,480 | 394 | 229 | calt, ccmp, frac, locl | mark |
| Latin extended, `3fe682a82f50d426` | 15,204 | 261 | 190 | ccmp, locl | mark |
| Cyrillic, `cc545e633e20c56d` | 12,064 | 132 | 102 | ccmp | mark |
| Cyrillic extended, `13bf9871fe164e7f` | 2,020 | 15 | 10 | none | none |
| Greek, `71b036adf157cdcf` | 9,084 | 114 | 83 | ccmp | none |
| Vietnamese, `89b21bb081cb7469` | 7,468 | 155 | 115 | ccmp | mark |
| Total | 86,320 | 1,071 | | | |

Every original page preloads only
`/_next/static/media/70bc3e132a0a741e-s.p.15008bfb.woff2`. The other five files
are conditional downloads, not part of the 40,480-byte ordinary-page total.
The extended verification fixture also fetches the 15,204-byte Latin extended
file, for 55,684 bytes total.

Full filenames, hashes, axes, character lists, names, and table inventories are
in [`source.json`](../scripts/fonts/source.json) and
[`results.json`](../scripts/fonts/results.json).

## Observed requirements

The source audit includes all `src` files and all 15 MDX posts, including inline
component settings. The browser census also records computed styles for text
on every route.

- The web font uses weights 400, 500, 600, and 700. Actual italic prose uses
  weight 400. The fixture also checks italic 500, 600, and 700, including nested
  strong text at its computed weight of 600.
- Shiki applies font settings through inline CSS variables. The code blocks
  nevertheless use Tailwind's system monospace stack. That stack stays intact.
  The request probes confirm that accented code uses Menlo without fetching the
  extended web font.
- No explicit `font-feature-settings` or `font-variation-settings` overrides
  occur. Home and blog listings use `tabular-nums`. This font is already
  monospaced and has no `tnum` feature to retain.
- Default shaping needs `calt`, `ccmp`, and `mark`. The output removes `frac`,
  `locl`, and other unused source-font features.
- Computed `hyphens` is `manual`, not `auto`. U+2010 and U+2011 are still tested.
  The original browser renders them through the custom font's ASCII hyphen
  despite their absent cmap entries. The output encodes that same glyph for
  both characters, rather than introducing the source font's different glyph.
- The output retains supported Latin-1 and Latin Extended-A characters.
  U+0132 and U+0133 are absent from the original font and remain on fallback.
  Other source-only coverage is not introduced.
- No existing content contains CJK. The identical test fixture covers Chinese,
  Japanese, and Korean. Browser font inspection confirms PingFang SC and Apple
  SD Gothic Neo, not a web font, render those characters.

The source scan is conservative. It includes source strings, decoded HTML
entities, CSS, and code samples. Review the actual computed usage when content
or font settings change; the script does not discover new axis or feature
requirements automatically.

## Generated files and intentional exceptions

| File | Before bytes | After bytes | Glyphs | Cmap entries | Features |
| --- | ---: | ---: | ---: | ---: | --- |
| Core, replacing Latin | 40,480 | 31,248 | 391 | 231 | calt, ccmp, mark |
| Extended, replacing Latin extended | 15,204 | 8,536 | 192 | 131 | ccmp, mark |
| Other four subsets | 30,636 | 0 | | | |
| Total | 86,320 | 39,784 | 583 | 362 | |

These exceptions keep the original appearance by default.

1. **The core includes Latin-1, not only ASCII and punctuation.** Moving those
   characters into a smaller extended face changes normalization and accent
   rasterization. A measured smaller core was 24,772 bytes but changed four
   pixels on the macron above `ā` in the desktop fixture. The exact default
   costs 6,476 additional preloaded bytes. It also makes the extended file
   smaller and avoids an extra download on the existing accented pages.
2. **The physical axis is 400 to 800, while CSS exposes 400 to 700.** The script
   removes unused negative variation tuples without re-instancing the positive
   tuples. The 800 interpolation endpoint remains. Clipping to 700 saves
   1,088 core bytes and 388 extended bytes, but changes hundreds of glyph
   outlines by up to 0.957 font units. That optimization is not enabled.
3. **Some cmap entries are hidden shaping support.** U+0304 and U+0308 overlap
   between the two faces, with the core declared last. Other internal entries
   support normalization without appearing in `unicode-range`. Every
   advertised character is verified to exist in its file; hidden entries do
   not trigger downloads. The extended file retains only the needed Latin
   coverage and a few original normalization helpers.
4. **FontTools' destructive defaults are not used blindly.** Glyph names and
   original global bounds remain because removing or recalculating them
   changes native rasterization. Empty instruction structures and the missing
   glyph outline also remain. The script explicitly removes all hint tables,
   then reopens both outputs and verifies zero glyph instruction bytes.

[`alternatives.json`](../scripts/fonts/alternatives.json) records the measured
rejected alternatives. No visible or subpixel font difference was accepted.

The generated family is internally renamed to `Nexxel Mono`. The original OFL
does not declare a Reserved Font Name, but the rename also avoids reusing the
upstream primary names. Copyright and license metadata remain, with the
[OFL alongside the deployed files](../public/fonts/OFL.txt).

`font-display: swap` is unchanged. The fallback remains local Arial with the
original ascent, descent, line-gap, and size adjustments, followed by the same
system `monospace` fallback. Both subsets belong to one family, with the local
fallback after both faces. The font variable remains on `body`; moving it to
`:root` changes Tailwind's code-font inheritance and is a regression.

Only the hashed core URL is preloaded. Hashed font URLs retain the original
one-year immutable caching behavior. OG image font loading is server-side and
is unchanged. Core embedding and idle precaching are deferred.

## Per-page transfer and pixel results

Each row has the same byte total at both tested widths. Every row has zero
changed pixels at both widths.

| Page | Before bytes | After bytes |
| --- | ---: | ---: |
| `/` | 40,480 | 31,248 |
| `/blog` | 40,480 | 31,248 |
| `/projects` | 40,480 | 31,248 |
| `/work` | 40,480 | 31,248 |
| 404 | 40,480 | 31,248 |
| `/blog/code-chunk` | 40,480 | 31,248 |
| `/blog/ct3a` | 40,480 | 31,248 |
| `/blog/dfa` | 40,480 | 31,248 |
| `/blog/gen-license` | 40,480 | 31,248 |
| `/blog/neovim-to-vscode` | 40,480 | 31,248 |
| `/blog/new-mac` | 40,480 | 31,248 |
| `/blog/nexdle` | 40,480 | 31,248 |
| `/blog/organising-life` | 40,480 | 31,248 |
| `/blog/pattern-matching` | 40,480 | 31,248 |
| `/blog/pipe` | 40,480 | 31,248 |
| `/blog/rag-is-dead` | 40,480 | 31,248 |
| `/blog/ricing-macos` | 40,480 | 31,248 |
| `/blog/rust` | 40,480 | 31,248 |
| `/blog/typesafe-database` | 40,480 | 31,248 |
| `/blog/wsl-workflow` | 40,480 | 31,248 |
| Injected extended/italic/CJK fixture | 55,684 | 39,784 |

All real pages request only the core. The fixture requests both files but still
preloads only the core. Six additional request probes, each repeated in five
cold browser contexts, confirm that only the Latin Extended-A text fetches the
extended file. ASCII, Latin-1, CJK, hyphens, and accented system-font code do not.
The byte totals have no run-to-run variation. See
[`requests.json`](../scripts/fonts/requests.json).

An additional full Latin-1 and Latin Extended-A matrix also has zero changed
pixels across 8,700,160 pixels. It checks every character from U+00A0 to U+017F
at 12, 15, 16, and 24 pixels, at all four used weights, in normal and italic
styles. It also confirms that U+0132 and U+0133 use Arial on both sides. See
[`matrix.json`](../scripts/fonts/matrix.json).

Bytes are WOFF2 response bodies, excluding HTTP headers and CSS. Screenshot
captures use fresh browser contexts with caching disabled by request routing.

## Reproduce the comparison

Use production builds with identical content. The original build was preserved
from commit `b65ab13e9f3dfbe6ccd08eb330d4555e17a000af` before integration.
Do not compare different revisions of the posts.

Set `BROWSER` to the executable path of the same Chromium binary for both runs.
Start the original build on port 3101 and the changed build on port 3105.

```sh
uv run scripts/verify-fonts.py capture \
  --url http://localhost:3101 --output /path/to/before \
  --assets /path/to/shared-image-cache --browser "$BROWSER"
uv run scripts/verify-fonts.py capture \
  --url http://localhost:3105 --output /path/to/after \
  --assets /path/to/shared-image-cache --browser "$BROWSER"
uv run scripts/verify-fonts.py compare \
  --baseline /path/to/before --after /path/to/after
```

Capture refuses to overwrite an existing output directory. Comparison checks
identical text, computed font settings, image dimensions, every RGB pixel, and
browser errors. It also checks core-only preloading, conditional extended
downloads against the rendered font's character requirements, successful font
responses, and exact payload totals. The only normalized style name is the
deliberate family rename. Any nonzero pixel difference fails.

The loading guards were also tested against copied reports with an extra
extended preload and an unnecessary extended download. Both fail even though
their image pixels remain unchanged. The result records separate capture and
comparison script hashes because these assertions were added after capture.

Seven original images are animated GIFs. The first full comparison differed
only inside the animated `bat` demo on `/blog/new-mac`. The final captures use
the same cached image bytes, frozen to frame zero on both sides. This changes
only test responses, not site content. Two existing image URLs return HTTP 404
in both builds; those responses are also held identical. Fetch exceptions fail
verification instead of becoming cached missing images.

The complete capture paths, image hashes, page requests, animation hashes, and
comparison data are in [`results.json`](../scripts/fonts/results.json). The
fixture's before, after, and actual zero-difference PNGs are in
[`scripts/fonts/proof`](../scripts/fonts/proof). The full-page captures remain
in the local artifact directories recorded in the JSON.

`Build the Lever` led to the manual generator and rerunnable browser check.
`Prove It Works` kept nonzero accent differences out of the default output.
`Model the Domain` kept source coverage, advertised ranges, and normalization
support separate rather than treating them as one character set.
