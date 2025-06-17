import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MDX } from "./mdx";
import { getBlogPostBySlug } from "~~/blog";
import IconSocial from "~~/components/iconSocial";
import Share from "../../../components/share-buttons";
import TableOfContents from "~~/components/toc";
import "~~/styles/globals.css";

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
      url: `https://davidadarme.com/blog/${post.slug}`,
      images: [
        {
          url: `https://davidadarme.com/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@ozwain",
      images: [
        `https://davidadarme.com/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const author = {
    name: "David Adarme",
  };

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
            image: `https://davidadarme.com/og/blog?title=${post.metadata.title}&top=${formatDate(
              post.metadata.date,
            )}`,
            url: `https://davidadarme.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: author.name,
            },
          }),
        }}
      />

      <h1 className="title mb-2 max-w-[650px] text-3xl font-medium tracking-tighter">
        {post.metadata.title}
      </h1>

      <div className="mb-8 flex max-w-[650px] items-center justify-between text-sm">
        {/* <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {author.name}
        </p> */}
        <div className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
          {formatDate(post.metadata.date)}
          <Share url={`https://davidadarme.com/blog/${post.slug}`} />
        </div>
      </div>

      <article className="prose prose-neutral dark:prose-invert">
        <MDX source={post.content} />
      </article>
        <div className="hidden lg:block">
          <TableOfContents url={`/blog/${post.slug}`} />
        </div>
      <div style={{ marginTop: "25px" }}>
        <IconSocial />
      </div>
    </section>
  );
}
