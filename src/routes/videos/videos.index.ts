import { createRouter } from "@/libs/hono/create-app";

import * as handlers from "./videos.handlers";
import * as routes from "./videos.routes";

const router = createRouter()
  .openapi(routes.list, handlers.getAllVideos)
  .openapi(routes.sync, handlers.syncVideoFromYoutube);

export default router;
