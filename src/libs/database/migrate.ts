import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from "./db";

export async function migrateDB() {
  await migrate(db, { migrationsFolder: "drizzle" });
}

migrateDB();
