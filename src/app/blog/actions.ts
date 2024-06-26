"use server";

import { z } from "zod";

export const subscribe = async (formData: FormData) => {
  const email = z.string().email().safeParse(formData.get("email"));

  if (!email.success) {
    return { error: "invalid email", success: false };
  }

  const response = (await fetch("https://api.useplunk.com/v1/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
    },
    body: JSON.stringify({ email: email.data, subscribed: true }),
  })) as unknown as { success: boolean };

  if (response.success) {
    return { success: true };
  }

  return { error: "failed to subscribe", success: false };
};
