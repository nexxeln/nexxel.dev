import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch={true}
      className={`group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-3 -mx-3 transition-colors duration-200 ${
        isSelected
          ? "bg-accent/10 ring-1 ring-accent/20"
          : "hover:bg-neutral-900/50"
      }`}
    >
      <span className="text-sm text-gray-500 sm:w-28 shrink-0 tabular-nums">
        {formatDate(post.metadata.date)}
      </span>
      <span className={`text-gray-200 ${isSelected ? "text-accent" : "group-hover:text-accent"} transition-colors duration-200`}>
        {post.metadata.title.toLowerCase()}
      </span>
    </Link>
  )
}
