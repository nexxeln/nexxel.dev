"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { MDXFileData } from "@/lib/blog"

type PostsProps = {
  posts: MDXFileData[]
}

export function Posts({ posts }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredPosts = posts.filter((post) =>
    post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearching) {
        e.preventDefault()
        setIsSearching(true)
      } else if (e.key === "Escape" && isSearching) {
        setIsSearching(false)
        setSearchQuery("")
      } else if (
        isSearching &&
        (e.ctrlKey || e.metaKey) &&
        (e.key === "j" || e.key === "k")
      ) {
        e.preventDefault()
        setSelectedIndex((prev) => {
          if (e.key === "j") {
            return prev < filteredPosts.length - 1 ? prev + 1 : prev
          } else {
            return prev > 0 ? prev - 1 : prev
          }
        })
      } else if (isSearching && e.key === "Enter" && filteredPosts.length > 0) {
        router.push(`/blog/${filteredPosts[selectedIndex].slug}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearching, filteredPosts, selectedIndex, router])

  return (
    <>
      {isSearching && (
        <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-2">
          <div className="flex items-center text-gray-400">
            <span className="text-accent mr-2">/</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              autoFocus
              placeholder="search posts..."
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <div
            key={post.slug}
            className={`flex justify-between items-center group ${
              isSearching && index === selectedIndex
                ? "bg-gradient-to-r from-accent/10 to-transparent -mx-2 px-2 rounded border-l-2 border-l-accent/50"
                : ""
            }`}
          >
            <a
              href={`/blog/${post.slug}`}
              className="text-gray-200 hover:text-accent transition-colors duration-200"
            >
              {post.metadata.title.toLowerCase()}
            </a>
            <span className="text-sm text-gray-400">
              {new Date(post.metadata.date)
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                .toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
