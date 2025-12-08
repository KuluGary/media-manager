import { env } from "@/config/env";
import type {
	FormattedManga,
	MangaDexList,
	MangaDexManga,
	MangaDexMangaList,
	MangaDexStatuses,
	MangaDexUserFollowMangaList,
	MangaWithStatus
} from "@/types/MangaDex";
import qs from "querystring";

export default class MangaDex {
	authUrl: string =
		"https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token";

	headers: Record<string, string> = {};

	endpoints = {
		MANGA_LIST: "https://api.mangadex.org/list/:mangaList",

		// IMPORTANT: includes[]=chapter eliminates hundreds of extra requests
		MANGA_BASE:
			"https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&includes[]=chapter&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica",

		CHAPTER_BASE: "https://api.mangadex.org/chapter",
		FOLLOWS:
			"https://api.mangadex.org/user/follows/manga?&includes[]=cover_art&includes[]=artist&includes[]=author&includes[]=manga",
		STATUS: "https://api.mangadex.org/manga/status"
	};

	constructor() {
		this.endpoints.MANGA_LIST = this.endpoints.MANGA_LIST.replace(
			":mangaList",
			env.MANGADEX_FOLLOWS_LIST_ID
		);
	}

	async authenticate(): Promise<void> {
		const credentials = {
			grant_type: "password",
			username: env.MANGADEX_USERNAME,
			password: env.MANGADEX_PASSWORD,
			client_id: env.MANGADEX_CLIENT_ID,
			client_secret: env.MANGADEX_CLIENT_SECRET
		};

		const formData = qs.stringify(credentials);

		const response = await fetch(this.authUrl, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: formData
		});

		const json = (await response.json()) as { access_token: string };

		this.headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${json.access_token}`
		};
	}

	async getManga(): Promise<MangaWithStatus[]> {
		const [followList, statusMap, favouriteList] = await Promise.all([
			this.getMangaFollows(),
			this.getMangaStatus(),
			this.getMangaList()
		]);

		const results: MangaWithStatus[] = [];

		const [followManga, favouriteManga] = await Promise.all([
			this.getMangaDetails(followList.map(m => ({ id: m.id, type: "manga" }))),
			this.getMangaDetails(favouriteList.data.relationships)
		]);

		for (const manga of followManga) {
			const status = statusMap.statuses[manga.id];
			if (!status) continue;

			const formatted = await this.formatManga(manga);
			results.push({ ...formatted, status });
		}

		for (const manga of favouriteManga) {
			const formatted = await this.formatManga(manga);
			results.push({ ...formatted, status: "favourite" });
		}

		return results;
	}

	private async getMangaList(): Promise<MangaDexList> {
		const response = await fetch(this.endpoints.MANGA_LIST, {
			method: "GET",
			headers: this.headers
		});

		return response.json() as Promise<MangaDexList>;
	}

	private async getMangaFollows(): Promise<MangaDexManga[]> {
		const endpoint = this.endpoints.FOLLOWS;

		const limit = 100;
		let offset = 0;
		let allData: MangaDexManga[] = [];
		let hasMore = true;

		while (hasMore) {
			const url = `${endpoint}&limit=${limit}&offset=${offset}`;
			const response = (await fetch(url, {
				method: "GET",
				headers: this.headers
			}).then(res => res.json())) as MangaDexUserFollowMangaList;

			allData.push(...response.data);
			offset += limit;
			hasMore = response.total ? offset < response.total : response.data.length === limit;
		}

		return allData;
	}

	private async getMangaStatus(): Promise<MangaDexStatuses> {
		const response = await fetch(this.endpoints.STATUS, {
			method: "GET",
			headers: this.headers
		});

		return response.json() as Promise<MangaDexStatuses>;
	}

	private async getMangaDetails(
		mangaRefs: { id: string; type: string }[]
	): Promise<MangaDexManga[]> {
		const ids = mangaRefs.filter(ref => ref.type === "manga").map(ref => ref.id);

		const chunks = this.chunkArray(ids, 100);

		const requests = chunks.map(async chunk => {
			try {
				const idsQuery = chunk.map(id => `ids[]=${id}`).join("&");
				const endpoint = `${this.endpoints.MANGA_BASE}&${idsQuery}&limit=${chunk.length}`;

				const response = await fetch(endpoint, {
					method: "GET",
					headers: this.headers
				});

				const json = (await response.json()) as MangaDexMangaList;
				return json.data;
			} catch (err) {
				console.error(err);
				return [];
			}
		});

		const results = await Promise.all(requests);

		return results.flat();
	}

	private chunkArray<T>(arr: T[], size: number): T[][] {
		const chunks: T[][] = [];
		for (let i = 0; i < arr.length; i += size) {
			chunks.push(arr.slice(i, i + size));
		}
		return chunks;
	}

	private async formatManga(manga: MangaDexManga): Promise<FormattedManga> {
		const id = manga.id;
		const title = manga.attributes?.title.en || "Untitled";

		const chapterRel = manga.relationships.find(r => r.type === "chapter");

		const updatedAt =
			chapterRel?.attributes?.publishAt ??
			manga.attributes.updatedAt;

		const author =
			manga.relationships.find(r => r.type === "author")?.attributes?.name ??
			"Unknown";

		const genres = manga.attributes.tags
			.filter(tag => tag.attributes.group === "genre")
			.map(tag => tag.attributes.name.en)
			.filter(t => t !== undefined);

		return {
			mangaId: id,
			title,
			genres: genres ?? [],
			author,
			rating: manga.attributes.contentRating,
			link: manga.attributes.links?.raw,
			updatedAt
		};
	}
}
