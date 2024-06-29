export function ViewCounter({
  slug,
  allViews,
}: {
  slug: string;
  allViews: {
    slug: string;
    views: number;
  }[];
}) {
  const views = allViews.find((view) => view.slug === slug)?.views ?? 0;

  return (
    <span className="text-neutral-600 dark:text-neutral-400">
      {views.toLocaleString()} views
    </span>
  );
}
