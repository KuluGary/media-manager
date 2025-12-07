import { pgTable, unique, pgEnum, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const oauth_authorization_status = pgEnum("oauth_authorization_status", ['pending', 'approved', 'denied', 'expired'])
export const oauth_client_type = pgEnum("oauth_client_type", ['public', 'confidential'])
export const oauth_registration_type = pgEnum("oauth_registration_type", ['dynamic', 'manual'])
export const oauth_response_type = pgEnum("oauth_response_type", ['code'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const request_status = pgEnum("request_status", ['PENDING', 'SUCCESS', 'ERROR'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const buckettype = pgEnum("buckettype", ['STANDARD', 'ANALYTICS', 'VECTOR'])


export const games = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createDateTime: timestamp("createDateTime", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  updateDateTime: timestamp("updateDateTime", { mode: 'string' }).defaultNow(),
  gameId: numeric("gameId").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  genres: text("genres").array(),
  platform: text("platform"),
  link: text("link"),
  updatedAt: timestamp("updatedAt", { mode: 'string' }),
  addedAt: timestamp("addedAt", { mode: 'string' }),
  startedAt: timestamp("startedAt", { mode: 'string' }),
  completedAt: timestamp("completedAt", { mode: 'string' }),
  rating: numeric("rating"),
  developer: text("developer"),
  publisher: text("publisher"),
  status: text("status").notNull(),
  playtime: numeric("playtime"),
},
  (table) => {
    return {
      games_gameId_key: unique("games_gameId_key").on(table.gameId),
    }
  });

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email"),
  created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const manga = pgTable("manga", {
  created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  title: text("title").notNull(),
  mangaId: text("mangaId").notNull(),
  genres: text("genres").array().notNull(),
  author: text("author"),
  rating: text("rating"),
  link: text("link"),
  updatedAt: timestamp("updatedAt", { mode: 'string' }),
  id: uuid("id").defaultRandom(),
  status: text("status").notNull(),
},
  (table) => {
    return {
      manga_mangaId_key: unique("manga_mangaId_key").on(table.mangaId),
    }
  });