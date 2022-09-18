import Image from "next/future/image";
import { FC } from "react";
import { FiGithub, FiMail, FiStar } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { Post } from "contentlayer/generated";
import Link from "next/link";

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
      <div className="flex flex-col p-4 transition-transform duration-300 border-2 rounded-lg h-40 border-t-pink bg-[#1c1c1c] place-content-evenly transform hover:scale-[104%]">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium medium-text">{repo}</p>
          <p className="text-sm">{description}</p>
        </div>

        <div className="flex flex-col pt-4 text-sm gap-0.5">
          <span className="flex items-center gap-1.5">
            <span style={{ color: languageColor }}>⬤</span>
            {language}
          </span>
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5">
              <FiStar /> {stars}
            </span>
            <span className="flex items-center gap-1.5">
              <BiGitRepoForked /> {forks}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

const FeaturedPost = (post: Post) => {
  return (
    <Link href={post.url}>
      <a className="flex px-4 py-4 transition-colors duration-200 rounded-lg hover:bg-zinc-800">
        <p className="text-xl font-medium text-t-pink line-clamp-1 medium-text">
          {post.title}
        </p>
      </a>
    </Link>
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
        className="rounded-full pixelated"
      />

      <h1 className="pt-2 text-5xl font-bold text-center text-transparent bold-text bg-clip-text bg-gradient-to-r from-t-pink via-t-purple to-t-orange animate-gradient-text">
        nexxel
      </h1>

      <p className="pt-1 text-xl text-center">
        Hi, I&apos;m Shoubhit. I&apos;m a 17 y/o self-taught developer and I
        like to build cool stuff
      </p>

      <div className="flex items-center pt-4 text-xl">
        <a
          href="https://github.com/nexxeln/"
          title="GitHub"
          target="_blank"
          rel="noreferrer"
          className="p-3 transition-colors duration-300 rounded-full hover:bg-zinc-800"
        >
          <FiGithub />
        </a>
        <a
          href="mailto:shoubhit2005@gmail.com"
          title="Email"
          target="_blank"
          rel="noreferrer"
          className="p-3 transition-colors duration-300 rounded-full hover:bg-zinc-800"
        >
          <FiMail />
        </a>
      </div>
    </div>
  );
};

export { Hero, ProjectCard, FeaturedPost };
