import type { GetStaticProps, NextPage } from "next";

import { Hero, ProjectCard } from "~/components/Home";
import Wrapper from "~/components/Wrapper";

export const getStaticProps: GetStaticProps = async () => {
  const pinnedRepos = await fetch(
    "https://gh-pinned-repos.egoist.sh/?username=nexxeln"
  ).then(async (response) => {
    return await response.json();
  });

  return {
    props: {
      pinnedRepos,
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

const HomePage: NextPage<{ pinnedRepos: PinnedRepo[] }> = ({ pinnedRepos }) => {
  return (
    <Wrapper title="nexxel • home" description="17 yo self-taught developer">
      <Hero />
      <div className="flex flex-col items-center justify-center">
        <h1 className="self-start pb-6 text-4xl">Things I&apos;ve built</h1>
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
    </Wrapper>
  );
};

export default HomePage;
