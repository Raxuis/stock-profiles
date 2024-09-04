import { ContactSchema } from "@/lib/validation";
import { z } from "zod";

export async function sendContactForm(data: z.infer<typeof ContactSchema>) {
  const apiEndpoint = '/api/contact';

  const res = await fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    // Check if the error message indicates too many requests
    if (err.error === 'Too many requests. Please wait a minute before sending another email.') {
      throw new Error("You already sent an email. Please wait a minute before trying again.");
    }
    throw new Error(err.message);
  }

  const response = await res.json();
  return response.message;
}
