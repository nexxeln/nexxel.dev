import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Suspense } from "react";
import { NewsletterForm } from "~~/app/blog/newsletter-form";
import { ViewCounter } from "~~/app/blog/view-counter";
import { getBlogPosts } from "~~/blog";
import IconSocial from "~~/components/iconSocial";
// import Share from "../../components/share-buttons";


function UpRightArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function MediumPublishedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      // stroke="currentColor"
      // strokeWidth="2"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function SubstackPublishedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      // stroke="currentColor"
      // strokeWidth="2"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M18.504,21.868l-6.008,-3.434c-0.307,-0.176 -0.685,-0.176 -0.992,0l-6.008,3.434c-0.666,0.382 -1.496,-0.1 -1.496,-0.868v-10c0,-0.552 0.448,-1 1,-1h14c0.552,0 1,0.448 1,1v10c0,0.768 -0.83,1.25 -1.496,0.868zM19,8h-14c-0.553,0 -1,-0.447 -1,-1c0,-0.553 0.447,-1 1,-1h14c0.553,0 1,0.447 1,1c0,0.553 -0.447,1 -1,1zM19,4h-14c-0.553,0 -1,-0.447 -1,-1c0,-0.553 0.447,-1 1,-1h14c0.553,0 1,0.447 1,1c0,0.553 -0.447,1 -1,1z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on programming, computer science, and more.",
  openGraph: {
    images: [
      {
        url: "https://davidadarme.com/og/home?title=DavidAdarme's Blog",
      },
    ],
  },
};

// function TagSection({ tags }: { tags: string[] }) {
//   return (
//     <div className="mb-8">
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="rounded-full bg-neutral-700 px-3 py-1 text-sm text-neutral-200"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// const tags = [
//   "JavaScript",
//   "React",
//   "Node.js",
//   "PostgreSQL",
//   "Express.js",
//   "DevOps",
//   "AWS",
//   "DBA",
//   "RESTful API",
//   "PERN Stack",
// ];

export default function BlogPage() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  return (
    <section className="space-y-12">
      <h1 className="text-2xl font-medium tracking-tighter">Blog</h1>

      {/* <TagSection tags={tags} /> */}

      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug} className="relative">
            <Link
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="flex w-full flex-col space-y-3">
             
                <p className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600">
                  {post.metadata.title}
                </p>
                <p className="font-normal prose-neutral text-[#00000099] dark:text-neutral-400">
                  {post.metadata.description}
                </p>


                <div className="flex items-center justify-between">
                  <p className="font-light text-sm text-[#000] dark:text-[#ffff]">
                    Written by {post.metadata.author}
                  </p>
                  <p className="text-sm text-[#000] dark:text-neutral-400">
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                
                <p className="flex items-center font-medium text-sm group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600">
                  Read more <UpRightArrowIcon/>
                </p>

              </div>
            </Link>

            <div className="flex gap-3 justify-end">
              {post.metadata.medium && (
                <a 
                  href={post.metadata.medium} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#000] dark:text-[#ffff] hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                  aria-label="Read on Medium"
                >
                  <MediumPublishedIcon />
                </a>
              )}
              
              {post.metadata.substack && (
                <a 
                  href={post.metadata.substack} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#000] dark:text-[#ffff] hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                  aria-label="Read on Substack"
                >
                  <SubstackPublishedIcon />
                </a>
              )}
            </div>

            <hr className="my-4 border-gray-700 border-1.5" />


          </div>
        ))}
      </div>

      <div className="space-y-6">
        <p className="font-medium"> Suscríbete para recibir nuevos posts</p>
        <NewsletterForm />
      </div>

      <IconSocial />
    </section>
  );
}
