import { createRouter } from "@/libs/hono/create-app";

import * as handlers from "./games.handlers";
import * as routes from "./games.routes";

const router = createRouter()
  .openapi(routes.list, handlers.getAllGames)
  .openapi(routes.listByStatus, handlers.getGamesByStatus)
  .openapi(routes.sync, handlers.syncGamesFromHLTB);

export default router;
