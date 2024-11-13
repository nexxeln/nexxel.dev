import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const posts = [
  {
    title: "implementing string pattern matching using dfas",
    date: "jul 5, 2024",
    href: "/blog/pattern-matching",
  },
  {
    title: "ricing macos",
    date: "nov 1, 2023",
    href: "/blog/ricing-macos",
  },
  {
    title: "how i organise my life",
    date: "aug 3, 2023",
    href: "/blog/life-organisation",
  },
]

export function BlogSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-[#ff6b35] mr-2">*</span> blog
      </h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center group">
            <Link
              href={post.href}
              className="hover:text-[#ff6b35] transition-colors duration-200"
            >
              {post.title}
            </Link>
            <span className="text-sm text-gray-400">{post.date}</span>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 mt-6 text-[#ff6b35] hover:underline group"
      >
        all posts{" "}
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </section>
  )
}
