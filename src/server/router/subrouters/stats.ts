import { resolve } from "path";
import { z } from "zod";
import { createRouter } from "../context";

export const statsRouter = createRouter().mutation("getGithubFollowers", {
  async resolve() {},
});
