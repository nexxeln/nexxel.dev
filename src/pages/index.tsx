import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import { FeaturedPost, Hero, ProjectCard } from "~/components/Home";
import Wrapper from "~/components/Wrapper";

type Repository = {
  fork: boolean;
  stargazers_count: number;
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

export const getStaticProps: GetStaticProps = async () => {
  // credit: Lee Robinson https://github.com/leerob/leerob.io/blob/main/pages/api/github.ts

  const starCount: number = await fetch(
    "https://api.github.com/users/nexxeln/repos?per_page=100"
  ).then(async (response) => {
    const repos = (await response.json()) as Repository[];

    const mine = repos.filter((repo) => !repo.fork);

    return mine.reduce((accumulator, repo) => {
      return accumulator + repo.stargazers_count;
    }, 0);
  });

  const pinnedRepos = await fetch(
    "https://gh-pinned-repos.egoist.sh/?username=nexxeln"
  ).then(async (response) => {
    return await response.json();
  });

  const latestPosts = allPosts
    .filter((post: Post) => !post.draft)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 4);

  return {
    props: {
      starCount,
      pinnedRepos,
      latestPosts,
    },
    revalidate: 3600,
  };
};

const HomePage: NextPage<{
  starCount: number;
  pinnedRepos: PinnedRepo[];
  latestPosts: Post[];
}> = ({ starCount, pinnedRepos, latestPosts }) => {
  return (
    <Wrapper title="nexxel" description="17 yo self-taught developer">
      <Hero />

      <div className="flex flex-col items-center justify-center">
        <h3 className="bold-text self-start pb-2 text-4xl font-bold">
          Things I&apos;ve built
        </h3>

        <p className="pb-6 pl-0.5 text-slate-200">
          Apart from create-t3-app, my projects have earned me{" "}
          <span className="bold-text font-bold">{starCount}</span> stars! I have
          a bunch of other cool projects that you can see on my{" "}
          <a
            href="https://github.com/nexxeln"
            target="_blank"
            rel="noreferrer"
            className="text-t-purple opacity-90 transition-opacity duration-300 hover:opacity-100"
          >
            GitHub profile.
          </a>
        </p>

        <div className="grid auto-cols-max grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          {pinnedRepos.map((project, index) => (
            <motion.div
              initial={{
                opacity: 0,
                translateY: 50,
              }}
              whileInView={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                duration: 0.2,
                delay: index * 0.08,
              }}
              viewport={{
                once: true,
              }}
              key={project.repo}
            >
              <ProjectCard
                repo={project.repo}
                forks={project.forks}
                url={`https://github.com/${project.owner}/${project.repo}`}
                stars={project.stars}
                description={project.description}
                language={project.language}
                languageColor={project.languageColor}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-32" />
      <div className="flex flex-col">
        <h3 className="bold-text pb-6 text-4xl font-bold">From the blog</h3>

        <div className="flex flex-col gap-1">
          {latestPosts.map((post, index) => (
            <motion.div
              initial={{
                opacity: 0,
                translateY: 50,
              }}
              whileInView={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                duration: 0.17,
                delay: index * 0.08,
              }}
              viewport={{
                once: true,
              }}
              key={post._id}
            >
              <FeaturedPost {...post} />
            </motion.div>
          ))}
        </div>

        <Link href="/blog">
          <a>
            <p className="flex items-center gap-1 pt-4 pl-4 text-lg text-t-purple transition-opacity duration-300 hover:opacity-90">
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
