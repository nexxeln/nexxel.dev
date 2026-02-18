"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function Navbar() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger if any input elements are focused or if event target is an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        event.target instanceof HTMLInputElement
      ) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const key = event.key.toLowerCase()

      switch (key) {
        case "h":
          router.push("/")
          break
        case "b":
          router.push("/blog")
          break
        case "p":
          router.push("/projects")
          break
        case "w":
          router.push("/work")
          break
        default:
          if (event.code === "KeyW") {
            router.push("/work")
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  return (
    <nav className="flex items-center justify-between mb-12 text-sm">
      <div className="flex space-x-4">
        <Link
          href="/"
          className="hover:text-accent transition-colors duration-200"
        >
          [h] home
        </Link>
        <Link
          href="/blog"
          prefetch={true}
          className="hover:text-accent transition-colors duration-200"
        >
          [b] blog
        </Link>
        <Link
          href="/work"
          className="hover:text-accent transition-colors duration-200"
        >
          [w] work
        </Link>
        <Link
          href="/projects"
          className="hover:text-accent transition-colors duration-200"
        >
          [p] projects
        </Link>
      </div>
    </nav>
  )
}
