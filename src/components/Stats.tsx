import clsx from "clsx";
import { FC } from "react";
import { trpc } from "~/utils/trpc";

const StatsCard: FC<{ text: string; value: string }> = ({ text, value }) => {
  return (
    <div className="flex flex-col items-center border-2 rounded-md border-t-orange">
      <h2 className={clsx(value === "..." ? "animate-pulse" : "")}>{value}</h2>
      <h3>{text}</h3>
    </div>
  );
};

const Stats = () => {
  const { data: followers, isLoading: followersIsLoading } = trpc.useQuery([
    "stats.getGithubFollowers",
  ]);

  const { data: stars, isLoading: starsIsLoading } = trpc.useQuery([
    "stats.getGithubStars",
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatsCard
        text="GitHub Followers"
        value={followersIsLoading ? "..." : followers?.followers}
      />
      <StatsCard
        text="GitHub Stars"
        value={starsIsLoading ? "..." : stars?.stars}
      />
    </div>
  );
};

export default Stats;
