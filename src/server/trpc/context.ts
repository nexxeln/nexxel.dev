// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {
  Session,
  unstable_getServerSession as getServerSession,
} from "next-auth";

import { authOptions as nextAuthOptions } from "~/pages/api/auth/[...nextauth]";
import { prisma } from "~/server/db/client";

type CreateContextOptions = {
  session: Session | null;
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts;

  const session = await getServerSession(req, res, nextAuthOptions);

  return await createContextInner({
    session,
  });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
