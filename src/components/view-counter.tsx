import { redis } from "@/lib/redis"

export async function Views({ slug }: { slug: string }) {
  const allViews = (await redis.get("views")) as {
    slug: string
    views: number
  }[]

  return <ViewCounter slug={slug} allViews={allViews} />
}

function ViewCounter({
  slug,
  allViews,
}: {
  slug: string
  allViews: {
    slug: string
    views: number
  }[]
}) {
  const views = allViews.find((view) => view.slug === slug)?.views ?? 0

  return (
    <span className="text-sm text-gray-400">
      {views.toLocaleString()} views
    </span>
  )
}

export function ViewCounterSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[17px] w-[70px] bg-gray-800/50 rounded-sm" />
    </div>
  )
}
