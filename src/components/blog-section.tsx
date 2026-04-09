import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getPublishedPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"

const posts = getPublishedPosts()
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
  .slice(0, 4)

export function BlogSection() {
  return (
    <section className="mb-12 pt-10 border-t border-neutral-800 animate-fade-in-up">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center text-white">
          <span className="text-accent accent-glow mr-2">*</span>
          blog
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline group"
        >
          all posts{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
          >
            <span className="text-sm text-gray-500 sm:w-28 shrink-0 tabular-nums">
              {formatDate(post.metadata.date)}
            </span>
            <span className="text-gray-200 group-hover:text-accent transition-colors duration-200">
              {post.metadata.title.toLowerCase()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
