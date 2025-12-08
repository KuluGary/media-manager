import { numeric, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  createDateTime: timestamp({ withTimezone: true, mode: "string" }).defaultNow().notNull(),
  updateDateTime: timestamp({ mode: "string" }).defaultNow(),
  gameId: numeric().notNull(),
  title: text().notNull(),
  description: text(),
  genres: text().array(),
  platform: text(),
  link: text(),
  updatedAt: timestamp({ mode: "string" }),
  addedAt: timestamp({ mode: "string" }),
  startedAt: timestamp({ mode: "string" }),
  completedAt: timestamp({ mode: "string" }),
  rating: numeric(),
  developer: text(),
  publisher: text(),
  status: text().notNull(),
  playtime: numeric(),
}, table => [
  unique("games_gameId_key").on(table.gameId),
]);

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull(),
  email: text(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const manga = pgTable("manga", {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  title: text().notNull(),
  mangaId: text().notNull(),
  genres: text().array().notNull(),
  author: text(),
  rating: text(),
  link: text(),
  updatedAt: timestamp({ mode: "string" }),
  id: uuid().defaultRandom(),
  status: text().notNull(),
}, table => [
  unique("manga_mangaId_key").on(table.mangaId),
]);
