import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectVideosSchema } from "@/libs/database/schema.utils";

const tags = ["videos"];

export const list = createRoute({
  path: "/videos/list",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectVideosSchema),
      "The videos list",
    ),
  },
});

export const sync = createRoute({
  path: "/videos/sync",
  method: "post",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ inserted: z.number() }),
      "The amount of elements inserted in the database",
    ),
  },
});

export type VideosListRoute = typeof list;

export type VideosSyncROute = typeof sync;
