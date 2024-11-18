import { type MDXFileData } from "@/lib/blog"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
  viewsComponent: React.ReactNode
}

export function PostItem({ post, isSelected, viewsComponent }: PostItemProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 group ${
        isSelected
          ? "bg-gradient-to-r from-accent/10 to-transparent -mx-2 px-2 border-l-2 border-l-accent/50"
          : ""
      }`}
    >
      <a
        href={`/blog/${post.slug}`}
        className="text-gray-200 hover:text-accent transition-colors duration-200"
      >
        {post.metadata.title.toLowerCase()}
      </a>
      <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
        {viewsComponent}
        <span>•</span>
        <span>
          {new Date(post.metadata.date)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toLowerCase()}
        </span>
      </div>
    </div>
  )
}
