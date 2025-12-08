import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/config/env";

import * as schema from "./schema";

type DBType = PostgresJsDatabase<typeof schema>;

declare global {
  /* eslint-disable vars-on-top */
  var db: DBType | undefined;
}

export const client = postgres(env.DATABASE_URL, { prepare: false });
const drizzleConfig = {
  schema,
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
};

/* eslint-disable import/no-mutable-exports */
let db: DBType;
if (env.NODE_ENV === "production") {
  db = drizzle(client, drizzleConfig);
}
else {
  /* eslint-disable no-restricted-globals */
  if (!global.db)
    global.db = drizzle(client, drizzleConfig);

  db = global.db;
}

export { db };
