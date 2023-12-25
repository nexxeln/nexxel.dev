import rss from "@astrojs/rss";
import { sortPostsByDate } from "../lib/date";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = sortPostsByDate(await getCollection("blog", ({ data }) => data.isDraft !== true))

  return rss({
    title: "nexxel's blog",
    description: "Writings on programming and technology.",
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
    stylesheet: "/rss/styles.xsl"
  });
}
