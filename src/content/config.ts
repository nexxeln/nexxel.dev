/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { defineCollection } from "astro:content"
import { z } from "zod"

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const blog = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    description: z.string(),
    date: z.string().transform(str => new Date(str)),
  }),
})

export const collections = { blog }
