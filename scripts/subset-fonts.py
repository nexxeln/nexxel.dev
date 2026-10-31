# /// script
# requires-python = ">=3.11"
# dependencies = ["fonttools[woff]==4.68.0", "brotli==1.2.1"]
# ///

import hashlib
import html
import io
import json
import re
from pathlib import Path
from urllib.request import urlopen

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
SOURCES = Path(__file__).resolve().parent / "fonts"
OUTPUT = ROOT / "public/fonts"
COMMIT = "2e05c1cf00a6e4f40a4b931600a90881c26e15cd"
SOURCE_URL = f"https://raw.githubusercontent.com/google/fonts/{COMMIT}/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf"
FEATURES = ["calt", "ccmp", "mark"]
WEIGHTS = (400, 700)
CORE = set(range(0x20, 0x7F)) | {0x00A0, 0x00B7, 0x2010, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026}
HYPHENS = {0x2010, 0x2011}
SHARED_MARKS = {0x0304, 0x0308}
ORIGINAL_PARTS = {
    "core": "70bc3e132a0a741e-s.p.15008bfb.woff2",
    "extended": "3fe682a82f50d426-s.23358719.woff2",
}


def unicode_range(characters):
    runs = []
    for codepoint in sorted(characters):
        if runs and codepoint == runs[-1][-1] + 1:
            runs[-1][-1] = codepoint
        else:
            runs.append([codepoint, codepoint])
    return ",".join(f"U+{start:04X}" + (f"-{end:04X}" if start != end else "") for start, end in runs)


def generate():
    source = SOURCES / "JetBrainsMono-2.211.ttf"
    source_info = json.loads((SOURCES / "source.json").read_text())
    if not source.exists():
        source.write_bytes(urlopen(SOURCE_URL).read())
    source_bytes = source.read_bytes()
    assert hashlib.sha256(source_bytes).hexdigest() == source_info["sha256"], "Font source changed"
    original_coverage = set(source_info["original_coverage"])
    original_parts = {
        part: set(next(font["characters"] for font in source_info["original_fonts"] if font["file"] == filename))
        for part, filename in ORIGINAL_PARTS.items()
    }
    paths = [path for pattern in ["*.tsx", "*.ts", "*.css"] for path in sorted((ROOT / "src").rglob(pattern))]
    paths += sorted((ROOT / "posts").glob("*.mdx"))
    used = {ord(c) for path in paths for c in html.unescape(path.read_text())}
    used |= {0x2010, 0x2190, 0x2192, 0x00B7, 0x20AC, 0x2122}
    retained = (used | CORE | HYPHENS | SHARED_MARKS | set(range(0x20, 0x180))) & (original_coverage | HYPHENS)
    source_font = TTFont(io.BytesIO(source_bytes), recalcTimestamp=False, recalcBBoxes=False)
    for table in source_font["cmap"].tables:
        if table.isUnicode():
            for codepoint in HYPHENS:
                table.cmap[codepoint] = table.cmap[0x002D]
    retained &= set(source_font.getBestCmap())
    physical_weights = (400, 800)
    # Keep the original positive tuples. Re-instancing rounds their IUP deltas.
    assert source_font["fvar"].axes[0].defaultValue == WEIGHTS[0], "Exact trimming requires the original default weight as its lower bound"
    source_font["fvar"].axes[0].minValue = WEIGHTS[0]
    source_font["fvar"].instances = [i for i in source_font["fvar"].instances if i.coordinates["wght"] >= WEIGHTS[0]]
    for name, variations in source_font["gvar"].variations.items():
        source_font["gvar"].variations[name] = [v for v in variations if v.axes["wght"][2] > 0]
    source_font["avar"].segments["wght"] = {k: v for k, v in source_font["avar"].segments["wght"].items() if k == -1 or k >= 0}
    stat = source_font["STAT"].table
    stat.AxisValueArray.AxisValue = [v for v in stat.AxisValueArray.AxisValue if v.AxisIndex != 0 or (v.NominalValue if v.Format == 2 else v.Value) >= WEIGHTS[0]]
    stat.AxisValueCount = len(stat.AxisValueArray.AxisValue)
    for value in stat.AxisValueArray.AxisValue:
        if value.AxisIndex == 0 and value.Format == 2:
            value.RangeMinValue = max(value.RangeMinValue, WEIGHTS[0])
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest_path = ROOT / "src/app/fonts.json"
    old_files = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    manifest = {}
    css = []
    original_core_ranges = set(range(0x100)) | set(range(0x2000, 0x2070)) | {
        0x0131, 0x0152, 0x0153, 0x02BB, 0x02BC, 0x02C6, 0x02DA, 0x02DC,
        0x0304, 0x0308, 0x0329, 0x20AC, 0x2122, 0x2191, 0x2193,
        0x2212, 0x2215, 0xFEFF, 0xFFFD,
    }
    core = (original_parts["core"] & original_core_ranges) | HYPHENS | SHARED_MARKS
    for part, characters in [("extended", (retained - core) | SHARED_MARKS), ("core", retained & core)]:
        normalization = original_parts[part]
        if part == "extended":
            normalization &= set(range(0x20, 0x180)) | {0x000D, 0x0237, *SHARED_MARKS}
        internal_characters = characters | normalization
        buffer = io.BytesIO()
        source_font.save(buffer)
        font = TTFont(io.BytesIO(buffer.getvalue()), recalcTimestamp=False, recalcBBoxes=False)
        options = subset.Options()
        options.hinting = True
        options.notdef_outline = True
        options.glyph_names = True
        options.layout_features = FEATURES
        options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17, 25]
        options.name_legacy = True
        options.name_languages = [0x409]
        options.recalc_timestamp = False
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=internal_characters)
        subsetter.subset(font)
        for tag in ["fpgm", "prep", "cvt ", "gasp"]:
            if tag in font:
                del font[tag]
        for record in font["name"].names:
            if record.nameID in [1, 3, 4, 6, 16, 25]:
                text = "NexxelMono" if record.nameID in [6, 25] else "Nexxel Mono"
                record.string = text.encode(record.getEncoding())
        font.flavor = "woff2"
        result = io.BytesIO()
        font.save(result)
        data = result.getvalue()
        digest = hashlib.sha256(data).hexdigest()
        filename = f"nexxel-mono-{part}-{digest[:12]}.woff2"
        generated = TTFont(io.BytesIO(data))
        actual = set(generated.getBestCmap())
        assert actual == internal_characters, f"Unexpected {part} cmap"
        assert [(a.axisTag, a.minValue, a.maxValue) for a in generated["fvar"].axes] == [("wght", *physical_weights)]
        assert not any(tag in generated for tag in ["fpgm", "prep", "cvt ", "gasp"])
        assert not any(getattr(generated["glyf"][g], "program", None) and generated["glyf"][g].program.getBytecode() for g in generated.getGlyphOrder())
        assert all("JetBrains" not in n.toUnicode() for n in generated["name"].names if n.nameID in [1, 3, 4, 6, 16, 25])
        (OUTPUT / filename).write_bytes(data)
        ranges = unicode_range(characters)
        manifest[part] = {"url": f"/fonts/{filename}", "bytes": len(data), "glyphs": generated["maxp"].numGlyphs, "sha256": digest, "unicodeRange": ranges, "normalizationRange": unicode_range(actual - characters)}
        css.append(f'''@font-face {{
  font-family: "Nexxel Mono";
  font-style: normal;
  font-weight: {WEIGHTS[0]} {WEIGHTS[1]};
  font-display: swap;
  src: url("/fonts/{filename}") format("woff2");
  unicode-range: {ranges};
}}''')
        print(part, len(data), "bytes", generated["maxp"].numGlyphs, "glyphs")
    css.append('''@font-face {
  font-family: "JetBrains Mono Fallback";
  src: local("Arial");
  ascent-override: 75.79%;
  descent-override: 22.29%;
  line-gap-override: 0.0%;
  size-adjust: 134.59%;
}

body {
  --font-jetbrains-mono: "Nexxel Mono", "JetBrains Mono Fallback";
}''')
    (ROOT / "src/app/fonts.css").write_text("\n\n".join(css) + "\n")
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    for entry in old_files.values():
        path = ROOT / "public" / entry["url"].lstrip("/")
        if path.parent == OUTPUT and re.fullmatch(r"nexxel-mono-(core|extended)-[0-9a-f]{12}\.woff2", path.name) and path.name not in {Path(item["url"]).name for item in manifest.values()}:
            path.unlink(missing_ok=True)


if __name__ == "__main__":
    generate()
