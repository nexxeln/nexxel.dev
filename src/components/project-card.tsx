import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
  achievements: string[]
  technologies: string[]
  href: string
}

export function ProjectCard({
  title,
  description,
  role,
  period,
  technologies,
  href,
}: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" className="group block rounded-lg p-4 -mx-4 hover:bg-neutral-900/50">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {role}
            {period && (
              <span className="text-gray-600"> · {period}</span>
            )}
          </p>
          <p className="text-gray-300 mt-2 text-pretty">{description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs text-gray-500 bg-neutral-800/60 px-2 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 mt-1.5 text-gray-600 group-hover:text-accent transition-colors shrink-0" />
      </div>
    </Link>
  )
}
