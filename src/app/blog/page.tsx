import { Link } from "next-view-transitions";
import { NewsletterForm } from "~~/app/blog/newsletter-form";
import { getBlogPosts } from "~~/blog";

export default function BlogPage() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  return (
    <section>
      <h1 className="text-2xl font-medium tracking-tighter">blog</h1>

      <div className="my-8">
        <p className="mb-4 font-medium">subscribe for updates. no spam.</p>
        <NewsletterForm />
      </div>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="flex w-full flex-col gap-y-1">
              <p className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600">
                {post.metadata.title.toLowerCase()}
              </p>
              <p className="prose prose-neutral dark:prose-invert">
                {post.metadata.description.toLowerCase()}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(post.metadata.date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  .toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
