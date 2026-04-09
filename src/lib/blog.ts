import fs from "fs"
import path from "path"
import { z } from "zod"

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  draft: z
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(false),
})

export type Metadata = z.infer<typeof metadataSchema>

export type FrontmatterParseResult = {
  metadata: Metadata
  content: string
}

export type MDXFileData = FrontmatterParseResult & {
  slug: string
}

export function getPosts(): MDXFileData[] {
  return getMDXData(path.join(process.cwd(), "posts"))
}

export function getPublishedPosts(): MDXFileData[] {
  return getPosts().filter((post) => !post.metadata.draft)
}

export function getPostBySlug(slug: string): MDXFileData | null {
  return getPosts().find((post) => post.slug === slug) ?? null
}

export function getAdjacentPosts(slug: string): {
  prev: MDXFileData | null
  next: MDXFileData | null
} {
  const posts = getPublishedPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  )
  const index = posts.findIndex((post) => post.slug === slug)
  return {
    prev: index < posts.length - 1 ? (posts[index + 1] ?? null) : null,
    next: index > 0 ? (posts[index - 1] ?? null) : null,
  }
}

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 225))
  return `${minutes} min read`
}

export function extractHeadings(
  content: string,
): { text: string; slug: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: { text: string; slug: string; level: number }[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]!.length
    const text = match[2]!.trim()
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
    headings.push({ text, slug, level })
  }

  return headings
}

function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match?.[1]) {
    throw new Error("No frontmatter found")
  }

  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontmatterLines = match[1].trim().split("\n")
  const raw: Record<string, string> = {}

  for (const line of frontmatterLines) {
    const [key, ...values] = line.split(": ")
    if (!key) continue
    let value = values.join(": ").trim()
    value = value.replace(/^['"](.*)['"]$/, "$1")
    if (value) {
      raw[key.trim()] = value
    }
  }

  const metadata = metadataSchema.parse(raw)
  return { metadata, content }
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string): FrontmatterParseResult {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string): MDXFileData[] {
  const mdxFiles = getMDXFiles(dir)

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}
