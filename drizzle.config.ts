import dotenv from "dotenv";

import { env } from "@/config/env";

dotenv.config();

export default {
  out: "./src/libs/database",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
};
