// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { guestbookRouter } from "./subrouters/guestbook";
import { shortenerRouter } from "./subrouters/shortener";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("guestbook.", guestbookRouter)
  .merge("shortener.", shortenerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
