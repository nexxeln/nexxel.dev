import { notFound } from "next/navigation";
import { MDX } from "~~/app/blog/[slug]/mdx";
import { getBlogPostBySlug } from "~~/blog";

export default function Post({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.description,
            image: `https://nexxel.dev/og?title=${post.metadata.title}`,
            url: `https://nexxel.dev/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Shoubhit Dash",
            },
          }),
        }}
      />

      <h1 className="title mb-2 max-w-[650px] text-3xl font-medium tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {/* <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense> */}
      </div>

      <article className="prose prose-neutral dark:prose-invert">
        <MDX source={post.content} />
      </article>
    </section>
  );
}
