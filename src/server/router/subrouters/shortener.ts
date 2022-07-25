import { z } from "zod";
import { createRouter } from "../context";

export const shortenerRouter = createRouter()
  .query("checkSlug", {
    input: z.object({ slug: z.string() }),
    async resolve({ ctx, input }) {
      const slugCount = await ctx.prisma.shortLink.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: slugCount > 0 };
    },
  })
  .mutation("create", {
    input: z.object({
      slug: z.string(),
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.shortLink.create({
          data: {
            slug: input.slug,
            url: input.url,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  });
