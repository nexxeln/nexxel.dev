import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface Item {
  title: string
  role: string
  period?: string
  description: string
}

interface SectionListProps {
  title: string
  items: Item[]
  viewAllHref?: string
  viewAllText?: string
}

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-[#ff6b35] mr-2">*</span> {title}
      </h2>
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="group">
            <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-200">
              {item.title}
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              {item.role} {item.period && `(${item.period})`}
            </p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </section>
  )
}
