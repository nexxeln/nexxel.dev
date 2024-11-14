import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"

const projects = [
  {
    title: "create-t3-app",
    description:
      "CLI tool to bootstrap full-stack type-safe Next.js applications",
    role: "creator and maintainer",
    period: "jun 2022 - present",
    challenges: [
      "Managing a large open source community with 200+ contributors",
      "Ensuring backwards compatibility while adding new features",
      "Maintaining comprehensive documentation for diverse user base",
    ],
    achievements: [
      "Grew project to 24k+ GitHub stars",
      "Built active Discord community with 1000+ members",
      "Implemented automated release process with Changesets",
    ],
    technologies: ["TypeScript", "Next.js", "tRPC", "Prisma", "Tailwind"],
    href: "https://create.t3.gg",
  },
  {
    title: "mini-git",
    description: "A simplified implementation of Git built from scratch",
    role: "creator",
    period: "dec 2023",
    challenges: [
      "Understanding Git's internal object model and data structures",
      "Implementing efficient blob storage and compression",
      "Handling complex file system operations",
    ],
    achievements: [
      "Successfully implemented core Git commands",
      "Created educational resource for Git internals",
      "Built extensible architecture for future features",
    ],
    technologies: ["Rust", "SHA-1", "zlib"],
    href: "https://github.com/nexxeln/mini-git",
  },
  {
    title: "license-checker",
    description: "CLI tool to analyze and validate open source licenses",
    role: "creator",
    period: "oct 2023",
    challenges: [
      "Parsing various license format variations",
      "Handling dependency tree analysis",
      "Ensuring accurate license compatibility checks",
    ],
    achievements: [
      "Reduced license compliance checking time by 80%",
      "Integrated with popular CI/CD platforms",
      "Built comprehensive license database",
    ],
    technologies: ["Go", "SPDX", "GraphQL"],
    href: "#",
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
