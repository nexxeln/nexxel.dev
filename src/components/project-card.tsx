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
    <Link href={href} target="_blank" className="group block">
      <div className="border-t border-neutral-800 pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {role} · {period}
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 mt-1.5 text-gray-600 group-hover:text-accent transition-colors shrink-0" />
        </div>
        <p className="text-gray-300 mb-2">{description}</p>
        <p className="text-sm text-gray-600">
          {technologies.join(", ")}
        </p>
      </div>
    </Link>
  )
}
