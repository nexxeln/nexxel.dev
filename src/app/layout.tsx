import type { Metadata } from "next"
import fonts from "./fonts.json"
import "./fonts.css"
import "./globals.css"
import { Navbar } from "../components/navbar"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexxel.dev"),
  title: {
    default: "Shoubhit Dash",
    template: "%s | Shoubhit Dash",
  },
  description: "Developer, cardist and maker of things.",
  openGraph: {
    title: "Shoubhit Dash",
    description: "Developer, cardist and maker of things.",
    url: "https://www.nexxel.dev",
    siteName: "Shoubhit Dash",
    locale: "en_US",
    type: "website",
    images: ["https://www.nexxel.dev/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Shoubhit Dash",
    card: "summary_large_image",
    creator: "@nexxeln",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={fonts.core.url}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen font-mono">
        <div className="max-w-4xl mx-auto px-5 sm:px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
