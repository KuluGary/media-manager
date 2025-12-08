import { eq } from "drizzle-orm";

import { db } from "@/libs/database/db";
import { manga } from "@/libs/database/schema";
import MangaDex from "@/libs/media/manga-dex";

export async function getAllMangas() {
  const data = await db.select().from(manga);

  return data;
}

export async function getMangaByStatus(status: string) {
  const data = await db.select().from(manga).where(eq(manga.status, status));

  return data;
}

export async function syncMangaFromMangaDex() {
  const mangaDex = new MangaDex();
  await mangaDex.authenticate();

  const mangaList = await mangaDex.getManga();

  await db.insert(manga).values(mangaList).onConflictDoNothing();

  return mangaList.length;
}
