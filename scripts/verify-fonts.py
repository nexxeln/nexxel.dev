# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright==1.56.0", "pillow==13.0.0", "fonttools[woff]==4.68.0"]
# ///

import argparse
import hashlib
import io
import json
from pathlib import Path
from urllib.parse import urlparse

from fontTools.ttLib import TTFont
from PIL import Image, ImageChops, UnidentifiedImageError
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
FIXTURE = """() => {
  const section = document.createElement('article');
  section.className = 'prose prose-invert prose-tuned-mono';
  section.id = 'font-verification-fixture';
  const text = 'ASCII fi fl ffi != !== => -> === <= >= ... “quotes” ‘apostrophes’ – — …';
  for (const weight of [400, 500, 600, 700]) {
    for (const style of ['normal', 'italic']) {
      const p = document.createElement('p');
      p.style.fontWeight = weight;
      p.style.fontStyle = style;
      p.textContent = `${weight} ${style} ${text}`;
      const strong = document.createElement('strong');
      strong.textContent = ' bold inside italics';
      p.append(strong);
      section.append(p);
    }
  }
  for (const text of [
    'Accents café naïve voilà Ångström Łódź Āā Ğğ İı Œœ Ÿž',
    'Combining cafe\u0301 A\u030a n\u0303 a\u0308',
    'Hyphen \u2010 soft\u00adhyphen nonbreaking\u2011hyphen',
    'System fallback 中文 日本語 한국어 😀 → ← ↑ ↓ • · © € ™'
  ]) {
    const p = document.createElement('p');
    p.textContent = text;
    section.append(p);
  }
  document.querySelector('body > div.max-w-4xl').replaceChildren(section);
}"""

CENSUS = """() => {
  const groups = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent.trim() || node.parentElement.closest('script,style')) continue;
    const s = getComputedStyle(node.parentElement);
    if (s.display === 'none' || s.visibility === 'hidden') continue;
    const properties = Object.fromEntries([
      'fontFamily','fontWeight','fontStyle','fontStretch','fontFeatureSettings',
      'fontVariationSettings','fontVariantLigatures','fontVariantNumeric',
      'fontOpticalSizing','hyphens'
    ].map(k => [k,s[k]]));
    const key = JSON.stringify(properties);
    if (!groups.has(key)) groups.set(key, {...properties, characters: new Set()});
    for (const char of node.textContent) groups.get(key).characters.add(char.codePointAt(0));
  }
  return {
    text: document.body.innerText,
    groups: [...groups.values()].map(g => ({...g, characters: [...g.characters].sort((a,b)=>a-b)})),
    preloads: [...document.querySelectorAll('link[rel=preload][as=font]')].map(e=>new URL(e.href).pathname),
    faces: [...document.fonts].map(f=>({family:f.family, style:f.style, weight:f.weight, unicodeRange:f.unicodeRange, status:f.status})),
    codepoints: [...new Set([...document.body.innerText].map(c=>c.codePointAt(0)))].sort((a,b)=>a-b)
  };
}"""


def inventory(path):
    font = TTFont(path)
    return {
        "file": path.name,
        "bytes": path.stat().st_size,
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "glyphs": font["maxp"].numGlyphs,
        "characters": sorted(font.getBestCmap()),
        "axes": [
            {"tag": a.axisTag, "min": a.minValue, "default": a.defaultValue, "max": a.maxValue}
            for a in font["fvar"].axes
        ] if "fvar" in font else [],
        "features": {
            tag: sorted({r.FeatureTag for r in font[tag].table.FeatureList.FeatureRecord})
            for tag in ["GSUB", "GPOS"] if tag in font and font[tag].table.FeatureList
        },
        "hint_tables": {tag: len(font.getTableData(tag)) for tag in ["fpgm", "prep", "cvt ", "gasp"] if tag in font},
        "instructed_glyphs": sum(
            bool(getattr(font["glyf"][g], "program", None) and font["glyf"][g].program.getBytecode())
            for g in font.getGlyphOrder()
        ) if "glyf" in font else 0,
        "names": {str(n.nameID): n.toUnicode() for n in font["name"].names if n.nameID in [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17, 25]},
    }


def capture(args):
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=False)
    assets = args.assets.resolve()
    assets.mkdir(parents=True, exist_ok=True)
    routes = ["/", "/blog", "/projects", "/work", "/font-verification-not-found"]
    routes += ["/blog/" + p.stem for p in sorted((ROOT / "posts").glob("*.mdx"))]
    records = []
    frozen_animations = {}
    frozen_frames = {}

    def freeze_frame(body, info):
        digest = hashlib.sha256(body).hexdigest()
        if digest in frozen_frames:
            return frozen_frames[digest], "image/png"
        try:
            with Image.open(io.BytesIO(body)) as image:
                if getattr(image, "is_animated", False):
                    frozen_animations[info["url"]] = {"frames": image.n_frames, "frame": 0, "source_sha256": digest}
                    image.seek(0)
                    output = io.BytesIO()
                    image.convert("RGBA").save(output, format="PNG")
                    frozen_frames[digest] = output.getvalue()
                    return output.getvalue(), "image/png"
        except UnidentifiedImageError:
            pass
        return body, info["content_type"]

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=args.browser)
        for width in [1280, 390]:
            for route in routes + ["/fixture"]:
                context = browser.new_context(viewport={"width": width, "height": 900}, device_scale_factor=1, color_scheme="dark", locale="en-US", reduced_motion="reduce")
                page = context.new_page()
                errors = []
                fonts = {}

                def freeze_image(request_route):
                    request = request_route.request
                    if request.resource_type != "image":
                        request_route.continue_()
                        return
                    parsed = urlparse(request.url)
                    key = parsed.path + "?" + parsed.query if parsed.hostname in ["localhost", "127.0.0.1"] else request.url
                    digest = hashlib.sha256(key.encode()).hexdigest()
                    file = assets / digest
                    metadata = assets / (digest + ".json")
                    if file.exists():
                        info = json.loads(metadata.read_text())
                        if "error" in info:
                            errors.append(f"Cached image fetch failed: {key}: {info['error']}")
                            request_route.abort()
                            return
                        body, content_type = freeze_frame(file.read_bytes(), info)
                        request_route.fulfill(status=info["status"], content_type=content_type, body=body)
                        return
                    try:
                        response = request_route.fetch(timeout=20000)
                        body = response.body()
                        file.write_bytes(body)
                        info = {"url": key, "status": response.status, "content_type": response.headers.get("content-type", "application/octet-stream")}
                        metadata.write_text(json.dumps(info))
                        body, content_type = freeze_frame(body, info)
                        request_route.fulfill(status=info["status"], content_type=content_type, body=body)
                    except Exception as error:
                        errors.append(f"Image fetch failed: {key}: {error}")
                        request_route.abort()

                def collect(response):
                    if response.request.resource_type == "font":
                        body = response.body()
                        name = Path(urlparse(response.url).path).name
                        (output / name).write_bytes(body)
                        fonts[urlparse(response.url).path] = {"bytes": len(body), "status": response.status}

                page.route("**/*", freeze_image)
                page.on("response", collect)
                page.on("pageerror", lambda error: errors.append(str(error)))
                response = page.goto(args.url.rstrip("/") + ("/blog/rag-is-dead" if route == "/fixture" else route), wait_until="networkidle", timeout=90000)
                if route == "/fixture":
                    page.evaluate(FIXTURE)
                    page.locator("#font-verification-fixture").wait_for(state="visible")
                page.evaluate("async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(()=>{}))); }")
                page.wait_for_function("[...document.querySelectorAll('nav span')].every(e => !e.textContent.includes('_'))")
                page.wait_for_timeout(1200)
                record = page.evaluate(CENSUS)
                slug = (route.strip("/").replace("/", "--") or "home") + f"--{width}"
                page.screenshot(path=str(output / (slug + ".png")), full_page=True, animations="disabled")
                record.update({"route": route, "width": width, "screenshot": slug + ".png", "status": response.status, "font_requests": fonts, "font_bytes": sum(f["bytes"] for f in fonts.values()), "errors": errors})
                records.append(record)
                print(slug, record["font_bytes"], "font bytes", flush=True)
                context.close()
        browser.close()
    report = {"browser": args.browser, "pages": records, "fonts": [inventory(f) for f in sorted(output.glob("*.woff2"))], "frozen_animations": frozen_animations}
    (output / "report.json").write_text(json.dumps(report, indent=2) + "\n")
    if any(page["errors"] for page in records):
        raise SystemExit("Capture failed; inspect report.json errors")


def compare(args):
    baseline = json.loads((args.baseline / "report.json").read_text())
    after = json.loads((args.after / "report.json").read_text())
    manifest = json.loads((ROOT / "src/app/fonts.json").read_text())

    def advertised_characters(face):
        characters = set()
        for span in face["unicodeRange"].split(","):
            endpoints = [int(value, 16) for value in span.removeprefix("U+").split("-")]
            characters.update(range(endpoints[0], endpoints[-1] + 1))
        return characters

    extended_only = advertised_characters(manifest["extended"]) - advertised_characters(manifest["core"])
    results = []
    for a, b in zip(baseline["pages"], after["pages"], strict=True):
        assert (a["route"], a["width"]) == (b["route"], b["width"])
        assert a["text"] == b["text"], f"Content changed on {a['route']}"
        assert not a["errors"], f"Baseline errors on {a['route']}"
        expected_groups = sorted(json.dumps(group, sort_keys=True) for group in a["groups"])
        actual_groups = sorted(json.dumps({**group, "fontFamily": group["fontFamily"].replace('"Nexxel Mono"', '"JetBrains Mono"')}, sort_keys=True) for group in b["groups"])
        assert expected_groups == actual_groups, f"Computed font settings changed on {a['route']}"
        assert set(b["preloads"]) == {manifest["core"]["url"]}, f"Expected only the core preload on {b['route']}"
        needs_extended = any(
            group["fontFamily"].startswith('"Nexxel Mono"') and extended_only.intersection(group["characters"])
            for group in b["groups"]
        )
        expected_faces = [manifest["core"], *([manifest["extended"]] if needs_extended else [])]
        assert set(b["font_requests"]) == {face["url"] for face in expected_faces}, f"Unexpected font downloads on {b['route']}"
        assert all(font["status"] == 200 for font in b["font_requests"].values()), f"Failed font response on {b['route']}"
        assert b["font_bytes"] == sum(face["bytes"] for face in expected_faces), f"Unexpected font bytes on {b['route']}"
        before_image = Image.open(args.baseline / a["screenshot"]).convert("RGB")
        after_image = Image.open(args.after / b["screenshot"]).convert("RGB")
        same_size = before_image.size == after_image.size
        changed = None
        if same_size:
            diff = ImageChops.difference(before_image, after_image)
            r, g, blue = diff.split()
            mask = ImageChops.lighter(ImageChops.lighter(r, g), blue).point(lambda value: 255 if value else 0)
            changed = mask.histogram()[255]
            if changed:
                diff.save(args.after / (a["screenshot"].removesuffix(".png") + "--diff.png"))
        results.append({"route": a["route"], "width": a["width"], "before_bytes": a["font_bytes"], "after_bytes": b["font_bytes"], "same_size": same_size, "changed_pixels": changed, "total_pixels": before_image.width * before_image.height, "errors": b["errors"]})
    (args.after / "comparison.json").write_text(json.dumps(results, indent=2) + "\n")
    print(json.dumps(results, indent=2))
    if any(not r["same_size"] or r["changed_pixels"] or r["errors"] for r in results):
        raise SystemExit("Visual parity failed")


parser = argparse.ArgumentParser()
commands = parser.add_subparsers(dest="command", required=True)
capture_parser = commands.add_parser("capture")
capture_parser.add_argument("--url", required=True)
capture_parser.add_argument("--output", type=Path, required=True)
capture_parser.add_argument("--assets", type=Path, required=True)
capture_parser.add_argument("--browser", required=True)
compare_parser = commands.add_parser("compare")
compare_parser.add_argument("--baseline", type=Path, required=True)
compare_parser.add_argument("--after", type=Path, required=True)
arguments = parser.parse_args()
capture(arguments) if arguments.command == "capture" else compare(arguments)
