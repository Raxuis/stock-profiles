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
    throw new Error(err.message);
  }

  const response = await res.json();
  return response.message;
}
