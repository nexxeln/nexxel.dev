import { z } from "zod";
import { t } from "../../trpc";

export const shortenerRouter = t.router({
  checkSlug: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const slugCount = await ctx.prisma.shortLink.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: slugCount > 0 };
    }),
  create: t.procedure
    .input(
      z.object({
        slug: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
});
