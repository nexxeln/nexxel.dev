import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, t } from "../../trpc";

export const guestbookRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany({
        select: {
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  postMessage: authedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});

// .query("getAll", {
//   async resolve({ ctx }) {
//     try {
//       return await ctx.prisma.guestbook.findMany({
//         select: {
//           name: true,
//           message: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//     } catch (error) {
//       console.log("error", error);
//     }
//   },
// })
// .middleware(async ({ ctx, next }) => {
//   // Any queries or mutations after this middleware will
//   // raise an error unless there is a current session
//   if (!ctx.session) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//   return next();
// })
// .mutation("postMessage", {
//   input: z.object({
//     name: z.string(),
//     message: z.string(),
//   }),
//   async resolve({ ctx, input }) {
//     try {
//       await ctx.prisma.guestbook.create({
//         data: {
//           name: input.name,
//           message: input.message,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   },
// });
