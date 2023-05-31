import { z } from "zod"

const projectSchema = z.object({
  repo: z.string(),
  link: z.string(),
  description: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export async function getProjects(
  number: 1 | 2 | 3 | 4 | 5 | 6,
): Promise<Project[]> {
  const res = await fetch("https://gh-pinned.vercel.app/api/user/nexxeln").then(
    res => res.json(),
  )

  const projects = projectSchema.array().parse(res)

  return projects.slice(0, number)
}
