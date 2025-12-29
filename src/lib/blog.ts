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
