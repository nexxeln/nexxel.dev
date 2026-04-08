import { ScrambleText } from "@/components/scramble-text"
import { SectionList } from "@/components/section-list"
import { workItems } from "@/lib/work-items"
import { Metadata } from "next"

export default function WorkPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent accent-glow mr-2">*</span>
        <ScrambleText text="work" />
      </h1>

      <p className="text-gray-400 mb-6 leading-relaxed">
        here&apos;s where i&apos;ve worked and the kind of products i helped ship.
      </p>

      <SectionList title="work" items={workItems} showTitle={false} showSectionBorder={false} />
    </main>
  )
}

export const metadata: Metadata = {
  title: "Work",
  description: "Places I've worked and what I built.",
  openGraph: {
    images: [
      {
        url: "https://www.nexxel.dev/og/home?title=work",
      },
    ],
  },
}
