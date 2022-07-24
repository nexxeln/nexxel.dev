// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { guestbookRouter } from "./subrouters/guestbook";
import { statsRouter } from "./subrouters/stats";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("guestbook.", guestbookRouter)
  .merge("stats.", statsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
