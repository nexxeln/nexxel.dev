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
  achievements,
  technologies,
  href,
}: ProjectCardProps) {
  return (
    <div className="group border border-gray-800 p-6 transition-colors hover:border-accent/50">
      <Link href={href} target="_blank">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
            {title}
          </h2>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
        </div>
      </Link>

      <p className="text-sm text-gray-400 mb-4">
        {role} {period && `(${period})`}
      </p>

      <p className="text-gray-300 mb-6">{description}</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-2">achievements</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">technologies</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded"
              >
                {tech.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
