import Link from "next/link";

const PageCard: React.FC<{
  title: string;
  description: string;
  to?: string;
}> = ({ title, description, to }) => {
  if (!to) {
    return (
      <div className="flex h-32 flex-col justify-between rounded-md border-2 border-t-pink bg-[#1c1c1c] p-4 opacity-75 focus:outline-none">
        <h3 className="bold-text text-2xl font-bold">{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  if (to.startsWith("/")) {
    return (
      <Link href={to}>
        <a>
          <div className="flex h-32 flex-col justify-between rounded-md border-2 border-t-pink bg-[#1c1c1c] p-4 transition-colors duration-300 hover:border-opacity-80 hover:bg-[#1d1d1d] focus:outline-none">
            <h3 className="bold-text text-2xl font-bold">{title}</h3>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    );
  } else
    return (
      <Link href={to}>
        <a href={to} target="_blank" rel="noreferrer">
          <div className="flex h-32 flex-col justify-between rounded-md border-2 border-t-pink bg-[#1c1c1c] p-4 transition-colors duration-300 hover:border-opacity-80 hover:bg-[#1d1d1d] focus:outline-none">
            <h3 className="bold-text text-2xl font-bold">{title}</h3>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    );
};

export { PageCard };
