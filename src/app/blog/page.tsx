import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Suspense } from "react";
import { NewsletterForm } from "~~/app/blog/newsletter-form";
import { ViewCounter } from "~~/app/blog/view-counter";
import { getBlogPosts } from "~~/blog";
import IconSocial from "../../components/iconSocial";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on programming, computer science, and more.",
  openGraph: {
    images: [
      {
        url: "https://davidadarme.vercel.app/og/home?title=davidadarme's blog",
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
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="flex w-full flex-col space-y-3">
              <p className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600">
                {post.metadata.title}
              </p>
              <p className="prose prose-neutral dark:prose-invert">
                {post.metadata.description}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(post.metadata.date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  }
              </p>
            </div>
            {/* <hr className="my-4 border-gray-700 border-1.5" /> */}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        <p className="font-medium"> Suscríbete para recibir nuevos posts</p>
        {/* ⬎  ⇲ ↘ */}
        <NewsletterForm />
      </div>

      <IconSocial />
    </section>
  );
}
