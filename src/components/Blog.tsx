export interface Props {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  url: string;
}

export const Blog = ({ title, description, date, readingTime, url }: Props) => {
  return (
    <a
      href={url}
      rel="prefetch"
      className="flex flex-col gap-y-3 hover:(no-underline bg-neutral-800) p-4 mb-8 transition-colors rounded-xl"
    >
      <h3 className="text-(vitesseGreen xl) md:text-2xl font-extrabold">
        {title}
      </h3>

      <p className="text-sm md:text-base font-medium">{description}</p>

      <div className="flex items-center gap-x-2 text-(neutral-200 xs) md:text-sm font-medium">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>

        <span>•</span>

        <span>{readingTime}</span>
      </div>
    </a>
  );
};
