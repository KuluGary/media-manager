import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { toZodV4SchemaTyped } from "@/utils/zod";

import { games, manga } from "./schema";

export const selectGamesSchema = toZodV4SchemaTyped(createSelectSchema(games));

export const insertGamesSchema = toZodV4SchemaTyped(createInsertSchema(games, { gameId: field => field.min(1) }));

export const selectMangaSchema = toZodV4SchemaTyped(createSelectSchema(manga));

export const insertMangaSchema = toZodV4SchemaTyped(createInsertSchema(manga, { mangaId: field => field.min(1) }));
