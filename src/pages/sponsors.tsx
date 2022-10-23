/* eslint-disable @next/next/no-img-element */
import fs from "fs/promises";

import Wrapper from "~/components/Wrapper";
import { GetStaticProps, NextPage } from "next";
import path from "path";

type Sponsor = {
  sponsor: User;
  isOneTime: boolean;
  monthlyDollars: number;
  privacyLevel: string;
  tierName: string;
  createdAt: string;
  provider: string;
};

type User = {
  login: string;
  name?: string;
  avatarUrl: string;
  type: string;
  avatarUrlHighRes: string;
  avatarUrlMediumRes: string;
  avatarUrlLowRes: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), ".sponsorkit/sponsors.json");
  const sponsorsJson = await fs.readFile(filePath);
  const sponsors: Sponsor[] = JSON.parse(sponsorsJson.toString());

  return {
    props: {
      sponsors,
    },
  };
};

const Sponsor: React.FC<{ name: string; login: string; avatar: string }> = ({
  avatar,
  name,
  login,
}) => {
  return (
    <a href={`https://github.com/${login}`} target="_blank" rel="noreferrer">
      <div className="p-4 transition-all duration-300 rounded-md hover:bg-neutral-800">
        <img src={avatar} alt={`${name}'s avatar`} />
        <p className="pt-1 text-center">{name}</p>
      </div>
    </a>
  );
};

const SponsorsPage: NextPage<{ sponsors: Sponsor[] }> = ({ sponsors }) => {
  return (
    <Wrapper
      title="nexxel • sponsors"
      description="People who sponsor me and support my open source work."
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Sponsors
      </h1>
      <p className="pt-1 text-slate-200">
        These are very cool people who sponsor me. I&apos;m incredibly thankful
        to all of them. If you want to support my open source work, you can{" "}
        <a
          href="https://github.com/sponsors/nexxeln"
          target="_blank"
          rel="noreferrer"
          className="font-medium transition-opacity duration-300 medium-text text-t-pink hover:opacity-90"
        >
          sponsor me on GitHub
        </a>
        .
      </p>

      <div className="pt-8" />

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 auto-cols-max sm:grid-cols-3 sm:gap-8">
          {sponsors.map((sponsor) => {
            return (
              <Sponsor
                key={sponsor.sponsor.login}
                name={sponsor.sponsor.name ?? sponsor.sponsor.login}
                login={sponsor.sponsor.login}
                avatar={sponsor.sponsor.avatarUrlHighRes}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default SponsorsPage;
