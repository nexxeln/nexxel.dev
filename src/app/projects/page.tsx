import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
  {
    title: "create-t3-app",
    description:
      "cli tool to bootstrap full-stack type-safe next.js applications",
    role: "creator and maintainer",
    period: "jun 2022 - present",
    achievements: [
      "grew project to 24k+ github stars",
      "wrote education blog posts with over 100k views",
      "maintained comprehensive, up-to-date documentation",
    ],
    technologies: [
      "typescript",
      "next.js",
      "trpc",
      "prisma",
      "tailwind css",
      "auth.js",
    ],
    href: "https://create.t3.gg",
  },
  {
    title: "mini-git",
    description: "a simplified implementation of git built from scratch",
    role: "creator",
    period: "jul 2024",
    achievements: [
      "successfully implemented core git commands",
      "implemented efficient blob storage and compression",
      "learned about git's internal object model and data structures like merkle trees",
    ],
    technologies: ["go", "sha-1"],
    href: "https://github.com/nexxeln/mini-git",
  },
  {
    title: "license-generator",
    description: "cli tool to create licenses for your projects",
    role: "creator and maintainer",
    period: "mar 2022 - present",
    achievements: [
      "grew project to over 3.2k downloads",
      "built a robust cli interface with fuzzy search",
      "added support for all github licenses with auto-filling",
    ],
    technologies: ["rust", "github api"],
    href: "https://github.com/nexxeln/license-generator",
  },
  {
    title: "spotify-voice-control",
    description: "voice control for spotify through the terminal",
    role: "creator",
    period: "feb 2022",
    achievements: [
      "integrated spotify web api for seamless, real-time music control",
      "built voice command system for comprehensive music control including playback, search, and playlist management",
    ],
    technologies: ["python", "spotify api"],
    href: "https://github.com/nexxeln/spotify-voice-control",
  },
  {
    title: "text2regex",
    description:
      "convert natural language text into validated regular expressions",
    role: "creator",
    period: "jul 2024",
    achievements: [
      "implemented a self-correcting llm-powered regex generator",
      "built a easy-to-use cli to generate regex patterns",
    ],
    technologies: ["typescript", "openai"],
    href: "https://github.com/nexxeln/text2regex",
  },
  {
    title: "fp_",
    description: "a functional programming library for typescript",
    role: "creator",
    period: "feb 2023",
    achievements: [
      "implemented a comprehensive set of functional programming constructs",
      "wrote documentation and examples to help developers understand and use the library",
      "published to deno package registry",
    ],
    technologies: ["typescript"],
    href: "https://github.com/nexxeln/fp",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed">
        here are some of the projects i&apos;ve worked on. i love building tools
        that make developers&apos; lives easier and exploring new technologies
        along the way.
      </p>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.nexxel.dev/og/home?title=projects",
      },
    ],
  },
}
