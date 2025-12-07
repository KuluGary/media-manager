import { db } from "@/libs/database/db";
import { manga } from "@/libs/database/schema";
import MangaDex from "@/libs/media/MangaDex";
import { eq } from "drizzle-orm";

export const getAllMangas = async () => {
	const data = await db.select().from(manga);

	return data;
}

export const getMangaByStatus = async (status: string) => {
	const data = await db.select().from(manga).where(eq(manga.status, status));

	return data;
}

export const syncMangaFromMangaDex = async () => {
	const mangaDex = new MangaDex();
	await mangaDex.authenticate();

	const mangaList = await mangaDex.getManga();

	await db.insert(manga).values(mangaList).onConflictDoNothing();

	return mangaList.length
}