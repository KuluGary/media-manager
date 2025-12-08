import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/types/app.types";

import { db } from "@/libs/database/db";
import { games } from "@/libs/database/schema";
import HowLongToBeat from "@/libs/media/how-long-to-beat";
import { mapHLTBToDB } from "@/utils/games";

import type { GameByStatusListRoute, GameListRoute, GameSyncRoute } from "./games.routes";

export const getAllGames: AppRouteHandler<GameListRoute> = async (c) => {
  const data = await db.select().from(games);

  return c.json(data);
};

export const getGamesByStatus: AppRouteHandler<GameByStatusListRoute> = async (c) => {
  const status = c.req.param("status");
  const data = await db.select().from(games).where(eq(games.status, status));

  return c.json(data);
};

export const syncGamesFromHLTB: AppRouteHandler<GameSyncRoute> = async (c) => {
  const hltb = new HowLongToBeat();

  const hltbResponses = await Promise.all(
    hltb.lists.map(async listType => ({
      listType,
      result: await hltb.getGameList(listType),
    })),
  );

  const gameList = hltbResponses
    .flatMap(entry =>
      entry.result?.data.gamesList.map(game => ({
        game,
        status: entry.listType,
      })),
    )
    .filter(g => g !== undefined)
    .map(({ game, status }) => mapHLTBToDB(game, status));

  await db.insert(games).values(gameList).onConflictDoNothing();

  return c.json({ inserted: gameList.length });
};
