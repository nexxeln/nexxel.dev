import Image from "next/future/image";
import { FC } from "react";
import { FiGithub, FiMail, FiStar } from "react-icons/fi";
import { BiGitRepoForked } from "react-icons/bi";
import { motion } from "framer-motion";
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
      <motion.div
        whileHover={{
          scale: 1.065,
          transition: {
            duration: 0.2,
          },
        }}
        className="flex h-40 transform flex-col place-content-evenly rounded-lg border-2 border-t-pink bg-[#1c1c1c] p-4"
      >
        <div className="flex flex-col gap-1">
          <p className="medium-text text-xl font-medium">{repo}</p>
          <p className="text-sm">{description}</p>
        </div>

        <div className="flex flex-col gap-0.5 pt-4 text-sm">
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
      </motion.div>
    </a>
  );
};

const FeaturedPost = (post: Post) => {
  return (
    <Link href={post.url}>
      <a className="flex rounded-lg px-4 py-4 transition-colors duration-200 hover:bg-zinc-800">
        <p className="medium-text text-xl font-medium text-t-pink line-clamp-1">
          {post.title}
        </p>
      </a>
    </Link>
  );
};

const Hero = () => {
  return (
    <div className="flex h-screen flex-col items-center pt-32">
      <Image
        src="/images/nexxel.webp"
        alt="nexxel's avatar"
        width={165}
        height={165}
        priority
        className="pixelated rounded-full"
      />

      <h1 className="bold-text animate-gradient-text bg-gradient-to-r from-t-pink via-t-purple to-t-orange bg-clip-text pt-2 text-center text-5xl font-bold text-transparent">
        nexxel
      </h1>

      <p className="pt-1 text-center text-xl">
        Hi, I&apos;m Shoubhit. I&apos;m a 17 y/o self-taught developer and I
        like to build cool stuff
      </p>

      <div className="flex items-center pt-4 text-xl">
        <a
          href="https://github.com/nexxeln/"
          title="GitHub"
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-3 transition-colors duration-300 hover:bg-zinc-800"
        >
          <FiGithub />
        </a>
        <a
          href="mailto:shoubhit2005@gmail.com"
          title="Email"
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-3 transition-colors duration-300 hover:bg-zinc-800"
        >
          <FiMail />
        </a>
      </div>
    </div>
  );
};

export { Hero, ProjectCard, FeaturedPost };
