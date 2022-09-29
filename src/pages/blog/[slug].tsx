import { allPosts, Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";

import Components from "~/components/blog/MDX";
import { BiTimeFive } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import readingTime from "reading-time";
import Wrapper from "~/components/Wrapper";

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

  if (post?.draft) {
    return {
      props: {
        post,
        draft: true,
      },
    };
  }
  return {
    props: {
      post,
      draft: false,
    },
  };
};

const PostLayout = ({ post, draft }: { post: Post; draft: boolean }) => {
  const MDXContent = useMDXComponent(post.body.code);
  const formattedDate = format(parseISO(post.date), "LLLL d, yyyy");
  const readingTimeText = readingTime(post.body.code).text;

  const imageLink = `https://www.nexxel.dev/api/og/?title=${post.title}&top=${formattedDate} • ${readingTimeText}`;

  return (
    <Wrapper
      title={post.title}
      description={post.description}
      image={imageLink}
    >
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="px-2 pt-16">
        {draft && (
          <div className="mb-6 rounded-md bg-t-orange p-4 text-neutral-900">
            <p>hey! this post is hidden 👀</p>
            <p>please don&apos;t share this link thank you</p>
          </div>
        )}
        <h1 className="bold-text text-4xl font-bold">{post.title}</h1>
        <div className="pt-4">
          <div className="flex items-center gap-2">
            <FiEdit2 />
            <time dateTime={post.date} className="text-slate-200">
              {formattedDate}
            </time>
          </div>

          <div className="flex items-center gap-2">
            <BiTimeFive /> {readingTimeText}
          </div>
        </div>

        <div className="pt-12" />
        <main className="prose prose-lg prose-invert prose-indigo prose-a:text-indigo-400 prose-a:opacity-90 prose-a:transition-opacity hover:prose-a:opacity-100">
          <MDXContent components={Components} />
        </main>
      </article>
    </Wrapper>
  );
};

export default PostLayout;
