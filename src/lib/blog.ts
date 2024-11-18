import fs from "fs"
import path from "path"

export type Metadata = {
  title: string
  description: string
  date: string
}

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

export function getPostBySlug(slug: string): MDXFileData | null {
  return getPosts().find((post) => post.slug === slug) ?? null
}

function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match) {
    throw new Error("No frontmatter found")
  }

  const frontmatter = match[1]

  if (!frontmatter) {
    throw new Error("No frontmatter found")
  }

  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontmatterLines = frontmatter.trim().split("\n")
  const metadata: Partial<Metadata> = {}

  frontmatterLines.forEach((line) => {
    const [key, ...values] = line.split(": ")
    let value = values.join(": ").trim()
    value = value.replace(/^['"](.*)['"]$/, "$1") // Remove quotes
    if (key && value) {
      metadata[key.trim() as keyof Metadata] = value
    }
  })

  return { metadata: metadata as Metadata, content }
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
