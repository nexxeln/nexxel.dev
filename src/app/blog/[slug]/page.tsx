import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MDX } from "./mdx";
import { getBlogPostBySlug } from "~~/blog";
import IconSocial from "../../../components/iconSocial";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return;
  }

  const publishedTime = formatDate(post.metadata.date);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://davidadarme.vercel.app/blog/${post.slug}`,
      images: [
        {
          url: `https://davidadarme.vercel.app/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@nexxeln",
      images: [
        `https://davidadarme.vercel.app/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  };
}

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
            image: `https://davidadarme.vercel.app/og/blog?title=${post.metadata.title}&top=${formatDate(
              post.metadata.date,
            )}`,
            url: `https://davidadarme.vercel.app/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "David Adarme",
            },
          }),
        }}
      />

      <h1 className="title mb-2 max-w-[650px] text-3xl font-medium tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.date)}
        </p>
        {/* Si deseas agregar algo más en el futuro, puedes hacerlo aquí */}
      </div>

      <article className="prose prose-neutral dark:prose-invert">
        <MDX source={post.content} />
      </article>
      <div style={{ marginTop: "25px" }}>
        <IconSocial />
      </div>
    </section>
  );
}
