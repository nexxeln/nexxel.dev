// src/server/router/index.ts

import { t } from "../trpc";
import { guestbookRouter } from "./subrouters/guestbook";
import { shortenerRouter } from "./subrouters/shortener";

export const appRouter = t.router({
  guestbook: guestbookRouter,
  shortener: shortenerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
