import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"

const workItems: Item[] = [
  {
    title: "mocha",
    role: "co-founder and cto",
    period: "jul 2025 - present",
    description: "building an ai native email client designed for speed and ease of use",
    href: "https://mocha.email",
  },
  {
    title: "ENS labs",
    role: "software engineer",
    period: "feb 2025 - jul 2025",
    description:
      "helped migrate ensjs to namechain and optimized ci for the manager app",
    href: "https://ens.domains",
  },
  {
    title: "leapflow",
    role: "co-founder and cto",
    period: "may 2024 - jun 2025",
    description:
      "headed engineering to develop ai agents that automate repetitive workflows in existing software",
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
      <BlogSection />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <LinksSection />
    </>
  )
}
