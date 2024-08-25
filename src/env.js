import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["production", "development"]),
    DATABASE_URL: z.string().url(),
    STOCKS_API_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    EMAIL_USER: z.string(),
    EMAIL_PASS: z.string(),
  },
  client: {},
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
