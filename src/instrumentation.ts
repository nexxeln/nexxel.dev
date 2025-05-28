import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// If you need to handle request errors, you can define your own handler or use another Sentry API.
// For example, you might want to export Sentry.captureException:
export const onRequestError = Sentry.captureException;
