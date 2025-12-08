import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectGamesSchema } from "@/libs/database/schema.utils";

const tags = ["games"];

export const list = createRoute({
  path: "/games/list",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectGamesSchema),
      "The games list",
    ),
  },
});

export const listByStatus = createRoute({
  path: "/games/list/:status",
  method: "get",
  tags,
  request: {
    params: z.object({
      status: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectGamesSchema),
      "The list of games by status requested",
    ),
  },
});

export const sync = createRoute({
  path: "/games/sync",
  method: "post",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ inserted: z.number() }),
      "The amount of elements inserted in the database",
    ),
  },
});

export type GameListRoute = typeof list;

export type GameByStatusListRoute = typeof listByStatus;

export type GameSyncRoute = typeof sync;
