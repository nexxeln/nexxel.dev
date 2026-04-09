import Link from "next/link"

const links = [
  { title: "email", href: "mailto:hey@nexxel.dev" },
  { title: "x.com", href: "https://x.com/nexxeln" },
  { title: "github", href: "https://github.com/nexxeln" },
  { title: "linkedin", href: "https://www.linkedin.com/in/shoubhit-dash" },
  { title: "book a call", href: "https://cal.com/nexxel" },
]

export function LinksSection() {
  return (
    <section className="animate-fade-in-up mt-4 pt-10 pb-16 border-t border-neutral-800">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
        <span className="text-accent accent-glow mr-2">*</span> elsewhere
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-500 hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
