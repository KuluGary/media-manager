import { getAllMangas, getMangaByStatus, syncMangaFromMangaDex } from "@/controllers/manga.controllers";
import { Hono } from "hono";

const mangaRoutes = new Hono()
	.get("/", async (c) => {
		const data = await getAllMangas();

		return c.json(data);
	})
	.get("/list/:status", async (c) => {
		const status = c.req.param("status");
		const data = await getMangaByStatus(status);

		return c.json(data)
	})
	.post("/sync", async (c) => {
		const insertedMangaAmount = await syncMangaFromMangaDex();

		return c.json({ inserted: insertedMangaAmount })
	})

export default mangaRoutes;