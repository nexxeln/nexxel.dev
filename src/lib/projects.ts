import { z } from "zod";

const projectSchema = z.object({
  repo: z.string(),
  link: z.string(),
  description: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

// export async function getProjects(
//   number: 1 | 2 | 3 | 4 | 5 | 6,
// ): Promise<Project[]> {
//   const res = await fetch("https://gh-pinned.vercel.app/api/user/nexxeln").then(
//     res => res.json(),
//   )

//   const projects = projectSchema.array().parse(res)

//   return projects.slice(0, number)
// }

export async function getProjects(): Promise<Project[]> {
  return [
    {
      repo: "create-t3-app",
      link: "https://github.com/nexxeln/create-t3-app",
      description: "the best way to start a full-stack, typesafe next.js app",
    },
    {
      repo: "nexxel.dev",
      link: "https://github.com/nexxeln/nexxel.dev",
      description: "boring personal site built with astro",
    },
    {
      repo: "license-generator",
      link: "https://github.com/nexxeln/license-generator",
      description: "create licenses for your projects right from your terminal",
    },
    {
      repo: "spotify-voice-control",
      link: "https://github.com/nexxeln/spotify-voice-control",
      description: "voice control for spotify through the terminal",
    },
    {
      repo: "hackernews",
      link: "https://github.com/nexxeln/hackernews",
      description: "hacker news clone made with solidstart and tRPC",
    },
    {
      repo: "dots",
      link: "https://github.com/nexxeln/dots",
      description: "my dotfiles for macos",
    },
  ];
}
