<samp>
stack: next.js, tailwindcss, typescript, mdx, vercel
</samp>

## Fonts

Font processing is manual, not part of the build.

```sh
uv run scripts/subset-fonts.py
bun run build
bun run lint
```

Commit the generated `public/fonts/*.woff2`, `src/app/fonts.css`, and
`src/app/fonts.json` together. The source font and pinned tool versions make the
output reproducible.

Rerun after changing content, CSS, component font settings, languages, or the
source font. Review `WEIGHTS`, `FEATURES`, and the character split when those
requirements change. Keep `font-display` and fallback settings unchanged.

See [the font measurements and pixel verification](docs/fonts.md) before changing
the split or trimming more data.
