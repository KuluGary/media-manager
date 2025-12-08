import { createRouter } from "@/libs/hono/create-app";

import * as handlers from "./manga.handlers";
import * as routes from "./manga.routes";

const router = createRouter()
  .openapi(routes.list, handlers.getAllManga)
  .openapi(routes.listByStatus, handlers.getMangaByStatus)
  .openapi(routes.sync, handlers.syncMangaFromMangaDex);

export default router;
