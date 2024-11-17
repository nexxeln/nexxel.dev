"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { MDXFileData } from "@/lib/blog"
import { PostItem } from "./post-item"

type PostWithViews = {
  post: MDXFileData
  viewsComponent: React.ReactNode
}

type PostsProps = {
  postsWithViews: PostWithViews[]
}

export function Posts({ postsWithViews }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredPosts = postsWithViews.filter((item) =>
    item.post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        (((e.ctrlKey || e.metaKey) && (e.key === "j" || e.key === "k")) ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp")
      ) {
        e.preventDefault()
        setSelectedIndex((prev) => {
          if (e.key === "j" || e.key === "ArrowDown") {
            return prev < filteredPosts.length - 1 ? prev + 1 : prev
          } else {
            return prev > 0 ? prev - 1 : prev
          }
        })
      } else if (isSearching && e.key === "Enter" && filteredPosts.length > 0) {
        router.push(`/blog/${filteredPosts[selectedIndex].post.slug}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearching, filteredPosts, selectedIndex, router])

  return (
    <>
      {isSearching && (
        <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto bg-black/50 backdrop-blur-sm border border-gray-800 p-2">
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

      <div className="space-y-8 sm:space-y-4">
        {filteredPosts.map((item, index) => (
          <PostItem
            key={item.post.slug}
            post={item.post}
            viewsComponent={item.viewsComponent}
            isSelected={isSearching && index === selectedIndex}
          />
        ))}
      </div>
    </>
  )
}
