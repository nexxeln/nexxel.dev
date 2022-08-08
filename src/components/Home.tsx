import Image from "next/future/image";
import { FC } from "react";
import { FiStar } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { IoIosWarning } from "react-icons/io";
import { useQuery } from "react-query";

type PinnedRepo = {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
};

const useGithubPinnedRepos = (user: string) => {
  const response = useQuery<PinnedRepo[], Error>("pinnedRepos", () => {
    return fetch(`https://gh-pinned-repos.egoist.sh/?username=${user}`).then(
      (res) => res.json()
    );
  });

  return {
    ...response,
    data: response.data?.map((repo) => {
      const data: PinnedRepo & { url: string } = {
        ...repo,
        url: `https://github.com/${repo.owner}/${repo.repo}`,
      };

      return data;
    }),
  };
};

const ProjectCard: FC<{
  url: string;
  repo: string;
  description: string;
  stars: string;
  forks: string;
  language: string;
  languageColor: string;
}> = ({ url, repo, stars, forks, description, language, languageColor }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="flex flex-col p-4 transition-colors duration-300 border-2 rounded-lg h-44 border-t-pink hover:bg-zinc-800 place-content-evenly">
        <div className="flex flex-col gap-1">
          <p className="text-xl text-t-pink">{repo}</p>
          <p className="text-sm">{description}</p>
        </div>

        <div className="flex flex-col pt-4 text-sm">
          <span className="flex items-center gap-1.5">
            <FiStar /> {stars}
          </span>
          <span className="flex items-center gap-1.5">
            <BiGitRepoForked /> {forks}
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: languageColor }}>⬤</span>
            {language}
          </span>
        </div>
      </div>
    </a>
  );
};

const Hero = () => {
  return (
    <div className="flex flex-col items-center h-screen pt-32">
      <Image
        src="/images/nexxel.webp"
        alt="nexxel's avatar"
        width={165}
        height={165}
        priority
        className="rounded-full"
      />

      <h1 className="pt-2 text-5xl font-bold text-center text-transparent bold-text bg-clip-text bg-gradient-to-r from-t-pink via-t-purple to-t-orange animate-gradient-text">
        nexxel
      </h1>

      <p className="pt-1 text-xl text-center">
        Hi, I&apos;m Shoubhit. I&apos;m a 17 y/o self-taught developer and I
        like to build cool stuff
      </p>
    </div>
  );
};

const Home = () => {
  const { data: projects, isError } = useGithubPinnedRepos("nexxeln");
  return (
    <>
      <Hero />
      <div className="flex flex-col items-center justify-center">
        <h1 className="self-start pb-6 text-4xl">Things I&apos;ve built:</h1>
        <div className="grid grid-cols-1 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3">
          {isError ? (
            <p className="flex items-center gap-1 text-xl text-t-red">
              <IoIosWarning /> Error fetching repos
            </p>
          ) : (
            projects?.map((project) => (
              <ProjectCard
                key={project.repo}
                repo={project.repo}
                forks={project.forks}
                url={project.url}
                stars={project.stars}
                description={project.description}
                language={project.language}
                languageColor={project.languageColor}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
