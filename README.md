# nexxel.dev

my personal website — a minimal space for my thoughts, work, and experiments.

built with next.js, typescript, and tailwindcss. deployed on vercel.

## what's here

- **blog** — writing about typescript, rust, developer tooling, and things i'm learning
- **work** — current and past roles in software engineering
- **projects** — open source tools like [create-t3-app](https://create.t3.gg) and random experiments
- **links** — places you can find me

## stack

- next.js 16 (app router)
- react 19
- typescript
- tailwindcss
- mdx for content
- shiki for syntax highlighting

## running locally

```bash
# install dependencies
bun install

# start dev server
bun run dev
```

## writing

posts live in `/posts` as `.mdx` files. each post needs frontmatter:

```yaml
---
title: "your title"
description: "brief description"
date: "march 11, 2026"
---
```

## license

[mit](./LICENSE)
