import dotenv from 'dotenv';
dotenv.config();

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/libs/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
