import { allPosts, Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Link from "next/link";
import BlogWrapper from "~/components/blog/BlogWrapper";
import Components from "~/components/blog/MDX";

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params!.slug
  );
  return {
    props: {
      post,
    },
  };
};

const PostLayout = ({ post }: { post: Post }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <BlogWrapper>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <div className="mb-6 text-center">
          <Link href="/">
            <a className="text-sm font-bold text-center text-indigo-400 uppercase">
              Home
            </a>
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-slate-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>

        <main className="px-2 prose prose-lg prose-indigo prose-a:text-indigo-400 prose-invert">
          <MDXContent components={Components} />
        </main>
      </article>
    </BlogWrapper>
  );
};

export default PostLayout;
