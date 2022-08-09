import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { FeaturedPost, Hero, ProjectCard } from "~/components/Home";
import Wrapper from "~/components/Wrapper";

export const getStaticProps: GetStaticProps = async () => {
  const pinnedRepos = await fetch(
    "https://gh-pinned-repos.egoist.sh/?username=nexxeln"
  ).then(async (response) => {
    return await response.json();
  });

  const latestPosts = allPosts
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 4);

  return {
    props: {
      pinnedRepos,
      latestPosts,
    },
    revalidate: 3600,
  };
};

type PinnedRepo = {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
};

const HomePage: NextPage<{
  pinnedRepos: PinnedRepo[];
  latestPosts: Post[];
}> = ({ pinnedRepos, latestPosts }) => {
  return (
    <Wrapper title="nexxel • home" description="17 yo self-taught developer">
      <Hero />

      <div className="flex flex-col items-center justify-center">
        <h3 className="self-start pb-6 text-4xl font-bold bold-text">
          Things I&apos;ve built
        </h3>

        <div className="grid grid-cols-1 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
          {pinnedRepos.map((project) => (
            <ProjectCard
              key={project.repo}
              repo={project.repo}
              forks={project.forks}
              url={`https://github.com/${project.owner}/${project.repo}`}
              stars={project.stars}
              description={project.description}
              language={project.language}
              languageColor={project.languageColor}
            />
          ))}
        </div>
      </div>

      <div className="pt-32" />
      <div className="flex flex-col">
        <h3 className="pb-6 text-4xl font-bold bold-text">From the blog</h3>

        <div className="flex flex-col gap-1">
          {latestPosts.map((post) => (
            <FeaturedPost key={post._id} {...post} />
          ))}
        </div>

        <Link href="/blog">
          <a>
            <p className="flex items-center gap-1 pt-4 pl-4 text-lg transition-opacity duration-300 opacity-75 hover:opacity-100 text-t-purple">
              Go to the blog
              <FiArrowRight size={20} />
            </p>
          </a>
        </Link>
      </div>
    </Wrapper>
  );
};

export default HomePage;
