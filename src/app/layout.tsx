import "~~/styles/globals.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { clx } from "../utils";
import { Navbar } from "../app/navbar";
import { ViewTransitions } from "next-view-transitions";
// import Footer from "../app/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://davidadarme.com"),
  title: {
    default: "David Adarme - SWE & DevOps entusiasta",
    template: "%s | David Adarme",
  },
  description: "Desarrollador de software (back-end) | SWE & DevOps entusiasta",
  openGraph: {
    title: "David Adarme",
    description: "Desarrollador de software (back-end) | SWE & DevOps entusiasta",
    url: "https://davidadarme.com",
    siteName: "David Adarme",
    locale: "es_CO",
    type: "website",
    images: ["https://davidadarme.com/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "David Adarme",
    card: "summary_large_image",
    creator: "@davidadarme",
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
        <body className="mx-4 mb-40 mt-8 flex max-w-3xl flex-col antialiased md:flex-row lg:mx-auto">
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
            <Navbar />
            {children}
            {/* <Footer /> */}
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}
