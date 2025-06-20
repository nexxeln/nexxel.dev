import "~~/styles/globals.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { clx } from "../utils";
import { Navbar } from "../app/navbar";
import { ViewTransitions } from "next-view-transitions";
// import Footer from "../app/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "~~/styles/globals.css";
// import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://davidadarme.com"),
  title: {
    default: "David Adarme - Software Developer - SWE & DevOps enthusiast",
    template: "%s | David Adarme",
  },
  description: "David Adarme - Software Developer - SWE & DevOps enthusiast",
  openGraph: {
    title: "David Adarme",
    description: "David Adarme - Software Developer - SWE & DevOps enthusiast",
    url: "https://davidadarme.com",
    siteName: "David Adarme",
    locale: "en_CO",
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
    creator: "@ozwain",
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
          // "bg-white text-black", // Cambia a blanco y negro
          GeistSans.variable,
          GeistMono.variable,
        )}
      >

        <body className="mx-4 mb-40 mt-8 flex max-w-3xl flex-col antialiased md:flex-row lg:mx-auto bg-white text-black dark:bg-black dark:text-white">
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
            <Navbar />
            {children}
            {/* <Footer /> */}
          </main>
          <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
          
          <script
              src="https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/"
              async
              defer
            />
        </body>
      </html>
      
    </ViewTransitions>
    
  );
}
