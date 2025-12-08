import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/types/app.types";

import { db } from "@/libs/database/db";
import { manga } from "@/libs/database/schema";
import MangaDex from "@/libs/media/manga-dex";

import type { MangaByStatusListRoute, MangaListRoute, MangaSyncRoute } from "./manga.routes";

export const getAllManga: AppRouteHandler<MangaListRoute> = async (c) => {
  const data = await db.select().from(manga);

  return c.json(data);
};

export const getMangaByStatus: AppRouteHandler<MangaByStatusListRoute> = async (c) => {
  const status = c.req.param("status");
  const data = await db.select().from(manga).where(eq(manga.status, status));

  return c.json(data);
};

export const syncMangaFromMangaDex: AppRouteHandler<MangaSyncRoute> = async (c) => {
  const mangaDex = new MangaDex();
  await mangaDex.authenticate();

  const mangaList = await mangaDex.getManga();

  await db.insert(manga).values(mangaList).onConflictDoNothing();

  return c.json({ inserted: mangaList.length });
};
