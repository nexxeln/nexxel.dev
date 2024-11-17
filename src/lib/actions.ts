"use server"

import { redis } from "./redis"

export async function incrementViews(slug: string) {
  const allViews =
    ((await redis.get("views")) as { slug: string; views: number }[]) || []
  const currentViews = allViews.find((view) => view.slug === slug)?.views ?? 0

  const updatedViews = allViews.map((view) =>
    view.slug === slug ? { ...view, views: view.views + 1 } : view
  )

  if (!allViews.find((view) => view.slug === slug)) {
    updatedViews.push({ slug, views: 1 })
  }

  await redis.set("views", updatedViews)
  return currentViews + 1
}
