import Link from "next/link";

const PageCard: React.FC<{ title: string; description: string; to: string; }> = ({ title, description, to }) => {
  return (
    <Link href={to}>
      <a>
        <div className="border border-t-pink rounded-md p-4 bg-[#1c1c1c] hover:bg-[#1d1d1d] hover:border-opacity-80 transition-colors duration-300 focus:outline-none">
          <h3 className="text-2xl font-bold bold-text">{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </Link>
  );
}

export { PageCard };
