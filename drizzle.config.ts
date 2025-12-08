import type { Config } from "drizzle-kit";

import dotenv from "dotenv";

import { env } from "@/config/env";

dotenv.config();

export default {
  schema: "./src/libs/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
} satisfies Config;
