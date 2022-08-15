<h1 align="center">[nexxel.dev](https://nexxel.dev/)</h1>

## Stack

- **Bootstrapping**: [create-t3-app](https://create.t3.gg/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Server**: [tRPC](https://trpc.io/)
- **Database**: [CockroachDB](https://www.cockroachlabs.com/)
- **ORM**: [Prisma](https://prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Content**: [Contentlayer](https://contentlayer.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Overview

- `content/*` - MDX files for the content of my blog.
- `prisma/*` - My Prisma schema, which uses a CockroachDB database.
- `public/*` - Static assets including fonts and images.
- `src/components/blog/*` - React components being used for the blog.
- `src/components/*` - React components being used for the other stuff.
- `src/pages/*` - All the static pages of the website.
- `src/server/*` - The backend, which is a tRPC server.
- `src/styles/*` - Global CSS files. Most of the styles are inline styles with Tailwind CSS though.
- `src/utils/*` - Utility functions.

## Running Locally

This application requires Node.js to run.

```bash
git clone https://github.com/nexxeln/nexxel.dev.git
cd nexxel.dev
npm i -g pnpm
pnpm i
pnpm dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/nexxeln/nexxel.dev/blob/main/.env-example).

## Cloning / Forking

This application is licensed under the [Apache-2.0](https://github.com/nexxeln/nexxel.dev/blob/main/LICENSE) license. If you're copying this website just let me know.

## Credits

- [Sid](https://github.com/sidwebworks/) for helping with setting up the blog and listening to my CSS troubles.
- [Mateusz Aliyev](https://github.com/mateuszaliyev/) for giving very valuable feedback.
- [Theo Browne](https://t3.gg/) for gifting the nice [nxl.sh](https://nxl.sh) domain.
- [Lee Robinson](https://leerob.io/) for inspiration and the README.
- [Harsh Singh](https://github.com/harshhhdev/) for helping with some of the MDX components.
