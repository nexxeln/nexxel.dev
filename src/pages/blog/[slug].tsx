import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
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
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-2xl py-16 mx-auto">
        <div className="mb-6 text-center">
          <Link href="/">
            <a className="text-sm font-bold text-center text-blue-700 uppercase">
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
        <MDXContent components={{ ...Components }} />
      </article>
    </>
  );
};

export default PostLayout;
