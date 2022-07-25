import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  console.log(slug);

  if (!slug || typeof slug !== "string") {
    return res.status(404).json({ message: "please provide a slug" });
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug,
    },
    select: {
      url: true,
    },
  });

  if (!data) {
    return res.status(404).json({ message: "short link not found" });
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Cache-Control",
    "s-maxage=10000000000000000, stale-while-revalidate"
  );

  return res.json(data);
}
