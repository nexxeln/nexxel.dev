import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  description: string;
  date: string;
};

type FrontmatterParseResult = {
  metadata: Metadata;
  content: string;
};

type MDXFileData = FrontmatterParseResult & {
  slug: string;
  tweetIds: string[];
};

const parseFrontmatter = (fileContent: string): FrontmatterParseResult => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error("Invalid frontmatter: No match found");
  }
  const frontMatterBlock = match[1];
  if (!frontMatterBlock) {
    throw new Error("Invalid frontmatter: No frontmatter block found");
  }
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    if (key && value) {
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
};

const getMDXFiles = (dir: string): string[] => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
};

const readMDXFile = (filePath: string): FrontmatterParseResult => {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
};

const extractTweetIds = (content: string): string[] => {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/)?.[0] ?? "") ?? [];
};

const getMDXData = (dir: string): MDXFileData[] => {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const tweetIds = extractTweetIds(content);
    return {
      metadata,
      slug,
      tweetIds,
      content,
    };
  });
};

export const getBlogPosts = (): MDXFileData[] => {
  return getMDXData(path.join(process.cwd(), "posts"));
};

export const getBlogPostBySlug = (slug: string): MDXFileData | null => {
  return getBlogPosts().find((post) => post.slug === slug) ?? null;
};
