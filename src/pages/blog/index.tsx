import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Wrapper from "~/components/Wrapper";
import readingTime from "reading-time";

export const getStaticProps = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
};

const PostCard = (post: Post) => {
  return (
    <Link href={post.url}>
      <div className="p-4 mb-6 transition-all duration-300 rounded-lg cursor-pointer hover:bg-zinc-800">
        <h2 className="text-lg">
          <a className="text-2xl text-t-pink">{post.title}</a>
        </h2>
        <p className="pt-4 text-slate-200">{post.description}</p>

        <div className="flex items-center gap-2 pt-4 text-sm text-">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <span>•</span>
          <span>{readingTime(post.body.code).text}</span>
        </div>
      </div>
    </Link>
  );
};

const Blog = ({ posts }: { posts: Post[] }) => {
  return (
    <Wrapper
      title="nexxel • blog"
      description="Writings on programming and tech"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">Blog</h1>
      <p className="pt-1 text-slate-200">
        Here I write about programming and tech I like. You can expect writings
        on new tech I explore and web development.
      </p>
      <div className="max-w-2xl pt-16 mx-auto">
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Blog;
