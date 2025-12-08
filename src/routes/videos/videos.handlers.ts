import type { AppRouteHandler } from "@/types/app.types";

import { db } from "@/libs/database/db";
import { videos } from "@/libs/database/schema";
import YouTube from "@/libs/media/youtube";

import type { VideosListRoute, VideosSyncROute } from "./videos.routes";

export const getAllVideos: AppRouteHandler<VideosListRoute> = async (c) => {
  const data = await db?.select().from(videos);

  return c.json(data);
};

export const syncVideoFromYoutube: AppRouteHandler<VideosSyncROute> = async (c) => {
  const youtube = new YouTube();
  const videoList = await youtube.getVideos();

  await db.insert(videos).values(videoList).onConflictDoNothing();

  return c.json({ inserted: videoList.length });
};
