import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectMangaSchema } from "@/libs/database/schema.utils";

const tags = ["manga"];

export const list = createRoute({
  path: "/manga/list",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectMangaSchema),
      "The manga list",
    ),
  },
});

export const listByStatus = createRoute({
  path: "/manga/list/:status",
  method: "get",
  tags,
  request: {
    params: z.object({
      status: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectMangaSchema),
      "The list of manga by status requested",
    ),
  },
});

export const sync = createRoute({
  path: "/manga/sync",
  method: "post",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ inserted: z.number() }),
      "The amount of elements inserted in the database",
    ),
  },
});

export type MangaListRoute = typeof list;

export type MangaByStatusListRoute = typeof listByStatus;

export type MangaSyncRoute = typeof sync;
