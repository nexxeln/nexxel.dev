"use client"

import { MapPin, Building2, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function Component() {
	return (
		<div className="min-h-screen bg-[#111] text-gray-300 font-mono transition-colors duration-300">
			<div className="max-w-4xl mx-auto px-4 py-8">
				{/* Navigation */}
				<nav className="flex items-center justify-between mb-12 text-sm">
					<div className="flex space-x-4">
						<Link
							href="/"
							className="hover:text-[#ff6b35] transition-colors duration-200"
						>
							[h] home
						</Link>
						<Link
							href="/blog"
							className="hover:text-[#ff6b35] transition-colors duration-200"
						>
							[b] blog
						</Link>
					</div>
					{/* <button
						onClick={toggleTheme}
						className="p-2 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] transition-colors duration-200 hover:bg-[#ff6b35]/20"
					>
						{theme === "dark" ? (
							<Sun className="w-4 h-4" />
						) : (
							<Moon className="w-4 h-4" />
						)}
					</button> */}
				</nav>

				{/* Header */}
				<header className="mb-16 space-y-4">
					<h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
						shoubhit dash
					</h1>
					<div className="flex flex-col gap-2 text-gray-400">
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4" />
							chennai, india
						</div>
						<div className="flex items-center gap-2">
							<Building2 className="w-4 h-4" />
							co-founder and cto @ leapflow
						</div>
					</div>
					<p className="text-gray-300 leading-relaxed animate-fade-in-up">
						i&apos;m a 19 y/o cs undergrad student. i love building things and
						solving problems. i enjoy language design, theoretical computer
						science and i live on the terminal. if i&apos;m not coding, i&apos;m
						probably doing cardistry, watching movies or obsessing over
						mechanical keyboards.
					</p>
				</header>

				{/* Work Section */}
				<section className="mb-16 animate-fade-in-up">
					<h2 className="text-2xl font-bold mb-6 flex items-center text-white">
						<span className="text-[#ff6b35] mr-2">*</span> work
					</h2>
					<div className="space-y-8">
						{[
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
						].map((job, index) => (
							<div key={index} className="group">
								<h3 className="text-xl font-semibold mb-1 text-white group-hover:text-[#ff6b35] transition-colors duration-200">
									{job.title}
								</h3>
								<p className="text-sm text-gray-400 mb-2">
									{job.role} ({job.period})
								</p>
								<p className="text-gray-300">{job.description}</p>
							</div>
						))}
					</div>
				</section>

				{/* Projects Section */}
				<section className="mb-16 animate-fade-in-up">
					<h2 className="text-2xl font-bold mb-6 flex items-center text-white">
						<span className="text-[#ff6b35] mr-2">*</span> projects
					</h2>
					<div className="space-y-8">
						{[
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
						].map((project, index) => (
							<div key={index} className="group">
								<h3 className="text-xl font-semibold mb-1 text-white group-hover:text-[#ff6b35] transition-colors duration-200">
									{project.title}
								</h3>
								<p className="text-sm text-gray-400 mb-2">{project.role}</p>
								<p className="text-gray-300">{project.description}</p>
							</div>
						))}
					</div>
					<Link
						href="/projects"
						className="inline-flex items-center gap-1 mt-6 text-[#ff6b35] hover:underline group"
					>
						all projects{" "}
						<ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
					</Link>
				</section>

				{/* Blog Section */}
				<section className="mb-16 animate-fade-in-up">
					<h2 className="text-2xl font-bold mb-6 flex items-center text-white">
						<span className="text-[#ff6b35] mr-2">*</span> blog
					</h2>
					<div className="space-y-4">
						{[
							{
								title: "implementing string pattern matching using dfas",
								date: "jul 5, 2024",
								href: "/blog/pattern-matching",
							},
							{
								title: "ricing macos",
								date: "nov 1, 2023",
								href: "/blog/ricing-macos",
							},
							{
								title: "how i organise my life",
								date: "aug 3, 2023",
								href: "/blog/life-organisation",
							},
						].map((post, index) => (
							<div
								key={index}
								className="flex justify-between items-center group"
							>
								<Link
									href={post.href}
									className="text-gray-300 hover:text-[#ff6b35] transition-colors duration-200"
								>
									{post.title}
								</Link>
								<span className="text-sm text-gray-400">{post.date}</span>
							</div>
						))}
					</div>
					<Link
						href="/blog"
						className="inline-flex items-center gap-1 mt-6 text-[#ff6b35] hover:underline group"
					>
						all posts{" "}
						<ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
					</Link>
				</section>

				{/* Links */}
				<section className="animate-fade-in-up">
					<h2 className="text-2xl font-bold mb-6 flex items-center text-white">
						<span className="text-[#ff6b35] mr-2">*</span> links
					</h2>
					<div className="flex flex-wrap gap-4 text-sm">
						{[
							{ title: "email", href: "mailto:hey@nexxel.dev" },
							{ title: "x.com", href: "https://x.com/nexxeln" },
							{ title: "github", href: "https://github.com/nexxeln" },
							{
								title: "linkedin",
								href: "https://www.linkedin.com/in/shoubhit-dash",
							},
							{ title: "book a call", href: "https://cal.com/nexxel" },
						].map((link, index) => (
							<Link
								key={index}
								href={link.href}
								className="text-gray-400 hover:text-[#ff6b35] transition-colors duration-200"
							>
								{link.title}
							</Link>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
