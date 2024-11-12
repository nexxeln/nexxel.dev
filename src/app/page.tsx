import { Header } from "./header"
import { SectionList } from "./section-list"
import { BlogSection } from "./blog-section"
import { LinksSection } from "./links-section"

const workItems = [
  {
    title: "leapflow",
    role: "co-founder and cto",
    period: "may 2024 - present",
    description:
      "leading engineering to build ai agents for automating repetitive tasks in existing software",
  },
  {
    title: "dimension",
    role: "full-stack engineer",
    period: "nov 2023 - jan 2024",
    description:
      "contributed to a large-scale t3 stack app. worked on real-time presence and chat features",
  },
]

const projectItems = [
  {
    title: "create-t3-app",
    role: "creator and maintainer",
    description:
      "open-source project for initializing full-stack next.js apps. 24k+ stars, 200+ contributors",
  },
  {
    title: "spotify-voice-control",
    role: "creator and maintainer",
    description:
      "python-based terminal app for controlling spotify via voice commands",
  },
]

export default function Component() {
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
