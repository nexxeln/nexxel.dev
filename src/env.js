import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    PLUNK_API_KEY: z.string(),
    SENTRY_DSN: z.string().url(),
    // REDIS_URL: z.string().url(),
    // REDIS_TOKEN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CF_R2_BUCKET_URL: z.string().url(),
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY: z.string(),
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CF_R2_BUCKET_URL: process.env.NEXT_PUBLIC_CF_R2_BUCKET_URL,
    PLUNK_API_KEY: process.env.PLUNK_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY,
    // REDIS_URL: process.env.REDIS_URL,
    // REDIS_TOKEN: process.env.REDIS_TOKEN,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});