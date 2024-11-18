import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"

const workItems: Item[] = [
  {
    title: "leapflow",
    role: "co-founder and cto",
    period: "may 2024 - present",
    description:
      "leading engineering to build ai agents for automating repetitive tasks in existing software",
    href: "https://leapflow.tech",
  },
  {
    title: "dimension",
    role: "full-stack engineer",
    period: "nov 2023 - jan 2024",
    description:
      "contributed to a large-scale t3 stack app. worked on real-time presence and chat features",
    href: "https://dimension.dev",
  },
]

const projectItems = [
  {
    title: "create-t3-app",
    role: "creator and maintainer",
    description:
      "open-source project for initializing full-stack next.js apps. 24k+ stars, 200+ contributors",
    href: "https://create.t3.gg",
  },
  {
    title: "mini-git",
    role: "creator",
    description: "simplified version of git from scratch",
    href: "https://github.com/nexxeln/mini-git",
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <SectionList title="work" items={workItems} />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <BlogSection />
      <LinksSection />
    </>
  )
}
