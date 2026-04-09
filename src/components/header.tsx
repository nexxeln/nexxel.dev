import { ScrambleText } from "@/components/scramble-text"

export function Header() {
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-5xl font-semibold tracking-tight text-white text-balance mb-4 animate-fade-in">
        <span className="inline-block">
          <ScrambleText text="shoubhit dash" />
        </span>
      </h1>
      <p className="text-gray-500 animate-fade-in">
        software engineer at opencode · chennai, india
      </p>
      <p className="text-pretty max-w-[52ch] animate-fade-in-up">
        i&apos;m a 20 y/o cs undergrad student. i love building things and
        solving problems. i enjoy language design, theoretical computer science
        and i live on the terminal. if i&apos;m not coding, i&apos;m probably
        doing cardistry, watching movies or obsessing over mechanical keyboards.
      </p>
    </header>
  )
}
