import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getPosts } from "@/lib/blog"

const posts = getPosts()
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
  .slice(0, 4)

export function BlogSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span>
        blog
      </h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center group">
            <Link
              href={`/blog/${post.slug}`}
              className="text-gray-200 hover:text-accent transition-colors duration-200"
            >
              {post.metadata.title.toLowerCase()}
            </Link>
            <span className="text-sm text-gray-400">
              {formatDate(post.metadata.date)}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
      >
        all posts{" "}
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </section>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase()
}
