import "~~/styles/globals.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { clx } from "~~/utils";
import { Navbar } from "~~/app/navbar";
import { ViewTransitions } from "next-view-transitions";
import { Footer } from "~~/app/footer";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={clx(
          "bg-neutral-100 text-black dark:bg-neutral-950 dark:text-white",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <body className="mx-4 mb-40 mt-8 flex max-w-2xl flex-col antialiased md:flex-row lg:mx-auto">
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}
